import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DialogTag from '../dialog/DialogTag';
import { NavLink } from 'react-router-dom';
import "../css/AppBar.css"

export default function Appbar({ toggleDrawer }) {
    const name = localStorage.getItem("name");
    const [openCreate, setOpenCreate] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = (newPost) => {
        if (newPost) {
            setPosts([newPost, ...posts]);
        }
        setOpenCreate(false);
    };

    return (
        <AppBar position="fixed" className="appbar">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    edge="start"
                    className="menu-button"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" noWrap component="div" className="title">
                    RAONz
                </Typography>
                <Box className="icon-group">
                    <IconButton color="inherit" className="icon-button" onClick={handleClickOpenCreate}>
                        <AddIcon />
                    </IconButton>
                    {openCreate && (
                        <DialogTag
                            open={openCreate}
                            title={'추가하기'}
                            onClose={handleCloseCreate}
                        />
                    )}
                    <IconButton color="inherit" className="icon-button">
                        <MessageIcon />
                    </IconButton>
                    <IconButton color="inherit" className="icon-button">
                        <NotificationsIcon />
                    </IconButton>
                </Box>
                <NavLink to="/dashboard/profile" className="mypage-link" activeClassName="active">
                    <Box className="user-profile">
                        <Avatar src="/path/to/avatar.jpg" alt="User Avatar" />
                        <Typography variant="body1" noWrap className="user-name">
                            {name}
                        </Typography>
                    </Box>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
}