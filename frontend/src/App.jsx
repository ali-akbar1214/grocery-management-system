import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// Admin Pages
import EmployeeManagement from './pages/admin/EmployeeManagement';
import InventoryManagement from './pages/admin/InventoryManagement';
import SalesDataView from './pages/admin/SalesDataView';
import InventoryAlerts from './pages/admin/InventoryAlerts';
import SetSalesTargets from './pages/admin/SetSalesTargets';
import EmployeePerformance from './pages/admin/EmployeePerformance';
import DashboardSummary from './pages/admin/DashboardSummary';
import Reports from './pages/admin/Reports';

// Employee Pages
import ProcessSale from './pages/employee/ProcessSale';
import ProcessReturn from './pages/employee/ProcessReturn';
import ViewInventory from './pages/employee/ViewInventory';
import ViewPerformance from './pages/employee/ViewPerformance'; // Employee's own performance view
import BillHistory from './pages/employee/BillHistory';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/" element={<Layout />}>
                {/* Admin Routes (Protected) */}
                <Route path="/admin/employees" element={<PrivateRoute role="admin"><EmployeeManagement /></PrivateRoute>} />
                <Route path="/admin/inventory" element={<PrivateRoute role="admin"><InventoryManagement /></PrivateRoute>} />
                <Route path="/admin/sales-data" element={<PrivateRoute role="admin"><SalesDataView /></PrivateRoute>} />
                <Route path="/admin/inventory-alerts" element={<PrivateRoute role="admin"><InventoryAlerts /></PrivateRoute>} />
                <Route path="/admin/sales-targets" element={<PrivateRoute role="admin"><SetSalesTargets /></PrivateRoute>} />
                <Route path="/admin/employee-performance" element={<PrivateRoute role="admin"><EmployeePerformance /></PrivateRoute>} />
                <Route path="/admin/summary" element={<PrivateRoute role="admin"><DashboardSummary /></PrivateRoute>} />
                <Route path="/admin/reports" element={<PrivateRoute role="admin"><Reports /></PrivateRoute>} />

                {/* Employee Routes (Protected) */}
                <Route path="/employee/process-sale" element={<PrivateRoute role="employee"><ProcessSale /></PrivateRoute>} />
                <Route path="/employee/process-return" element={<PrivateRoute role="employee"><ProcessReturn /></PrivateRoute>} />
                <Route path="/employee/view-inventory" element={<PrivateRoute role="employee"><ViewInventory /></PrivateRoute>} />
                <Route path="/employee/view-performance" element={<PrivateRoute role="employee"><ViewPerformance /></PrivateRoute>} />
                <Route path="/employee/bill-history" element={<PrivateRoute role="employee"><BillHistory /></PrivateRoute>} />

                {/* Redirect from root dashboards to specific first page */}
                <Route path="/admin" element={<Navigate to="/admin/employees" replace />} />
                <Route path="/employee" element={<Navigate to="/employee/process-sale" replace />} />
            </Route>

            {/* Catch all - Redirect to home or 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;