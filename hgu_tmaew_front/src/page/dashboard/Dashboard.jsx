import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Drawer, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../css/Dashboard.css'; // Import Dashboard.css file

export default function Dashboard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="dashboard">
            <IconButton
                color="inherit"
                aria-label="toggle drawer"
                onClick={toggleDrawer}
                edge="start"
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                variant="persistent"
                open={isDrawerOpen}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                <Sidebar toggleDrawer={toggleDrawer} />
            </Drawer>
            <div className="content" style={{ marginLeft: isDrawerOpen ? 240 : 0, transition: 'margin-left 0.3s' }}>
                <Outlet />
            </div>
        </div>
    );
}