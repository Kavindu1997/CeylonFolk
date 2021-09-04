import React from 'react';
import { Button, CssBaseline, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import UserNav from '../../components/Navbars/UserNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getOrderHistory } from '../../_actions/orderHistory.action'

export default function OrderHistory(props) {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    const orders = useSelector(state => state.orderHistory.orderHistory);
   
    let id;
    console.log(props.location.search)
    if (props.location.search) {
        var splitted = props.location.search.split("?id=", 2);
        id = splitted[1];
        localStorage.setItem("userIdFromMail", id);
    }

    const uid = localStorage.getItem("userId");

    if (localStorage.getItem("userIdFromMail") != undefined && uid != localStorage.getItem("userIdFromMail")) {
        localStorage.setItem("from", "email");
        localStorage.setItem("fromTheCart", false);
        localStorage.setItem("to","orderHistory")
        history.push('/auth');
    }

    if (localStorage.getItem("fromTheEmail") == 'true') {
        localStorage.setItem("fromTheEmail",false);
    }

    useEffect(() => {
        dispatch(getOrderHistory())
      }, []);
    
    function routeToProduct(oId) {
        history.push(`/orderDetail/${oId}`);
    }
   
    return (
        <div>
        <UserNav />
          <CssBaseline />
        <container>
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> ORDER HISTORY</Typography>
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
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} sm={12} md={8} lg={7}>
                        <TableContainer style={{ marginTop: '30px' }}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Reference No</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Date</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Total</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order Status</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders
                                        .map((row, i) => (
                                        <TableRow key={`row-${i}`}>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.orderId}</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.placedDate}</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.fullAmount}</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.decription}</TableCell>
                                            <TableCell align="center">
                                                <Button onClick={() => {
                            routeToProduct(row.orderId)
                          }}
                         >
                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div>
                            <Box
                                component="span"
                                m={1}
                                className={`${classes.spreadBox} ${classes.box}`}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.back}
                                >Continue Shopping
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >Proceed to Checkout
                                </Button>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </center>
        </container>
        <Footer />
        </div>

    );
}
