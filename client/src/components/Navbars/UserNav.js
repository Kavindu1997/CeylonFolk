import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Button, IconButton, Toolbar, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { NavLink } from 'react-router-dom';
import useStyles from './UserNavStyles';

const UserNav = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <div className={classes.appbarLeft}>
                        <NavLink to={"/"} className={classes.appbarlink}> <Typography className={classes.appbarlink2}>Home</Typography></NavLink>
                        <NavLink to={"/shop"} className={classes.appbarlink}>
                            <Typography
                                className={classes.appbarlink2}
                                endIcon={<KeyboardArrowDownIcon>
                                    fontSize="0.5rem"
                                </KeyboardArrowDownIcon>}
                            >
                                Shop
                            </Typography>
                        </NavLink>
                        <NavLink to={"/contactus"} className={classes.appbarlink}><Typography className={classes.appbarlink2}>Contact</Typography></NavLink>
                        <NavLink to={"/aboutUs"} className={classes.appbarlink}><Typography className={classes.appbarlink2}>About Us</Typography></NavLink>
                    </div>


                    <div className={classes.appbarMiddle}>
                        <NavLink to={"/"}><img src={require('../../images/logo.png').default} alt="CeylonFolk" height="30px" /></NavLink>
                    </div>

                    <IconButton style={{ paddingLeft: '106px' }}>
                        <NavLink to={"/auth"}><SearchOutlinedIcon className={classes.icon} /></NavLink>
                        <NavLink to={"/wishlist"}><FavoriteBorderOutlinedIcon className={classes.icon} /></NavLink>
                        <NavLink to={"/cart"}><LocalMallOutlinedIcon className={classes.icon} /></NavLink>
                        {/* <Link href="/auth"><PermIdentityOutlinedIcon className={classes.icon}/></Link> */}
                        <div>
                            <Button
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <PermIdentityOutlinedIcon className={classes.icon} />
                                {/* <Avatar>JP</Avatar> */}
                            </Button>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <NavLink to={"/profile"} style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px' }}>My Account</MenuItem></NavLink>
                                                    <NavLink to={"/myOrders"} style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px' }}>Order History</MenuItem></NavLink>
                                                    <NavLink to={"/myWishlist"} style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px' }}>My Wishlist</MenuItem></NavLink>
                                                    <NavLink to={"/auth"} style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px' }}>Logout</MenuItem></NavLink>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </IconButton>

                </Toolbar>

            </AppBar>

        </div>
    );
};

export default UserNav;

