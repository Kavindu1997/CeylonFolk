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
import { makeStyles } from '@material-ui/core/styles';

import { Radio_buttons } from './Radio_buttons';



import {Card,Container,CardActionArea,CardMedia} from '@material-ui/core';

import Collection1 from '../../images/collection1.jpg'
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
}));

export const Product_detail = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={false} sm={4} md={7}  >

      <Container className={classes.collectionContainer} maxWidth="lg">
                <Typography variant="h4" className={classes.collectionTitle}>Customer Snaps</Typography>
            <Grid container spacing={0}>
                        <Carousel>   
                            <Grid item xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                                <CardMedia
                                                className={classes.media}
                                                style={{ backgroundImage:`url(${Collection1})`,height:'450px'}}
                                                title="Snap1"
                                                />      
                                           </CardActionArea>
                                    </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                    <CardMedia
                                                    className={classes.media}
                                                    style={{ backgroundImage:`url(${Snap1})`,height:'450px'}}
                                                    title="Snap2"
                                                    />
                                            </CardActionArea>
                                        </Card>
                            </Grid>    
                            <Grid item xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                    <CardMedia
                                                    className={classes.media}
                                                    style={{ backgroundImage:`url(${Snap3})`,height:'450px'}}
                                                    title="Snap3"
                                                    />                                          
                                            </CardActionArea>
                                        </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                    <CardMedia
                                                    className={classes.media}
                                                    style={{ backgroundImage:`url(${Snap4})`,height:'450px'}}
                                                    title="Sanp4"
                                                    />                                          
                                            </CardActionArea>
                                        </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                    <CardMedia
                                                    className={classes.media}
                                                    style={{ backgroundImage:`url(${Snap5})`,height:'450px'}}
                                                    title="Snap5"
                                                    />                                          
                                            </CardActionArea>
                                        </Card>
                            </Grid>
                        </Carousel>     
            </Grid>
            </Container>


</Grid>





      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
      
          <Typography component="h1" variant="h5">
            Snowy
          </Typography>
          
           
          <Typography component="h1" >
            Rs 1500
          </Typography>

          <Radio_buttons/>

           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             Add to Cart
            </Button>
        
         
        </div>
      </Grid>
    </Grid>
  );
}