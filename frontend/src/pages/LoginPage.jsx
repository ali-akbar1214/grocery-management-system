import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            if (parsedUserInfo.role === 'admin') {
                navigate('/admin/employees');
            } else {
                navigate('/employee/process-sale');
            }
        }
    }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(
                '/api/users/login',
                { username, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));

            if (data.role === 'admin') {
                navigate('/admin/employees');
            } else {
                navigate('/employee/process-sale');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            {/* Background Decorations */}
            <div className="login-bg-decoration">
                <div className="decoration-circle decoration-circle-1"></div>
                <div className="decoration-circle decoration-circle-2"></div>
                <div className="decoration-circle decoration-circle-3"></div>
            </div>

            {/* Login Card */}
            <div className="login-card">
                {/* Logo Section */}
                <div className="login-header">
                    <div className="login-logo">
                        <ShoppingCart size={48} strokeWidth={2.5} />
                    </div>
                    <h1 className="login-title">
                        <span className="text-gradient">Inventory</span> Management
                    </h1>
                    <p className="login-subtitle">
                        Sign in to access your dashboard
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="alert alert-error">
                        <AlertCircle className="alert-icon" size={20} />
                        <div className="alert-content">
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                <form className="login-form" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            <User size={16} className="inline mr-2" />
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="form-input"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            <Lock size={16} className="inline mr-2" />
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="form-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-lg w-full"
                    >
                        {loading ? (
                            <div className="loading-dots">
                                <div className="loading-dot"></div>
                                <div className="loading-dot"></div>
                                <div className="loading-dot"></div>
                            </div>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="login-footer">
                    <p className="text-sm text-muted">
                        Secure access to your inventory management system
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;