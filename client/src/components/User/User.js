import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './UserStyle'; 
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.instagram.com/ceylonfolk/?hl=en">
        CeylonFolk
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function User() {
    const classes = useStyles();

    return (
        <Grid container style={{margin:'150px'}}>
            <CssBaseline />
                <Grid item md={6}  > 
                        <Typography component="h1" variant="h5">Sign in</Typography>
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
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >Sign In</Button>
                            </form>
                    </Grid> 
                    <Grid item md={6}> 
                        <Typography component="h1" variant="h5">Sign Up</Typography>
                        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                autoComplete="mobileno"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
              />
            </Grid>
        </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body1">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
                    </Grid> 
                </Grid>





    //     <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //         <div className={classes.paper}>
    //             <Avatar className={classes.avatar}>
    //                 <LockOutlinedIcon />
    //             </Avatar>
    //         <Typography component="h1" variant="h5">Sign in</Typography>
    //         <form className={classes.form} noValidate>
    //             <TextField
    //                 variant="outlined"
    //                 margin="normal"
    //                 required
    //                 fullWidth
    //                 id="email"
    //                 label="Email Address"
    //                 name="email"
    //                 autoComplete="email"
    //                 autoFocus
    //             />

    //             <TextField
    //                 variant="outlined"
    //                 margin="normal"
    //                 required
    //                 fullWidth
    //                 name="password"
    //                 label="Password"
    //                 type="password"
    //                 id="password"
    //                 autoComplete="current-password"
    //             />

    //             <FormControlLabel
    //                 control={<Checkbox value="remember" color="primary" />}
    //                 label="Remember me"
    //             />

    //             <Button
    //                 type="submit"
    //                 fullWidth
    //                 variant="contained"
    //                 color="primary"
    //                 className={classes.submit}
    //             >Sign In</Button>
    //       <Grid container>
    //         <Grid item xs>
    //           <Link href="#" variant="body2">
    //             Forgot password?
    //           </Link>
    //         </Grid>
    //         <Grid item>
    //           <Link href="/signup" variant="body2">
    //             {"Don't have an account? Sign Up"}
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </div>
    //   <Box mt={3}>
    //     <Copyright />
    //   </Box>
    // </Container>
  );
}