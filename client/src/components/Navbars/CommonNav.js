import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Button, IconButton, Toolbar, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../../images/logo.png';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
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
    },

    count: {
        background: 'cornflowerblue',
        padding: '5px',
        margin: '3px',
        borderRadius: '8px',
        position: 'absolute',
        top: '0%',
        right: '5.5%'
    }

}))

const CommonNav = (props) => {
    const classes = useStyles();
    const cartcount = useSelector(state => state.cart.cartCount)
    console.log(cartcount)
  const dispatch = useDispatch();
    const [countDetails, countOfItems] = useState([]);
    useEffect(() => {
    var id = localStorage.getItem("userId");
    if(id!='0'){
        const url = "http://localhost:3001/check/count/" + id;
        axios.get(url).then((response) => {
        countOfItems(response.data);
    });
    }
      
  }, []);

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

                    <div style={{ paddingLeft: '106px' }}>
                        <NavLink to={"/shop"}><SearchOutlinedIcon className={classes.icon} /></NavLink>
                        <NavLink to={"/wishlist"}><FavoriteBorderOutlinedIcon className={classes.icon} /></NavLink>
                        
                        <NavLink to={"/cart"}><LocalMallOutlinedIcon className={classes.icon} /><span className={classes.count}>
                       {cartcount}</span>
                        </NavLink>
                        <NavLink to={"/auth"}><PermIdentityOutlinedIcon className={classes.icon} /></NavLink>
                    </div>

                </Toolbar>

            </AppBar>

        </div>
    );
};

export default CommonNav;