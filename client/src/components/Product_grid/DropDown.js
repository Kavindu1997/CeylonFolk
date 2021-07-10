import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/styles';

import {Typography,IconButton,Collapse,Box,Container,Card,CardActionArea,CardActions,CardContent,CardMedia} from '@material-ui/core';

const options = ['Collection','Snowy', 'Marvel'];


const useStyles=makeStyles((theme)=>({
  root:{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      height:'1000px',
      fontFamily:'Segoe UI' ,
      backgroundImage:`linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${Image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      position:'relative',
      padding: '100px',
      color: 'white'
    
  },
  backimage: {
      marginTop: '60px'

  },
  colorText:{
      color:'#31C5EE',
      fontSize:'4rem',
  },
  title:{
   color:'white',
   fontSize:'3rem',
   textAlign: 'left',
   fontFamily:'Segoe UI',
  },
  container:{
      textAlign:'left'
  },
  goDown:{
      color:'#fff',
      fontSize:'4rem'
  },
  collectionContainer:{
      paddingTop:'24px'
  },
  collectionTitle:{
      marginTop: '30px',
      fontWeight:'300',
      paddingBottom:'24px',
      textAlign:'center',
      fontFamily:'Segoe UI',
      padding: '50px',
  },
  card:{
      maxWidth:'95%'
      
  },
  media:{
      height:'240px',
     
  }

}));


export const DropDown = () => {
  const classes=useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
      <div>

    <Typography variant="h4" className={classes.collectionTitle}>WORK WEAR</Typography>
            <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>






        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
    </div>
  
  );
}
