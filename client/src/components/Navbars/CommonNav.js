import React from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar} from '@material-ui/core';
import LocalMallSharpIcon from '@material-ui/icons/LocalMallSharp';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



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
        fontSize:'1.5rem'
    },
    appbarTitle:{
        flexGrow:'1',
        color:'#fff',
    },
    appbarTitle2:{
        flexGrow:'2',
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
                    <Button color="white" href="/index"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'uppercase',fontSize:'15px',fontWeight:'100'}}>Home</Button>
                    <Button color="white"  href="/shop"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'uppercase',fontSize:'15px',fontWeight:'100'}}>Shop<IconButton>
                        <ExpandMoreIcon className={classes.goDown}/>
                    </IconButton>
                    </Button>
                    <Button color="white" href="/contactus"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'uppercase',fontSize:'15px',fontWeight:'100'}}>Contact</Button>
                    <Button color="white" href="/contactus"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'uppercase',fontSize:'15px',fontWeight:'100'}}>About us</Button>
                    <Button color="white" href="/login"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'uppercase',fontSize:'15px',fontWeight:'100'}}>Login</Button>
                   </div> 
                   <div className={classes.appbarTitle2}>
                      <img src={require('../../images/logo.png').default} alt="CeylonFolk" height="80px"/>
                   </div>
                   
                   {/* <div className={classes.navbartext}>
                    <Button color="white" href="/index"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'none',fontSize:'15px',fontWeight:'100'}}>Home</Button>
                    <Button color="white"  href="/shop"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'none',fontSize:'15px',fontWeight:'100'}}>Shop</Button>
                    <Button color="white" href="/contactus"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'none',fontSize:'15px',fontWeight:'100'}}>Contact us</Button>
                    <Button color="white" href="/login"  style={{color:'white',fontFamily:'Segoe UI',textTransform: 'none',fontSize:'15px',fontWeight:'100'}}>Login</Button>
                   </div> */}

                <IconButton>
                       <LocalMallSharpIcon className={classes.icon}/>
                </IconButton>

              </Toolbar>
            </AppBar>
        
        </div>
    );
};

export default CommonNav;