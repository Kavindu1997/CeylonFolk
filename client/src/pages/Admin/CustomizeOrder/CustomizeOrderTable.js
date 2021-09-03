import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button, Link, Box } from "@material-ui/core";
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
import AcceptedOrders from './AcceptedOrders'


const CustomizeOrderTable = () => {
    
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
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
    const [listOfOrderDetails, setlistOfOrderDetails] = useState([])
    const dispatch = useDispatch();

    const openInPopup = (item) => {
        // setRecordForEdit(item);
        setOpenPopup(true);
    };

    const [listOfDesigns, setListOfDesigns] = useState([]);

    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/customizeOrders/orderDetails').then((response) => {
            console.log(response.data);
            setlistOfOrderDetails(response.data);
        })
    }, []);

    const onAccept = (id) => {
        console.log(id)

        const data = {
            id: id
        }

        axios.put('http://localhost:3001/customizeOrders/orderAccepted/',data).then((response) => {
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

                    <Box style={{display:'flex'}}>
                        <Button onClick={() => toggleTab(1)}>Pending Orders</Button>
                        <Button onClick={() => toggleTab(2)}>Accepted Orders</Button>
                    </Box>

                    <container>
                        <center>
                            
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }} className={toggleState === 1 ? classes.activeContent : classes.hideContent}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Customer ID</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order ID</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order Status</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Design</TableCell>
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
                                                            >
                                                                VIEW DESIGN
                                                            </Button>
                                                            
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button name="accept" 
                                                            onClick={() => onAccept(value.orderId)}
                                                            >
                                                                ACCEPT ORDER
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

                    <Box className={toggleState === 2 ? classes.activeContent : classes.hideContent}>
                    <AcceptedOrders />
                    </Box>

                    


                    <Popup
                        title="Add Design Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        {/* <DesignForm /> */}
                    </Popup>

                    <Notification notify={notify} setNotify={setNotify} />

                    {<ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />}
                </Paper>
            </main>
        </div>
    );
};

export default CustomizeOrderTable;
