import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Target, Wallet, ShoppingBag, Calendar, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react';

const ViewPerformance = () => {
    const [employeeSales, setEmployeeSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [monthlySalesTarget, setMonthlySalesTarget] = useState(0);
    const [employeeName, setEmployeeName] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;
    const employeeId = userInfo?._id;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        if (employeeId) {
            fetchEmployeeData();
            fetchSalesData();
        }
    }, [employeeId]);

    const fetchEmployeeData = async () => {
        try {
            const { data } = await axios.get(`/api/users/${employeeId}`, config);
            setMonthlySalesTarget(data.monthlySalesTarget);
            setEmployeeName(data.name);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch employee data');
        }
    };

    const fetchSalesData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/sales/employee/${employeeId}`, config);
            setEmployeeSales(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch sales data');
            setLoading(false);
        }
    };

    const calculateTotalSales = () => {
        return employeeSales.reduce((acc, sale) => acc + sale.total, 0);
    };

    const calculateStats = () => {
        const totalSales = calculateTotalSales();
        const totalTransactions = employeeSales.length;
        const successfulSales = employeeSales.filter(s => !s.isReturn).length;
        const returns = employeeSales.filter(s => s.isReturn).length;
        const targetProgress = monthlySalesTarget > 0 ? (totalSales / monthlySalesTarget) * 100 : 0;
        
        return { totalSales, totalTransactions, successfulSales, returns, targetProgress };
    };

    const stats = calculateStats();

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <TrendingUp size={32} className="inline mr-3" />
                    <span className="text-gradient">Performance</span> Dashboard
                </h1>
                <p className="page-description">
                    Track your sales performance and achievements
                </p>
            </div>

            {/* Welcome Banner */}
            {employeeName && (
                <div className="card mb-6" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', marginBottom: '1.5rem'}}>
                    <div className="card-body" style={{padding: '2rem'}}>
                        <div className="flex items-center">
                            <div className="stat-icon" style={{background: 'rgba(255,255,255,0.2)', marginRight: '1rem'}}>
                                <User size={28} style={{color: 'white'}} />
                            </div>
                            <div>
                                <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem'}}>
                                    Welcome back, {employeeName}!
                                </h2>
                                <p style={{opacity: 0.9}}>Here's your performance overview</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                    <div className="stat-icon bg-green-100">
                        <Wallet size={24} className="text-green-600" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Sales</p>
                        <p className="stat-value">PKR {stats.totalSales.toFixed(2)}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-blue-100">
                        <ShoppingBag size={24} className="text-blue-600" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Transactions</p>
                        <p className="stat-value">{stats.totalTransactions}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-purple-100">
                        <CheckCircle size={24} className="text-purple-600" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Successful Sales</p>
                        <p className="stat-value">{stats.successfulSales}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-orange-100">
                        <XCircle size={24} className="text-orange-600" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Returns</p>
                        <p className="stat-value">{stats.returns}</p>
                    </div>
                </div>
            </div>

            {/* Target Progress Card */}
            <div className="card mb-6" style={{marginBottom: '1.5rem'}}>
                <div className="card-header">
                    <div className="flex items-center">
                        <Target size={20} className="mr-2" />
                        <h3 className="card-title">Monthly Sales Target</h3>
                    </div>
                    <p className="card-subtitle">Your progress towards monthly goal</p>
                </div>
                <div className="card-body">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-semibold">Target: PKR {monthlySalesTarget.toFixed(2)}</span>
                        <span className="text-lg font-bold" style={{color: stats.targetProgress >= 100 ? '#10b981' : '#667eea'}}>
                            {stats.targetProgress.toFixed(1)}%
                        </span>
                    </div>
                    <div style={{background: '#e5e7eb', borderRadius: '9999px', height: '1rem', overflow: 'hidden'}}>
                        <div 
                            style={{
                                background: stats.targetProgress >= 100 ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #667eea, #764ba2)',
                                height: '100%',
                                width: `${Math.min(stats.targetProgress, 100)}%`,
                                transition: 'width 0.5s ease'
                            }}
                        />
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                        {stats.targetProgress >= 100 ? (
                            <span className="badge badge-success">🎉 Target Achieved!</span>
                        ) : (
                            <span>PKR {(monthlySalesTarget - stats.totalSales).toFixed(2)} remaining to reach your goal</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Sales History Card */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Sales History</h3>
                    <p className="card-subtitle">Detailed transaction records</p>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p className="loading-text">Loading sales data...</p>
                        </div>
                    ) : employeeSales.length === 0 ? (
                        <div className="empty-state">
                            <ShoppingBag className="empty-state-icon" size={60} />
                            <h3 className="empty-state-title">No sales yet</h3>
                            <p className="empty-state-description">Your sales transactions will appear here</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sale ID</th>
                                        <th>Date</th>
                                        <th style={{textAlign: 'right'}}>Amount</th>
                                        <th style={{textAlign: 'center'}}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeSales.map((sale) => (
                                        <tr key={sale._id}>
                                            <td>
                                                <div className="flex items-center">
                                                    <ShoppingBag size={16} className="mr-2 text-gray-400" />
                                                    <span className="font-medium">{sale.saleId || sale._id}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center text-gray-600">
                                                    <Calendar size={14} className="mr-1" />
                                                    {new Date(sale.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td style={{textAlign: 'right'}}>
                                                <span className="font-semibold">PKR {sale.total.toFixed(2)}</span>
                                            </td>
                                            <td style={{textAlign: 'center'}}>
                                                {sale.isReturn ? (
                                                    <span className="badge badge-error">
                                                        <XCircle size={12} className="mr-1" />
                                                        Returned
                                                    </span>
                                                ) : (
                                                    <span className="badge badge-success">
                                                        <CheckCircle size={12} className="mr-1" />
                                                        Sold
                                                    </span>
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

export default ViewPerformance;