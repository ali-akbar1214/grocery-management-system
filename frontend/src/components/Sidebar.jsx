import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Package,
    BarChart3,
    FileText,
    AlertTriangle,
    Target,
    ShoppingCart,
    RotateCcw,
    Eye,
    Receipt,
    LogOut,
    TrendingUp,
    ChevronLeft,
    ChevronRight,
    ShoppingBag,
} from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userRole = userInfo?.role;
    const userName = userInfo?.name || userInfo?.username || 'User';

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    const adminMenu = [
        { text: 'Dashboard', icon: LayoutDashboard, path: '/admin/summary', color: 'var(--primary)' },
        { text: 'Employees', icon: Users, path: '/admin/employees', color: 'var(--secondary)' },
        { text: 'Inventory', icon: Package, path: '/admin/inventory', color: 'var(--info)' },
        { text: 'Sales Data', icon: BarChart3, path: '/admin/sales-data', color: 'var(--success)' },
        { text: 'Alerts', icon: AlertTriangle, path: '/admin/inventory-alerts', color: 'var(--warning)' },
        { text: 'Sales Targets', icon: Target, path: '/admin/sales-targets', color: 'var(--primary)' },
        { text: 'Performance', icon: TrendingUp, path: '/admin/employee-performance', color: 'var(--secondary)' },
        { text: 'Reports', icon: FileText, path: '/admin/reports', color: 'var(--info)' },
    ];

    const employeeMenu = [
        { text: 'Process Sale', icon: ShoppingCart, path: '/employee/process-sale', color: 'var(--success)' },
        { text: 'Process Return', icon: RotateCcw, path: '/employee/process-return', color: 'var(--warning)' },
        { text: 'View Inventory', icon: Eye, path: '/employee/view-inventory', color: 'var(--info)' },
        { text: 'My Performance', icon: TrendingUp, path: '/employee/view-performance', color: 'var(--primary)' },
        { text: 'Bill History', icon: Receipt, path: '/employee/bill-history', color: 'var(--secondary)' },
    ];

    const menuItems = userRole === 'admin' ? adminMenu : employeeMenu;

    const handleNavigation = (path) => {
        navigate(path);
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className={`enhanced-sidebar ${collapsed ? 'collapsed' : ''}`}>
            {/* Sidebar Header */}
            <div className="sidebar-header">
                <div className="logo-section">
                    <div className="logo-icon">
                        <ShoppingBag size={24} />
                    </div>
                    {!collapsed && (
                        <div className="logo-text">
                            <div className="logo-title">IMS</div>
                            <div className="logo-subtitle">Inventory System</div>
                        </div>
                    )}
                </div>
            </div>

            {/* User Profile Section */}
            <div className="user-profile">
                <div className="user-avatar">
                    <span className="avatar-text">{getInitials(userName)}</span>
                </div>
                {!collapsed && (
                    <div className="user-info">
                        <div className="user-name">{userName}</div>
                        <div className="user-role">{userRole}</div>
                    </div>
                )}
            </div>

            {/* Navigation List */}
            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.text} className="nav-item">
                                <button
                                    onClick={() => handleNavigation(item.path)}
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                    style={{'--item-color': item.color}}
                                    title={collapsed ? item.text : ''}
                                >
                                    <span className="nav-icon">
                                        <Icon size={20} />
                                    </span>
                                    {!collapsed && (
                                        <>
                                            <span className="nav-text">{item.text}</span>
                                            <span className="nav-indicator"></span>
                                        </>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="sidebar-footer">
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                    title={collapsed ? 'Logout' : ''}
                >
                    <span className="logout-icon">
                        <LogOut size={20} />
                    </span>
                    {!collapsed && <span className="logout-text">Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;