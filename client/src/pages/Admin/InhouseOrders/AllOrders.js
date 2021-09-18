import React, { useState, useEffect } from "react";
import useStyles from './style';
import Popup from "../../../components/Reusable/Popup";
import { Paper, TableBody, TableRow, TableCell, Typography, Table, TableContainer, TableHead, Button,IconButton } from "@material-ui/core";
import { useParams } from 'react-router';
import axios from 'axios';
import OrderStatusChange from "./OrderStatusChange";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import logo from '../../../images/logo.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const columns = [
    { id: 'orderId', label: 'Order ID' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'contactNo', label: 'Contact No' },
    { id: 'fullAmount', label: 'Full Amount(LKR)'},
    { id: 'paymentMethodDescription', label: 'Payment Method' },
    { id: 'decription', label: 'Status'},
]


function AllOrders() {
    const classes = useStyles();
    let { id } = useParams();
    const [orderList, setOrderList] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [orderId, setOrderId] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/order/allOrders").then((response) => {
            console.log(response.data);
            setOrderList(response.data);
        });
    }, []);

    function setOrderIdtoChange(value) {
        setOpenPopup(true)
        setOrderId({
            oId: value.orderId,
        })
    }

    const downloadPdf=()=>{
        const doc = new jsPDF("portrait","px","a4");
        doc.addImage(logo,'PNG',20,5,36,0);
        doc.text("All Orders Report",20,35);
        doc.autoTable({
            columns:columns.map(col=>({...col,header:col.label,dataKey:col.id})),
            body:orderList,
            margin: {
                top: 45,
            }
        });
        doc.save("all-orders-report.pdf");
    }

    return (
        <>
        <IconButton onClick={()=>{downloadPdf()}} style={{marginTop:'-475px',marginLeft:'1100px',color:'#e74c3c'}}>
                    <PictureAsPdfIcon fontSize="large"/>
        </IconButton>
        <div style={{ display: "flex" }}>
               
            <center>
                <div className={classes.info}>
                    <div className={classes.pageLinks}>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold', backgroundColor: '#bbd8ff' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/0">
                            All Orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/1">
                            Pending Orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/2">
                            Accepted orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/3">
                            Dispatched orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/4">
                            Rejected orders
                        </Button>
                    </div>
                </div>

                <div className={classes.info}>
                    <Paper elevation={2} className={classes.orderDetails}>
                        <Typography variant="h5" style={{ textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontWeight: '600', letterSpacing: '5px' }}>ORDER SUMMARY </Typography>
                        <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Order Id</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Customer Name</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Contact No</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Full Amount (LKR)</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Payment Method</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Status</TableCell>
                                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '600' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderList.map((value) => {
                                        return (
                                            <TableRow>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.orderId}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.firstName} {value.lastName}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.contactNo}</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.fullAmount}.00</TableCell>
                                                <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{value.paymentMethodDescription}</TableCell>
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
                <Popup
                    title="Order Details"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <OrderStatusChange selectedOrderId={orderId} />
                </Popup>
            </center>
        </div>
        </>
    )
}

export default AllOrders;

