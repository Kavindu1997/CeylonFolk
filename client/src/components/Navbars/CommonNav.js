import React from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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
        display: 'flex'
    },
    appbarTitle2:{
        flexGrow:'1',
        color:'#fff',
        justifyContent:'center'
    },
    appbarWrapper:{
        width:'100%',
        margin:'0 auto',
        color:"black",
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
                   <a href="/index"> <Typography color="white" style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>Home</Typography></a>
                   <a href="/shop"> 
                    <Typography 
                    color="white"  
                    style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}
                    endIcon={<KeyboardArrowDownIcon>
                        fontSize="0.5rem"
                    </KeyboardArrowDownIcon>}
                    >
                    Shop
                    </Typography>
                    </a>
                        
                 <a href="/contactus">  <Typography color="white" style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>Contact</Typography></a>
                 <a href="/auth">  <Typography color="white" style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>Auth</Typography></a>
                   </div> 
                 
                   <div className={classes.appbarTitle2}>
                      <img src={require('../../images/logo.png').default} alt="CeylonFolk" height="80px"/>
                   </div>
                   
              
                <IconButton>
                    <SearchOutlinedIcon className={classes.icon}/>
                    <FavoriteBorderOutlinedIcon className={classes.icon}/>
                    <LocalMallOutlinedIcon className={classes.icon}/>
                    <PermIdentityOutlinedIcon className={classes.icon}/>       
                </IconButton>

              </Toolbar>
            </AppBar>
        
        </div>
    );
};

export default CommonNav;