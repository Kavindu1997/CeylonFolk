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
import { getOrderHistory } from '../../_actions/orderHistory.action';
import UserSideNav from '../../components/Navbars/UserSideNav';
import CommonNav from '../../components/Navbars/CommonNav';

export default function OrderHistory(props) {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    const orders = useSelector(state => state.orderHistory.orderHistory);
    if(localStorage.getItem("userId")=='0'){
        history.push("/auth")
    }
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
        localStorage.setItem("to", "orderHistory")
        history.push('/auth');
    }

    if (localStorage.getItem("fromTheEmail") == 'true') {
        localStorage.setItem("fromTheEmail", false);
    }

    useEffect(() => {
        dispatch(getOrderHistory())
    }, []);

    function routeToProduct(oId) {
        history.push(`/orderDetail/${oId}`);
    }

    return (
        <div>
            <CommonNav />
            <CssBaseline />
            
            <container>
                <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> ORDER HISTORY</Typography>
                <center>
                    <Grid container style={{ marginTop: '50px', align: 'center' }}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                        <UserSideNav /> 
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
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            className={classes.viewOrder}
                                                            onClick={() => { routeToProduct(row.orderId) }}
                                                        >View Order
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div>
                                <Button
                                 onClick={() => {
                                    history.push(`/shop`);
                                }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >Continue Shopping
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </center>
            </container>
            <Footer />
        </div>

    );
}
