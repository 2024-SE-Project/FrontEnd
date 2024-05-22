import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import '../css/Sidebar.css'; // Sidebar.css 파일 import

export default function Sidebar() {
    return (
        <div className="sidebar">
            <List component="nav">
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/home">
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/profile">
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/ranking">
                        <ListItemText primary="Ranking" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
}
