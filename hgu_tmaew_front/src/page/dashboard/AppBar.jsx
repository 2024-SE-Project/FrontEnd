// AppBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export default function Appbar({ toggleDrawer }) {

    const name = localStorage.getItem("name");
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    edge="start"
                    sx={{ marginRight: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    RAONz
                </Typography>
                <IconButton color="inherit">
                    <Avatar src="/path/to/avatar.jpg" alt="User Avatar" />
                </IconButton>
                <Typography variant="body1" noWrap>
                    {name}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}