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

import { Radio_buttons } from './Radio_buttons';
import {IconButton,Collapse,CardActions,CardContent} from '@material-ui/core';

import Collection1 from '../../images/ts1.jpg';
import butter2 from '../../images/butter2.jpg';
import whiteBox from '../../images/black.jpg';



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
    paddingBottom: '10px',
    marginBottom: '10px',
    fontFamily: 'Montserrat'
  }
}));

export const Product_detail = () => {
  const classes = useStyles();

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
          <img src={butter2} style={{width:'100%'}}/>
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
          <Box>
            {/* <label>
            <input type="radio"></input>
              <span style={{ backgroundImage:`url(${whiteBox})`}}></span>

            </label> */}
            
            
          </Box>

          </Box>
          
        </Box>
          
        </Box>
        
      </Grid>
    </Grid>
    
  );
}