import React from 'react';
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
        color:'white'
    },
    appbar:{
        background:'#2C2D2D',
    },
    icon:{
        color:'white',
        fontSize:'1.5rem',
        marginLeft: '20px',
        marginRight:'20px',
        fontWeight:'300'
    },
    appbarTitle:{
        flexGrow:'1',
        color:'#fff',
        display: 'flex',
        fontFamily: 'Work Sans'
    },
    appbarTitle2:{
        flexGrow:'1',
        color:'#fff',
        justifyContent:'center'
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
        fontSize:'15px'
    },
    goDown:{
        color:'#fff',
        fontSize:'1rem',
    },
  
 }))

const CommonNav = () => {
    const classes=useStyles();
 
    return (
        <div className={classes.root}> 
            <AppBar className={classes.appbar} elevation={0}>
               <Toolbar className={classes.appbarWrapper}>
                   <div className={classes.appbarTitle}>
                   <Link href="/index"> <Typography color="white" style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>Home</Typography></Link>
                   <Link href="/shop"> 
                    <Typography 
                    color="white"  
                    style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}
                    endIcon={<KeyboardArrowDownIcon>
                        fontSize="0.5rem"
                    </KeyboardArrowDownIcon>}
                    >
                    Shop
                    </Typography>
                    </Link>                       
                    <Link href="/contactus"><Typography color="white" style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>Contact</Typography></Link>
                    <Link href="#"><Typography color="white" style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>About Us</Typography></Link>
                   </div> 
                 
                   <div className={classes.appbarTitle2}>
                   <Link href="/index"><img src={require('../../images/logo.png').default} alt="CeylonFolk" height="80px"/></Link>
                   </div>                  
             
                <IconButton>
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