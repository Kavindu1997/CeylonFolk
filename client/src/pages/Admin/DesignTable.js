import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DesignForm from "./DesignForm";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Box, Button } from "@material-ui/core";
import useTable from "../../components/Reusable/useTable";
import Controls from "../../components/Reusable/Controls";
import Popup from "../../components/Reusable/Popup";
import Notification from "../../components/Reusable/Notification";
import ConfirmDialog from "../../components/Reusable/ConfirmDialog";
import Collection from "../../images/collection.json";
import AdminNav from "../../components/Reusable/AdminNav"
import useStyles from './style';
import axios from 'axios';
import { actionDeleteCollection } from '../../_actions/collections';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import DesignEdit from "./EditDesignForm";

var collection_id = localStorage.getItem("collection_id");
console.log(collection_id);

const DesignTable = () => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
  
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
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

    const [listOfDesigns, setListOfDesigns] = useState([]);

    let history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:3001/designs/${collection_id}`).then((response) => {
            console.log(response.data);
            setListOfDesigns(response.data);
        })
    }, []);

    const onSetId = (id) => { //'Itom007'
        localStorage.setItem("design_id", id);


    };


    // function onProceed() {
    //     // var id = localStorage.getItem("userId");

    //       history.push('/inventory');


    //   }

    const onRemove = (id) => {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
          });

        const data = { id: id }

        axios.delete(`http://localhost:3001/designs`, { data }).then((response) => {

            axios.get("http://localhost:3001/designs").then((response) => {
                console.log(response.data);
                setListOfDesigns(response.data);
            });

        });



    };


    const [search, setSearch] = useState('');
    const [record, setRecord] = useState([]);
    const [choice, setChoice] = useState('');


    // On Page load display all records 
    // const loadInventoryDetail = async () => {
    //     var response = fetch('http://localhost:3001/inventSearch')
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (myJson) {
    //             setRecord(myJson);
    //         });
    // }
    // useEffect(() => {
    //     loadInventoryDetail();
    // }, []);

    // Search Records here 
    const searchRecords = () => {
        console.log(choice);
        // // console.log(search);
        if (choice == 'design_name') {

            axios.get(`http://localhost:3001/designs/searchRecordDesignName/${search}/${collection_id}`)
                .then(response => {
                    setRecord(response.data);
                });

        }
        else if (choice == 'collection_name') {

            axios.get(`http://localhost:3001/designs/searchRecordCollectionName/${search}`)
                .then(response => {
                    setRecord(response.data);
                });

        }
        else if (choice == 'type') {

            axios.get(`http://localhost:3001/designs/searchRecordType/${search}`)
                .then(response => {
                    setRecord(response.data);
                });

        }

        else if (choice == 'price') {

            axios.get(`http://localhost:3001/designs/searchRecordPrice/${search}`)
                .then(response => {
                    setRecord(response.data);
                });

        }



    }

    const loadRecordAgain = () => {
        var response = fetch(`http://localhost:3001/designs/${collection_id}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setRecord(myJson);
            });

    }
    useEffect(() => {
        loadRecordAgain();
        // dispatch(fetchColors());
    }, []);

    const onChoice = (e) => {
        setChoice(e.target.value)
    }


    return (

        <div style={{ display: "flex" }}>
            <AdminNav />
            <main className={classes.content}>

                <PageHeader title="DESIGNS" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Input
                            type="text" id="form1" onKeyDown={loadRecordAgain} onKeyUp={searchRecords} onChange={(e) => setSearch(e.target.value)}
                            label="Search Inventory"
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
                        <select className={classes.iconForSearch} name="choice" onChange={onChoice}>
                            <option value="">Select</option>
                            <option value="design_name">Design Name</option>
                            <option value="collection_name">Collection Name</option>
                            <option value="type">Type</option>
                            <option value="price">Price</option>


                        </select>
                        <Controls.Button
                            text="Add New Design"
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


                            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>DESIGNS </Typography>


                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Design Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Type</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Price</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Update</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {record
                                            .map((value) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.design_name}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.coverImage} alt=""></img></TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>
                                                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <span className={classes.swatchVisible} style={{ backgroundColor: value.color }}></span>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.types}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.price}</TableCell>
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
                                                            <Button name="remove" onClick={() => {
                                                                setConfirmDialog({
                                                                    isOpen: true,
                                                                    title: 'Are you sure to delete this?',
                                                                    subTitle: "You can't undo this operation...",
                                                                    onConfirm: () => { onRemove(value.id) }
                                                                })
                                                            }}>
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
                        title="Add Design Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <DesignForm />
                    </Popup>

                    <Popup

                        title="Edit Design Form"

                        openPopup={openPopup1}
                        setOpenPopup={setOpenPopup1}
                    >
                        <DesignEdit />
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

export default DesignTable;
