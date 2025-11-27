const mongoose = require('mongoose');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Bill = require('../models/Bill'); // Import Bill model
const User = require('../models/User'); // Import User model for employee details
const Counter = require('../models/Counter');

// Helper to get next sequence value for given name
const getNextSequence = async (name) => {
    const counter = await Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
};

// @desc    Create a new sale and adjust inventory
// @route   POST /api/sales
// @access  Private/Employee
const createSale = async (req, res) => {
    const { items, customerInfo, paymentMethod } = req.body;
    const employeeId = req.user._id;

    if (!items || items.length === 0) {
        res.status(400);
        throw new Error('No sale items');
    }

    let totalAmount = 0;
    const saleItems = [];

    for (const item of items) {
        const product = await Product.findById(item.product);

        if (!product) {
            res.status(404);
            throw new Error(`Product not found: ${item.product}`);
        }

        if (product.quantity < item.quantity) {
            res.status(400);
            throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        // Decrease product quantity
        product.quantity -= item.quantity;
        await product.save();

        totalAmount += product.price * item.quantity;
        saleItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price,
        });
    }

    // Generate sequential saleId
    const nextSaleId = await getNextSequence('saleId');

    const sale = await Sale.create({
        saleId: nextSaleId,
        employee: employeeId,
        items: saleItems,
        total: totalAmount,
    });

    // Populate sale for bill generation
    const populatedSale = await Sale.findById(sale._id)
        .populate('employee', 'name')
        .populate('items.product', 'name price');

    // Auto-generate bill for the sale (use PKR)
    let billContent = `
        <h1>Digital Bill</h1>
        <p>Sale ID: ${populatedSale.saleId}</p>
        <p>Date: ${populatedSale.createdAt.toDateString()}</p>
        <p>Employee: ${populatedSale.employee.name}</p>
        <hr>
        <h2>Items:</h2>
        <ul>
            ${populatedSale.items.map(item => `
                <li id="item-${item.product._id}">
                    ${item.product.name} 
                    (<span id="qty-${item.product._id}">${item.quantity}</span>) 
                    - PKR ${item.price.toFixed(2)} each
                    Total: PKR <span id="total-${item.product._id}">${(item.quantity * item.price).toFixed(2)}</span>
                    <div style="display:inline-block;margin-left:10px;">
                        <button id="minus-${item.product._id}" data-product-id="${item.product._id}" data-price="${item.price}" aria-label="decrease-qty">-</button>
                        <button id="plus-${item.product._id}" data-product-id="${item.product._id}" data-price="${item.price}" aria-label="increase-qty">+</button>
                        <button id="remove-${item.product._id}" data-product-id="${item.product._id}" aria-label="remove-item">Remove</button>
                    </div>
                </li>
            `).join('')}
        </ul>
        <hr>
        <h3>Total Amount: PKR ${populatedSale.total.toFixed(2)}</h3>
    `;

    const bill = await Bill.create({
        sale: populatedSale._id,
        customerInfo: customerInfo || 'N/A',
        paymentMethod: paymentMethod || 'Cash',
        billData: billContent,
    });

    res.status(201).json({ sale: populatedSale, bill });
};

// @desc    Process a return and adjust inventory
// @route   POST /api/sales/return
// @access  Private/Employee
const processReturn = async (req, res) => {
    const { saleId, returnItems } = req.body; // returnItems: [{ product|productId, quantity }]

    // Support either Mongo ObjectId (sale._id) or numeric saleId sequence
    let sale = null;

    if (saleId && mongoose.Types.ObjectId.isValid(saleId)) {
        sale = await Sale.findById(saleId);
    }

    if (!sale) {
        // Try numeric saleId field
        const numericId = Number(saleId);
        if (!isNaN(numericId)) {
            sale = await Sale.findOne({ saleId: numericId });
        }
    }

    if (!sale) {
        res.status(404);
        throw new Error('Sale not found');
    }

    // Validate return items
    if (!returnItems || !Array.isArray(returnItems) || returnItems.length === 0) {
        res.status(400);
        throw new Error('returnItems must be a non-empty array');
    }

    // Process each returned item: increase product stock and decrement sale item quantities
    for (const returnItem of returnItems) {
        const productId = returnItem.product || returnItem.productId;
        const qtyToReturn = Number(returnItem.quantity) || 0;

        if (!productId || qtyToReturn <= 0) {
            res.status(400);
            throw new Error('Each return item must include a valid product and quantity');
        }

        let product = null;

        // Try ObjectId first
        if (mongoose.Types.ObjectId.isValid(productId)) {
            product = await Product.findById(productId);
        }

        // If not found by ObjectId, try barcode or name
        if (!product) {
            product = await Product.findOne({ barcode: productId });
        }

        if (!product) {
            product = await Product.findOne({ name: productId });
        }

        if (!product) {
            res.status(404);
            throw new Error(`Product not found: ${productId}`);
        }

        const originalSaleItem = sale.items.find(
            (item) => item.product.toString() === product._id.toString()
        );

        if (!originalSaleItem || originalSaleItem.quantity < qtyToReturn) {
            res.status(400);
            throw new Error(`Cannot return ${qtyToReturn} of ${product.name}. Original sale quantity was ${originalSaleItem ? originalSaleItem.quantity : 0}`);
        }

        // Increase product quantity (restock)
        product.quantity += qtyToReturn;
        await product.save();

        // Decrease the sold quantity recorded on the sale to reflect the returned amount
        originalSaleItem.quantity = originalSaleItem.quantity - qtyToReturn;

        // Decrease the sale total by the returned amount (price * qty)
        const returnedAmount = (originalSaleItem.price || 0) * qtyToReturn;
        sale.total = (Number(sale.total) || 0) - returnedAmount;
    }

    // If all items in the sale have been returned (quantities are 0), mark the sale as returned
    const allReturned = sale.items.every((it) => Number(it.quantity) === 0);
    sale.isReturn = allReturned;

    // Ensure sale.total is not negative and round to 2 decimals
    sale.total = Math.max(0, Number(sale.total) || 0);
    sale.total = Math.round(sale.total * 100) / 100;

    await sale.save();

    res.json({ message: 'Return processed successfully', saleId: sale._id, allReturned });
};


// @desc    Get sales data by frequency and revenue per item per month
// @route   GET /api/sales/analysis
// @access  Private/Admin
const getSalesAnalysis = async (req, res) => {
    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of the month

    // Allow optional query params
    const topOnly = req.query.top === '1' || req.query.top === 'true';
    const exportCsv = req.query.export === 'csv';

    const sales = await Sale.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $unwind: '$items',
        },
        {
            $group: {
                _id: '$items.product',
                totalQuantity: { $sum: '$items.quantity' },
                totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
            },
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        {
            $unwind: '$productDetails',
        },
        {
            $project: {
                _id: 0,
                productName: '$productDetails.name',
                productId: '$_id',
                totalQuantity: 1,
                totalRevenue: 1,
            },
        },
        { $sort: { totalQuantity: -1 } },
    ]);
    if (exportCsv) {
        // Build CSV
        const header = ['Product Name', 'Product ID', 'Total Quantity', 'Total Revenue'];
        const rows = sales.map(s => [s.productName, String(s.productId), String(s.totalQuantity), s.totalRevenue.toFixed ? s.totalRevenue.toFixed(2) : String(s.totalRevenue)]);
        const csvLines = [header.join(','), ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))];
        const csv = csvLines.join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="sales-frequency-${year}-${month}.csv"`);
        return res.send(csv);
    }

    if (topOnly) {
        const topSellingProducts = sales.slice(0, 5).map(s => ({ productName: s.productName, totalQuantity: s.totalQuantity, totalRevenue: s.totalRevenue }));
        return res.json({ items: sales, topSellingProducts });
    }

    // Default: return full array (backwards-compatible)
    res.json(sales);
};


// @desc    Get sales for a specific employee
// @route   GET /api/sales/employee/:id
// @access  Private/Admin
const getEmployeeSales = async (req, res) => {
    const { id } = req.params;
    const { month, year } = req.query;

    // Authorization: allow if admin or requesting own data
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
        res.status(401);
        throw new Error('Not authorized to view these sales');
    }

    let query = { employee: id };

    if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const sales = await Sale.find(query).populate('employee', 'name username').populate('items.product', 'name price');

    res.json(sales);
};


// @desc    Get dashboard summary data (total sales, total revenue, stock status)
// @route   GET /api/sales/summary
// @access  Private/Admin
const getDashboardSummary = async (req, res) => {
    // Total sales and revenue
    const totalSales = await Sale.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$total' },
                totalSalesCount: { $sum: 1 },
            },
        },
    ]);

    // Total products and their quantities
    const productSummary = await Product.aggregate([
        {
            $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                totalQuantity: { $sum: '$quantity' },
            },
        },
    ]);

    // Low stock, out of stock, overstock counts
    // Compare fields within the same document using $expr
    const lowStockCount = await Product.countDocuments({
        $expr: {
            $and: [
                { $lte: ['$quantity', '$lowStockThreshold'] },
                { $gt: ['$quantity', 0] },
            ],
        },
    });
    const outOfStockCount = await Product.countDocuments({ quantity: 0 });
    const overstockCount = await Product.countDocuments({
        $expr: { $gte: ['$quantity', '$overstockThreshold'] },
    });

    res.json({
        totalSales: totalSales[0] || { totalRevenue: 0, totalSalesCount: 0 },
        productSummary: productSummary[0] || { totalProducts: 0, totalQuantity: 0 },
        inventoryAlerts: {
            lowStockCount,
            outOfStockCount,
            overstockCount,
        },
    });
};


// @desc    Generate monthly sales report
// @route   GET /api/sales/report/monthly
// @access  Private/Admin
const generateMonthlySalesReport = async (req, res) => {
    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const salesReport = await Sale.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$total' },
                totalSalesCount: { $sum: 1 },
                averageSale: { $avg: '$total' },
            },
        },
    ]);

    const topSellingProducts = await Sale.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $unwind: '$items',
        },
        {
            $group: {
                _id: '$items.product',
                totalQuantitySold: { $sum: '$items.quantity' },
            },
        },
        {
            $sort: { totalQuantitySold: -1 },
        },
        {
            $limit: 5,
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        {
            $unwind: '$productDetails',
        },
        {
            $project: {
                _id: 0,
                productName: '$productDetails.name',
                totalQuantitySold: 1,
            },
        },
    ]);

    res.json({
        month: `${year}-${month}`,
        summary: salesReport[0] || { totalRevenue: 0, totalSalesCount: 0, averageSale: 0 },
        topSellingProducts,
    });
};

const generateBill = async (req, res) => {
    const { id: saleId } = req.params;
    const { customerInfo, paymentMethod } = req.body;

    const sale = await Sale.findById(saleId)
        .populate('employee', 'name')
        .populate('items.product', 'name price');

    if (!sale) {
        res.status(404);
        throw new Error('Sale not found');
    }

    // Construct bill data (can be HTML, plain text, or JSON)
    let billContent = `
        <h1>Digital Bill</h1>
        <p>Sale ID: ${sale.saleId || sale._id}</p>
        <p>Date: ${sale.createdAt.toDateString()}</p>
        <p>Employee: ${sale.employee.name}</p>
        ${customerInfo ? `<p>Customer Info: ${customerInfo}</p>` : ''}
        <hr>
        <h2>Items:</h2>
        <ul>
            ${sale.items.map(item => `
                <li id="item-${item.product._id}">
                    ${item.product.name} 
                    (<span id="qty-${item.product._id}">${item.quantity}</span>) 
                    - PKR ${item.price.toFixed(2)} each
                    Total: PKR <span id="total-${item.product._id}">${(item.quantity * item.price).toFixed(2)}</span>
                    <div style="display:inline-block;margin-left:10px;">
                        <button id="minus-${item.product._id}" data-product-id="${item.product._id}" data-price="${item.price}" aria-label="decrease-qty">-</button>
                        <button id="plus-${item.product._id}" data-product-id="${item.product._id}" data-price="${item.price}" aria-label="increase-qty">+</button>
                        <button id="remove-${item.product._id}" data-product-id="${item.product._id}" aria-label="remove-item">Remove</button>
                    </div>
                </li>
            `).join('')}
        </ul>
        <hr>
        <h3>Total Amount: PKR ${sale.total.toFixed(2)}</h3>
        ${sale.isReturn ? '<p><i>This is a return transaction.</i></p>' : ''}
    `;

    const bill = await Bill.create({
        sale: sale._id,
        customerInfo: customerInfo || 'N/A',
        paymentMethod: paymentMethod || 'Cash',
        billData: billContent,
    });

    res.status(201).json(bill);
};

// @desc    Get all bills for a specific employee
// @route   GET /api/sales/employee/:id/bills
// @access  Private/Employee, Admin
const getEmployeeBills = async (req, res) => {
    const { id } = req.params; // This is the employee ID

    // Authorization: allow if admin or requesting own data
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
        res.status(401);
        throw new Error('Not authorized to view these bills');
    }

    // Find all sales made by this employee
    const sales = await Sale.find({ employee: id }).select('_id');

    const saleIds = sales.map(sale => sale._id);

    const bills = await Bill.find({ sale: { $in: saleIds } })
        .populate({
            path: 'sale',
            populate: {
                path: 'items.product',
                select: 'name price',
            },
        })
        .populate({
            path: 'sale',
            populate: {
                path: 'employee',
                select: 'name username',
            },
        });

    res.json(bills);
};


module.exports = {
    createSale,
    processReturn,
    getSalesAnalysis,
    getEmployeeSales,
    getDashboardSummary,
    generateMonthlySalesReport,
    generateBill,
    getEmployeeBills,
};
