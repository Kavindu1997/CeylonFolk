import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Grid, Typography, TableBody, TableRow, TableCell, Table, TableContainer, TableHead, Button } from '@material-ui/core'
import axios from "axios";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import Notification from "../../../components/Reusable/Notification";
import { API_URL } from '../../../_constants';

function OrderStatusChange({ selectedOrderId }) {
    let history = useHistory();
    const [orderDetails, setorderDetails] = useState([]);
    const [orderItemDetails, setorderItemDetails] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    useEffect(() => {
        axios
            .get(API_URL + "/order/selectedOrderDetails/" + selectedOrderId.oId).then((response) => {
                setorderDetails(response.data);
            });
        axios
            .get(API_URL + "/order/selectedOrderItemDetails/" + selectedOrderId.oId).then((response) => {
                setorderItemDetails(response.data);
            });
    }, []);


    function statusChange(orderId, status) {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        var data = { orderId: orderId, status: status }
        axios.post(API_URL + "/order/statusChange", data).then((response) => {
            if (response.data.error) {
                setNotify({
                    isOpen: true,
                    message: 'Confirmation cancelled !',
                    type: 'error'
                });
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Status changed successfully!',
                    type: 'success'
                });
                setTimeout(() => {
                    window.location.reload(true)
                }, 1500)
            }
        })
    }


    return (
        <div>
            <div>
                {orderDetails.map((value) => {
                    if (value.specialNotes == '') {
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
                    }
                    else {
                        return (
                            <Grid container>
                                <Grid item>
                                    <Typography style={{ fontSize: '18px' }}>Order ID </Typography>
                                    <Typography style={{ fontSize: '18px' }}>Customer Name </Typography>
                                    <Typography style={{ fontSize: '18px' }}>Contact No </Typography>
                                    <Typography style={{ fontSize: '18px' }}>Full Amount (LKR) </Typography>
                                    <Typography style={{ fontSize: '18px' }}>Special Notes </Typography>
                                </Grid>
                                <Grid item style={{ marginLeft: '20px' }}>
                                    <Typography style={{ fontSize: '18px' }}>: {value.orderId}</Typography>
                                    <Typography style={{ fontSize: '18px' }}>: {value.firstName} {value.lastName}</Typography>
                                    <Typography style={{ fontSize: '18px' }}>: 0{value.contactNo}</Typography>
                                    <Typography style={{ fontSize: '18px' }}>: {value.fullAmount}.00</Typography>
                                    <Typography style={{ fontSize: '18px' }}>: {value.specialNotes}</Typography>
                                </Grid>

                            </Grid>
                        );

                    }

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
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}><img height={120} src={API_URL + "/" + value.coverImage} /></TableCell>
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
                        if (value.status == 1) { // cash on delivery pending
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ backgroundColor: 'green', color: 'white', margin: '20px' }}
                                            variant="contained"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to confirm this?',
                                                    subTitle: "You can't undo this operation...",
                                                    onConfirm: () => { statusChange(value.orderId, value.status) }
                                                })
                                            }}
                                        >Accept to print</Button>
                                    </div>
                                </div>
                            );
                        }
                        else if (value.status == 3) { // cash on delivery processing
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ backgroundColor: 'green', color: 'white', margin: '20px', opacity: '0.5' }}
                                            variant="contained"
                                            disabled
                                        >Printed order</Button>
                                        <Button
                                            style={{ margin: '20px' }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to confirm this?',
                                                    subTitle: "You can't undo this operation...",
                                                    onConfirm: () => { statusChange(value.orderId, value.status) }
                                                })
                                            }}
                                        >Dispatch order</Button>
                                    </div>
                                </div>
                            );
                        }
                        else { // cash on delivery dispatched
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ margin: '20px' }}
                                            variant="contained"
                                            disabled
                                            color="primary"
                                        >Order has been Dispatched</Button>
                                    </div>
                                </div>
                            );
                        }
                    }
                    else if (value.PaymentMethod == 8) {
                        if (value.status == 6) { //online payement order place to processing
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ backgroundColor: 'green', color: 'white', margin: '20px' }}
                                            variant="contained"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to confirm this?',
                                                    subTitle: "You can't undo this operation...",
                                                    onConfirm: () => { statusChange(value.orderId, value.status) }
                                                })
                                            }}
                                        >Accept to print</Button>
                                    </div>
                                </div>
                            );
                        }
                        else if (value.status == 3) { // online payments processing
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ backgroundColor: 'green', color: 'white', margin: '20px', opacity: '0.5' }}
                                            variant="contained"
                                            disabled
                                        >Accepted order</Button>
                                        <Button
                                            style={{ margin: '20px' }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to confirm this?',
                                                    subTitle: "You can't undo this operation...",
                                                    onConfirm: () => { statusChange(value.orderId, value.status) }
                                                })
                                            }}
                                        >Dispatch order</Button>
                                    </div>
                                </div>
                            );
                        }
                        else { // online payment dispatched
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ margin: '20px' }}
                                            variant="contained"
                                            disabled
                                            color="primary"
                                        >Order has been Dispatched</Button>
                                    </div>
                                </div>
                            );
                        }
                    }
                    else {
                        if (value.status == 4) {
                            return (
                                <center>
                                    <Typography style={{ fontSize: '20px', color: 'red', margin: '20px' }}>Customer still not upload the Bank Slip. Please contact customer.</Typography>
                                </center>
                            );
                        }
                        else if (value.status == 5) {
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ margin: '20px' }}
                                            onClick={() => { history.push(`/depositlips`); }}
                                            variant="contained"
                                            color="primary"
                                        >Check the validity of Bank Slip</Button>
                                    </div>
                                </div>
                            );
                        }
                        else if (value.status == 3) { // Bank transfer processing
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ backgroundColor: 'green', color: 'white', margin: '20px', opacity: '0.5' }}
                                            variant="contained"
                                            disabled
                                        >Accepted order</Button>
                                        <Button
                                            style={{ margin: '20px' }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to confirm this?',
                                                    subTitle: "You can't undo this operation...",
                                                    onConfirm: () => { statusChange(value.orderId, value.status) }
                                                })
                                            }}
                                        >Dispatch order</Button>
                                    </div>
                                </div>
                            );
                        }
                        else if (value.status == 40) { // bank transfer dispatched
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ margin: '20px' }}
                                            variant="contained"
                                            disabled
                                            color="primary"
                                        >Order has been Dispatched</Button>
                                    </div>
                                </div>
                            );
                        }
                        else { // bank transfer dispatched
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <Button
                                            style={{ margin: '20px', color: 'red', opacity: '0.5' }}
                                            variant="contained"
                                            disabled
                                        >Order Slip has been Rejected</Button>
                                    </div>
                                </div>
                            );
                        }
                    }
                })}
            </div>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    );
}

export default OrderStatusChange
