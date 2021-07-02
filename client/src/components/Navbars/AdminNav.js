import React from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';


const useStyles=makeStyles((theme)=>({
    root:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontFamily:'Segoe UI',
      color:'white'  
  },
  appbar:{
      background:'black'
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
      color:"#fff",
  },
  colorText:{
      color:'#052afa'
  },
  navfont:{
      color:'white',
      fontFamily:'Segoe UI'
  }

}))
const AdminNav = () => {
    const classes=useStyles();
 
    return (
        <div className={classes.root}> 
            <AppBar className={classes.appbar} elevation={0}>
               <Toolbar className={classes.appbarWrapper}>
                   <h1 className={classes.appbarTitle}>
                         Ceylon<span className={classes.colorText}>Folk</span>   
                   </h1>

                   <div className={classes.navfont}>
                    <Button href="#"  style={{textTransform: 'none',fontSize:'15px'}}>Home</Button>
                    <Button href="/admin"  style={{textTransform: 'none',fontSize:'15px'}}>Control Panel</Button>
                    <Button href="/users"  style={{textTransform: 'none',fontSize:'15px'}}>Users</Button>
                    <Button href="#"  style={{textTransform: 'none',fontSize:'15px'}}>Inventory</Button>
                    <Button href="#"  style={{textTransform: 'none',fontSize:'15px'}}>Orders</Button>
                   </div>

                    <IconButton>
                        < AccountCircleIcon className={classes.icon}/>
                    </IconButton>

                </Toolbar>
            </AppBar>
            
        
        </div>
    );
};

export default AdminNav;