import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles'; 

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        height:'1000px',
        fontFamily:'Montserrat',
        position:'relative',
        color: 'white',
        padding: '100px',
       
    },
    form: {
        width: '70%',
        marginTop: theme.spacing(2),
        fontFamily:'Montserrat',
    },
    submit: {
      align:'center',
      padding:'10px',
      marginTop:'30px',
    },
  }));

export default function User() {
    const classes = useStyles();

    return (
        <container>
            <CssBaseline />
            <Typography variant="h5" style={{marginTop:'50px',textAlign: 'center',backgroundColor:'#C6C6C6',padding:'30px',fontFamily:'Montserrat'}}> MY ACCOUNT</Typography>
            <center>
            <Grid container style={{marginTop:'50px',align:'center'}}>
                <Grid item xs={12} sm={12} md={6} lg={6}> 
                    <Typography component="h1" variant="h5" style={{fontFamily:'Montserrat',textAlign:'center'}}>Already Registered?</Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            style={{float:'left'}}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Login</Button>
                    </form>
                </Grid>  
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography component="h1" variant="h5" style={{fontFamily:'Montserrat',textAlign:'center'}}>New Member?</Typography> 
                    <form className={classes.form} noValidate>
                        <Grid item  xs={12} sm={12} spacing={1}  container>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"                                                                       
                                    autoComplete="fname"
                                />
                            </Grid>
                            <Grid item  xs={12} sm={6} >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="mobileNumber"
                            label="Mobile Number"
                            type="password"
                            id="mobileNumber"
                            autoComplete="mobileno"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="confirm-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Accept Terms & Condition"
                            style={{float:'left'}}/>
                        <Button
                            type="submit"
                             fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Register</Button>
                    </form>
                </Grid>  
            </Grid>
            </center>
        </container>
        
  );
}
