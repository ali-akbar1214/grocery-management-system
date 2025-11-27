import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    AlertTriangle,
    AlertCircle,
    Info,
    ChevronDown,
    ChevronUp,
    Package,
    Barcode,
    TrendingDown,
    TrendingUp,
    Activity
} from 'lucide-react';

const InventoryAlerts = () => {
    const [alerts, setAlerts] = useState({ lowStock: [], outOfStock: [], overstock: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openSections, setOpenSections] = useState({ lowStock: true, outOfStock: true, overstock: true });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/products/alerts', config);
            setAlerts(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch inventory alerts');
            setLoading(false);
        }
    };

    const handleToggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading inventory alerts...</p>
            </div>
        );
    }

    const totalAlerts = alerts.outOfStock.length + alerts.lowStock.length + alerts.overstock.length;

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <span className="text-gradient">Inventory</span> Alerts
                </h1>
                <p className="page-description">
                    Monitor stock levels and manage inventory alerts
                </p>
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

            {/* Summary Stats */}
            <div style={{marginBottom: 'var(--spacing-2xl)'}}>
                <div className="stats-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'}}>
                    <div className="stat-card" style={{'--stat-color': 'var(--error)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Out of Stock</div>
                                <div className="stat-card-value">{alerts.outOfStock.length}</div>
                                <div className="stat-card-label">Items depleted</div>
                            </div>
                            <div className="stat-card-icon">
                                <AlertCircle size={24} />
                            </div>
                        </div>
                        {alerts.outOfStock.length > 0 && (
                            <div className="stat-card-change negative">
                                <AlertCircle size={14} />
                                <span>Urgent action required</span>
                            </div>
                        )}
                    </div>

                    <div className="stat-card" style={{'--stat-color': 'var(--warning)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Low Stock</div>
                                <div className="stat-card-value">{alerts.lowStock.length}</div>
                                <div className="stat-card-label">Need restocking</div>
                            </div>
                            <div className="stat-card-icon">
                                <AlertTriangle size={24} />
                            </div>
                        </div>
                        {alerts.lowStock.length > 0 && (
                            <div className="stat-card-change negative">
                                <TrendingDown size={14} />
                                <span>Attention needed</span>
                            </div>
                        )}
                    </div>

                    <div className="stat-card" style={{'--stat-color': 'var(--info)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Overstock</div>
                                <div className="stat-card-value">{alerts.overstock.length}</div>
                                <div className="stat-card-label">Excess inventory</div>
                            </div>
                            <div className="stat-card-icon">
                                <Info size={24} />
                            </div>
                        </div>
                        {alerts.overstock.length > 0 && (
                            <div className="stat-card-change positive">
                                <TrendingUp size={14} />
                                <span>Consider promotion</span>
                            </div>
                        )}
                    </div>

                    <div className="stat-card" style={{'--stat-color': 'var(--primary)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Total Alerts</div>
                                <div className="stat-card-value">{totalAlerts}</div>
                                <div className="stat-card-label">Active notifications</div>
                            </div>
                            <div className="stat-card-icon">
                                <Activity size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Out of Stock Section */}
            <div className="card" style={{marginBottom: 'var(--spacing-xl)'}}>
                <button
                    onClick={() => handleToggleSection('outOfStock')}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 'var(--spacing-xl)',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: openSections.outOfStock ? '1px solid rgba(239, 68, 68, 0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        color: 'var(--text)'
                    }}
                    className="hover-lift"
                >
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)'}}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(239, 68, 68, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <AlertCircle size={24} style={{color: 'var(--error)'}} />
                        </div>
                        <div style={{textAlign: 'left'}}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'var(--text)',
                                marginBottom: '0.25rem'
                            }}>
                                Out of Stock
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                fontWeight: 500
                            }}>
                                {alerts.outOfStock.length} items require immediate restocking
                            </p>
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                        <span className="badge badge-error">
                            {alerts.outOfStock.length}
                        </span>
                        {openSections.outOfStock ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </button>
                {openSections.outOfStock && (
                    <div style={{padding: 'var(--spacing-xl)'}}>
                        {alerts.outOfStock.length === 0 ? (
                            <div className="alert alert-success">
                                <AlertCircle className="alert-icon" size={20} />
                                <div className="alert-content">
                                    <p className="alert-message">Great! No products are out of stock.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="product-list">
                                {alerts.outOfStock.map(product => (
                                    <div key={product._id} className="product-item">
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)'}}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: 'var(--radius-sm)',
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Package size={20} style={{color: 'var(--error)'}} />
                                            </div>
                                            <div className="product-info">
                                                <div className="product-name">{product.name}</div>
                                                <div className="product-details">
                                                    <Barcode size={14} style={{display: 'inline', marginRight: '0.25rem'}} />
                                                    {product.barcode}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="badge badge-error">
                                            Out of Stock
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Low Stock Section */}
            <div className="card" style={{marginBottom: 'var(--spacing-xl)'}}>
                <button
                    onClick={() => handleToggleSection('lowStock')}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 'var(--spacing-xl)',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: openSections.lowStock ? '1px solid rgba(245, 158, 11, 0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        color: 'var(--text)'
                    }}
                    className="hover-lift"
                >
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)'}}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(245, 158, 11, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <AlertTriangle size={24} style={{color: 'var(--warning)'}} />
                        </div>
                        <div style={{textAlign: 'left'}}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'var(--text)',
                                marginBottom: '0.25rem'
                            }}>
                                Low Stock
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                fontWeight: 500
                            }}>
                                {alerts.lowStock.length} items below threshold
                            </p>
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                        <span className="badge badge-warning">
                            {alerts.lowStock.length}
                        </span>
                        {openSections.lowStock ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </button>
                {openSections.lowStock && (
                    <div style={{padding: 'var(--spacing-xl)'}}>
                        {alerts.lowStock.length === 0 ? (
                            <div className="alert alert-success">
                                <AlertCircle className="alert-icon" size={20} />
                                <div className="alert-content">
                                    <p className="alert-message">All products are well stocked!</p>
                                </div>
                            </div>
                        ) : (
                            <div className="product-list">
                                {alerts.lowStock.map(product => (
                                    <div key={product._id} className="product-item">
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)'}}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: 'var(--radius-sm)',
                                                background: 'rgba(245, 158, 11, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Package size={20} style={{color: 'var(--warning)'}} />
                                            </div>
                                            <div className="product-info">
                                                <div className="product-name">{product.name}</div>
                                                <div className="product-details">
                                                    Current: {product.quantity} | Threshold: {product.lowStockThreshold}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning">
                                            Low Stock
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Overstock Section */}
            <div className="card">
                <button
                    onClick={() => handleToggleSection('overstock')}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 'var(--spacing-xl)',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: openSections.overstock ? '1px solid rgba(6, 182, 212, 0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        color: 'var(--text)'
                    }}
                    className="hover-lift"
                >
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)'}}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(6, 182, 212, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Info size={24} style={{color: 'var(--info)'}} />
                        </div>
                        <div style={{textAlign: 'left'}}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'var(--text)',
                                marginBottom: '0.25rem'
                            }}>
                                Overstock
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                fontWeight: 500
                            }}>
                                {alerts.overstock.length} items above threshold
                            </p>
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                        <span className="badge badge-info">
                            {alerts.overstock.length}
                        </span>
                        {openSections.overstock ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </button>
                {openSections.overstock && (
                    <div style={{padding: 'var(--spacing-xl)'}}>
                        {alerts.overstock.length === 0 ? (
                            <div className="alert alert-success">
                                <AlertCircle className="alert-icon" size={20} />
                                <div className="alert-content">
                                    <p className="alert-message">No products are overstocked.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="product-list">
                                {alerts.overstock.map(product => (
                                    <div key={product._id} className="product-item">
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)'}}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: 'var(--radius-sm)',
                                                background: 'rgba(6, 182, 212, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Package size={20} style={{color: 'var(--info)'}} />
                                            </div>
                                            <div className="product-info">
                                                <div className="product-name">{product.name}</div>
                                                <div className="product-details">
                                                    Current: {product.quantity} | Threshold: {product.overstockThreshold}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="badge badge-info">
                                            Overstock
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryAlerts;