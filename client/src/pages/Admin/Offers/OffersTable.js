import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import OffersForm from "./OffersForm";
import OffersEdit from "./OffersEdit";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button } from "@material-ui/core";
import useTable from "../../../components/Reusable/useTable";
import Controls from "../../../components/Reusable/Controls";
import Popup from "../../../components/Reusable/Popup";
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import Collection from "../../../images/collection.json";
import AdminNav from "../../../components/Reusable/AdminNav";
import useStyles from '../style';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';



const OffersTable = () => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
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

    // const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    //     useTable("", headCells, "");

    const openInPopup = (item) => {
        // setRecordForEdit(item);
        setOpenPopup(true);
    };
    const openInPopup1 = (item) => {
        // setRecordForEdit(item);
        setOpenPopup1(true);
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Collection,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const [listOfOffers, setListOfOffers] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/offers").then((response) => {
            console.log(response.data);
            setListOfOffers(response.data);
        })
    }, []);


    const onRemove = (id) => {


        // dispatch(actionDeleteCollection(id));

        const data = { id: id }


        axios.delete(`http://localhost:3001/sizes/remove/`, { data }).then((response) => {

            axios.get("http://localhost:3001/sizes").then((response) => {
                console.log(response.data);
                setListOfOffers(response.data);
            });

        });



    };

    // function onProceed() {


    //       history.push('/collections');


    //   }


    const onSetId = (id) => { //'Itom007'
        localStorage.setItem("sizes_id", id);


    };


    return (

        <div style={{ display: "flex" }}>
            <AdminNav />

            <main className={classes.content}>
                <PageHeader title="OFFERS" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Input
                            label="Search Size"
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
                        <Controls.Button
                            text="Add New Offer"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => {
                                setOpenPopup(true);
                            }}
                        />
                    </Toolbar>

                    <container>
                        <center>
                            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>OFFERS</Typography>
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Collection Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Offer Rate</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Starting Date</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Ending Date</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Edit</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Remove</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listOfOffers
                                            .map((value) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.collection_name}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.rate}%</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.from}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.to}</TableCell>
                                                        <TableCell align="center">
                                                            <Controls.Button
                                                                text="Edit"
                                                                onClick={() => {
                                                                    onSetId(value.id)
                                                                    setOpenPopup1(true);
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button name="remove" onClick={() => onRemove(value.id)}>
                                                                <i className="fa fa-times" aria-hidden="true"></i>
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
                        title="Add Offers Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <OffersForm />
                    </Popup>

                    <Popup

                        title="Edit Offer Form"

                        openPopup={openPopup1}
                        setOpenPopup={setOpenPopup1}
                    >
                        <OffersEdit />
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

export default OffersTable;
