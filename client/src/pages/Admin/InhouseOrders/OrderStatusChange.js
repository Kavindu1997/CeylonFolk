import React, { useState, useEffect } from "react";
import { Grid, Typography, TableBody, TableRow, TableCell, Table, TableContainer, TableHead, Button } from '@material-ui/core'
import axios from "axios";

function OrderStatusChange({ selectedOrderId }) {
    const [orderDetails, setorderDetails] = useState([]);
    const [orderItemDetails, setorderItemDetails] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:3001/order/selectedOrderDetails/" + selectedOrderId.oId).then((response) => {
                setorderDetails(response.data);
            });
        axios
            .get("http://localhost:3001/order/selectedOrderItemDetails/" + selectedOrderId.oId).then((response) => {
                setorderItemDetails(response.data);
            });
    }, []);

    return (
        <div>
            <div>
                {orderDetails.map((value) => {
                    return (
                        <Grid container>
                            <Grid item>
                                <Typography style={{ fontSize: '18px' }}>Order ID </Typography>
                                <Typography style={{ fontSize: '18px' }}>Customer Name </Typography>
                                <Typography style={{ fontSize: '18px' }}>Contact No </Typography>
                                <Typography style={{ fontSize: '18px' }}>Full Amount (LKR) </Typography>
                            </Grid>
                            <Grid item style={{ marginLeft: '20px' }}>
                                <Typography style={{ fontSize: '18px' }}>: {value.orderId}</Typography>
                                <Typography style={{ fontSize: '18px' }}>: {value.firstName} {value.lastName}</Typography>
                                <Typography style={{ fontSize: '18px' }}>: 0{value.contactNo}</Typography>
                                <Typography style={{ fontSize: '18px' }}>: {value.fullAmount}.00</Typography>
                            </Grid>
                        </Grid>
                    );
                })}
            </div>
            <div>
                <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Item Name</TableCell>
                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}></TableCell>
                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Size</TableCell>
                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderItemDetails.map((value) => {
                                return (
                                    <TableRow>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.design_name}</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}><img height={100} src={"http://localhost:3001/" + value.coverImage} /></TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.size}</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.quantity}</TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
                {orderDetails.map((value) => {
                    if (value.PaymentMethod == 7) {
                        if (value.status == 1) {
                            return (
                                <div>Cash on Delivery pending to processing</div>
                            );
                        }
                        else {
                            return (
                                <div>Cash on Delivery processing to dispatched</div>
                            );
                        }
                    }
                    else if (value.PaymentMethod == 8) {
                        if (value.status == 6) {
                            return (
                                <div>Pay here order placed to processing</div>
                            );
                        }
                        else {
                            return (
                                <div>Pay here processing to dispatched</div>
                            );
                        }
                    }
                    else {
                        if (value.status == 4) {
                            return (
                                <div>Bank Transfer waiting for deposit to deposit verifying</div>
                            );
                        }
                        else if (value.status == 5) {
                            return (
                                <div>Bank Transfer deposit verifying to processing</div>
                            );
                        }
                        else {
                            return (
                                <div>Bank transfer processing to dispatched</div>
                            );
                        }
                    }
                })}
            </div>
        </div>
    )
}

export default OrderStatusChange
