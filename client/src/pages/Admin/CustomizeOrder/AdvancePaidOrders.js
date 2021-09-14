import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button, Link } from "@material-ui/core";
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


const AdvancePaidOrders = () => {
    
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
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
    const [listOfAdvancePaid, setlistOfAdvancePaid] = useState([])
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

    const [acceptedOrders, setlistAcceptedOrders] = useState([]);

    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/customizeOrders/acceptedOrders').then((response) => {
            console.log(response.data);
            setlistAcceptedOrders(response.data);
        })

        axios.get('http://localhost:3001/customizeOrders/advancePayment').then((response) => {
            console.log(response.data);
            setlistOfAdvancePaid(response.data);
        })
    }, []);

    const onPrinting = (id) => {
        console.log(id)

        const data = {
            id: id
        }

        axios.put('http://localhost:3001/customizeOrders/orderPrinting/',data).then((response) => {
            console.log(response.data);
            alert('Start Printing')
            // setlistOfOrderDetails(response.data);
        })

        // axios.get('http://localhost:3001/customizeOrders/orderDetails').then((response) => {
        //     console.log(response.data);
        //     setlistOfOrderDetails(response.data);
        // })
        // setToggleState(2);
    };


    return (

        <div style={{ display: "flex" }}>
            
            <main className={classes.content}>

                
                
                    

                    <container>
                        <center>
                            
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
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

                                        {listOfAdvancePaid
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
                                                            style={{backgroundColor:'black', color:'white'}}
                                                            >
                                                                VIEW DESIGN
                                                            </Button>
                                                            
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button name="accept" 
                                                            onClick={() => onPrinting(value.orderId)}
                                                            style={{backgroundColor:'green', color:'white'}}
                                                            >
                                                                START PRINTING
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button name="accept" 
                                                            className={value.status === 'Accept' ? classes.activeQuantity : classes.quantity}
                                                            style={{backgroundColor:'red', color:'white'}}
                                                            
                                                            >
                                                                CANCEL ORDER
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
                
            </main>
        </div>
    );
};

export default AdvancePaidOrders;
