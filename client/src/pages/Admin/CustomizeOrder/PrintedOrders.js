import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Paper, TableBody, Box, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button, Link } from "@material-ui/core";
import Controls from "../../../components/Reusable/Controls";
import Popup from "../../../components/Reusable/Popup";
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import Collection from "../../../images/collection.json";
import AdminNav from "../../../components/Reusable/AdminNav"
import useStyles from '../style';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';


const AcceptedOrders = () => {

    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
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
    const [listOfOrderDetails, setlistPrintingOrders] = useState([])
    const [order, setOrder] = useState();
    const [openViewPopup, setOpenViewPopup] = useState(false)
    const dispatch = useDispatch();

    const openInPopup = (item) => {
        // setRecordForEdit(item);
        setOpenPopup(true);
    };
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Collection,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const [printedOrders, setlistPrintedOrders] = useState([]);

    var email = localStorage.getItem("userEmail");

    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/customizeOrders/printedOrders').then((response) => {
            console.log(response.data);
            setlistPrintedOrders(response.data);
        })
    }, []);

    const onDispatched = () => {
        // console.log(id)

        const data = {
            id: oId,
            orderNo: oNo,
            email: email,
        }

        axios.put('http://localhost:3001/customizeOrders/orderDispatched/', data).then((response) => {
            console.log(response.data);
            // alert('Dispatched')
            setNotify({
                isOpen: true,
                message: 'Order Ready to Dispatch !',
                type: 'success'
            });
            // setlistOfOrderDetails(response.data);
        })

        // axios.get('http://localhost:3001/customizeOrders/orderDetails').then((response) => {
        //     console.log(response.data);
        //     setlistOfOrderDetails(response.data);
        // })
        // setToggleState(2);
    };

    const onView = (id) => {

        axios.get('http://localhost:3001/customizeOrders/allOrders/' + id).then((response) => {
            setOrder(response.data);
            setOpenViewPopup(true);
        })

        setOpenViewPopup(true);

    }


    return (

        <div style={{ display: "flex" }}>

            <main className={classes.content}>
                <container>
                    <center>
                        <Typography variant="h5" style={{ textAlign: 'center', backgroundColor: '#C6C6C6', padding: '20px', fontWeight: '600', letterSpacing: '5px' }}>PRINTED ORDERS </Typography>
                        <TableContainer style={{ marginTop: '30px', align: 'center', width: '100%' }}>
                            <Table className={classes.table} aria-label="simple table" style={{ overflowWrap: 'anywhere' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Customer ID</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Customer Name</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Customer Email</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order No</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {printedOrders
                                        .map((value) => {
                                            return (
                                                <TableRow>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.customerId}</TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.customerName}</TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.customerEmail}</TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.orderNo}</TableCell>
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

                                                        {order &&

                                                            <Popup
                                                                title="Design"
                                                                openPopup={openViewPopup}
                                                                setOpenPopup={setOpenViewPopup}
                                                            >
                                                                <center>
                                                                    <Box>

                                                                        <TableCell align="center" ><img height={200} align="center" src={'http://localhost:3001/' + order.image} alt=""></img></TableCell>

                                                                        <Typography style={{ fontFamily: 'Montserrat', fontWeight: '700' }}>Design Info</Typography>
                                                                        <Typography>Order Id: {order.orderNo}</Typography>
                                                                        {order.textCount === 0 ? <Typography>No Texts</Typography> : <Typography>No of Text : {order.textCount}</Typography>}
                                                                        {order.imageCount === 0 ? <Typography>No Images</Typography> : <Typography>No of Images: {order.imageCount}</Typography>}
                                                                        {order.note === ' ' ? <Typography>No Notes</Typography> : <Typography>Note: {order.note}</Typography>}
                                                                    </Box>
                                                                </center>
                                                            </Popup>


                                                        }

                                                    </TableCell>


                                                    {/* <TableCell align="center">
                                                            <Button name="accept" 
                                                            onClick={() => {
                                                                // onDispatched(value.orderId)
                                                                setOpenPopup(true);
                                                                setoId(value.orderId)
                                                                setoNo(value.orderNo)
                                                            }}
                                                            >
                                                                DISPATCHED
                                                            </Button>
                                                        </TableCell> */}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </center>
                </container>


                {/* <Popup
                        title="Ready to Dispatch"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <Typography>Are sure order is ready to dispatch</Typography>
                        <Controls.Button
                            type="submit"
                            text="YES"
                            onClick={() => {
                                onDispatched()
                                // console.log(value.orderId)
                            }}
                        />
                    </Popup>

                    <Notification notify={notify} setNotify={setNotify} />

                    {<ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />} */}

                <Notification notify={notify} setNotify={setNotify} />

            </main>
        </div>
    );
};

export default AcceptedOrders;
