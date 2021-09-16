import React, { useState, useEffect } from "react";
import useStyles from './style';
import Popup from "../../../components/Reusable/Popup";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button } from "@material-ui/core";
import { useParams } from 'react-router';
import axios from 'axios';

function OnlinePayments() {
    const classes = useStyles();
    let { id } = useParams();

    const [orderDetailsList, setOrderDetailsList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/order/getOrders/${id}`).then((response) => {
            console.log(response.data);
            setOrderDetailsList(response.data);
        });
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <center>
                <div className={classes.info}>
                    <div className={classes.pageLinks}>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/0">
                            All Orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/7">
                            Cash on Delivery
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold', backgroundColor: '#bbd8ff' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/8">
                            Online Payements
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/9">
                            Bank Transfer
                        </Button>
                    </div>
                </div>

                <div className={classes.info}>

                    <Paper elevation={2} className={classes.orderDetails}>
                        <Typography variant="h5" style={{ textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontWeight: '600', letterSpacing: '5px' }}>ONLINE PAYMENT ORDERS </Typography>
                        <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Order Id</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Customer Name</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Contact No</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Full Amount (LKR)</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Status</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Actions</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Actions</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderDetailsList.map((value) => {
                                        return (
                                            <TableRow>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.orderId}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.firstName} {value.lastName}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.contactNo}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.fullAmount}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.decription}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>Actions</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>Actions</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>Actions</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </center>
        </div>
    )
}

export default OnlinePayments
