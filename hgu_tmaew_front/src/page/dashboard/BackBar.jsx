import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function BackBar() {
    return (
        <AppBar position="static" color="default" sx={{ boxShadow: 'none' }} className="backbar">
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
