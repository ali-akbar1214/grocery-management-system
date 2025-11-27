import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Package,
    PackagePlus,
    Edit2,
    Trash2,
    X,
    AlertCircle,
    Barcode,
    DollarSign,
    Hash,
    TrendingDown,
    TrendingUp,
    CheckCircle,
    AlertTriangle,
    Search
} from 'lucide-react';

const InventoryManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        barcode: '',
        quantity: 0,
        lowStockThreshold: 10,
        overstockThreshold: 100,
    });

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

    const handleModalOpen = (product = null) => {
        setCurrentProduct(product);
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                barcode: product.barcode,
                quantity: product.quantity,
                lowStockThreshold: product.lowStockThreshold,
                overstockThreshold: product.overstockThreshold,
            });
        } else {
            setFormData({
                name: '',
                price: 0,
                barcode: '',
                quantity: 0,
                lowStockThreshold: 10,
                overstockThreshold: 100,
            });
        }
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setCurrentProduct(null);
        setFormData({
            name: '',
            price: 0,
            barcode: '',
            quantity: 0,
            lowStockThreshold: 10,
            overstockThreshold: 100,
        });
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' || name === 'quantity' || name === 'lowStockThreshold' || name === 'overstockThreshold' ? Number(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (currentProduct) {
                await axios.put(`/api/products/${currentProduct._id}`, formData, config);
            } else {
                await axios.post('/api/products', formData, config);
            }
            fetchProducts();
            handleModalClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/products/${id}`, config);
                fetchProducts();
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete product');
            }
        }
    };

    const getStockStatus = (product) => {
        if (product.quantity === 0) return { text: 'Out of Stock', color: 'error' };
        if (product.quantity <= product.lowStockThreshold) return { text: 'Low Stock', color: 'warning' };
        if (product.quantity >= product.overstockThreshold) return { text: 'Overstock', color: 'info' };
        return { text: 'In Stock', color: 'success' };
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const lowStockCount = products.filter(p => p.quantity > 0 && p.quantity <= p.lowStockThreshold).length;
    const outOfStockCount = products.filter(p => p.quantity === 0).length;

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading inventory...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <span className="text-gradient">Inventory</span> Management
                </h1>
                <p className="page-description">
                    Manage your product catalog and stock levels
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{marginBottom: 'var(--spacing-2xl)'}}>
                <div className="stats-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'}}>
                    <div className="stat-card" style={{'--stat-color': 'var(--primary)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Total Products</div>
                                <div className="stat-card-value">{totalProducts}</div>
                                <div className="stat-card-label">Unique items</div>
                            </div>
                            <div className="stat-card-icon">
                                <Package size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="stat-card" style={{'--stat-color': 'var(--success)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Total Value</div>
                                <div className="stat-card-value">
                                    PKR {totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </div>
                                <div className="stat-card-label">Inventory worth</div>
                            </div>
                            <div className="stat-card-icon">
                                <Package size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="stat-card" style={{'--stat-color': 'var(--warning)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Low Stock</div>
                                <div className="stat-card-value">{lowStockCount}</div>
                                <div className="stat-card-label">Items need restock</div>
                            </div>
                            <div className="stat-card-icon">
                                <AlertTriangle size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="stat-card" style={{'--stat-color': 'var(--error)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Out of Stock</div>
                                <div className="stat-card-value">{outOfStockCount}</div>
                                <div className="stat-card-label">Items depleted</div>
                            </div>
                            <div className="stat-card-icon">
                                <AlertCircle size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="action-bar">
                <div className="action-bar-left">
                    <div className="search-box">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search products by name or barcode..."
                            className="form-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="action-bar-right">
                    <button
                        onClick={() => handleModalOpen()}
                        className="btn btn-primary"
                    >
                        <PackagePlus size={18} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="alert alert-error" style={{marginBottom: 'var(--spacing-xl)'}}>
                    <AlertCircle className="alert-icon" size={20} />
                    <div className="alert-content">
                        <p className="alert-message">{error}</p>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Product Catalog</h3>
                    <p className="card-subtitle">
                        {filteredProducts.length} of {totalProducts} products
                    </p>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <Package size={16} />
                                        Product
                                    </div>
                                </th>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <Barcode size={16} />
                                        Barcode
                                    </div>
                                </th>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <Package size={16} />
                                        Price
                                    </div>
                                </th>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <Hash size={16} />
                                        Quantity
                                    </div>
                                </th>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <TrendingDown size={16} />
                                        Low Threshold
                                    </div>
                                </th>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <TrendingUp size={16} />
                                        High Threshold
                                    </div>
                                </th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="8">
                                        <div className="empty-state">
                                            <Package className="empty-state-icon" size={60} />
                                            <h3 className="empty-state-title">No Products Found</h3>
                                            <p className="empty-state-description">
                                                {searchTerm ? 'Try a different search term' : 'Get started by adding your first product'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => {
                                    const status = getStockStatus(product);
                                    return (
                                        <tr key={product._id}>
                                            <td>
                                                <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                                    <div style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        borderRadius: 'var(--radius-sm)',
                                                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white'
                                                    }}>
                                                        <Package size={18} />
                                                    </div>
                                                    <span style={{fontWeight: 600, color: 'var(--text)'}}>{product.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge badge-primary" style={{fontSize: '0.8rem'}}>
                                                    {product.barcode}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{fontWeight: 600, color: 'var(--text)'}}>
                                                    PKR {product.price.toFixed(2)}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    color: product.quantity === 0 ? 'var(--error)' : 'var(--text)'
                                                }}>
                                                    {product.quantity}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{color: 'var(--text-secondary)'}}>
                                                    {product.lowStockThreshold}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{color: 'var(--text-secondary)'}}>
                                                    {product.overstockThreshold}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge badge-${status.color}`}>
                                                    {status.text}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btn-group">
                                                    <button
                                                        onClick={() => handleModalOpen(product)}
                                                        className="action-btn edit"
                                                        title="Edit product"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="action-btn delete"
                                                        title="Delete product"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal" onClick={(e) => e.stopPropagation()} style={{maxWidth: '600px'}}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                {currentProduct ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <button
                                onClick={handleModalClose}
                                className="modal-close"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="grid-2" style={{gap: 'var(--spacing-lg)'}}>
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            <Package size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            className="form-input"
                                            placeholder="Enter product name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="barcode" className="form-label">
                                            <Barcode size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                            Barcode
                                        </label>
                                        <input
                                            type="text"
                                            name="barcode"
                                            id="barcode"
                                            required
                                            className="form-input"
                                            placeholder="Enter barcode"
                                            value={formData.barcode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid-2" style={{gap: 'var(--spacing-lg)'}}>
                                    <div className="form-group">
                                        <label htmlFor="price" className="form-label">
                                            <Package size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                            Price (PKR)
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            required
                                            className="form-input"
                                            placeholder="Enter price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity" className="form-label">
                                            <Hash size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            id="quantity"
                                            required
                                            className="form-input"
                                            placeholder="Enter quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="grid-2" style={{gap: 'var(--spacing-lg)'}}>
                                    <div className="form-group">
                                        <label htmlFor="lowStockThreshold" className="form-label">
                                            <TrendingDown size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                            Low Stock Threshold
                                        </label>
                                        <input
                                            type="number"
                                            name="lowStockThreshold"
                                            id="lowStockThreshold"
                                            className="form-input"
                                            placeholder="Low stock alert level"
                                            value={formData.lowStockThreshold}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                        <p className="form-help">Alert when stock falls below this level</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="overstockThreshold" className="form-label">
                                            <TrendingUp size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                            Overstock Threshold
                                        </label>
                                        <input
                                            type="number"
                                            name="overstockThreshold"
                                            id="overstockThreshold"
                                            className="form-input"
                                            placeholder="Overstock alert level"
                                            value={formData.overstockThreshold}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                        <p className="form-help">Alert when stock exceeds this level</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    <CheckCircle size={18} />
                                    {currentProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryManagement;