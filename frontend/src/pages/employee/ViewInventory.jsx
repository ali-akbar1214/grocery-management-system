import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Search, AlertCircle, TrendingUp, Wallet, Barcode } from 'lucide-react';

const ViewInventory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const calculateStats = () => {
        const totalProducts = products.length;
        const totalValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
        const totalStock = products.reduce((acc, p) => acc + p.quantity, 0);
        const lowStock = products.filter(p => p.quantity < 10).length;
        
        return { totalProducts, totalValue, totalStock, lowStock };
    };

    const stats = calculateStats();

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <Package size={32} className="inline mr-3" />
                    <span className="text-gradient">Inventory</span> Overview
                </h1>
                <p className="page-description">
                    Manage and monitor your product stock levels
                </p>
            </div>

            {/* Alert */}
            {error && (
                <div className="alert alert-error">
                    <AlertCircle className="alert-icon" size={20} />
                    <div className="alert-content">
                        <p className="alert-message">{error}</p>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon bg-blue-100">
                        <Package size={24} className="text-blue-600" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Products</p>
                        <p className="stat-value">{stats.totalProducts}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-green-100">
                        <Wallet size={24} className="text-green-600" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Inventory Value</p>
                        <p className="stat-value">PKR {stats.totalValue.toFixed(2)}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-purple-100">
                        <TrendingUp size={24} className="text-purple-600" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Stock Units</p>
                        <p className="stat-value">{stats.totalStock}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-orange-100">
                        <AlertCircle size={24} className="text-orange-600" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Low Stock Items</p>
                        <p className="stat-value">{stats.lowStock}</p>
                    </div>
                </div>
            </div>

            {/* Product List Card */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Product Catalog</h3>
                    <p className="card-subtitle">Search and view all inventory items</p>
                </div>
                <div className="card-body">
                    <div className="search-box">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by product name or barcode..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-input"
                        />
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p className="loading-text">Loading inventory...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="empty-state">
                            <Search className="empty-state-icon" size={60} />
                            <h3 className="empty-state-title">No products found</h3>
                            <p className="empty-state-description">
                                {searchTerm ? 'Try a different search term' : 'No products in inventory yet'}
                            </p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Barcode</th>
                                        <th style={{textAlign: 'right'}}>Price</th>
                                        <th style={{textAlign: 'center'}}>Stock</th>
                                        <th style={{textAlign: 'center'}}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td>
                                                <div className="flex items-center">
                                                    <Package size={16} className="mr-2 text-gray-400" />
                                                    <span className="font-medium">{product.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center text-gray-600">
                                                    <Barcode size={14} className="mr-1" />
                                                    {product.barcode}
                                                </div>
                                            </td>
                                            <td style={{textAlign: 'right'}}>
                                                <span className="font-semibold">PKR {product.price.toFixed(2)}</span>
                                            </td>
                                            <td style={{textAlign: 'center'}}>
                                                <span className={`badge ${product.quantity < 10 ? 'badge-warning' : 'badge-info'}`}>
                                                    {product.quantity} units
                                                </span>
                                            </td>
                                            <td style={{textAlign: 'center'}}>
                                                {product.quantity === 0 ? (
                                                    <span className="badge badge-error">Out of Stock</span>
                                                ) : product.quantity < 10 ? (
                                                    <span className="badge badge-warning">Low Stock</span>
                                                ) : (
                                                    <span className="badge badge-success">In Stock</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewInventory;