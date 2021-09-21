import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Box, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button, Link } from "@material-ui/core";
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
    const [oId, setoId] = useState('');
    const [oNo, setoNo] = useState('');
    const [order, setOrder] = useState();
    const [openViewPopup, setOpenViewPopup] = useState(false)
    
    

    const dispatch = useDispatch();

    var email = localStorage.getItem("userEmail");

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

    const [printingOrders, setlistAcceptedOrders] = useState([]);

    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/customizeOrders/printingOrders').then((response) => {
            console.log(response.data);
            setlistPrintingOrders(response.data);
        })
    }, []);

    var email = localStorage.getItem("userEmail");
    var email = localStorage.getItem("userEmail");
    console.log('email')
    console.log(email)

    const onReadyToDispatch = (id) => {
        console.log(id)
        setOpenPopup(false);

        const data = {
            id: oId,
            orderNo: oNo,
            email: email,
        }

        axios.put('http://localhost:3001/customizeOrders/orderReadyToDispatch/',data).then((response) => {
            console.log(response.data);
            // alert('Printed')
            setNotify({
                isOpen: true,
                message: 'Printed !',
                type: 'success'
            });

            window.location.reload(false);
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
                        <Typography variant="h5" style={{ textAlign: 'center', backgroundColor: '#C6C6C6', padding: '20px', fontWeight: '600', letterSpacing: '5px' }}>PRINTING ORDERS </Typography>
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '100%' }}>
                                <Table className={classes.table} aria-label="simple table" style={{ overflowWrap: 'anywhere' }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Customer ID</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Customer Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Customer Email</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order No</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order Status</TableCell>
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

                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button name="accept" 
                                                            onClick={() => {
                                                                // onReadyToDispatch(value.orderId)
                                                                setOpenPopup(true);
                                                                setoId(value.orderId)
                                                                setoNo(value.orderNo)
                                                            }}
                                                            style={{ backgroundColor: 'green', color: 'white', fontSize: '12px', padding: '6px' }}
                                                            >
                                                                Printed
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
                        title="Have you Finished Printing"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <center>
                        <Controls.Button
                            type="submit"
                            text="YES"
                            onClick={() => {
                                onReadyToDispatch()
                                // console.log(value.orderId)
                            }}
                        />
                        </center>
                    </Popup>

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

                    <Notification notify={notify} setNotify={setNotify} />

                    {<ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />}
                
            </main>
        </div>
    );
};

export default AcceptedOrders;
