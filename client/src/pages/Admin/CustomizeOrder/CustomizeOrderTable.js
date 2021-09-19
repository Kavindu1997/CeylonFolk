import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Paper, TableBody, TableRow, TableCell, Typography, Table, TableContainer, TableHead, Button, Box, Grid } from "@material-ui/core";
import Controls from "../../../components/Reusable/Controls";
import Popup from "../../../components/Reusable/Popup";
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import AdminNav from "../../../components/Reusable/AdminNav"
import useStyles from '../style';
import axios from 'axios';
import AcceptedOrders from './AcceptedOrders';
import PrintingOrders from './PrintingOrders';
import PrintedOrders from './PrintedOrders';
import DispatchedOrders from "./DispatchedOrders";
import ClosedOrders from "./ClosedOrders";
import AdvancePaidOrders from "./AdvancePaidOrders";
import PaidOrders from "./PaidOrders";

const CustomizeOrderTable = () => {

    const classes = useStyles();

    var email = localStorage.getItem("userEmail");

    const [openPopup, setOpenPopup] = useState(false);
    const [openRejectPopup, setOpenRejectPopup] = useState(false);
    const [toggleState, setToggleState] = useState(1);
    const [oId, setoId] = useState('');
    const [oNo, setoNo] = useState('');
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
    });
    const [listOfOrderDetails, setlistOfOrderDetails] = useState([]);
    const [price, setprice] = useState()
    const [reason, setReason] = useState()
    const [openViewPopup, setOpenViewPopup] = useState(false)
    const [pendingcount, setPendingCount] = useState();
    const [printingcount, setAcceptCount] = useState();
    const [printedcount, setDispatchCount] = useState();
    const [recievedcount, setPrintedCount] = useState();
    const [order, setOrder] = useState();
    const changePrice = (e) => {
        setprice(e.target.value)
    }

    const changeReason = (e) => {
        setReason(e.target.value)
    }

    useEffect(() => {
        axios.get('http://localhost:3001/customizeOrders/orderDetails').then((response) => {
            setlistOfOrderDetails(response.data);
        })

        axios.get("http://localhost:3001/customizeOrders/getCount").then((response) => {
            console.log(response.data.pendingOrders);
            setPendingCount(response.data.pendingOrders);
            setAcceptCount(response.data.printingOrders);
            setDispatchCount(response.data.printedOrders);
            setPrintedCount(response.data.recievedOrders);
        });
    }, []);

    const onAccept = () => {
        console.log('oId')
        console.log(oId)
        console.log(oNo)

        setOpenPopup(false);

        const data = {
            id: oId,
            oNo: oNo,
            price: price,
            email: email
        }

        axios.put('http://localhost:3001/customizeOrders/orderAccepted/', data).then((response) => {
            alert('Order Accepted')
            setlistOfOrderDetails(response.data);
            <AcceptedOrders />
        })

        axios.get('http://localhost:3001/customizeOrders/orderDetails').then((response) => {
            setlistOfOrderDetails(response.data);
        })
        // setToggleState(2);

        // <AcceptedOrders/>
    };

    const onView = (id) => {

        axios.get('http://localhost:3001/customizeOrders/allOrders/' + id).then((response) => {
            setOrder(response.data);
            setOpenViewPopup(true);
        })

        // setOpenViewPopup(true);

    }

    const onReject = () => {
        console.log('oId')
        console.log(oId)
        console.log(oNo)

        const data = {
            id: oId,
            notification: reason,
            email: email,
            orderNo: oNo,

        }
        console.log(oId)
        setOpenRejectPopup(false);

        axios.put('http://localhost:3001/customizeOrders/reject/', data).then((response) => {
            alert('Order Rejected')
            // setlistOfOrderDetails(response.data);
        })

        axios.get('http://localhost:3001/customizeOrders/orderDetails').then((response) => {
            // console.log(response.data);
            setlistOfOrderDetails(response.data);
        })
        setToggleState(2);

        <AcceptedOrders />
    };

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const openInPopup = (item) => {
        // setRecordForEdit(item);
        setOpenPopup(true);
    };


    return (

        <div style={{ display: "flex" }}>
            <AdminNav />
            <main className={classes.content}>
                <PageHeader title="CustomizedOrders" icon={<LayersIcon fontSize="large" />} />

                <div className={classes.stat} style={{ marginLeft: '36px', marginRight: '36px', }}>

                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Pending Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>{pendingcount}</span>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Printing Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>{printingcount}</span>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Dispatched Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>{printedcount}</span>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Rejected Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>{recievedcount}</span>
                            </div>
                        </div>
                    </Paper>

                </div>
                <Box>
                    <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', marginLeft: '36px', marginRight: '36px', marginTop: '40px' }}>
                        <Button className={classes.toggleButton} variant="outlined" onClick={() => toggleTab(1)}>Pending Orders</Button>
                        <Button className={classes.toggleButton} variant="outlined" onClick={() => toggleTab(2)}>Accepted Orders</Button>
                        <Button className={classes.toggleButton} variant="outlined" onClick={() => toggleTab(7)}>Advance Paid Orders</Button>
                        <Button className={classes.toggleButton} variant="outlined" onClick={() => toggleTab(3)}>Printing Orders</Button>
                        <Button className={classes.toggleButton} variant="outlined" onClick={() => toggleTab(4)}>Printed Orders</Button>
                        <Button className={classes.toggleButton} variant="outlined" onClick={() => toggleTab(8)}>Paid Orders</Button>
                        <Button className={classes.toggleButton} variant="outlined" onClick={() => toggleTab(5)}>Dispatched</Button>
                        <Button className={classes.toggleButton} variant="outlined" onClick={() => toggleTab(6)}>Closed Orders</Button>
                    </Box>


                    <Paper className={classes.pageContent} style={{ margin: '30px', padding: '20px' }}>
                        <container className={toggleState === 1 ? classes.activeContent : classes.hideContent}>
                            <center>
                                <Typography variant="h5" style={{ textAlign: 'center', backgroundColor: '#C6C6C6', padding: '20px', fontWeight: '600', letterSpacing: '5px' }}>PENDING ORDERS </Typography>
                                <TableContainer style={{ marginTop: '30px', align: 'center', width: '100%' }} >
                                    <Table className={classes.table} aria-label="simple table" style={{ overflowWrap: 'anywhere' }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600, }}>Customer Name</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600, }}>Customer Email</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600, }}>Order No</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600, }}>Price</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600, }}>Order Status</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600, }}></TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600, }}></TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600, }}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listOfOrderDetails
                                                .map((value, index) => {
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.customerName}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.customerEmail}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.orderNo}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.fixedPrice}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.status}</TableCell>
                                                            <TableCell align="center">
                                                                <Button name="view"
                                                                    onClick={() => {
                                                                        onView(value.orderId)

                                                                    }}
                                                                    style={{ backgroundColor: 'black', color: 'white', fontSize: '12px', padding: '6px' }}
                                                                >
                                                                    VIEW DESIGN
                                                                </Button>



                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button name="accept"
                                                                    className={value.status === 'Pending' ? classes.activeQuantity : classes.quantity}
                                                                    style={{ backgroundColor: 'green', color: 'white', fontSize: '12px', padding: '6px' }}
                                                                    onClick={() => {

                                                                        setOpenPopup(true);
                                                                        setoId(value.orderId)
                                                                        setoNo(value.orderNo)
                                                                        console.log(value.orderNo)
                                                                    }}
                                                                >
                                                                    ACCEPT ORDER
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button name="accept"
                                                                    className={value.status === 'Pending' ? classes.activeQuantity : classes.quantity}
                                                                    style={{ backgroundColor: 'red', color: 'white', fontSize: '12px', padding: '6px' }}

                                                                    onClick={() => {

                                                                        setOpenRejectPopup(true);
                                                                        setoId(value.orderId)
                                                                        setoNo(value.orderNo)
                                                                    }}
                                                                >
                                                                    REJECT ORDER
                                                                </Button>
                                                            </TableCell>

                                                            <Popup
                                                                title="Send the Estimated Price"
                                                                openPopup={openPopup}
                                                                setOpenPopup={setOpenPopup}
                                                            >
                                                                <Grid item xs={6}>
                                                                    <Controls.Input
                                                                        variant="outlined"
                                                                        label="Price"
                                                                        name="price"
                                                                        onChange={changePrice}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={12} >
                                                                    <Controls.Button
                                                                        type="submit"
                                                                        text="Send Price"
                                                                        onClick={() => {
                                                                            onAccept()
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Popup>

                                                            <Popup
                                                                title="Reason for the rejection"
                                                                openPopup={openRejectPopup}
                                                                setOpenPopup={setOpenRejectPopup}
                                                            >
                                                                <Grid item >
                                                                    <Controls.Input
                                                                        variant="outlined"
                                                                        label="Reason"
                                                                        name="reason"
                                                                        onChange={changeReason}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={12} >
                                                                    <Controls.Button
                                                                        type="submit"
                                                                        text="Send"
                                                                        onClick={() => {
                                                                            onReject()
                                                                            // console.log(value.orderId)
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Popup>
                                                        </TableRow>

                                                    );
                                                })}

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {order &&

                                    <Popup
                                        title="Design"
                                        openPopup={openViewPopup}
                                        setOpenPopup={setOpenViewPopup}
                                    >
                                        <Box>

                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={200} align="center" src={'http://localhost:3001/' + order.image} alt=""></img></TableCell>

                                            <Typography>Design Info</Typography>
                                            <Typography>Order Id: {order.orderNo}</Typography>
                                            <Typography>No of Text : {order.textCount}</Typography>
                                            {order.imageCount === 0 ? <Typography>No Images</Typography> : <Typography>No of Images: {order.imageCount}</Typography>}
                                        </Box>
                                    </Popup>


                                }
                            </center>
                        </container>

                        <Box className={toggleState === 2 ? classes.activeContent : classes.hideContent}>
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
                        </Box>

                        <Box className={toggleState === 7 ? classes.activeContent : classes.hideContent}>
                            <AdvancePaidOrders />
                        </Box>

                        <Box className={toggleState === 8 ? classes.activeContent : classes.hideContent}>
                            <PaidOrders />
                        </Box>

                        <Notification notify={notify} setNotify={setNotify} />

                        {<ConfirmDialog
                            confirmDialog={confirmDialog}
                        // setConfirmDialog={setConfirmDialog}
                        />}

                    </Paper>
                </Box>

            </main>
        </div>
    );
};

export default CustomizeOrderTable;
