import React from 'react';
//import { Button, CssBaseline, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Box, Button, CssBaseline, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { viewOrderDetail, cancelOrderItem } from '../../_actions/orderHistory.action';
import UserSideNav from '../../components/Navbars/UserSideNav';
import CommonNav from '../../components/Navbars/CommonNav';
import Notification from '../../components/Reusable/Notification';
import ConfirmDialog from '../../components/Reusable/ConfirmDialog';
import Controls from "../../components/Reusable/Controls";
import Popup from "../../components/Reusable/Popup";
import EditOrderForm from "./EditOrderForm";
import ceylonforkapi from '../../api/index';
import { API_URL } from '../../_constants';

export default function OrderDetail() {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    let { oId } = useParams();
    const orderDetails = useSelector(state => state.orderHistory.selectedOrder);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const [openPopup, setOpenPopup] = useState(false);
    var canItemRemoveOrEdit = false;
    if (orderDetails[0] && orderDetails[0].canbecancel == '1') {
        canItemRemoveOrEdit = true;
    } else {
        canItemRemoveOrEdit = false;
    }

    if (localStorage.getItem("userId") == '0') {
        history.push("/auth")
    }

    useEffect(() => {
        dispatch(viewOrderDetail(oId))
    }, []);

    function routeToProduct(itemId) {

    }
    var [selectedOrderToEdit, setSelectedOrderToEdit] = useState([])
    function setOrderToEdit(value) {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        setOpenPopup(true)
        setSelectedOrderToEdit({
            oId: oId,
            itemId: value.id,
            size: value.size,
            quantity: value.quantity,
            sizeId: value.sizeId,
            orderitemId: value.orderitemId
        })
    }

    function onRemove(value) {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        var cancelItem = {
            orderId: oId,
            itemId: value.id,
            size: value.size,
            removeWholeOrder: 0,
        }
        if (orderDetails.length == 1) {
            cancelItem.removeWholeOrder = 1;
        }
        // dispatch(cancelOrderItem(cancelItem))
        ceylonforkapi.post("/order/cancelItem/", cancelItem).then((response) => {
            if (response.data.error == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Item removing is not successful !',
                    type: 'error'
                });
            }
            else {
                setNotify({
                    isOpen: true,
                    message: 'Order item successfully removed !',
                    type: 'success'
                });
                dispatch(viewOrderDetail(cancelItem.orderId));
            }
        });
        // if (orderDetails.length == 1) {
        //     history.push("/myOrders")
        // }
    }

    function deletewholeOrder(oId){
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        var cancelItem = {
            orderId: oId,
            // removeWholeOrder: 1,
        }
        // if (orderDetails.length == 1) {
        //     cancelItem.removeWholeOrder = 1;
        // }
        // dispatch(cancelOrderItem(cancelItem))
        ceylonforkapi.post("/order/cancelOrder/", cancelItem).then((response) => {
            if (response.data.error == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Order removing is not successful !',
                    type: 'error'
                });
            }
            else {
                setNotify({
                    isOpen: true,
                    message: 'Order successfully removed !',
                    type: 'success'
                });
                dispatch(viewOrderDetail(cancelItem.orderId));
            }
        });
    }

    return (
        <div>
            <CommonNav />
            <CssBaseline />
            <container>
                <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> Bank Deposit Slip Upload</Typography>
                <center>
                    <Grid container style={{ marginTop: '50px', align: 'center' }}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <UserSideNav />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={12} sm={12} md={8} lg={7}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.back}
                                onClick={() => { history.push("/myOrders") }}
                            >Back
                            </Button>
                            <form className={classes.form} noValidate>
                                <TableContainer style={{ marginTop: '30px' }}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Product</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>size</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Quantity</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Totals</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }} >Cancel Order</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }} >Edit Order</TableCell>
                                            </TableRow>
                                            <TableRow className={canItemRemoveOrEdit == true ? classes.visibility : ""}>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }} colSpan='5' style={{ borderBottom: "none" }}>
                                                    These cancel and edit actions can be done only in pending status.
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orderDetails
                                                .map((value) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={API_URL+'/' + value.coverImage} onClick={() => { history.push(`/productDetails/${value.id}`); }} /></TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.design_name}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.size}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.quantity}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>Rs. {value.totals}</TableCell>
                                                            <TableCell align="center">
                                                                <Button name="remove" className={canItemRemoveOrEdit == false ? classes.visibility : ""}
                                                                    onClick={() => {
                                                                        setConfirmDialog({
                                                                            isOpen: true,
                                                                            title: 'Are you sure to delete this?',
                                                                            subTitle: "You can't undo this operation...",
                                                                            onConfirm: () => { onRemove(value) }
                                                                        })
                                                                    }}
                                                                >
                                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell> <Button className={canItemRemoveOrEdit == false ? classes.visibility : ""} onClick={() => {
                                                                routeToProduct(value.id)
                                                            }}
                                                            >

                                                                <i class="fa fa-pencil-square-o" aria-hidden="true"

                                                                    onClick={(event) => {
                                                                        setConfirmDialog({
                                                                            isOpen: true,
                                                                            title: 'Are you sure to edit this item?',
                                                                            subTitle: "If there was a discount, it can be removed by considering the offer duration...",
                                                                            onConfirm: () => { setOrderToEdit(value) }
                                                                        })
                                                                    }}></i>
                                                            </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div className={canItemRemoveOrEdit == false ? classes.visibility : ""}>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        // color="primary"
                                        style={{color: 'red'}}
                                        className={classes.submit}
                                        onClick={() => deletewholeOrder(oId)}
                                    >Cancel Whole Order
                                    </Button>


                                </div>
                                <div>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => { history.push(`/shop`); }}
                                    >Continue Shopping
                                    </Button>


                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </center>
            </container>

            <Footer />
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <Popup
                title="Edit Order"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EditOrderForm selectedOrderToEdit={selectedOrderToEdit} />
            </Popup>
        </div>

    );
}
