import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import { Paper, TableBody, TableRow,  TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button, Link, Box, Grid } from "@material-ui/core";
import Controls from "../../../components/Reusable/Controls";
import Popup from "../../../components/Reusable/Popup";
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import AdminNav from "../../../components/Reusable/AdminNav"
import useStyles from '../style';
import axios from 'axios';
import useTable from "../../../components/Reusable/useTable";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import AcceptedOrders from '../CustomizeOrder/AcceptedOrders';
import PrintingOrders from '../CustomizeOrder/PrintingOrders';
import PrintedOrders from '../CustomizeOrder/PrintedOrders';
import DispatchedOrders from "../CustomizeOrder/DispatchedOrders";
import ClosedOrders from "../CustomizeOrder/ClosedOrders";
import { viewOrderDetail } from "../../../_actions/orderHistory.action";
import ViewOrderForm from "./viewOrder";
import {API_URL} from '../../../_constants';


const DepositSlips = () => {

    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [toggleState, setToggleState] = useState(1);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [listOfDeposits, setlistOfDeposits] = useState([]);
    const [isDisable, setIsDisable] = useState(false)


    useEffect(() => {
        axios.get(API_URL+'/deposit/allDepositSlips').then((response) => {
            setlistOfDeposits(response.data);
        })
    }, []);

    function acceptPayment(orderId) {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        var data = { orderId: orderId }
        axios.post(API_URL+"/deposit/paymentAccepted/", data).then((response) => {
            if (response.data.error) {
                setNotify({
                    isOpen: true,
                    message: 'Confirmation cancelled !',
                    type: 'error'
                });
                setIsDisable(false)
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Successfully confirmed !',
                    type: 'success'
                });
                setIsDisable(true)

            }
            axios.get(API_URL+'/deposit/allDepositSlips').then((response) => {
                setlistOfDeposits(response.data);
            })
        })

    }

    function rejectPayment(orderId) {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        var data = { orderId: orderId }
        axios.post(API_URL+"/deposit/paymentRejected/", data).then((response) => {
            if (response.data.error) {
                setNotify({
                    isOpen: true,
                    message: 'Confirmation cancelled !',
                    type: 'error'
                });
                setIsDisable(false)
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Successfully rejected !',
                    type: 'success'
                });
                setIsDisable(true)

            }
            axios.get(API_URL+'/deposit/allDepositSlips').then((response) => {
                setlistOfDeposits(response.data);
            })
        })

    }

    var [selectedOrderToEdit, setSelectedOrderToEdit] = useState([])
    function setOrderToEdit(value) {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        setOpenPopup(true)
        setSelectedOrderToEdit({
            oId: value.orderId,
        })
    }

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(listOfDeposits,"", filterFn);
    
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.firstName.toLowerCase().includes(target.value) ||
                    x.lastName.toLowerCase().includes(target.value) ||
                    x.decription.toLowerCase().includes(target.value) ||
                    x.orderId.includes(target.value))
            }
        })
    }

    return (

        <div style={{ display: "flex" }}>
            <AdminNav />
            <main className={classes.content}>
                <PageHeader title="Bank Deposit Slips" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                    <Controls.Input
                            label="Search Bank Deposits"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                    
                                ),
                            }}
                        onChange={handleSearch}
                        />
                    </Toolbar>

                    <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>BANK DEPOSIT SLIPS </Typography>
                    <container>
                        <center>

                            <TableContainer style={{ marginTop: '30px', align: 'center' }} className={toggleState === 1 ? classes.activeContent : classes.hideContent}>
                                <Table className={classes.table} aria-label="simple table" style={{ overflowWrap: 'anywhere' }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Customer Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Contact Number</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order ID</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order Status</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Deposit Slip</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recordsAfterPagingAndSorting()
                                            .map((value) => {
                                                return (


                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.firstName + " " + value.lastName}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.contactNo}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.orderId}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.decription}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={API_URL+'/' + value.slip} alt=""></img></TableCell>
                                                        <TableCell align="center">
                                                            <Button name="view"
                                                                onClick={() => window.location.href = API_URL+"/" + value.slip}
                                                            >
                                                                VIEW SLIP
                                                            </Button>

                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button name="order"
                                                                onClick={() => setOrderToEdit(value)}
                                                            >
                                                                VIEW ORDER
                                                            </Button>

                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button name="accept"
                                                                disabled={value.isValidated == '1' && value.isProcessed == '1' || value.isRejected == '1' ? true : false}

                                                                onClick={() => {
                                                                    setConfirmDialog({
                                                                        isOpen: true,
                                                                        title: 'Are you sure to confirm this?',
                                                                        subTitle: "You can't undo this operation...",
                                                                        onConfirm: () => { acceptPayment(value.orderId) }
                                                                    })
                                                                }}
                                                            >
                                                                ACCEPT PAYMENT
                                                            </Button>
                                                            <Button name="reject"
                                                                disabled={value.isValidated == '1' && value.isProcessed == '1' || value.isRejected == '1' ? true : false}

                                                                onClick={() => {
                                                                    setConfirmDialog({
                                                                        isOpen: true,
                                                                        title: 'Are you sure to confirm this?',
                                                                        subTitle: "You can't undo this operation...",
                                                                        onConfirm: () => { rejectPayment(value.orderId) }
                                                                    })
                                                                }}
                                                            >
                                                                REJECT PAYMENT
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>



                                                );
                                            })}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </center>
                    </container>



                    {/* <Box className={toggleState === 2 ? classes.activeContent : classes.hideContent}>
                    <AcceptedOrders />
                    </Box>

                    <Box className={toggleState === 3 ? classes.activeContent : classes.hideContent}>
                    <PrintingOrders />
                    </Box>

                    <Box className={toggleState === 4 ? classes.activeContent : classes.hideContent}>
                    <PrintedOrders />
                    </Box>

                    <Box className={toggleState === 5 ? classes.activeContent : classes.hideContent}>
                    <DispatchedOrders />
                    </Box>

                    <Box className={toggleState === 6 ? classes.activeContent : classes.hideContent}>
                    <ClosedOrders />
                    </Box> */}



                    <Notification
                        notify={notify}
                        setNotify={setNotify}
                    />
                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />

                    <Popup
                        title="Order Details"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <ViewOrderForm selectedOrderToEdit={selectedOrderToEdit} />
                    </Popup>

                </Paper>


            </main>
        </div>
    );
};

export default DepositSlips;
