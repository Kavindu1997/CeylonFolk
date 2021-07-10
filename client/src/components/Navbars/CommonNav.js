import React, { useEffect, useState } from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar,Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../../images/logo.png';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';



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
    padding: '10px',
    width: '100%',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    background: '#2D2D2D'
        
    },
    appbarsolid:{
        backgroundColor: 'black'

    },
    icon:{
        color:'white',
        fontSize:'1.5rem',
        marginLeft: '24px',
        marginRight:'10px',
        fontWeight:'300',
    },
    appbarTitle:{
        flexGrow:'1',
        color:'#fff',
        display: 'flex',
        fontFamily: 'Work Sans',
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
    margin: '0 auto',
    height: '10px'
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
        fontFamily: 'Work Sans',
        textDecoration: 'none',
        marginLeft: '10px',
        marginRight: '10px'
    },

    appbarMiddle:{
        display: 'flex',
        flexGrow:'1',
        color:'#fff',
        justifyContent:'center',
        textDecoration: 'none',
        marginTop:'15px'
    },
    appbarRight:{
        display: 'flex',
        flexGrow:'1',
        justifyContent:'right',
    },

    appbarlink:{
        color:'white',
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
        color:'white',
        position:'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize:'15px',
        paddingLeft:'10px',
        textDecoration:'none',
        '&:hover':{
            textDecoration:'none'
        }
    }
     
 }))

const CommonNav = () => {
    const classes=useStyles();
 
    return (
        <div className={classes.root}> 
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                <div className={classes.appbarLeft}>
                        <Link href="/index" className={classes.appbarlink}> <Typography className={classes.appbarlink2}>Home</Typography></Link>
                        <Link href="/shop" className={classes.appbarlink}> 
                            <Typography 
                            className={classes.appbarlink2}
                            endIcon={<KeyboardArrowDownIcon>
                                fontSize="0.5rem"
                            </KeyboardArrowDownIcon>}
                            >
                            Shop
                            </Typography>
                        </Link>                       
                        <Link href="/contactus" className={classes.appbarlink}><Typography className={classes.appbarlink2}>Contact</Typography></Link>
                        <Link href="#" className={classes.appbarlink}><Typography className={classes.appbarlink2}>About Us</Typography></Link>
                   </div> 
                   
                 
                   <div className={classes.appbarMiddle}>
                    <Link href="/index"><img src={require('../../images/logo.png').default} alt="CeylonFolk" height="120px"/></Link>
                   </div>                  
             
                <IconButton style={{paddingLeft:'106px'}}>
                    <Link href="/auth"><SearchOutlinedIcon className={classes.icon}/></Link>
                    <Link href="/auth"><FavoriteBorderOutlinedIcon className={classes.icon}/></Link>
                    <Link href="/cart"><LocalMallOutlinedIcon className={classes.icon}/></Link>
                    <Link href="/auth"><PermIdentityOutlinedIcon className={classes.icon}/></Link>
                </IconButton>

                </Toolbar>
                   
            </AppBar>
        
        </div>
    );
};

export default CommonNav;