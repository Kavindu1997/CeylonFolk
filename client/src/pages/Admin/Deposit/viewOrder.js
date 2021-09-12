import React, { useState, useEffect } from 'react';
// import { Grid } from '@material-ui/core';
import { Box, Button, CssBaseline, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useForm, Form } from '../../../components/Reusable/useForm';
import Controls from '../../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from './style2';
import { useDispatch, useSelector } from "react-redux";
import { viewOrderDetail, cancelOrderItem } from '../../../_actions/orderHistory.action';
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import { useParams } from 'react-router';

const ViewOrderForm = ({ selectedOrderToEdit }) => {
    console.log(selectedOrderToEdit)
    const classes = useStyles();
    const dispatch = useDispatch();
    let { oId } = useParams();
    console.log(oId)
    const orderDetails = useSelector(state => state.orderHistory.selectedOrder);
    console.log(selectedOrderToEdit)
    console.log(orderDetails)
    useEffect(() => {
        dispatch(viewOrderDetail(selectedOrderToEdit.oId))
    }, []);

    return (
        <div>
            <div>
            <container>
                <form>
                                <Grid>

                                <TableContainer style={{ marginTop: '30px' }}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Product</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Quantity</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Size</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Totals</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orderDetails
                                                .map((value) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.coverImage} /></TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.design_name}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.quantity}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.size}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>Rs. {value.totals}</TableCell>
                        
                                                           
                                                        </TableRow>
                                                               );
                                                            })}
                                                            
                                                            <TableRow>
                                                                <TableCell align="center" colSpan='4'>Total Amount</TableCell>
                                                                <TableCell align="center">Rs. {orderDetails[0].fullAmount}</TableCell>
                                                            </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                </Grid>

                </form>
                </container>
            </div>
            
        </div >


    );
};

export default ViewOrderForm;