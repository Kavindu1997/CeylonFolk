import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Button, IconButton, Toolbar, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI',
        color: 'white',
        textDecoration: 'none'
    },
    appbar: {
        display: 'flex',
        padding: '5px',
        width: '100%',
        justifyContent: 'spaceBetween',
        alignItems: 'center',
        background: 'white'

    },
    appbarsolid: {
        backgroundColor: 'black'

    },
    icon: {
        color: 'black',
        fontSize: '1.5rem',
        marginLeft: '24px',
        marginRight: '10px',
        fontWeight: '300',
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#fff',
        display: 'flex',
        fontFamily: 'Work Sans',
        textDecoration: 'none'
    },
    appbarTitle2: {
        flexGrow: '1',
        color: 'black',
        justifyContent: 'center',
        textDecoration: 'none'
    },
    appbarWrapper: {
        color: 'black',
        width: '100%',
        margin: '0 auto',
        height: '10px'
    },
    colorText: {
        color: 'black'
    },
    navbartext: {
        color: 'black',
        fontFamily: 'Segoe UI',
        textTransform: 'none',
        fontSize: '15px',
        textDecoration: 'none'
    },
    goDown: {
        color: '#fff',
        fontSize: '1rem',
    },

    appbarLeft: {
        display: 'flex',
        color: 'black',
        fontColor: 'black',
        fontFamily: 'Work Sans',
        textDecoration: 'none',
        marginLeft: '10px',
        marginRight: '10px'
    },

    appbarMiddle: {
        display: 'flex',
        flexGrow: '1',
        color: '#fff',
        justifyContent: 'center',
        textDecoration: 'none'
    },
    appbarRight: {
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'right',
    },

    appbarlink: {
        color: 'black',
        position: 'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: '15px',
        paddingLeft: '10px',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    appbarlink2: {
        color: 'black',
        position: 'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: '15px',
        paddingLeft: '10px',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    }

}))

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

