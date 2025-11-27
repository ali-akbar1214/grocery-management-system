import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    DollarSign, 
    ShoppingBag, 
    Package, 
    TrendingUp, 
    AlertTriangle,
    AlertCircle,
    Info,
    ArrowUp,
    ArrowDown
} from 'lucide-react';

const DashboardSummary = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        fetchDashboardSummary();
    }, []);

    const fetchDashboardSummary = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/sales/summary', config);
            setSummary(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch dashboard summary');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <span className="text-gradient">Dashboard</span> Overview
                </h1>
                <p className="page-description">
                    Real-time insights into your business performance
                </p>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="alert alert-error">
                    <AlertCircle className="alert-icon" size={20} />
                    <div className="alert-content">
                        <p className="alert-message">{error}</p>
                    </div>
                </div>
            )}

            {summary && (
                <>
                    {/* Stats Grid */}
                    <div className="stats-grid">
                        {/* Total Revenue Card */}
                        <div className="stat-card" style={{'--stat-color': 'var(--success)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Total Revenue</div>
                                    <div className="stat-card-value">
                                        PKR {summary.totalSales.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </div>
                                    <div className="stat-card-label">All-time earnings</div>
                                </div>
                                <div className="stat-card-icon">
                                    <DollarSign size={24} />
                                </div>
                            </div>
                            <div className="stat-card-change positive">
                                <ArrowUp size={14} />
                                <span>Growing</span>
                            </div>
                        </div>

                        {/* Total Sales Count Card */}
                        <div className="stat-card" style={{'--stat-color': 'var(--primary)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Total Sales</div>
                                    <div className="stat-card-value">
                                        {summary.totalSales.totalSalesCount.toLocaleString()}
                                    </div>
                                    <div className="stat-card-label">Transactions completed</div>
                                </div>
                                <div className="stat-card-icon">
                                    <ShoppingBag size={24} />
                                </div>
                            </div>
                            <div className="stat-card-change positive">
                                <TrendingUp size={14} />
                                <span>Active</span>
                            </div>
                        </div>

                        {/* Total Products Card */}
                        <div className="stat-card" style={{'--stat-color': 'var(--info)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Total Products</div>
                                    <div className="stat-card-value">
                                        {summary.productSummary.totalProducts.toLocaleString()}
                                    </div>
                                    <div className="stat-card-label">Unique items in catalog</div>
                                </div>
                                <div className="stat-card-icon">
                                    <Package size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Total Quantity in Stock Card */}
                        <div className="stat-card" style={{'--stat-color': 'var(--secondary)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Stock Quantity</div>
                                    <div className="stat-card-value">
                                        {summary.productSummary.totalQuantity.toLocaleString()}
                                    </div>
                                    <div className="stat-card-label">Total units available</div>
                                </div>
                                <div className="stat-card-icon">
                                    <Package size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Low Stock Alert Card */}
                        <div className="stat-card" style={{'--stat-color': 'var(--warning)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Low Stock Items</div>
                                    <div className="stat-card-value">
                                        {summary.inventoryAlerts.lowStockCount}
                                    </div>
                                    <div className="stat-card-label">Need restocking</div>
                                </div>
                                <div className="stat-card-icon">
                                    <AlertTriangle size={24} />
                                </div>
                            </div>
                            {summary.inventoryAlerts.lowStockCount > 0 && (
                                <div className="stat-card-change negative">
                                    <AlertCircle size={14} />
                                    <span>Attention needed</span>
                                </div>
                            )}
                        </div>

                        {/* Out of Stock Alert Card */}
                        <div className="stat-card" style={{'--stat-color': 'var(--error)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Out of Stock</div>
                                    <div className="stat-card-value">
                                        {summary.inventoryAlerts.outOfStockCount}
                                    </div>
                                    <div className="stat-card-label">Products unavailable</div>
                                </div>
                                <div className="stat-card-icon">
                                    <AlertCircle size={24} />
                                </div>
                            </div>
                            {summary.inventoryAlerts.outOfStockCount > 0 && (
                                <div className="stat-card-change negative">
                                    <AlertCircle size={14} />
                                    <span>Urgent action required</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    {(summary.inventoryAlerts.lowStockCount > 0 || 
                      summary.inventoryAlerts.outOfStockCount > 0 || 
                      summary.inventoryAlerts.overstockCount > 0) && (
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Inventory Alerts Summary</h3>
                                <p className="card-subtitle">Items requiring immediate attention</p>
                            </div>
                            <div className="card-body">
                                <div className="grid-3">
                                    <div className="alert alert-warning">
                                        <AlertTriangle className="alert-icon" size={20} />
                                        <div className="alert-content">
                                            <div className="alert-title">Low Stock</div>
                                            <div className="alert-message">
                                                {summary.inventoryAlerts.lowStockCount} items need restocking
                                            </div>
                                        </div>
                                    </div>
                                    <div className="alert alert-error">
                                        <AlertCircle className="alert-icon" size={20} />
                                        <div className="alert-content">
                                            <div className="alert-title">Out of Stock</div>
                                            <div className="alert-message">
                                                {summary.inventoryAlerts.outOfStockCount} items completely depleted
                                            </div>
                                        </div>
                                    </div>
                                    <div className="alert alert-info">
                                        <Info className="alert-icon" size={20} />
                                        <div className="alert-content">
                                            <div className="alert-title">Overstock</div>
                                            <div className="alert-message">
                                                {summary.inventoryAlerts.overstockCount} items overstocked
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DashboardSummary;