import React, { useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProcessSale from './employee/ProcessSale';
import ProcessReturn from './employee/ProcessReturn';
import ViewInventory from './employee/ViewInventory';
import ViewPerformance from './employee/ViewPerformance';
import BillHistory from './employee/BillHistory';

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('processSale'); // Default to process sale

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
                    Employee Dashboard
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Welcome to your Employee Dashboard. Here you can manage sales, view inventory, and track your performance.
                </Typography>
                <Button variant="contained" color="secondary" onClick={logoutHandler} sx={{ mt: 3 }}>
                    Logout
                </Button>
                {/* Employee components */}
                <Box sx={{ mt: 5, width: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Actions</Typography>
                    <ul>
                        <li><Button variant="text" onClick={() => setActiveSection('processSale')}>Process Sale</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('processReturn')}>Process Return</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('viewInventory')}>View Inventory</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('viewPerformance')}>View Sales Target & Performance</Button></li>
                        <li><Button variant="text" onClick={() => setActiveSection('viewBillHistory')}>View Bill History</Button></li>
                    </ul>

                    {activeSection === 'processSale' && <ProcessSale />}
                    {activeSection === 'processReturn' && <ProcessReturn />}
                    {activeSection === 'viewInventory' && <ViewInventory />}
                    {activeSection === 'viewPerformance' && <ViewPerformance />}
                    {activeSection === 'viewBillHistory' && <BillHistory />}
                    {/* Render other components based on activeSection */}
                </Box>
            </Box>
        </Container>
    );
};

export default EmployeeDashboard;
