import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Paper, TableBody, TableRow, Divider, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button, Link, Box, Grid } from "@material-ui/core";
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
import AcceptedOrders from './AcceptedOrders';
import PrintingOrders from './PrintingOrders';
import PrintedOrders from './PrintedOrders';
import DispatchedOrders from "./DispatchedOrders";
import ClosedOrders from "./ClosedOrders";
import AdvancePaidOrders from "./AdvancePaidOrders";


const CustomizeOrderTable = () => {

    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openRejectPopup, setOpenRejectPopup] = useState(false);
    const [toggleState, setToggleState] = useState(1);
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

    const dispatch = useDispatch();


    let history = useHistory();

    const changePrice = (e) => {
        setprice(e.target.value)
    }

    useEffect(() => {
        axios.get('http://localhost:3001/customizeOrders/orderDetails').then((response) => {
            console.log(response.data);
            setlistOfOrderDetails(response.data);
        })
    }, []);

    var email = localStorage.getItem("userEmail");

    const onAccept = (id) => {
        console.log(id)

        const data = {
            id: id,
            price: price,
            email: email
        }

        axios.put('http://localhost:3001/customizeOrders/orderAccepted/', data).then((response) => {
            console.log(response.data);
            alert('Order Accepted')
            // setlistOfOrderDetails(response.data);
        })

        axios.get('http://localhost:3001/customizeOrders/orderDetails').then((response) => {
            console.log(response.data);
            setlistOfOrderDetails(response.data);
        })
        setToggleState(2);
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

                <Paper className={classes.pageContent}>



                    <Toolbar>
                        <Controls.Input
                            label="Search Orders"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        //onChange={handleSearch}
                        />
                    </Toolbar>

                    <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>CUSTOMIZED ORDERS </Typography>

                    <Box style={{ display: 'flex', padding: '24px 10px 0px 48px' }}>
                        <Divider orientation="vertical" flexItem />
                        <Button onClick={() => toggleTab(1)}>Pending Orders</Button>
                        <Divider orientation="vertical" flexItem />
                        <Button onClick={() => toggleTab(2)}>Accepted Orders</Button>
                        <Divider orientation="vertical" flexItem />
                        <Button onClick={() => toggleTab(7)}>Advance Paid Orders</Button>
                        <Divider orientation="vertical" flexItem />
                        <Button onClick={() => toggleTab(3)}>Printing Orders</Button>
                        <Divider orientation="vertical" flexItem />
                        <Button onClick={() => toggleTab(4)}>Printed Orders</Button>
                        <Divider orientation="vertical" flexItem />
                        <Button onClick={() => toggleTab(5)}>Dispatched</Button>
                        <Divider orientation="vertical" flexItem />
                        <Button onClick={() => toggleTab(6)}>Closed Orders</Button>
                        <Divider orientation="vertical" flexItem />
                    </Box>


                    <container>
                        <center>

                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }} className={toggleState === 1 ? classes.activeContent : classes.hideContent}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Customer ID</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order ID</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order Status</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Design</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}></TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}></TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listOfOrderDetails
                                            .map((value) => {
                                                return (


                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.customerId}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.orderId}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.status}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.image} alt=""></img></TableCell>
                                                        <TableCell align="center">
                                                            <Button name="view"
                                                                onClick={() => window.location.href = "http://localhost:3001/" + value.image}
                                                                style={{ backgroundColor: 'black', color: 'white' }}
                                                            >
                                                                VIEW DESIGN
                                                            </Button>

                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button name="accept"
                                                                className={value.status === 'Pending' ? classes.activeQuantity : classes.quantity}
                                                                style={{ backgroundColor: 'green', color: 'white' }}
                                                                onClick={() => {

                                                                    setOpenPopup(true);
                                                                }}
                                                            >
                                                                ACCEPT ORDER
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button name="accept"
                                                                className={value.status === 'Pending' ? classes.activeQuantity : classes.quantity}
                                                                style={{ backgroundColor: 'red', color: 'white' }}

                                                                onClick={() => {

                                                                    setOpenRejectPopup(true);
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
                                                                        onAccept(value.orderId)
                                                                        console.log('hi idddd')
                                                                        console.log(value.orderId)
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Popup>

                                                        <Popup
                                                            title="Reason for the rejection"
                                                            openPopup={openRejectPopup}
                                                            setOpenPopup={setOpenRejectPopup}
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
                                                                // onClick={() => {
                                                                //     onAccept(value.orderId)
                                                                // }}
                                                                />
                                                            </Grid>
                                                        </Popup>

                                                    </TableRow>



                                                );
                                            })}

                                    </TableBody>
                                </Table>
                            </TableContainer>
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



                    <Notification notify={notify} setNotify={setNotify} />

                    {<ConfirmDialog
                        confirmDialog={confirmDialog}
                    // setConfirmDialog={setConfirmDialog}
                    />}



                </Paper>


            </main>
        </div>
    );
};

export default CustomizeOrderTable;
