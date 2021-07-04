import React from 'react';
import { AppBar,Typography,Button,IconButton,CardMedia,Toolbar,Box} from '@material-ui/core';
import LocalMallSharpIcon from '@material-ui/icons/LocalMallSharp';
import { makeStyles } from '@material-ui/styles';
import logo from '../../images/cf_logo_long.png';
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
        flexGrow:'2',
        color:'#fff',
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
                    <Typography color="white" href="/index"   style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>Home</Typography>
                    <Typography 
                    color="white"  
                    href="/shop"  
                    style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}
                    endIcon={<KeyboardArrowDownIcon>
                        fontSize="0.5rem"
                    </KeyboardArrowDownIcon>}
                    >
                    Shop
                    </Typography>
                        
                    <Typography color="white" href="/contactus"  style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>Contact</Typography>
                    <Typography color="white" href="/contactus"  style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>About us</Typography>
                    <Typography color="white" href="/login"  style={{color:'white',position:'relative',textTransform: 'uppercase',fontWeightMedium: '500',fontSize:'15px',paddingLeft:'10px'}}>Login</Typography>
                   </div> 
                   <div>
            
                   </div>
                   
                   {/* <div className={classes.navbartext}>
                    <Button color="white" href="/index"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'none',fontSize:'15px',fontWeight:'100'}}>Home</Button>
                    <Button color="white"  href="/shop"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'none',fontSize:'15px',fontWeight:'100'}}>Shop</Button>
                    <Button color="white" href="/contactus"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'none',fontSize:'15px',fontWeight:'100'}}>Contact us</Button>
                    <Button color="white" href="/login"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'none',fontSize:'15px',fontWeight:'100'}}>Login</Button>
                   </div> */}

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