import React, { useEffect, useState } from 'react';
import { Popper, MenuItem, MenuList, AppBar, Typography, Button, IconButton, Toolbar, Link, Paper, ClickAwayListener, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../../images/logo.png';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import {calculateCartCount, getCart, getTotal,  emtyTotalLogout, emptyCartLogout } from '../../_actions/index';
import { fetchProducts } from '../../_actions/productAction';
import { useHistory } from 'react-router';
import {API_URL} from '../../_constants';

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
        background: 'none'

    },
    appbarsolid: {
        backgroundColor: 'white',
        border: '#2d2d2d'

    },
    icon: {
        color: 'black',
        fontSize: '1.5rem',
        marginLeft: '24px',
        marginRight: '10px',
        fontWeight: '300',
        '&:hover': {
            background: 'none',
        }
    },
    iconCart: {
        color: 'black',
        fontSize: '1.5rem',
        marginLeft: '24px',
        marginRight: '3px',
        fontWeight: '300',
        visibility: 'visible'
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#fff',
        display: 'flex',
        fontFamily: 'Open Sans',
        textDecoration: 'none'
    },
    appbarTitle2: {
        flexGrow: '1',
        color: '#fff',
        justifyContent: 'center',
        textDecoration: 'none'
    },
    appbarWrapper: {
        color: 'black',
        width: '100%',
        margin: '0 auto'
    },
    colorText: {
        color: 'white'
    },
    navbartext: {
        color: 'white',
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
        fontFamily: 'Open Sans',
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
    },

    count: {
        top: '4%',
        right: '7.2%',
        height: '25px',
        width: "25px",
        /* margin: 3px; */
        verticalAlign: 'middle',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2px',
        position: 'absolute',
        background: '#020303',
        borderRadius: '50%',
        color: 'white',

    },
    navlinkvisibility: {
        pointerEvents: "none",
    },
    navlinkvisibilityTrue: {
        pointerEvents: "auto",
    },
    visibility: {
        visibility: 'hidden'
    },
    navActive:{
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
    navInactive:{
        display: 'none',

    }


}))

const CommonNav = () => {
    const cartcount = useSelector(state => state.cart.cartCount)

    const dispatch = useDispatch();
    const [countDetails, countOfItems] = useState([]);
    let history = useHistory()
    const classes = useStyles();
    const [navBackground, setNavBackground] = useState('appbar')
    const navRef = React.useRef()
    navRef.current = navBackground
    useEffect(() => {
        var id = localStorage.getItem("userId");
        if (id != '0') {
            const url = API_URL+"/check/count/" + id;
            axios.get(url).then((response) => {
                countOfItems(response.data);
            });
        }

        const handleScroll = () => {
            const show = window.scrollY > 310
            if (show) {
                setNavBackground('appbarsolid')
            } else {
                setNavBackground('appbar')
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

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


    function onLogout() {
        localStorage.clear()
        localStorage.setItem("userId", 0)
        history.push("/")
        dispatch(getCart())
        dispatch(getTotal())
        dispatch(emptyCartLogout());
        dispatch(emtyTotalLogout());
        dispatch(calculateCartCount())
        dispatch(fetchProducts());
    }


    return (
        <div className={classes.root}>
            <AppBar className={classes[navRef.current]} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <div className={classes.appbarLeft}>
                        <NavLink to={"/"} className={classes.appbarlink}> <Typography className={classes.appbarlink2}>Home</Typography></NavLink>
                        <NavLink to={'/shop'} className={classes.appbarlink}>
                            <Typography
                                className={classes.appbarlink2}
                                endIcon={<KeyboardArrowDownIcon>
                                    fontSize="0.5rem"
                                </KeyboardArrowDownIcon>}
                            >
                                Shop
                            </Typography>
                        </NavLink>
                        <NavLink to={"/customize"} className={localStorage.getItem("userId") == '0' ? classes.navInactive : classes.navActive}><Typography className={classes.appbarlink2}>Customize</Typography></NavLink>
                        <NavLink to={"/contactus"} className={classes.appbarlink}><Typography className={classes.appbarlink2}>Contact</Typography></NavLink>
                        <NavLink to={"/aboutUs"} className={classes.appbarlink} ><Typography className={classes.appbarlink2}>About Us</Typography></NavLink>
                    </div>


                    <div className={classes.appbarMiddle}>
                        <NavLink to={"/"}><img src={require('../../images/logo.png').default} alt="CeylonFolk" height="36px" /></NavLink>
                    </div>

                    <div style={{ paddingLeft: '106px', transition: 'none', overflow: 'hidden', borderRadius: '0px' }}>
                        <NavLink to={"/wishlist"}><FavoriteBorderOutlinedIcon className={classes.icon} /></NavLink>
                        <NavLink to={"/cart"}><LocalMallOutlinedIcon className={classes.iconCart} /><span className={classes.count}>
                            {cartcount}</span>
                        </NavLink>
                        {/* <NavLink to={"/auth"}><PermIdentityOutlinedIcon className={classes.icon}/></NavLink> */}
                        <Button
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            className={classes.icon}

                        >
                            <NavLink to={"/auth"} className={localStorage.getItem("userId") == '0' ? classes.navlinkvisibilityTrue : classes.navlinkvisibility}><PermIdentityOutlinedIcon className={classes.iconLogin} /></NavLink>
                            {/* <Avatar>JP</Avatar> */}
                        </Button>
                        <div className={localStorage.getItem("userId") == '0' ? classes.visibility : classes.icon}>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>

                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <NavLink to={"/profile"} style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px', color: 'black' }}>My Account</MenuItem></NavLink>
                                                    <NavLink to={"/myOrders"} style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px', color: 'black' }}>Order History</MenuItem></NavLink>
                                                    <NavLink to={"/myWishlist"} style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px', color: 'black' }}>My Wishlist</MenuItem></NavLink>
                                                    <NavLink to={"/deposit"} style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px', color: 'black' }}>Bank Deposit Upload</MenuItem></NavLink>
                                                    <NavLink to={"/custcustomizeOrders"} style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px', color: 'black' }}>Customerize Orders</MenuItem></NavLink>
                                                    <NavLink to={"/"} style={{ textDecoration: 'none' }} onClick={onLogout}><MenuItem onClick={handleClose} style={{ fontWeight: '600', fontSize: '15px', color: 'black' }}>Logout</MenuItem></NavLink>
                                                </MenuList>


                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>

                    </div>

                </Toolbar>

            </AppBar>

        </div>
    );
};

export default CommonNav;