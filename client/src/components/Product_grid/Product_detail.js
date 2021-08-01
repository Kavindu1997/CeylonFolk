import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Radio_buttons } from './Radio_buttons';
import {IconButton,Collapse,CardActions,CardContent} from '@material-ui/core';

import Collection1 from '../../images/ts1.jpg';
import butter2 from '../../images/butter2.jpg';
import NumericInput from 'react-numeric-input';


import {Card,Container,CardActionArea,CardMedia} from '@material-ui/core';

// import Collection1 from '../../images/collection1.jpg'
import Snap1 from '../../images/snap1.jpg'
import Snap2 from '../../images/snap2.jpg'
import Snap3 from '../../images/snap3.jpg'
import Snap4 from '../../images/snap4.jpg'
import Snap5 from '../../images/snap5.jpg'
import Carousel from 'react-elastic-carousel';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  productContainer:{
    padding: '40px',
    margin: '80px',
    width: '90%'
  },
  card:{
    width: '30%',
    paddingRight: '10px',
    marginRight: '10px',
    paddingBottom: '20px',
    marginBottom: '20px',
    border: 'none',
    boxShadow: 'none'
  },
  newGrid:{
    border: 'none',
    boxShadow: 'none',
  },
  goback:{
    paddingBottom: '20px',
    marginBottom: '10px',
    fontFamily: 'Montserrat',
    fontSize: '15px'
  },
  productTitle: {
    fontSize: '26px',
    fontWeight: '600',
    paddingBottom: '10px',
    marginBottom: '10px',
    fontFamily: 'Montserrat'
    
  },
  productPrice:{
    fontSize: '20px',
    fontWeight: '500',
    paddingBottom: '10px',
    marginBottom: '10px',
    fontFamily: 'Montserrat'
  },
  productDetails:{
    paddingLeft: '30px',
    marginLeft: '30px',
    paddingBottom: '20px',
    marginBottom: '20px'
  },
  productColor:{
    fontSize: '20px',
    fontWeight: '600',
    paddingBottom: '5px',
    marginBottom: '5px',
    fontFamily: 'Montserrat'
  },
  sizeBox:{
    width: '60px',
    border: 'ridge',
    borderColor: 'black',
    borderWidth: '2px',
    borderRadius: '10px',
    margin: '5px'
  },
  sizeText:{
    textAlign: 'center',
    padding: '5px',
    alignItems:'center'
  },
  designbtn:{
    color:'black',
    fontSize:'10px',
    padding:'2px',
    alignItems:'center',
    width:'50px',
    margin:'10px',
    background: '#31c5ee'

  },
  tBox:{
    marginBottom:'10px'
  },
  spanback:{
    display: 'inline-block',
    textIndent: '-9999px',
    verticalAlign: 'middle',
    height: '42px',
    width: '42px',
    margin: '0 5px 10px 0',
    boxShadow: 'inset 0 0 0 4px white',
    border: '1px solid #dcdcdc',
    borderRadius: '50%',
    backgroundImage: 'url(http://localhost:3000/static/media/ts1.e7b30a60.jpg)',
    backgroundSize: 'cover'
  },
  spanback2:{
    display: 'inline-block',
    textIndent: '-9999px',
    verticalAlign: 'middle',
    height: '42px',
    width: '42px',
    margin: '0 5px 10px 0',
    boxShadow: 'inset 0 0 0 4px white',
    border: '1px solid #dcdcdc',
    borderRadius: '50%',
    backgroundImage: 'url(http://localhost:3000/static/media/butter2.c4028f87.jpg)',
    backgroundSize: 'cover'
  },
  
  spaninput:{
    display: 'none',
    boxSizing: 'border-box',
    padding: '0',
    overflow: 'visible'
  }

}));

export const Product_detail = () => {
  const classes = useStyles();

  const [itemDetails, setOfItems] = useState([]);
  const [totalDetails, setOftotals] = useState([]); 
  const addToCart = () => {
    var uid = localStorage.getItem("userId");
    if (uid > 0) {
      const url = "http://localhost:3001/check/addToCart/"
      const dummyItem = {productId:'ID007', quantity:2, userId:uid, size:'M'}
      axios.post(url,dummyItem).then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          const url1 = "http://localhost:3001/check/items/" + uid;
          axios.get(url1).then((response) => {
            setOfItems(response.data);
          });
          const url2 = "http://localhost:3001/check/total/" + uid;
          axios.get(url2).then((response) => {
            setOftotals(response.data);
          });
        }
      });
      alert("Product successfully added to cart");
    }
    else {
      //TODO Update the local storage
      const dummyItem = {image: "https://5.imimg.com/data5/CR/OL/NO/ANDROID-36904487/img-20181220-wa0001-jpg-500x500.jpg", name: "Snowy", price: 1200, quantity: 10, itemId: "ID007", size: "S"}
      var cart = [];
      cart = JSON.parse(localStorage.getItem("cart"));
      console.log("point 1")
      cart.push(dummyItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product successfully added to cart");
    }
  };


  return (

    <Grid container className={classes.productContainer}>
      <CssBaseline></CssBaseline>
      <Grid item xs={2} sm={8} md={6} elevation={6} square style={{display:'flex'}} className>
        <Card className={classes.card}>
          <CardMedia>
              <img src={Collection1} style={{width:'100%'}}/>
          </CardMedia>
          <CardMedia>
          <img src={butter2} style={{width:'100%'}}/>
          </CardMedia>
        </Card>
        <Grid Container>
          <Box>
          <img src={Collection1} style={{width:'100%'}}/>
          </Box>
        </Grid>
      </Grid>
      
      <Grid item xs={2} sm={8} md={6} elevation={6} square>
        <Box className={classes.productDetails}>
        <Box className={classes.goback}>
          <Link>GO BACK</Link>
        </Box>
        <Box >
          <Typography className={classes.productTitle}>
            Butter
          </Typography>
          <Typography className={classes.productPrice}>
            LKR 1300.00
          </Typography>
          <Box>
          <Typography className={classes.productColor}>
            COLOR
          </Typography>
          </Box>
          <Box>
            {/* <RadioGroup row >
            <Radio style={{color:'red'}}></Radio>
            <Radio style={{color:'red'}}></Radio>

            </RadioGroup> */}
            <Box style={{display:'flex'}}>
            <label style={{cursor: 'pointer'}}>
              <input type="radio" className={classes.spaninput}></input>
              <span className={classes.spanback}></span>

            </label>
            <label style={{cursor: 'pointer'}}>
              <input type="radio" className={classes.spaninput}></input>
              <span className={classes.spanback2}></span>
            </label>
            </Box>
            
          </Box>
          <Box className={classes.tBox}>
          <Typography className={classes.productColor}>
            SIZE
          </Typography>
          <Box style={{display:'flex'}}>
            <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 6</Typography></Box>
            <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 8</Typography></Box>
            <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 10</Typography></Box>
            <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 12</Typography></Box>
            <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 14</Typography></Box>
            <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 16</Typography></Box>
            <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 16</Typography></Box>
            <center> <a href='../pages/customize'style={{textDecoration:'none'}}><Button 
                                    variant="outlined"
                                     className={classes.designbtn}>SIZE GUIDE</Button></a></center>
            
          </Box>

          </Box>
          <Box className={classes.tBox}>
          <Typography className={classes.productColor}>
            QUENTITY
          </Typography>
          <div>
        <NumericInput mobile min={0} max={100} value={1} size={ 1 }/>
      </div>
          </Box>
          
          <Button style={{background:'#2c2d2d',color:'white'}} onClick={addToCart}>ADD TO CART</Button>
        </Box>
          
        </Box>
        
      </Grid>
    </Grid>
    
  );
}