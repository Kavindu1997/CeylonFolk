import React from 'react';
import { Grid, Typography, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import useStyles from './style';

export default function ProfileSideBar() {
    const classes = useStyles();
    
    return (
        <div>
            
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div>
                            <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'center', fontWeight: 600 }}>Hello </Typography>
                            <List style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ marginLeft: '130px' }}>NB</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText><Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', marginLeft: '15px', fontWeight: 600 }}>Nimal Bandara</Typography></ListItemText>
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
                                    <Link to="/deposit" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Bank Deposit Upload
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

                </Grid>
            </center>
        
        </div>

    );
}
