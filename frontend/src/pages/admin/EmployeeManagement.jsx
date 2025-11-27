import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Users, 
    UserPlus, 
    Edit2, 
    Trash2, 
    X, 
    AlertCircle,
    Target,
    User,
    Lock,
    Wallet,
    CheckCircle
} from 'lucide-react';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [formData, setFormData] = useState({ name: '', username: '', password: '', monthlySalesTarget: 0 });

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

    const handleModalOpen = (employee = null) => {
        setCurrentEmployee(employee);
        if (employee) {
            setFormData({
                name: employee.name,
                username: employee.username,
                password: '',
                monthlySalesTarget: employee.monthlySalesTarget,
            });
        } else {
            setFormData({ name: '', username: '', password: '', monthlySalesTarget: 0 });
        }
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setCurrentEmployee(null);
        setFormData({ name: '', username: '', password: '', monthlySalesTarget: 0 });
        setError('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (currentEmployee) {
                const updateData = { ...formData };
                if (!updateData.password) {
                    delete updateData.password;
                }
                await axios.put(`/api/users/${currentEmployee._id}`, updateData, config);
                
                if (formData.password) {
                    await axios.put(`/api/users/${currentEmployee._id}/reset-password`, { password: formData.password }, config);
                }
            } else {
                await axios.post('/api/users/employee', formData, config);
            }
            fetchEmployees();
            handleModalClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save employee');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`/api/users/${id}`, config);
                fetchEmployees();
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete employee');
            }
        }
    };

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
                    <span className="text-gradient">Employee</span> Management
                </h1>
                <p className="page-description">
                    Manage your workforce and track performance targets
                </p>
            </div>

            {/* Action Bar */}
            <div className="action-bar">
                <div className="action-bar-left">
                    <div className="badge badge-primary">
                        <Users size={14} />
                        <span>{employees.length} Total Employees</span>
                    </div>
                </div>
                <div className="action-bar-right">
                    <button
                        onClick={() => handleModalOpen()}
                        className="btn btn-primary"
                    >
                        <UserPlus size={18} />
                        Add Employee
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

            {/* Employee Table */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Employee Directory</h3>
                    <p className="card-subtitle">View and manage all employee accounts</p>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                                        <User size={16} />
                                        Name
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
                                            <Users className="empty-state-icon" size={60} />
                                            <h3 className="empty-state-title">No Employees Found</h3>
                                            <p className="empty-state-description">
                                                Get started by adding your first employee
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
                                                <Wallet size={16} style={{color: 'var(--success)'}} />
                                                <span style={{fontWeight: 600, color: 'var(--text)'}}>
                                                    PKR {employee.monthlySalesTarget.toLocaleString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-btn-group">
                                                <button
                                                    onClick={() => handleModalOpen(employee)}
                                                    className="action-btn edit"
                                                    title="Edit employee"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(employee._id)}
                                                    className="action-btn delete"
                                                    title="Delete employee"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
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
                                {currentEmployee ? 'Edit Employee' : 'Add New Employee'}
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
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">
                                        <User size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="form-input"
                                        placeholder="Enter employee name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label">
                                        <User size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        required
                                        className="form-input"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">
                                        <Lock size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        required={!currentEmployee}
                                        className="form-input"
                                        placeholder={currentEmployee ? "Leave blank to keep current password" : "Enter password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {currentEmployee && (
                                        <p className="form-help">
                                            Leave blank if you don't want to change the password
                                        </p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="monthlySalesTarget" className="form-label">
                                        <Target size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                        Monthly Sales Target (PKR)
                                    </label>
                                    <input
                                        type="number"
                                        name="monthlySalesTarget"
                                        id="monthlySalesTarget"
                                        className="form-input"
                                        placeholder="Enter sales target"
                                        value={formData.monthlySalesTarget}
                                        onChange={handleChange}
                                        min="0"
                                        step="1000"
                                    />
                                    <p className="form-help">
                                        Set the monthly sales target for this employee
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
                                    {currentEmployee ? 'Update Employee' : 'Add Employee'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;