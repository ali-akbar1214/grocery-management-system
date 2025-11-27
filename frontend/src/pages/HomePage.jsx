import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HomePage = () => {
    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4">
                    Welcome to the Inventory Management System
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Please login to access the admin or employee dashboard.
                </Typography>
            </Box>
        </Container>
    );
};

export default HomePage;
