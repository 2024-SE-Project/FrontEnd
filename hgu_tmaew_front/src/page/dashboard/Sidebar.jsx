import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import '../css/Sidebar.css'; // Sidebar.css 파일 import

export default function Sidebar({ toggleDrawer }) {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="logo">RAONz</div>
                <IconButton
                    color="inherit"
                    aria-label="close drawer"
                    onClick={toggleDrawer}
                >
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List component="nav">
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/main">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/main">
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Team" />
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/profile">
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mypage" />
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/ranking">
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ranking Page" />
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/teammatch">
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Team Meeting Match" />
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/photo">
                        <ListItemIcon>
                            <PhotoCameraIcon />
                        </ListItemIcon>
                        <ListItemText primary="Photo studio" />
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton component={Link} to="/dashboard/library">
                        <ListItemIcon>
                            <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reference library" />
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton component={Link} to="/home">
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
}