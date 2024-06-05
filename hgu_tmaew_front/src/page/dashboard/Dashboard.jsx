// Dashboard.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Drawer, Box } from '@mui/material';
import Sidebar from './Sidebar';
import Appbar from './AppBar';
import BackBar from './BackBar';
import '../css/Dashboard.css'; // Import Dashboard.css file

export default function Dashboard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="dashboard">
            <div className="appbar-backbar-container">
                <Appbar toggleDrawer={toggleDrawer} />
                <BackBar />
            </div>
            <Drawer
                variant="persistent"
                open={isDrawerOpen}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                }}
            >
                <Sidebar toggleDrawer={toggleDrawer} />
            </Drawer>
            <div className="content" style={{ marginLeft: isDrawerOpen ? 240 : 0, transition: 'margin-left 0.3s', marginTop: '128px' }}>
                <Outlet />
            </div>
        </div>
    );
}