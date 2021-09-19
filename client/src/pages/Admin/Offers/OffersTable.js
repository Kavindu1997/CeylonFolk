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
import DeleteIcon from '@material-ui/icons/Delete';


const OffersTable = () => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [collectionId, setCollectionId] = useState([]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const today = new Date().toISOString().slice(0, 10);
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


    // const onRemove = (id) => {

    //     setConfirmDialog({
    //         ...confirmDialog,
    //         isOpen: false
    //       });


    //     // dispatch(actionDeleteCollection(id));

    //     const data = { id: id }


    //     axios.delete(`http://localhost:3001/offers`, { data }).then((response) => {

    //         axios.get("http://localhost:3001/offers").then((response) => {
    //             console.log(response.data);
    //             setListOfOffers(response.data);
    //         });

    //     });



    // };
    
    const onRemove = (id) => {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });

        const data = { id: id }

        axios.delete(`http://localhost:3001/offers`, { data }).then((response) => {

            if (response.data.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Removed Failed !',
                    type: 'error'
                });
            } else {

                
                
                setNotify({
                    isOpen: true,
                    message: 'Removed Successfully !',
                    type: 'success'
                });
                axios.get("http://localhost:3001/offers").then((response) => {
                    console.log(response.data);
                    setListOfOffers(response.data);
                });


            }



        });



    };


    // function onProceed() {


    //       history.push('/collections');


    //   }


    // const onSetId = (id) => { //'Itom007'
    //     localStorage.setItem("collection_id", id);


    // };

// search

const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
} = useTable(listOfOffers,"", filterFn);

const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value === "")
                return items;
            else
                return items.filter(x => x.collection_name.toLowerCase().includes(target.value))
        }
    })
}

function setCollectionIdtoChange(value) {
    setOpenPopup1(true)
    setCollectionId({
        collection_id: value.collection_id,
    })
}

    return (

        <div style={{ display: "flex" }}>
            <AdminNav />

            <main className={classes.content}>
                <PageHeader title="OFFERS" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Input
                            label="Search Offer"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                    
                                ),
                            }}
                        onChange={handleSearch}
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
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1100px' }}>
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
                                        {recordsAfterPagingAndSorting()
                                            .map((value) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.collection_name}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.rate}%</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.from}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }} className={value.to<=today? classes.activeQuantityMargin : classes.quantityMargin}>{value.to}</TableCell>
                                                        <TableCell align="center">
                                                            <Controls.Button
                                                                text="Edit"
                                                                onClick={() => setCollectionIdtoChange(value)}
                                                            />
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <Button name="remove"
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => {
                                                                setConfirmDialog({
                                                                    isOpen: true,
                                                                    title: 'Are you sure to delete this?',
                                                                    subTitle: "You can't undo this operation...",
                                                                    onConfirm: () => { onRemove(value.collection_id) }
                                                                })
                                                            }}>
                                                          
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
                       
                        <OffersEdit  selectedCollectionId={collectionId} />
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
