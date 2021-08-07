
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
import {useDispatch, useSelector} from "react-redux";

import { Radio_buttons } from './Radio_buttons';
import { IconButton, Collapse, CardActions, CardContent } from '@material-ui/core';
import CommonNav from '../../components/Navbars/CommonNav';

import Collection1 from '../../images/ts1.jpg';
import butter2 from '../../images/butter2.jpg';
import NumericInput from 'react-numeric-input';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {actionAddToCart} from '../../actions/index';
import {actionGetTotal} from '../../actions/index';


import { AppBar, Toolbar, Card, Container, CardActionArea, CardMedia } from '@material-ui/core';

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI',
    color: 'white',
    textDecoration: 'none'
},
appbar: {
    display: 'flex',
    padding: '5px',
    width: '100%',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    background: 'white'

},
appbarsolid: {
    backgroundColor: 'black'

},
icon: {
    color: 'black',
    fontSize: '1.5rem',
    marginLeft: '24px',
    marginRight: '10px',
    fontWeight: '300',
},
appbarTitle: {
    flexGrow: '1',
    color: '#fff',
    display: 'flex',
    fontFamily: 'Work Sans',
    textDecoration: 'none'
},
appbarTitle2: {
    flexGrow: '1',
    color: 'black',
    justifyContent: 'center',
    textDecoration: 'none'
},
appbarWrapper: {
    color: 'black',
    width: '100%',
    margin: '0 auto',
    height: '10px'
},
colorText: {
    color: 'black'
},
navbartext: {
    color: 'black',
    fontFamily: 'Segoe UI',
    textTransform: 'none',
    fontSize: '15px',
    textDecoration: 'none'
},
goDown: {
    color: '#fff',
    fontSize: '1rem',
},

appbarLeft: {
    display: 'flex',
    color: 'black',
    fontColor: 'black',
    fontFamily: 'Work Sans',
    textDecoration: 'none',
    marginLeft: '10px',
    marginRight: '10px'
},

appbarMiddle: {
    display: 'flex',
    flexGrow: '1',
    color: '#fff',
    justifyContent: 'center',
    textDecoration: 'none'
},
appbarRight: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'right',
},

appbarlink: {
    color: 'black',
    position: 'relative',
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: '15px',
    paddingLeft: '10px',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'none'
    }
},
appbarlink2: {
    color: 'black',
    position: 'relative',
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: '15px',
    paddingLeft: '10px',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'none'
    }
},

count: {
    background: 'cornflowerblue',
    padding: '5px',
    margin: '3px',
    borderRadius: '8px',
    position: 'absolute',
    top: '0%',
    right: '5.5%'
},

  root1: {
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
  productContainer: {
    padding: '40px',
    margin: '80px',
    width: '90%'
  },
  card: {
    width: '30%',
    paddingRight: '10px',
    marginRight: '10px',
    paddingBottom: '20px',
    marginBottom: '20px',
    border: 'none',
    boxShadow: 'none'
  },
  newGrid: {
    border: 'none',
    boxShadow: 'none',
  },
  goback: {
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
  productPrice: {
    fontSize: '20px',
    fontWeight: '500',
    paddingBottom: '10px',
    marginBottom: '10px',
    fontFamily: 'Montserrat'
  },
  productDetails: {
    paddingLeft: '30px',
    marginLeft: '30px',
    paddingBottom: '20px',
    marginBottom: '20px'
  },
  productColor: {
    fontSize: '20px',
    fontWeight: '600',
    paddingBottom: '5px',
    marginBottom: '5px',
    fontFamily: 'Montserrat'
  },
  sizeBox: {
    width: '60px',
    border: 'ridge',
    borderColor: 'black',
    borderWidth: '2px',
    borderRadius: '10px',
    margin: '5px'
  },
  sizeText: {
    textAlign: 'center',
    padding: '5px',
    alignItems: 'center'
  },
  designbtn: {
    color: 'black',
    fontSize: '10px',
    padding: '2px',
    alignItems: 'center',
    width: '50px',
    margin: '10px',
    background: '#31c5ee'

  },
  tBox: {
    marginBottom: '10px'
  },
  spanback: {
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
  spanback2: {
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

  spaninput: {
    display: 'none',
    boxSizing: 'border-box',
    padding: '0',
    overflow: 'visible'
  }

}));

export const Product_detail = () => {
  const classes = useStyles();
  var  count =[];
  const cartcount = useSelector(state => state.cartcount)
  const dispatch = useDispatch();
 

  const [countDetails, countOfItems] = useState([]);
  useEffect(() => {
    var id = localStorage.getItem("userId");
    if(id!="0"){
        const url = "http://localhost:3001/check/count/" + id;
      axios.get(url).then((response) => {
        countOfItems(response.data);
    });
    }
      
  }, []);


  const addToCart = () => {
   
    var uid = localStorage.getItem("userId");
    if (uid != '0') {
      const url = "http://localhost:3001/check/addToCart/"
      const dummyItem = { image: "https://5.imimg.com/data5/CR/OL/NO/ANDROID-36904487/img-20181220-wa0001-jpg-500x500.jpg",productId: 'ID007', quantity: 2, userId: uid, size: 'S' }
      axios.post(url, dummyItem).then((response) => {
        if (response.data.error) alert(response.data.error);
        dispatch({type: "INCREMENT_CART_NO"});
        dispatch(actionAddToCart(dummyItem));
        alert("Product successfully added to cart");
      const url1 = "http://localhost:3001/check/count/" + uid;
      axios.get(url1).then((response) => {
      countOfItems(response.data);
    });
      });  
    }
    else {
      //Update the local storage
      const dummyItem = { image: "https://5.imimg.com/data5/CR/OL/NO/ANDROID-36904487/img-20181220-wa0001-jpg-500x500.jpg", name: "Snowy", price: 1400, quantity: 2, itemId: "ID007", size: "S", totals: "" }
      var cart = [];
      dummyItem.totals=dummyItem.price*dummyItem.quantity;
      
      dispatch({type: "INCREMENT_CART_NO"});
      dispatch(actionAddToCart(dummyItem));
      dispatch(actionGetTotal(dummyItem.totals));
      alert("Product successfully added to cart");
    }
  };

  return (
    <div>
       <CommonNav />
            <CssBaseline />
    <Grid container className={classes.productContainer}>
      <CssBaseline></CssBaseline>
      <Grid item xs={2} sm={8} md={6} elevation={6} square style={{ display: 'flex' }} className>
        <Card className={classes.card}>
          <CardMedia>
            <img src={Collection1} style={{ width: '100%' }} />
          </CardMedia>
          <CardMedia>
            <img src={butter2} style={{ width: '100%' }} />
          </CardMedia>
        </Card>
        <Grid Container>
          <Box>
            <img src={Collection1} style={{ width: '100%' }} />
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
              <Box style={{ display: 'flex' }}>
                <label style={{ cursor: 'pointer' }}>
                  <input type="radio" className={classes.spaninput}></input>
                  <span className={classes.spanback}></span>

                </label>
                <label style={{ cursor: 'pointer' }}>
                  <input type="radio" className={classes.spaninput}></input>
                  <span className={classes.spanback2}></span>
                </label>
              </Box>

            </Box>
            <Box className={classes.tBox}>
              <Typography className={classes.productColor}>
                SIZE
              </Typography>
              <Box style={{ display: 'flex' }}>
                <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 6</Typography></Box>
                <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 8</Typography></Box>
                <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 10</Typography></Box>
                <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 12</Typography></Box>
                <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 14</Typography></Box>
                <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 16</Typography></Box>
                <Box className={classes.sizeBox}><Typography className={classes.sizeText}>UK 16</Typography></Box>
                <center> <a href='../pages/customize' style={{ textDecoration: 'none' }}><Button
                  variant="outlined"
                  className={classes.designbtn}>SIZE GUIDE</Button></a></center>

              </Box>

            </Box>
            <Box className={classes.tBox}>
              <Typography className={classes.productColor}>
                QUANTITY
              </Typography>
              <div>
                <NumericInput mobile min={0} max={100} value={1} size={1} />
              </div>
            </Box>

            <Button style={{ background: '#2c2d2d', color: 'white' }} onClick={addToCart}>ADD TO CART</Button>
          </Box>

        </Box>

      </Grid>
    </Grid>
    </div>

  );
}

