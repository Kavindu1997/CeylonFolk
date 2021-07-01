import React from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar} from '@material-ui/core';
import LocalMallSharpIcon from '@material-ui/icons/LocalMallSharp';
import { makeStyles } from '@material-ui/styles';



const useStyles=makeStyles((theme)=>({
      root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'Segoe UI', 
    },
    appbar:{
        background:'#2C2D2D',
    },
    icon:{
        color:'white',
        fontSize:'1.5rem'
    },
    appbarTitle:{
        flexGrow:'1',
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
        color: 'white'
    },
  
 }))

const CommonNav = () => {
    const classes=useStyles();
 
    return (
        <div className={classes.root}> 
            <AppBar className={classes.appbar} elevation={0}>
               <Toolbar className={classes.appbarWrapper}>
                   <h1 className={classes.appbarTitle}>
                         Ceylon<span className={classes.colorText}>Folk</span>   
                   </h1>
                   <div className={classes.navbartext}>
                   <Button color="white" href="/index"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Home</Button>
                <Button color="white"  href="/shop"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Shop</Button>
                <Button color="white" href="/contactus"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Contact us</Button>
                <Button color="white" href="/login"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Login</Button>

                   </div>
               
                

                <IconButton>
                       <LocalMallSharpIcon className={classes.icon}/>
                </IconButton>

              </Toolbar>
            </AppBar>
            
        
        </div>
    );
};

export default CommonNav;