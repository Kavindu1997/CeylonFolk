import React, { useState, useEffect } from "react";
import useStyles from './style';
import Popup from "../../../components/Reusable/Popup";
import { Paper, TableBody, TableRow, TableCell, Typography, Table, TableContainer, TableHead, Button } from "@material-ui/core";
import { useParams } from 'react-router';
import axios from 'axios';
import OrderStatusChange from "./OrderStatusChange";
import { API_URL } from '../../../_constants';

function DispatchedOrders() {
    const classes = useStyles();
    let { id } = useParams();
    const [orderDetailsList, setOrderDetailsList] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [orderId, setOrderId] = useState([]);

    useEffect(() => {
        axios.get(API_URL + `/order/getOrders/${id}`).then((response) => {
            console.log(response.data);
            setOrderDetailsList(response.data);
        });
    }, []);

    function setOrderIdtoChange(value) {
        setOpenPopup(true)
        setOrderId({
            oId: value.orderId,
        })
    }

    return (
        <div style={{ display: "flex" }}>
            <center>
                <div className={classes.info}>
                    <div className={classes.pageLinks}>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/0">
                            All Orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/1">
                            Pending Orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/2">
                            Accepted orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold', backgroundColor: '#bbd8ff' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/3">
                            Dispatched orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/4">
                            Rejected orders
                        </Button>
                    </div>
                </div>

                <div className={classes.info}>

                    <Paper elevation={2} className={classes.orderDetails}>
                        <Typography variant="h5" style={{ textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontWeight: '600', letterSpacing: '5px' }}>DISPATCHED ORDERS </Typography>
                        <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Order Id</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Customer Name</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Contact No</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Full Amount (LKR)</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Placed Date</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Payment Method</TableCell>
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
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.fullAmount}.00</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.placedDate}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.decription}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => setOrderIdtoChange(value)}
                                                    >View Order
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </center>
            <Popup
                title="Order Details"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <OrderStatusChange selectedOrderId={orderId} />
            </Popup>
        </div>
    )
}

export default DispatchedOrders
