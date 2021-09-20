import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Paper, TableBody, TableRow, TableCell,Typography, Table, TableContainer, TableHead } from "@material-ui/core";
import Controls from "../../../components/Reusable/Controls";
import Popup from "../../../components/Reusable/Popup";
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import Collection from "../../../images/collection.json";
import AdminNav from "../../../components/Reusable/AdminNav"
import useStyles from '../style';
import axios from 'axios';
import { useDispatch} from "react-redux";
import ViewMessageResponse from "./ViewMessageResponse";

const ResolvedInquiries = () => {
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
    const dispatch = useDispatch();

    const openInPopup = (item) => {
    
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

    const [listOfResolvedInquiries, setListOfResolvedInquiries] = useState([]);
    const [inquiryId, setInquiryId] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/notifications/resolvedInquiries").then((response) => {
            setListOfResolvedInquiries(response.data);
        })
    }, []);

    function setInquiryIdtoChange(value) {
        setOpenPopup(true)
        setInquiryId({
            contactus_id: value.id,
        })
    }

    return (

        <div style={{ display: "flex" }}>
            <AdminNav />

            <main className={classes.content}>
                <PageHeader title="RESOLVED INQUIRIES" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                  
                    <container>
                        <center>
                            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>RESOLVED INQUIRIES</Typography>
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order ID</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Contact No</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Email</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Message and Response</TableCell>
                                           
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listOfResolvedInquiries
                                            .map((value) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.name}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.orderId}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.contactNo}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.email}</TableCell>
                                                        <TableCell align="center">
                                                            <Controls.Button
                                                          
                                                                text="View"
                                                                onClick={() => setInquiryIdtoChange(value)}
                                                            />
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
                        title="Resolved Inquiries"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <ViewMessageResponse  selectedInquiryId={inquiryId} />
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

export default ResolvedInquiries;
