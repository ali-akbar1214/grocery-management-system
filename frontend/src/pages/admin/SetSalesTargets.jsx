import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Target,
    User,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    X,
    Edit3,
    Award
} from 'lucide-react';

const SetSalesTargets = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [newSalesTarget, setNewSalesTarget] = useState(0);

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
            setLoading(true);
            const { data } = await axios.get('/api/users', config);
            setEmployees(data.filter(user => user.role === 'employee'));
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch employees');
            setLoading(false);
        }
    };

    const handleModalOpen = (employee) => {
        setCurrentEmployee(employee);
        setNewSalesTarget(employee.monthlySalesTarget);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setCurrentEmployee(null);
        setNewSalesTarget(0);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.put(`/api/users/${currentEmployee._id}/sales-target`, { monthlySalesTarget: newSalesTarget }, config);
            fetchEmployees();
            handleModalClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update sales target');
        }
    };

    const totalTargets = employees.reduce((sum, emp) => sum + emp.monthlySalesTarget, 0);
    const averageTarget = employees.length > 0 ? totalTargets / employees.length : 0;
    const highestTarget = employees.length > 0 ? Math.max(...employees.map(e => e.monthlySalesTarget)) : 0;

    if (loading) {
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
                    <span className="text-gradient">Sales</span> Targets
                </h1>
                <p className="page-description">
                    Set and manage monthly sales targets for your team
                </p>
            </div>

            {/* Target Summary Stats */}
            <div style={{marginBottom: 'var(--spacing-2xl)'}}>
                <div className="stats-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'}}>
                    <div className="stat-card" style={{'--stat-color': 'var(--primary)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Total Targets</div>
                                <div className="stat-card-value">
                                    PKR {totalTargets.toLocaleString()}
                                </div>
                                <div className="stat-card-label">Combined monthly goal</div>
                            </div>
                            <div className="stat-card-icon">
                                <Target size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="stat-card" style={{'--stat-color': 'var(--info)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Average Target</div>
                                <div className="stat-card-value">
                                    PKR {averageTarget.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                                </div>
                                <div className="stat-card-label">Per employee</div>
                            </div>
                            <div className="stat-card-icon">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="stat-card" style={{'--stat-color': 'var(--warning)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Highest Target</div>
                                <div className="stat-card-value">
                                    PKR {highestTarget.toLocaleString()}
                                </div>
                                <div className="stat-card-label">Top performer goal</div>
                            </div>
                            <div className="stat-card-icon">
                                <Award size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="stat-card" style={{'--stat-color': 'var(--success)'}}>
                        <div className="stat-card-header">
                            <div>
                                <div className="stat-card-title">Total Employees</div>
                                <div className="stat-card-value">
                                    {employees.length}
                                </div>
                                <div className="stat-card-label">Active team members</div>
                            </div>
                            <div className="stat-card-icon">
                                <User size={24} />
                            </div>
                        </div>
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

            {/* Employees Table */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Employee Sales Targets</h3>
                    <p className="card-subtitle">Manage monthly targets for each employee</p>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <User size={16} />
                                        Employee
                                    </div>
                                </th>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <User size={16} />
                                        Username
                                    </div>
                                </th>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <Target size={16} />
                                        Monthly Target
                                    </div>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="4">
                                        <div className="empty-state">
                                            <User className="empty-state-icon" size={60} />
                                            <h3 className="empty-state-title">No Employees Found</h3>
                                            <p className="empty-state-description">
                                                Add employees to set their sales targets
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                employees.map((employee) => (
                                    <tr key={employee._id}>
                                        <td>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                                <div className="user-avatar" style={{width: '36px', height: '36px', fontSize: '0.9rem'}}>
                                                    <span className="avatar-text">
                                                        {employee.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                                                    </span>
                                                </div>
                                                <span style={{fontWeight: 600, color: 'var(--text)'}}>{employee.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-primary" style={{fontSize: '0.8rem'}}>
                                                @{employee.username}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)'}}>
                                                <Target size={16} style={{color: 'var(--success)'}} />
                                                <span style={{fontWeight: 600, color: 'var(--text)'}}>
                                                    PKR {employee.monthlySalesTarget.toLocaleString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleModalOpen(employee)}
                                                className="btn btn-sm btn-primary"
                                                style={{display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-xs)'}}
                                            >
                                                <Edit3 size={14} />
                                                Set Target
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                Set Sales Target
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
                                {/* Employee Info */}
                                <div style={{
                                    padding: 'var(--spacing-lg)',
                                    background: 'rgba(99, 102, 241, 0.05)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)',
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: 'var(--spacing-lg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-md)'
                                }}>
                                    <div className="user-avatar" style={{width: '48px', height: '48px', fontSize: '1rem'}}>
                                        <span className="avatar-text">
                                            {currentEmployee?.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                                        </span>
                                    </div>
                                    <div>
                                        <div style={{fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem'}}>
                                            {currentEmployee?.name}
                                        </div>
                                        <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                                            @{currentEmployee?.username}
                                        </div>
                                    </div>
                                </div>

                                {/* Current Target */}
                                <div style={{
                                    padding: 'var(--spacing-md)',
                                    background: 'rgba(30, 41, 59, 0.4)',
                                    border: '1px solid rgba(99, 102, 241, 0.1)',
                                    borderRadius: 'var(--radius-sm)',
                                    marginBottom: 'var(--spacing-lg)'
                                }}>
                                    <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem'}}>
                                        Current Monthly Target
                                    </div>
                                    <div style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: 'var(--text)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-xs)'
                                    }}>
                                        <Target size={20} style={{color: 'var(--warning)'}} />
                                        PKR {currentEmployee?.monthlySalesTarget.toLocaleString()}
                                    </div>
                                </div>

                                {/* New Target Input */}
                                <div className="form-group">
                                    <label htmlFor="newSalesTarget" className="form-label">
                                        <Target size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                        New Monthly Sales Target (PKR)
                                    </label>
                                    <input
                                        type="number"
                                        name="newSalesTarget"
                                        id="newSalesTarget"
                                        required
                                        className="form-input"
                                        placeholder="Enter new target amount"
                                        value={newSalesTarget}
                                        onChange={(e) => setNewSalesTarget(Number(e.target.value))}
                                        min="0"
                                        step="1000"
                                    />
                                    <p className="form-help">
                                        Set a realistic monthly sales target for this employee
                                    </p>
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
                                    Update Target
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SetSalesTargets;