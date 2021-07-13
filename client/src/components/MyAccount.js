import React from 'react';
import { Button, CssBaseline, TextField, Grid, Typography, FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: '1000px',
        fontFamily: 'Montserrat',
        position: 'relative',
        color: 'white',
        padding: '100px',
    },
    table: {
        // minWidth: 400,
        backgroundColor: '#fafafa',
        fontFamily: 'Montserrat',
        width: '600px'
        // marginRight: '30px'
    },
    form: {
        width: '60%',
        marginTop: theme.spacing(2),
        fontFamily: 'Montserrat',
        alignItems: 'center',
        // backgroundColor:'#fafafa'
    },
    field: {
        width: '800px',
        // marginTop: theme.spacing(2),
        fontFamily: 'Montserrat',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },
    submit: {
        align: 'center',
        padding: '10px',
        marginTop: '30px',
        width: '450px'
    },
    margin: {
        margin: theme.spacing(2),
        width: '50ch',
        // marginRight: '50px'
    },
    avatar: {
        align: 'left'
    },
    listItemText: {
        fontSize: '3.0em',//Insert your required size
        marginLeft: '20px',
    },
    //   withoutLabel: {
    //     marginTop: theme.spacing(3),
    //   },
    //   textField: {
    //     width: '25ch',
    //   },
}));

export default function MyAccount() {
    const classes = useStyles();
    // const [value, setValue] = React.useState('payment');

    //   const handleChange = (event) => {
    //     setValue(event.target.value);
    //   };

    const [values, setValues] = React.useState({
        // amount: '',
        password: '',
        // weight: '',
        // weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <container>
            <CssBaseline />
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> MY ACCOUNT</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div>
                            <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'center', fontWeight: 600 }}>Hello </Typography>
                            <List style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ marginLeft: '130px' }}>TP</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText><Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', marginLeft: '15px', fontWeight: 600 }}>Tanya Peries</Typography></ListItemText>
                                </ListItem>
                            </List>
                            <br />
                        </div>
                        <Divider />
                        <div>
                            <center>
                                <div>
                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginTop: '50px', marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            My Account
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/myOrders" style={{ textDecoration: 'none', hover: 'red' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Order History
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/myWishlist" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Wishlist
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/auth" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Logout
                                        </Typography>
                                    </Link>
                                </div>
                            </center>
                        </div>
                        <Divider orientation="vertical" flexItem />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                        <form className={classes.form} noValidate>
                            <div>
                                <TextField
                                    required
                                    id="name"
                                    fullWidth
                                    label="Your Name"
                                    defaultValue="Tanya Peries"
                                    variant="outlined"
                                    margin="normal"
                                />
                            </div>
                            <TextField
                                required
                                fullWidth
                                id="displayName"
                                label="Display Name"
                                defaultValue="Tanya"
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                defaultValue="tanya@gmail.com"
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                required
                                fullWidth
                                id="number"
                                label="Phone number"
                                defaultValue="071233372"
                                variant="outlined"
                                margin="normal"
                            />
                            <div>
                                <br />
                                <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'left' }}>Password Change </Typography>
                            </div>
                            <div>
                                <FormControl className={classes.margin} variant="outlined" style={{ marginLeft: '0px' }}>
                                    <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={120}
                                    />
                                </FormControl>
                                <FormControl className={classes.margin} variant="outlined" style={{ marginLeft: '0px' }}>
                                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={120}
                                    />
                                </FormControl>
                                <FormControl className={classes.margin} variant="outlined" style={{ marginLeft: '0px' }}>
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={170}
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <center>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >SAVE CHANGES
                                    </Button>
                                </center>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </center>
        </container>

    );
}
