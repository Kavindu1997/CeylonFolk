import React from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';


const useStyles=makeStyles((theme)=>({
    root:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontFamily:'Nunito',   
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
               
                <Button color="inherit" href="#"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Home</Button>
                <Button color="inherit"  href="/admin"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Control Panel</Button>
                <Button color="inherit" href="/users"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Users</Button>
                <Button color="inherit" href="#"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Inventory</Button>
                <Button color="inherit" href="#"  style={{textTransform: 'none',fontFamily:'Nunito',fontSize:'15px'}}>Orders</Button>
                

                <IconButton>
                       < AccountCircleIcon className={classes.icon}/>
                </IconButton>

              </Toolbar>
            </AppBar>
            
        
        </div>
    );
};

export default AdminNav;