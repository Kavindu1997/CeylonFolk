import React from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const Navbar = () => {
    const classes=makeStyles();
    return (
        <div> 
            <AppBar position="static" color="transparent">
               <Toolbar>
                   <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                       {/* <MenuIcon /> */}
                   </IconButton>
                <Typography variant="h6" className={classes.title}>
                         CeylonFolk
                </Typography>
                <Button color="inherit" href="/index">Home</Button>
                <Button color="inherit"  href="/shop">Shop</Button>
                <Button color="inherit" href="/about">About</Button>
                <Button color="inherit" href="/contactus">ContactUs</Button>
                <Button color="inherit" href="/login">Login</Button>
              </Toolbar>
            </AppBar>
            
        </div>
    );
};

export default Navbar;