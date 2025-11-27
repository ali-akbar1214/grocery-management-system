const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const { name, price, barcode, quantity, lowStockThreshold, overstockThreshold } = req.body;

    const productExists = await Product.findOne({ barcode });

    if (productExists) {
        res.status(400);
        throw new Error('Product with this barcode already exists');
    }

    const product = await Product.create({
        name,
        price,
        barcode,
        quantity,
        lowStockThreshold,
        overstockThreshold,
    });

    if (product) {
        res.status(201).json(product);
    } else {
        res.status(400);
        throw new Error('Invalid product data');
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Private/Admin, Employee
const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Private/Admin, Employee
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.barcode = req.body.barcode || product.barcode;
        product.quantity = req.body.quantity !== undefined ? req.body.quantity : product.quantity;
        product.lowStockThreshold = req.body.lowStockThreshold !== undefined ? req.body.lowStockThreshold : product.lowStockThreshold;
        product.overstockThreshold = req.body.overstockThreshold !== undefined ? req.body.overstockThreshold : product.overstockThreshold;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

// @desc    Get inventory alerts (low stock, out of stock, overstock)
// @route   GET /api/products/alerts
// @access  Private/Admin
const getInventoryAlerts = async (req, res) => {
    // Use $expr to compare fields within the same document (quantity vs thresholds)
    const lowStock = await Product.find({
        $expr: {
            $and: [
                { $lte: ['$quantity', '$lowStockThreshold'] },
                { $gt: ['$quantity', 0] },
            ],
        },
    });

    const outOfStock = await Product.find({ quantity: 0 });

    const overstock = await Product.find({
        $expr: { $gte: ['$quantity', '$overstockThreshold'] },
    });

    res.json({
        lowStock,
        outOfStock,
        overstock,
    });
};

// @desc    Generate inventory report
// @route   GET /api/products/report
// @access  Private/Admin
const generateInventoryReport = async (req, res) => {
    const totalProducts = await Product.countDocuments();
    const totalQuantity = await Product.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: '$quantity' },
            },
        },
    ]);

    const lowStock = await Product.find({
        $expr: {
            $and: [
                { $lte: ['$quantity', '$lowStockThreshold'] },
                { $gt: ['$quantity', 0] },
            ],
        },
    });
    const outOfStock = await Product.find({ quantity: 0 });
    const overstock = await Product.find({
        $expr: { $gte: ['$quantity', '$overstockThreshold'] },
    });

    res.json({
        totalProducts,
        totalQuantity: totalQuantity[0] ? totalQuantity[0].total : 0,
        lowStock,
        outOfStock,
        overstock,
    });
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getInventoryAlerts,
    generateInventoryReport,
};
