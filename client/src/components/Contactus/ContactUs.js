import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '70px',
    width:'70%',
    margin:'10px auto',   
    padding:theme.spacing(5)
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  }
}));

export default function ConatactUs() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Let's Connect with us!!!
          </Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>
         
        </Grid>
        </form>
        </div>   
      </Grid>
    
      <Grid item xs={12} sm={4} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PhoneInTalkIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            
          </Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>
         
        </Grid>
        </form>
        </div>   
      </Grid>
    
    </Grid>
  );
}