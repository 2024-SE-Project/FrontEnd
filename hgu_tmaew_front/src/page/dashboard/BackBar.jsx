// BackBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function BackBar() {
    return (
        <AppBar position="fixed" color="default" sx={{ bottom: 0, top: 'auto', boxShadow: 'none' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    RAONz
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                    2024 CRAISELON. All rights reserved.
                </Typography>
            </Toolbar>
        </AppBar>
    );
}