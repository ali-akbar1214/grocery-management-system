import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    TrendingUp, 
    User, 
    Calendar, 
    Search,
    AlertCircle,
    Wallet,
    Package,
    RotateCcw,
    CheckCircle,
    Receipt,
    Filter,
    BarChart3
} from 'lucide-react';

const EmployeePerformance = () => {
    const [employees, setEmployees] = useState([]);
    const [loadingEmployees, setLoadingEmployees] = useState(true);
    const [salesData, setSalesData] = useState([]);
    const [loadingSales, setLoadingSales] = useState(false);
    const [error, setError] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
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

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoadingEmployees(true);
            const { data } = await axios.get('/api/users', config);
            setEmployees(data.filter(user => user.role === 'employee'));
            setLoadingEmployees(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch employees');
            setLoadingEmployees(false);
        }
    };

    const fetchEmployeeSales = async () => {
        if (!selectedEmployeeId) {
            setError('Please select an employee.');
            setSalesData([]);
            return;
        }
        try {
            setLoadingSales(true);
            setError('');
            const params = { month, year };
            const { data } = await axios.get(`/api/sales/employee/${selectedEmployeeId}`, { ...config, params });
            setSalesData(data);
            setLoadingSales(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch employee sales data');
            setLoadingSales(false);
        }
    };

    const calculateTotalRevenue = () => {
        return salesData.reduce((sum, sale) => {
            return sum + (sale.isReturn ? -sale.total : sale.total);
        }, 0);
    };

    const calculateTotalItems = () => {
        return salesData.reduce((sum, sale) => {
            return sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
        }, 0);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const selectedEmployee = employees.find(e => e._id === selectedEmployeeId);

    if (loadingEmployees) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading employees...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <span className="text-gradient">Employee</span> Performance
                </h1>
                <p className="page-description">
                    Track and analyze individual employee sales performance
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

            {/* Filter Card */}
            <div className="card" style={{marginBottom: 'var(--spacing-2xl)'}}>
                <div className="card-header">
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                        <Filter size={20} style={{color: 'var(--primary)'}} />
                        <h3 className="card-title">Performance Filters</h3>
                    </div>
                    <p className="card-subtitle">Select employee and time period</p>
                </div>
                <div className="card-body">
                    <div className="grid-3" style={{gap: 'var(--spacing-lg)'}}>
                        <div className="form-group" style={{marginBottom: 0}}>
                            <label htmlFor="employee-select" className="form-label">
                                <User size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                Select Employee
                            </label>
                            <select
                                id="employee-select"
                                value={selectedEmployeeId}
                                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                className="form-input form-select"
                            >
                                <option value="">Choose an employee...</option>
                                {employees.map((employee) => (
                                    <option key={employee._id} value={employee._id}>
                                        {employee.name} (@{employee.username})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group" style={{marginBottom: 0}}>
                            <label htmlFor="month-select" className="form-label">
                                <Calendar size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                Month
                            </label>
                            <select
                                id="month-select"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="form-input form-select"
                            >
                                <option value="">All Months</option>
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
                                Year
                            </label>
                            <select
                                id="year-select"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="form-input form-select"
                            >
                                <option value="">All Years</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button
                        onClick={fetchEmployeeSales}
                        disabled={!selectedEmployeeId || loadingSales}
                        className="btn btn-primary"
                    >
                        <Search size={18} />
                        {loadingSales ? 'Fetching Data...' : 'View Performance'}
                    </button>
                </div>
            </div>

            {/* Performance Stats - Show only when data is loaded */}
            {salesData.length > 0 && selectedEmployee && (
                <div style={{marginBottom: 'var(--spacing-2xl)'}}>
                    <div className="stats-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'}}>
                        <div className="stat-card" style={{'--stat-color': 'var(--success)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Total Revenue</div>
                                    <div className="stat-card-value">
                                        PKR {calculateTotalRevenue().toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </div>
                                    <div className="stat-card-label">{selectedEmployee.name}</div>
                                </div>
                                <div className="stat-card-icon">
                                    <Wallet size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card" style={{'--stat-color': 'var(--primary)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Total Sales</div>
                                    <div className="stat-card-value">
                                        {salesData.filter(s => !s.isReturn).length}
                                    </div>
                                    <div className="stat-card-label">Transactions</div>
                                </div>
                                <div className="stat-card-icon">
                                    <Receipt size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card" style={{'--stat-color': 'var(--info)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Items Sold</div>
                                    <div className="stat-card-value">
                                        {calculateTotalItems()}
                                    </div>
                                    <div className="stat-card-label">Total Units</div>
                                </div>
                                <div className="stat-card-icon">
                                    <Package size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card" style={{'--stat-color': 'var(--warning)'}}>
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">Returns</div>
                                    <div className="stat-card-value">
                                        {salesData.filter(s => s.isReturn).length}
                                    </div>
                                    <div className="stat-card-label">Return Transactions</div>
                                </div>
                                <div className="stat-card-icon">
                                    <RotateCcw size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loadingSales && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading sales data...</p>
                </div>
            )}

            {/* No Data State */}
            {!loadingSales && salesData.length === 0 && selectedEmployeeId && (
                <div className="card">
                    <div className="empty-state">
                        <BarChart3 className="empty-state-icon" size={60} />
                        <h3 className="empty-state-title">No Sales Data Found</h3>
                        <p className="empty-state-description">
                            This employee has no sales records for the selected period.
                        </p>
                    </div>
                </div>
            )}

            {/* Sales Data Table */}
            {salesData.length > 0 && !loadingSales && (
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Sales Transactions</h3>
                        <p className="card-subtitle">Detailed breakdown of all sales</p>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                            <Receipt size={16} />
                                            Sale ID
                                        </div>
                                    </th>
                                    <th>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                            <Calendar size={16} />
                                            Date
                                        </div>
                                    </th>
                                    <th>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                            <Wallet size={16} />
                                            Total Amount
                                        </div>
                                    </th>
                                    <th>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                            <Package size={16} />
                                            Items
                                        </div>
                                    </th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.map((sale) => (
                                    <tr key={sale._id}>
                                        <td>
                                            <span className="badge badge-primary" style={{fontSize: '0.75rem'}}>
                                                #{sale.saleId || sale._id.slice(-6)}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{fontWeight: 500}}>
                                                {new Date(sale.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)'}}>
                                                <Wallet size={16} style={{color: sale.isReturn ? 'var(--error)' : 'var(--success)'}} />
                                                <span style={{
                                                    fontWeight: 600, 
                                                    color: sale.isReturn ? 'var(--error)' : 'var(--text)'
                                                }}>
                                                    {sale.isReturn ? '-' : ''}PKR {sale.total.toFixed(2)}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 'var(--spacing-xs)'
                                            }}>
                                                {sale.items.map(item => (
                                                    <div key={item._id} style={{
                                                        fontSize: '0.85rem',
                                                        color: 'var(--text-secondary)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 'var(--spacing-xs)'
                                                    }}>
                                                        <Package size={12} style={{color: 'var(--text-muted)'}} />
                                                        <span style={{fontWeight: 500}}>{item.product.name}</span>
                                                        <span className="badge badge-info" style={{fontSize: '0.7rem', padding: '2px 6px'}}>
                                                            x{item.quantity}
                                                        </span>
                                                        <span style={{color: 'var(--text-muted)'}}>
                                                            PKR {item.price.toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            {sale.isReturn ? (
                                                <span className="badge badge-warning">
                                                    <RotateCcw size={12} />
                                                    Returned
                                                </span>
                                            ) : (
                                                <span className="badge badge-success">
                                                    <CheckCircle size={12} />
                                                    Sold
                                                </span>
                                            )}
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

export default EmployeePerformance;