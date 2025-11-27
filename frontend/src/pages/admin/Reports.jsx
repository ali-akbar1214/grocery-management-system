import React, { useState } from 'react';
import axios from 'axios';
import { 
    FileText,
    Calendar,
    TrendingUp,
    Package,
    BarChart3,
    AlertCircle,
    CheckCircle,
    Download,
    Award,
    ShoppingCart,
    Activity,
    DollarSign
} from 'lucide-react';

const Reports = () => {
    const [salesReport, setSalesReport] = useState(null);
    const [inventoryReport, setInventoryReport] = useState(null);
    const [loadingSales, setLoadingSales] = useState(false);
    const [loadingInventory, setLoadingInventory] = useState(false);
    const [errorSales, setErrorSales] = useState('');
    const [errorInventory, setErrorInventory] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const handleGenerateSalesReport = async () => {
        if (!month || !year) {
            setErrorSales('Please select both month and year for sales report.');
            setSalesReport(null);
            return;
        }
        try {
            setLoadingSales(true);
            setErrorSales('');
            const { data } = await axios.get(`/api/sales/report/monthly?month=${month}&year=${year}`, config);
            setSalesReport(data);
            setLoadingSales(false);
        } catch (err) {
            setErrorSales(err.response?.data?.message || 'Failed to generate sales report');
            setLoadingSales(false);
        }
    };

    const handleGenerateInventoryReport = async () => {
        try {
            setLoadingInventory(true);
            setErrorInventory('');
            const { data } = await axios.get('/api/products/report', config);
            setInventoryReport(data);
            setLoadingInventory(false);
        } catch (err) {
            setErrorInventory(err.response?.data?.message || 'Failed to generate inventory report');
            setLoadingInventory(false);
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <span className="text-gradient">Business</span> Reports
                </h1>
                <p className="page-description">
                    Generate comprehensive sales and inventory analytics
                </p>
            </div>

            {/* Sales Report Section */}
            <div className="card" style={{marginBottom: 'var(--spacing-2xl)'}}>
                <div className="card-header">
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                        <BarChart3 size={24} style={{color: 'var(--primary)'}} />
                        <div>
                            <h3 className="card-title">Monthly Sales Report</h3>
                            <p className="card-subtitle">Analyze sales performance by month</p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid-3" style={{gap: 'var(--spacing-lg)', alignItems: 'end'}}>
                        <div className="form-group" style={{marginBottom: 0}}>
                            <label htmlFor="sales-month-select" className="form-label">
                                <Calendar size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                Select Month
                            </label>
                            <select
                                id="sales-month-select"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="form-input form-select"
                            >
                                <option value="">Choose month...</option>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                    <option key={m} value={m}>
                                        {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group" style={{marginBottom: 0}}>
                            <label htmlFor="sales-year-select" className="form-label">
                                <Calendar size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                Select Year
                            </label>
                            <select
                                id="sales-year-select"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="form-input form-select"
                            >
                                <option value="">Choose year...</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleGenerateSalesReport}
                            disabled={loadingSales}
                            className="btn btn-primary"
                            style={{marginBottom: 0}}
                        >
                            <Download size={18} />
                            {loadingSales ? 'Generating...' : 'Generate Report'}
                        </button>
                    </div>

                    {errorSales && (
                        <div className="alert alert-error" style={{marginTop: 'var(--spacing-lg)'}}>
                            <AlertCircle className="alert-icon" size={20} />
                            <div className="alert-content">
                                <p className="alert-message">{errorSales}</p>
                            </div>
                        </div>
                    )}

                    {salesReport && (
                        <div style={{marginTop: 'var(--spacing-xl)'}}>
                            <div className="alert alert-success" style={{marginBottom: 'var(--spacing-lg)'}}>
                                <CheckCircle className="alert-icon" size={20} />
                                <div className="alert-content">
                                    <div className="alert-title">Report Generated Successfully</div>
                                    <div className="alert-message">Sales data for {salesReport.month}</div>
                                </div>
                            </div>

                            {/* Sales Stats */}
                            <div className="stats-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: 'var(--spacing-xl)'}}>
                                <div className="stat-card" style={{'--stat-color': 'var(--success)'}}>
                                    <div className="stat-card-header">
                                        <div>
                                            <div className="stat-card-title">Total Revenue</div>
                                            <div className="stat-card-value" style={{fontSize: '1.5rem'}}>
                                                PKR {salesReport.summary.totalRevenue.toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="stat-card-icon" style={{width: '40px', height: '40px'}}>
                                            <TrendingUp size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="stat-card" style={{'--stat-color': 'var(--primary)'}}>
                                    <div className="stat-card-header">
                                        <div>
                                            <div className="stat-card-title">Total Sales</div>
                                            <div className="stat-card-value" style={{fontSize: '1.5rem'}}>
                                                {salesReport.summary.totalSalesCount}
                                            </div>
                                        </div>
                                        <div className="stat-card-icon" style={{width: '40px', height: '40px'}}>
                                            <ShoppingCart size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="stat-card" style={{'--stat-color': 'var(--info)'}}>
                                    <div className="stat-card-header">
                                        <div>
                                            <div className="stat-card-title">Average Sale</div>
                                            <div className="stat-card-value" style={{fontSize: '1.5rem'}}>
                                                PKR {salesReport.summary.averageSale.toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="stat-card-icon" style={{width: '40px', height: '40px'}}>
                                            <Activity size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Selling Products */}
                            <div style={{
                                background: 'rgba(99, 102, 241, 0.05)',
                                border: '1px solid rgba(99, 102, 241, 0.2)',
                                borderRadius: 'var(--radius-md)',
                                padding: 'var(--spacing-xl)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    marginBottom: 'var(--spacing-lg)'
                                }}>
                                    <Award size={24} style={{color: 'var(--warning)'}} />
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        color: 'var(--text)'
                                    }}>
                                        Top Selling Products
                                    </h4>
                                </div>
                                {salesReport.topSellingProducts.length > 0 ? (
                                    <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)'}}>
                                        {salesReport.topSellingProducts.map((p, index) => (
                                            <div key={index} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: 'var(--spacing-md)',
                                                background: 'rgba(30, 41, 59, 0.4)',
                                                border: '1px solid rgba(99, 102, 241, 0.1)',
                                                borderRadius: 'var(--radius-sm)',
                                                transition: 'all var(--transition-fast)'
                                            }}
                                            className="hover-lift">
                                                <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)'}}>
                                                    <div style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: 'var(--radius-sm)',
                                                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white',
                                                        fontWeight: 700,
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        #{index + 1}
                                                    </div>
                                                    <span style={{fontWeight: 600, color: 'var(--text)'}}>
                                                        {p.productName}
                                                    </span>
                                                </div>
                                                <span className="badge badge-success">
                                                    {p.totalQuantitySold} units sold
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="alert alert-info">
                                        <AlertCircle className="alert-icon" size={20} />
                                        <div className="alert-content">
                                            <p className="alert-message">No sales data available for this period</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Inventory Report Section */}
            <div className="card">
                <div className="card-header">
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                        <Package size={24} style={{color: 'var(--info)'}} />
                        <div>
                            <h3 className="card-title">Inventory Report</h3>
                            <p className="card-subtitle">Current stock status and alerts</p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <button
                        onClick={handleGenerateInventoryReport}
                        disabled={loadingInventory}
                        className="btn btn-primary"
                    >
                        <Download size={18} />
                        {loadingInventory ? 'Generating...' : 'Generate Inventory Report'}
                    </button>

                    {errorInventory && (
                        <div className="alert alert-error" style={{marginTop: 'var(--spacing-lg)'}}>
                            <AlertCircle className="alert-icon" size={20} />
                            <div className="alert-content">
                                <p className="alert-message">{errorInventory}</p>
                            </div>
                        </div>
                    )}

                    {inventoryReport && (
                        <div style={{marginTop: 'var(--spacing-xl)'}}>
                            <div className="alert alert-success" style={{marginBottom: 'var(--spacing-lg)'}}>
                                <CheckCircle className="alert-icon" size={20} />
                                <div className="alert-content">
                                    <div className="alert-title">Report Generated Successfully</div>
                                    <div className="alert-message">Current inventory snapshot</div>
                                </div>
                            </div>

                            {/* Inventory Stats */}
                            <div className="stats-grid" style={{marginBottom: 'var(--spacing-xl)'}}>
                                <div className="stat-card" style={{'--stat-color': 'var(--primary)'}}>
                                    <div className="stat-card-header">
                                        <div>
                                            <div className="stat-card-title">Total Products</div>
                                            <div className="stat-card-value">
                                                {inventoryReport.totalProducts}
                                            </div>
                                            <div className="stat-card-label">Unique items</div>
                                        </div>
                                        <div className="stat-card-icon">
                                            <Package size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="stat-card" style={{'--stat-color': 'var(--info)'}}>
                                    <div className="stat-card-header">
                                        <div>
                                            <div className="stat-card-title">Total Quantity</div>
                                            <div className="stat-card-value">
                                                {inventoryReport.totalQuantity}
                                            </div>
                                            <div className="stat-card-label">Total units in stock</div>
                                        </div>
                                        <div className="stat-card-icon">
                                            <Activity size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="stat-card" style={{'--stat-color': 'var(--warning)'}}>
                                    <div className="stat-card-header">
                                        <div>
                                            <div className="stat-card-title">Low Stock Items</div>
                                            <div className="stat-card-value">
                                                {inventoryReport.lowStock.length}
                                            </div>
                                            <div className="stat-card-label">Need attention</div>
                                        </div>
                                        <div className="stat-card-icon">
                                            <AlertCircle size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="stat-card" style={{'--stat-color': 'var(--error)'}}>
                                    <div className="stat-card-header">
                                        <div>
                                            <div className="stat-card-title">Out of Stock</div>
                                            <div className="stat-card-value">
                                                {inventoryReport.outOfStock.length}
                                            </div>
                                            <div className="stat-card-label">Urgent action</div>
                                        </div>
                                        <div className="stat-card-icon">
                                            <AlertCircle size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="stat-card" style={{'--stat-color': 'var(--info)'}}>
                                    <div className="stat-card-header">
                                        <div>
                                            <div className="stat-card-title">Overstock Items</div>
                                            <div className="stat-card-value">
                                                {inventoryReport.overstock.length}
                                            </div>
                                            <div className="stat-card-label">Excess inventory</div>
                                        </div>
                                        <div className="stat-card-icon">
                                            <TrendingUp size={24} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;