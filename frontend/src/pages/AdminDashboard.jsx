import React, { useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeManagement from './admin/EmployeeManagement';
import InventoryManagement from './admin/InventoryManagement';
import SalesDataView from './admin/SalesDataView';
import InventoryAlerts from './admin/InventoryAlerts';
import SetSalesTargets from './admin/SetSalesTargets';
import EmployeePerformance from './admin/EmployeePerformance';
import DashboardSummary from './admin/DashboardSummary';
import Reports from './admin/Reports';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('employees');

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4">
                    Admin Dashboard
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Welcome to the Admin Dashboard. Here you can manage employees, inventory, view sales, and reports.
                </Typography>
                <Button variant="contained" color="secondary" onClick={logoutHandler} sx={{ mt: 3 }}>
                    Logout
                </Button>
                {/* Placeholder for future admin components */}
                <Box sx={{ mt: 5, width: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Management Sections</Typography>
                    <ul>
                        <li><Button variant="text" onClick={() => setActiveSection('employees')}>Manage Employees</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('inventory')}>Manage Inventory</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('salesData')}>View Sales Data</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('reports')}>View Reports</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('alerts')}>Inventory Alerts</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('salesTargets')}>Set Sales Targets</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('employeePerformance')}>Review Employee Performance</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('dashboardSummary')}>View Sales and Stock Summary</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('reports')}>View Reports</Button></li>
                    </ul>

                    {activeSection === 'employees' && <EmployeeManagement />}
                    {activeSection === 'inventory' && <InventoryManagement />}
                    {activeSection === 'salesData' && <SalesDataView />}
                    {activeSection === 'alerts' && <InventoryAlerts />}
                    {activeSection === 'salesTargets' && <SetSalesTargets />}
                    {activeSection === 'employeePerformance' && <EmployeePerformance />}
                    {activeSection === 'dashboardSummary' && <DashboardSummary />}
                    {activeSection === 'reports' && <Reports />}
                    {/* Render other components based on activeSection */}
                </Box>
            </Box>
        </Container>
    );
};

export default AdminDashboard;
