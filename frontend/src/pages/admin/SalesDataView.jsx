import React, { useState } from 'react';
import axios from 'axios';
import { 
    BarChart3,
    Calendar,
    TrendingUp,
    Download,
    AlertCircle,
    Award,
    Package,
    Activity,
    Filter,
    CheckSquare,
    FileText
} from 'lucide-react';

const SalesDataView = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [showTop, setShowTop] = useState(false);
    const [topSelling, setTopSelling] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const fetchSalesData = async () => {
        if (!month || !year) {
            setError('Please select both month and year.');
            setSalesData([]);
            return;
        }
        try {
            setLoading(true);
            setError('');
            const url = `/api/sales/analysis?month=${month}&year=${year}${showTop ? '&top=1' : ''}`;
            const { data } = await axios.get(url, config);
            if (data.items) {
                setSalesData(data.items);
                setTopSelling(data.topSellingProducts || []);
            } else {
                setSalesData(data);
                setTopSelling([]);
            }
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch sales data');
            setLoading(false);
        }
    };

    const handleExportCSV = async () => {
        if (!month || !year) { 
            setError('Please select both month and year.'); 
            return; 
        }
        try {
            const resp = await axios.get(`/api/sales/analysis?month=${month}&year=${year}&export=csv`, { 
                ...config, 
                responseType: 'blob' 
            });
            const blob = new Blob([resp.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sales-frequency-${year}-${month}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to download CSV');
        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const totalRevenue = salesData.reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalQuantity = salesData.reduce((sum, item) => sum + item.totalQuantity, 0);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <span className="text-gradient">Sales Data</span> Analysis
                </h1>
                <p className="page-description">
                    Analyze product performance and revenue trends
                </p>
            </div>

            {/* Filter Card */}
            <div className="card" style={{marginBottom: 'var(--spacing-2xl)'}}>
                <div className="card-header">
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                        <Filter size={20} style={{color: 'var(--primary)'}} />
                        <h3 className="card-title">Analysis Filters</h3>
                    </div>
                    <p className="card-subtitle">Select period and display options</p>
                </div>
                <div className="card-body">
                    <div className="grid-3" style={{gap: 'var(--spacing-lg)', alignItems: 'end'}}>
                        <div className="form-group" style={{marginBottom: 0}}>
                            <label htmlFor="month-select" className="form-label">
                                <Calendar size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                Select Month
                            </label>
                            <select
                                id="month-select"
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
                            <label htmlFor="year-select" className="form-label">
                                <Calendar size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                Select Year
                            </label>
                            <select
                                id="year-select"
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
                            onClick={fetchSalesData}
                            className="btn btn-primary"
                            style={{marginBottom: 0}}
                        >
                            <BarChart3 size={18} />
                            Fetch Data
                        </button>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-lg)',
                        marginTop: 'var(--spacing-lg)',
                        paddingTop: 'var(--spacing-lg)',
                        borderTop: '1px solid rgba(99, 102, 241, 0.1)'
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            cursor: 'pointer',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            background: showTop ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            borderRadius: 'var(--radius-md)',
                            transition: 'all var(--transition-fast)',
                            fontWeight: 500,
                            color: 'var(--text)'
                        }}>
                            <input 
                                type="checkbox" 
                                checked={showTop} 
                                onChange={() => setShowTop(!showTop)}
                                style={{accentColor: 'var(--primary)'}}
                            />
                            <CheckSquare size={18} style={{color: showTop ? 'var(--primary)' : 'var(--text-muted)'}} />
                            Show Top 5 Best Sellers
                        </label>
                        <button
                            onClick={handleExportCSV}
                            className="btn btn-outline"
                        >
                            <Download size={18} />
                            Export CSV
                        </button>
                    </div>
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

            {/* Loading State */}
            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Analyzing sales data...</p>
                </div>
            )}

            {/* Summary Stats - Show when data is loaded */}
            {!loading && salesData.length > 0 && (
                <div style={{marginBottom: 'var(--spacing-2xl)'}}>
                    <div className="stats-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'}}>
                        <div className="stat-card" style={{'--stat-color': 'var(--success)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Total Revenue</div>
                                    <div className="stat-card-value">
                                        PKR {totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </div>
                                    <div className="stat-card-label">Period earnings</div>
                                </div>
                                <div className="stat-card-icon">
                                    <TrendingUp size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card" style={{'--stat-color': 'var(--primary)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Total Units Sold</div>
                                    <div className="stat-card-value">
                                        {totalQuantity.toLocaleString()}
                                    </div>
                                    <div className="stat-card-label">Total quantity</div>
                                </div>
                                <div className="stat-card-icon">
                                    <Package size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card" style={{'--stat-color': 'var(--info)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Products Sold</div>
                                    <div className="stat-card-value">
                                        {salesData.length}
                                    </div>
                                    <div className="stat-card-label">Unique products</div>
                                </div>
                                <div className="stat-card-icon">
                                    <Activity size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Top 5 Best Sellers */}
            {!loading && topSelling.length > 0 && (
                <div className="card" style={{marginBottom: 'var(--spacing-2xl)'}}>
                    <div className="card-header">
                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                            <Award size={24} style={{color: 'var(--warning)'}} />
                            <div>
                                <h3 className="card-title">Top 5 Best Sellers</h3>
                                <p className="card-subtitle">Highest performing products</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)'}}>
                            {topSelling.map((p, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 'var(--spacing-lg)',
                                    background: 'rgba(30, 41, 59, 0.4)',
                                    border: '1px solid rgba(99, 102, 241, 0.1)',
                                    borderRadius: 'var(--radius-md)',
                                    transition: 'all var(--transition-fast)'
                                }}
                                className="hover-lift">
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)'}}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: 'var(--radius-md)',
                                            background: i === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                                                       i === 1 ? 'linear-gradient(135deg, #C0C0C0, #808080)' :
                                                       i === 2 ? 'linear-gradient(135deg, #CD7F32, #8B4513)' :
                                                       'linear-gradient(135deg, var(--primary), var(--secondary))',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: 800,
                                            fontSize: '1.25rem',
                                            boxShadow: 'var(--shadow-md)'
                                        }}>
                                            #{i + 1}
                                        </div>
                                        <div>
                                            <div style={{fontWeight: 600, color: 'var(--text)', fontSize: '1rem'}}>
                                                {p.productName}
                                            </div>
                                            <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem'}}>
                                                Rank {i + 1}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="badge badge-success" style={{fontSize: '0.9rem', padding: 'var(--spacing-sm) var(--spacing-md)'}}>
                                        {p.totalQuantity} units
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* No Data State */}
            {!loading && !error && salesData.length === 0 && month && year && (
                <div className="card">
                    <div className="empty-state">
                        <BarChart3 className="empty-state-icon" size={60} />
                        <h3 className="empty-state-title">No Sales Data Found</h3>
                        <p className="empty-state-description">
                            No sales were recorded for the selected period.
                        </p>
                    </div>
                </div>
            )}

            {/* Sales Data Table */}
            {!loading && salesData.length > 0 && (
                <div className="card">
                    <div className="card-header">
                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                            <FileText size={20} style={{color: 'var(--primary)'}} />
                            <h3 className="card-title">Sales Breakdown</h3>
                        </div>
                        <p className="card-subtitle">Detailed product performance</p>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                            <Package size={16} />
                                            Product Name
                                        </div>
                                    </th>
                                    <th>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                            <Activity size={16} />
                                            Quantity Sold
                                        </div>
                                    </th>
                                    <th>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                            <TrendingUp size={16} />
                                            Total Revenue
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.map((data, index) => (
                                    <tr key={data.productId || index}>
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
                                                <span style={{fontWeight: 600, color: 'var(--text)'}}>
                                                    {data.productName}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{fontWeight: 600, fontSize: '1rem', color: 'var(--text)'}}>
                                                {data.totalQuantity.toLocaleString()}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{fontWeight: 600, color: 'var(--success)'}}>
                                                PKR {data.totalRevenue.toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesDataView;