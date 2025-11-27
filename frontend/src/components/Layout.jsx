import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="app-container">
            {/* Sidebar - Fixed with enhanced styling */}
            <div className="sidebar-container">
                <Sidebar />
            </div>

            {/* Main content area with improved responsive design */}
            <div className="main-content-wrapper">
                {/* Enhanced Header */}
                <header className="app-header">
                    <div className="header-content">
                        <div className="header-title-section">
                            <h1 className="app-title">
                                <span className="title-gradient">Inventory</span>
                                <span className="title-secondary">Management System</span>
                            </h1>
                            <div className="title-underline"></div>
                        </div>
                        
                        {/* Header actions area for future enhancements */}
                        <div className="header-actions">
                            <div className="status-indicator">
                                <div className="status-dot"></div>
                                <span className="status-text">Online</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Enhanced Main Content */}
                <main className="page-content">
                    <div className="content-container">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Background decorative elements */}
            <div className="bg-decoration">
                <div className="decoration-circle decoration-circle-1"></div>
                <div className="decoration-circle decoration-circle-2"></div>
                <div className="decoration-circle decoration-circle-3"></div>
            </div>
        </div>
    );
};

export default Layout;