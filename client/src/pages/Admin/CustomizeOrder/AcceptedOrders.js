import React, { useState, useEffect } from "react";
import { TableBody, TableRow, Box, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button, Link } from "@material-ui/core";
import Controls from "../../../components/Reusable/Controls";
import Popup from "../../../components/Reusable/Popup";
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import Collection from "../../../images/collection.json";
import useStyles from '../style';
import axios from 'axios';
import { useDispatch} from "react-redux";
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
    const [openViewPopup, setOpenViewPopup] = useState(false)
    const openInPopup = (item) => {
        // setRecordForEdit(item);
        setOpenPopup(true);
    };

    const [acceptedOrders, setlistAcceptedOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/customizeOrders/acceptedOrders').then((response) => {
            console.log(response.data);
            setlistAcceptedOrders(response.data);
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
    };

    return (

        <div style={{ display: "flex" }}>
            <main className={classes.content}>
                    <container>
                        <center>
                        <Typography variant="h5" style={{ textAlign: 'center', backgroundColor: '#C6C6C6', padding: '20px', fontWeight: '600', letterSpacing: '5px' }}>ACCEPTED ORDERS </Typography>
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '100%' }}>
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

                                        {acceptedOrders
                                            .map((value) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.customerName}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.customerEmail}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.orderNo}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.price}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.status}</TableCell>
                                                        <TableCell align="center">
                                                            <Button name="view"
                                                                onClick={() => {

                                                                    setOpenViewPopup(true);

                                                                }}
                                                                style={{ backgroundColor: 'black', color: 'white', fontSize: '12px', padding: '6px' }}
                                                            >
                                                                VIEW DESIGN
                                                            </Button>

                                                            <Popup
                                                                title="Design"
                                                                openPopup={openViewPopup}
                                                                setOpenPopup={setOpenViewPopup}
                                                            >
                                                                <Box>
                                                                    <img height={200} align="center" src={'http://localhost:3001/' + value.image} alt=""></img>
                                                                </Box>
                                                            </Popup>

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

export default AcceptedOrders;
