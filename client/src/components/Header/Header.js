import React, { useEffect, useState } from 'react';
import { AppBar,Typography,Button,IconButton,Toolbar,Collapse} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import useStyles from './styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Header = () => {
    const classes=useStyles();
    const [checked,setChecked]=useState(false);
    useEffect(()=>{
         setChecked(true);
    },[])

    return (
        <div className={classes.root}> 
            <AppBar className={classes.appbar} elevation={0}>
               <Toolbar className={classes.appbarWrapper}>
                   <h1 className={classes.appbarTitle}>
                         Ceylon<span className={classes.colorText}>Folk</span>   
                   </h1>
               
                <Button color="#000" href="/index">Home</Button>
                <Button color="#000"  href="/shop">Shop</Button>
                <Button color="#000" href="/contactus">Contact us</Button>
                <Button color="#000" href="/login">Login</Button>

                <IconButton>
                       <ShoppingCartIcon className={classes.icon}/>
                </IconButton>

              </Toolbar>
            </AppBar>
            
            <Collapse in={checked}  {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
            <div className={classes.container}>
                <h1 className={classes.title}>
                    Welcome to <br/>Ceylon
                    <span className={classes.colorText}>Folk</span>   
                </h1>
                <IconButton>
                    <ExpandMoreIcon className={classes.goDown}/>
                </IconButton>
            </div>
            </Collapse> 
        </div>
    );
};

export default Header;