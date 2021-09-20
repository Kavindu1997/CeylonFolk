import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Paper, TableBody, TableRow, TableCell, Toolbar,Typography, Table, TableContainer, TableHead} from "@material-ui/core";
import Controls from "../../../components/Reusable/Controls";
import Popup from "../../../components/Reusable/Popup";
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import Collection from "../../../images/collection.json";
import AdminNav from "../../../components/Reusable/AdminNav"
import useStyles from '../style';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UnresolvedInquiries from "./UnresolvedInquiries";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';


const InquiriesTable = () => {
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
   
    const [inquiryId, setInquiryId] = useState([]);


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

    const [listOfUnsolvedInquiries, setListOfUnsolvedInquiries] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/notifications/unsolvedInquiries").then((response) => {
            console.log(response.data);
            setListOfUnsolvedInquiries(response.data);
        })
    }, []);

    const [listOfSolvedInquiries, setListOfSolvedInquiries] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/notifications/solvedInquiries").then((response) => {
            console.log(response.data);
            setListOfSolvedInquiries(response.data);
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
                <PageHeader title="INQUIRIES" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        
                        <Controls.Button
                            component={Link} to="/resolvedinquiries"
                            text="Resolved Inquiries"
                            variant="outlined"
                            startIcon={<SkipPreviousIcon />}
                            className={classes.newButton}
                          
                        />
                    </Toolbar>

                    <container>
                        <center>
                            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>INQUIRIES</Typography>
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order ID</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Contact No</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Email</TableCell>
                                            
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listOfUnsolvedInquiries
                                            .map((value) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.name}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.orderId}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.contactNo}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.email}</TableCell>
                                                       

                                                        <TableCell align="center">
                                                            <Controls.Button
                                                          
                                                                text="View Message"
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
                        title="Resolve Inquiries"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                     
                        <UnresolvedInquiries selectedInquiryId={inquiryId} />
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

export default InquiriesTable;
