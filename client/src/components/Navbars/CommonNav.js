import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Button, Toolbar, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener, Hidden } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { calculateCartCount, getCart, getTotal, emtyTotalLogout, emptyCartLogout } from '../../_actions/index';
import { fetchProducts } from '../../_actions/productAction';
import { API_URL } from '../../_constants';
import useStyles from './CommonStyles';


const CommonNav = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const cartcount = useSelector(state => state.cart.cartCount)
    const [countDetails, countOfItems] = useState([]);
    // const [shop, setshop] = useState(1)



    let history = useHistory()
    useEffect(() => {
        var id = localStorage.getItem("userId");
        if (id != '0') {
            // const url = "http://localhost:3001/check/count/" + id;
            // axios.get(url).then((response) => {
            //     countOfItems(response.data);
            // });
        }

        localStorage.setItem("shop", 1);




    }, []);


    const setshop = (num) => {
        localStorage.setItem("shop", num);

    }

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
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <div className={classes.appbarLeft}>
                        <NavLink to={"/"} className={classes.appbarlink}> <Typography className={classes.appbarlink2}>Home</Typography></NavLink>
                        <NavLink to={'/shop'}
                            className={classes.appbarlink}
                            onClick={() => {
                                setshop(1);
                            }}
                        >
                            <Typography
                                className={classes.appbarlink2}
                                //change "endIcon to "endicon" for remove the warning - pramuka (check it)
                                endicon={<KeyboardArrowDownIcon>
                                    fontSize="0.5rem"
                                </KeyboardArrowDownIcon>}

                            >
                                Shop
                            </Typography>
                        </NavLink>
                        <NavLink to={"/customize"} className={localStorage.getItem("userId") == '0' ? classes.navInactive : classes.navActive}><Typography className={classes.appbarlink2}>Customize</Typography></NavLink>
                        <NavLink to={"/contactus"} className={classes.appbarlink}><Typography className={classes.appbarlink2}>Contact</Typography></NavLink>
                        <NavLink to={"/aboutUs"} className={classes.appbarlink}><Typography className={classes.appbarlink2}>About Us</Typography></NavLink>
                    </div>


                    <div className={classes.appbarMiddle}>
                        <NavLink to={"/"}><img src={require('../../images/logo.png').default} alt="CeylonFolk" height="30px" /></NavLink>
                    </div>

                    <div style={{ paddingLeft: '106px' }}>
                        <NavLink to={"/wishlist"}><FavoriteBorderOutlinedIcon className={classes.icon} /></NavLink>

                        <NavLink to={"/cart"}><LocalMallOutlinedIcon className={classes.iconCart} /><span className={classes.count}>
                            {cartcount}</span>
                        </NavLink>

                        <Button
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            className={classes.icon}

                        >
                            <NavLink to={"/auth"} className={localStorage.getItem("userId") == '0' ? classes.navlinkvisibilityTrue : classes.navlinkvisibility}><PermIdentityOutlinedIcon className={classes.iconLogin} /></NavLink>

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