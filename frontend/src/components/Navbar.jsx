import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge,
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Forum as ForumIcon,
    EmojiEvents as TrophyIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            handleClose();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const navItems = [
        { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
        { text: 'Community', path: '/forum', icon: <ForumIcon /> },
        { text: 'Challenges', path: '/challenges', icon: <TrophyIcon /> },
    ];

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    DSA Visualizer
                </Typography>

                {currentUser ? (
                    <>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.text}
                                    component={RouterLink}
                                    to={item.path}
                                    color="inherit"
                                    startIcon={item.icon}
                                    sx={{
                                        backgroundColor:
                                            location.pathname === item.path
                                                ? 'rgba(255, 255, 255, 0.1)'
                                                : 'transparent',
                                    }}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar
                                alt={currentUser.displayName}
                                src={currentUser.photoURL}
                                sx={{ width: 32, height: 32 }}
                            />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                component={RouterLink}
                                to="/profile"
                                onClick={handleClose}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button
                        component={RouterLink}
                        to="/login"
                        color="inherit"
                        startIcon={<PersonIcon />}
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 