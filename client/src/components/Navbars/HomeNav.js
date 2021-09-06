import React, { useEffect, useState } from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar,Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../../images/logo.png';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'Segoe UI', 
        color:'white',
        textDecoration: 'none'
    },
    appbar:{
        display: 'flex',
    padding: '5px',
    width: '100%',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    background: 'none'
        
    },
    appbarsolid:{
        backgroundColor: 'white',
        border: '#2d2d2d'

    },
    icon:{
        color:'black',
        fontSize:'1.5rem',
        marginLeft: '24px',
        marginRight:'10px',
        fontWeight:'300',
        

    },
    appbarTitle:{
        flexGrow:'1',
        color:'#fff',
        display: 'flex',
        fontFamily: 'Open Sans',
        textDecoration: 'none'
    },
    appbarTitle2:{
        flexGrow:'1',
        color:'#fff',
        justifyContent:'center',
        textDecoration: 'none'
    },
    appbarWrapper:{
        color: 'black',
    width: '100%',
    margin: '0 auto'
    },
    colorText:{
        color:'white'
    },
    navbartext:{
        color: 'white',
        fontFamily:'Segoe UI',
        textTransform: 'none',
        fontSize:'15px',
        textDecoration:'none'
    },
    goDown:{
        color:'#fff',
        fontSize:'1rem',
    },

    appbarLeft:{
        display: 'flex',
        color:'black',
        fontColor:'black',
        fontFamily: 'Open Sans',
        textDecoration: 'none',
        marginLeft: '10px',
        marginRight: '10px'
    },

    appbarMiddle:{
        display: 'flex',
        flexGrow:'1',
        color:'#fff',
        justifyContent:'center',
        textDecoration: 'none'
    },
    appbarRight:{
        display: 'flex',
        flexGrow:'1',
        justifyContent:'right',
    },

    appbarlink:{
        color:'black',
        position:'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize:'15px',
        paddingLeft:'10px',
        textDecoration:'none',
        '&:hover':{
            textDecoration:'none'
        }
    },
    appbarlink2:{
        color:'black',
        position:'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize:'15px',
        paddingLeft:'10px',
        textDecoration:'none',
        '&:hover':{
            textDecoration:'none'
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

const CommonNav = () => {
    const cartcount = useSelector(state => state.cart.cartCount)
  const dispatch = useDispatch();

    const classes=useStyles();
    const [navBackground, setNavBackground] = useState('appbar')
    const navRef = React.useRef()
    navRef.current = navBackground
    useEffect(() => {
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
                        <NavLink to={"/contactus"} className={classes.appbarlink}><Typography className={classes.appbarlink2}>Contact</Typography></NavLink>
                        <NavLink to={"/aboutUs"} className={classes.appbarlink}><Typography className={classes.appbarlink2}>About Us</Typography></NavLink>
                   </div> 
                   
                 
                   <div className={classes.appbarMiddle}>
                    <NavLink to={"/"}><img src={require('../../images/logo.png').default} alt="CeylonFolk" height="36px"/></NavLink>
                   </div>                  
             
                <div style={{paddingLeft:'106px' ,transition:'none', overflow:'hidden', borderRadius:'0px'}}>
                    <NavLink to={"/auth"}><SearchOutlinedIcon className={classes.icon}/></NavLink>
                    <NavLink to={"/wishlist"}><FavoriteBorderOutlinedIcon className={classes.icon}/></NavLink>
                    <NavLink to={"/cart"}><LocalMallOutlinedIcon className={classes.icon} /><span className={classes.count}>
                       {cartcount}</span>
                        </NavLink>
                    <NavLink to={"/auth"}><PermIdentityOutlinedIcon className={classes.icon}/></NavLink>
                </div>

                </Toolbar>
                   
            </AppBar>
        
        </div>
    );
};

export default CommonNav;