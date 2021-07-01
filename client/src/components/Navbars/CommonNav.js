import React from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar} from '@material-ui/core';
import LocalMallSharpIcon from '@material-ui/icons/LocalMallSharp';
import { makeStyles } from '@material-ui/styles';



const useStyles=makeStyles((theme)=>({
      root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'Nunito',   
    },
    appbar:{
        background:'none'
    },
    icon:{
        color:'#fff',
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
        color:'black'
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
               
                <Button color="inherit" href="/index"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Home</Button>
                <Button color="inherit"  href="/shop"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Shop</Button>
                <Button color="inherit" href="/contactus"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Contact us</Button>
                <Button color="inherit" href="/login"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Login</Button>

                <IconButton>
                       <LocalMallSharpIcon className={classes.icon}/>
                </IconButton>

              </Toolbar>
            </AppBar>
            
        
        </div>
    );
};

export default CommonNav;