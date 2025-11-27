import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Minus, Trash2, Search, ShoppingCart, CheckCircle, AlertCircle, User, CreditCard, Wallet, Printer, X, Receipt } from 'lucide-react';

const ProcessSale = () => {
    const [products, setProducts] = useState([]); // All available products
    const [searchTerm, setSearchTerm] = useState('');
    const [billItems, setBillItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [saleId, setSaleId] = useState(null);
    const [billModalOpen, setBillModalOpen] = useState(false);
    const [generatedBillHtml, setGeneratedBillHtml] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [customerName, setCustomerName] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/products', config);
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch products');
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.barcode.includes(searchTerm)
    );

    const handleAddItemToBill = (productToAdd) => {
        const existingItem = billItems.find(item => item.product._id === productToAdd._id);
        if (existingItem) {
            setBillItems(
                billItems.map(item =>
                    item.product._id === productToAdd._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setBillItems([...billItems, { product: productToAdd, quantity: 1 }]);
        }
        setSearchTerm(''); // Clear search after adding
    };

    const handleUpdateQuantity = (productId, change) => {
        setBillItems(
            billItems
                .map(item =>
                    item.product._id === productId
                        ? { ...item, quantity: item.quantity + change }
                        : item
                )
                .filter(item => item.quantity > 0) // Remove if quantity becomes 0 or less
        );
    };

    const handleRemoveItem = (productId) => {
        setBillItems(billItems.filter(item => item.product._id !== productId));
    };

    const calculateTotal = () => {
        return billItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    };

    const handleProcessSale = async () => {
        setError('');
        setSuccess('');
        if (billItems.length === 0) {
            setError('Bill is empty. Please add items.');
            return;
        }

        try {
            setLoading(true);
            const saleData = {
                items: billItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                })),
                customerInfo: customerName,
                paymentMethod,
            };
            const { data } = await axios.post('/api/sales', saleData, config);

            // Server returns { sale, bill } when bill auto-generated
            const returnedSale = data.sale || data;
            const returnedBill = data.bill || null;

            setSuccess('Sale processed successfully!');
            setSaleId(returnedSale?.saleId || returnedSale?._id || null);
            if (returnedBill?.billData) {
                setGeneratedBillHtml(returnedBill.billData);
                setBillModalOpen(true);
            }

            setBillItems([]); // Clear bill
            setCustomerName(''); // Clear customer name
            fetchProducts(); // Refresh product quantities
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to process sale');
            setLoading(false);
        }
    };

    const handleCloseBillModal = () => {
        setBillModalOpen(false);
        setGeneratedBillHtml('');
    };

    const handlePrintBill = () => {
        const printWindow = window.open('', '_blank');
        const cleanBillHtml = generatedBillHtml.replace(/<button[^>]*>.*?<\/button>/gi, '');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Bill - Sale ${saleId}</title>
                    <style>
                        body { 
                            font-family: 'Courier New', monospace; 
                            padding: 40px;
                            max-width: 800px;
                            margin: 0 auto;
                        }
                        @media print {
                            body { padding: 20px; }
                        }
                    </style>
                </head>
                <body>
                    ${cleanBillHtml}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            }
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <ShoppingCart size={32} className="inline mr-3" />
                    <span className="text-gradient">Process</span> Sale
                </h1>
                <p className="page-description">
                    Point of Sale - Create and manage transactions
                </p>
            </div>

            {/* Alerts */}
            {error && (
                <div className="alert alert-error">
                    <AlertCircle className="alert-icon" size={20} />
                    <div className="alert-content">
                        <p className="alert-message">{error}</p>
                    </div>
                </div>
            )}
            {success && (
                <div className="alert alert-success">
                    <CheckCircle className="alert-icon" size={20} />
                    <div className="alert-content">
                        <p className="alert-message">{success}</p>
                    </div>
                </div>
            )}

            <div className="grid-2">
                {/* Product Search and Selection */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Find Products</h3>
                        <p className="card-subtitle">Search and add items to cart</p>
                    </div>
                    <div className="card-body">
                        <div className="search-box">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or barcode..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="form-input"
                            />
                        </div>
                        {loading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p className="loading-text">Loading products...</p>
                            </div>
                        ) : (
                            <div className="product-list">
                                {filteredProducts.length === 0 && searchTerm ? (
                                    <div className="empty-state">
                                        <Search className="empty-state-icon" size={60} />
                                        <h3 className="empty-state-title">No products found</h3>
                                        <p className="empty-state-description">Try a different search term</p>
                                    </div>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <div key={product._id} className="product-item">
                                            <div className="product-info">
                                                <div className="product-name">{product.name}</div>
                                                <div className="product-details">
                                                    PKR {product.price.toFixed(2)} • Stock: {product.quantity} • {product.barcode}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleAddItemToBill(product)}
                                                className="btn btn-sm"
                                                disabled={product.quantity === 0}
                                            >
                                                <Plus size={16} />
                                                Add
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bill Details */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Current Bill</h3>
                        <p className="card-subtitle">{billItems.length} item{billItems.length !== 1 ? 's' : ''} in cart</p>
                    </div>
                    <div className="card-body">
                        {billItems.length === 0 ? (
                            <div className="empty-state">
                                <ShoppingCart className="empty-state-icon" size={60} />
                                <h3 className="empty-state-title">Cart is empty</h3>
                                <p className="empty-state-description">Add products to start a new sale</p>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th style={{textAlign: 'center'}}>Quantity</th>
                                            <th style={{textAlign: 'right'}}>Price</th>
                                            <th style={{textAlign: 'right'}}>Total</th>
                                            <th style={{textAlign: 'center'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billItems.map((item) => (
                                            <tr key={item.product._id}>
                                                <td>{item.product.name}</td>
                                                <td style={{textAlign: 'center'}}>
                                                    <div className="qty-controls">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.product._id, -1)}
                                                            disabled={item.quantity <= 1}
                                                            className="qty-btn"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="qty-value">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.product._id, 1)}
                                                            className="qty-btn"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: 'right'}}>PKR {item.product.price.toFixed(2)}</td>
                                                <td style={{textAlign: 'right'}}>
                                                    <strong>PKR {(item.product.price * item.quantity).toFixed(2)}</strong>
                                                </td>
                                                <td style={{textAlign: 'center'}}>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.product._id)}
                                                        className="action-btn delete"
                                                        title="Remove item"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    {billItems.length > 0 && (
                        <div className="card-footer" style={{flexDirection: 'column', alignItems: 'stretch'}}>
                            <div className="bill-total">
                                <span className="bill-total-label">Total Amount</span>
                                <span className="bill-total-value">PKR {calculateTotal().toFixed(2)}</span>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">
                                    <User size={16} className="inline mr-2" />
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Enter customer name (optional)"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <CreditCard size={16} className="inline mr-2" />
                                    Payment Method
                                </label>
                                <div className="radio-group">
                                    <label className="radio-option">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="Cash" 
                                            checked={paymentMethod==='Cash'} 
                                            onChange={() => setPaymentMethod('Cash')} 
                                        />
                                        💵 Cash
                                    </label>
                                    <label className="radio-option">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="Card" 
                                            checked={paymentMethod==='Card'} 
                                            onChange={() => setPaymentMethod('Card')} 
                                        />
                                        💳 Card
                                    </label>
                                    <label className="radio-option">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="Digital Wallet" 
                                            checked={paymentMethod==='Digital Wallet'} 
                                            onChange={() => setPaymentMethod('Digital Wallet')} 
                                        />
                                        📱 Wallet
                                    </label>
                                </div>
                            </div>

                            {saleId && (
                                <div className="badge badge-success" style={{width: 'fit-content'}}>
                                    Sale ID: {saleId}
                                </div>
                            )}

                            <button
                                onClick={handleProcessSale}
                                disabled={loading}
                                className="btn btn-lg w-full"
                            >
                                {loading ? (
                                    <div className="loading-dots">
                                        <div className="loading-dot"></div>
                                        <div className="loading-dot"></div>
                                        <div className="loading-dot"></div>
                                    </div>
                                ) : (
                                    <>
                                        <CheckCircle size={20} />
                                        Complete Sale
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* SEXY AF BILL MODAL */}
            {billModalOpen && (
                <div className="modal-overlay" onClick={handleCloseBillModal}>
                    <div 
                        className="modal" 
                        onClick={(e) => e.stopPropagation()} 
                        style={{
                            maxWidth: '900px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: '2px',
                            borderRadius: '20px'
                        }}
                    >
                        <div style={{
                            background: 'white',
                            borderRadius: '18px',
                            overflow: 'hidden'
                        }}>
                            {/* Gradient Header */}
                            <div style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                padding: '2rem',
                                color: 'white'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                        <div style={{
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            padding: '0.75rem',
                                            borderRadius: '12px',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            <Receipt size={32} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.75rem',
                                                fontWeight: 'bold',
                                                margin: 0,
                                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                Sale Complete! 🎉
                                            </h3>
                                            <p style={{
                                                margin: '0.25rem 0 0 0',
                                                opacity: 0.9,
                                                fontSize: '0.95rem'
                                            }}>
                                                Transaction #{saleId || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCloseBillModal}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            border: 'none',
                                            color: 'white',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Customer & Payment Info */}
                                <div style={{
                                    marginTop: '1.5rem',
                                    display: 'grid',
                                    gridTemplateColumns: customerName ? '1fr 1fr' : '1fr',
                                    gap: '1rem'
                                }}>
                                    {customerName && (
                                        <div style={{
                                            padding: '1rem',
                                            background: 'rgba(255, 255, 255, 0.15)',
                                            borderRadius: '10px',
                                            backdropFilter: 'blur(10px)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}>
                                            <User size={20} />
                                            <div>
                                                <div style={{fontSize: '0.8rem', opacity: 0.8}}>Customer</div>
                                                <div style={{fontWeight: 600, fontSize: '1.1rem'}}>{customerName}</div>
                                            </div>
                                        </div>
                                    )}
                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        borderRadius: '10px',
                                        backdropFilter: 'blur(10px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                        <CreditCard size={20} />
                                        <div>
                                            <div style={{fontSize: '0.8rem', opacity: 0.8}}>Payment</div>
                                            <div style={{fontWeight: 600, fontSize: '1.1rem'}}>{paymentMethod}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bill Content - Beautiful Receipt Paper */}
                            <div style={{padding: '2rem'}}>
                                <div style={{
                                    background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '2.5rem',
                                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                                    position: 'relative',
                                    maxHeight: '60vh',
                                    overflowY: 'auto',
                                    fontFamily: "'Courier New', monospace"
                                }}>
                                    {/* Decorative Receipt Holes */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '0',
                                        right: '0',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        padding: '0 2rem'
                                    }}>
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} style={{
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                background: '#e2e8f0',
                                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                                            }} />
                                        ))}
                                    </div>

                                    {/* Bill Content */}
                                    <div 
                                        dangerouslySetInnerHTML={{ 
                                            __html: generatedBillHtml.replace(/<button[^>]*>.*?<\/button>/gi, '')
                                        }}
                                        style={{
                                            marginTop: '2rem',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.8',
                                            color: '#1e293b'
                                        }}
                                    />

                                    {/* Thank You Message */}
                                    <div style={{
                                        marginTop: '2rem',
                                        paddingTop: '1.5rem',
                                        borderTop: '2px dashed #cbd5e1',
                                        textAlign: 'center',
                                        color: '#64748b',
                                        fontStyle: 'italic'
                                    }}>
                                        Thank you for your business! 🙏
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{
                                padding: '1.5rem 2rem 2rem 2rem',
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'flex-end',
                                borderTop: '1px solid #e2e8f0'
                            }}>
                                <button
                                    onClick={handlePrintBill}
                                    className="btn btn-primary"
                                >
                                    <Printer size={18} />
                                    Print Receipt
                                </button>
                                <button
                                    onClick={handleCloseBillModal}
                                    className="btn btn-ghost"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProcessSale