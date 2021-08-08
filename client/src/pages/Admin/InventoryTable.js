// import React, { useState } from "react";
import PageHeader from "./PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
// import { Grid, TextField } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InventoryForm from "./InventoryForm";
import InventoryEdit from "./InventoryEdit";
import {
    makeStyles,
    Toolbar,
    InputAdornment,
} from "@material-ui/core";
import useTable from "../../components/Reusable/useTable";
import Controls from "../../components/Reusable/Controls";
import Popup from "../../components/Reusable/Popup";
import Notification from "../../components/Reusable/Notification";
import ConfirmDialog from "../../components/Reusable/ConfirmDialog";

import Lottie from "react-lottie";
import Collection from "../../images/collection.json";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@material-ui/core';
import axios from 'axios';
// import { useEffect, useState } from 'react';
// import InventorySearch from './InventorySearch';

// import SearchBar from "material-ui-search-bar";

import React, { useState, useEffect } from "react";


import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box, Container } from '@material-ui/core';
// import Popup from "../../components/Reusable/Popup";
// import {
//   makeStyles,
//   Toolbar,
//   InputAdornment,
// } from "@material-ui/core";
import { Grid, TextField } from '@material-ui/core';
// import Controls from "../../components/Reusable/Controls";
import useStyles from './style';



// const headCells = [
//     { id: "code", label: "Code" },
//     { id: "colour", label: "Colour" },
//     { id: "size", label: "Size" },
//     { id: "type", label: "Type" },
//     { id: "quantity", label: "Quantity" },
//     { id: "margin", label: "Margin" },
//     // { id: "code", label: "Code", disableSorting: true },
// ];

const InventoryTable = () => {


    //Search Bar Things

    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [record, setRecord] = useState([]);


    // On Page load display all records 
    const loadInventoryDetail = async () => {
        var response = fetch('http://localhost:3001/inventSearch')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setRecord(myJson);
            });
    }
    useEffect(() => {
        loadInventoryDetail();
    }, []);

    // Search Records here 
    const searchRecords = () => {
        axios.get(`http://localhost:3001/inventSearch/searchRecord/${search}`)
            .then(response => {
                setRecord(response.data);
            });

    }

    const loadRecordAgain = () => {
        var response = fetch('http://localhost:3001/inventSearch')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setRecord(myJson);
            });

    }
    useEffect(() => {
        loadRecordAgain();
    }, []);






    //Inventory Things

    // const classes = useStyles();

    const [listOfItems, setListOfItems] = useState([]);

    // useEffect(() => {

    //     axios.get("http://localhost:3001/invent/inventory").then((response) => {
    //         // console.log(response.data);
    //         setListOfItems(response.data);
    //     });
    // }, []);



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

    // const handleSearch = {


    //  text: "dddd",


    // }

    return (
        <div>
            <PageHeader title="INVENTORY MANAGEMENT" icon={<LayersIcon fontSize="large" />} />

            {/* <Lottie options={defaultOptions} height={150} width={150} style={{marginRight:'30px'}} />marginTop:'-150px', */}

            <Paper className={classes.pageContent}>
                <Toolbar>

                    <section>
                        <div class="container">
                            {/* <h4 className="mb-3 text-center mt-4">Search Records in MERN</h4> */}
                            <div class="row mt-3">
                                <div class="col-sm-11">
                                    <div class="input-group mb-4 mt-3">
                                        <div class="form-outline">
                                            <input type="text" id="form1" onKeyDown={loadRecordAgain} onKeyUp={searchRecords} onChange={(e) => setSearch(e.target.value)} class="form-control" placeholder="Search Item Here" style={{ backgroundColor: "#ececec", boxShadow: 'none', padding: '10px' }} />

                                            <Controls.Button
                                                text="Add new item to the Inventory"
                                                variant="outlined"
                                                startIcon={<AddIcon />}
                                                className={classes.newButton}
                                                onClick={() => {
                                                    setOpenPopup(true);
                                                }}
                                            />

                                        </div>
                                        {/* <button type="button" onClick={searchRecords}  class="btn btn-success">
            <i class="fa fa-search" aria-hidden="true"></i>
        </button> */}


                                    </div>



                                  
                                </div>
                            </div>
                        </div>
                    </section>


                </Toolbar>

                <Container>
                                        <center>
                                            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>INVENTORY</Typography>
                                            <Table className={classes.table} aria-label="simple table">
                                                <thead>
                                                    <tr>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Code</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Size</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Type</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Quantity</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Margin</TableCell>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {record.map((value) =>
                                                        <tr>
                                                            <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.code}</td>
                                                            <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.colour}</td>
                                                            <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.size}</td>
                                                            <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.type}</td>
                                                            <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.quantity}</td>
                                                            <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.margin}</td>


                                                            {/* <td><img class="img-fluid" src={"/images/" + name.emp_image} style={{maxWidth:"40px"}}  alt=""/></td> */}

                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </center>
                                    </Container>


            </Paper>

            <Popup
                title="Add Inventory Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <InventoryForm />
            </Popup>

            <Popup
                title="Add Inventory Form"
                openPopup={openPopup1}
                setOpenPopup={setOpenPopup1}
            >
                <InventoryEdit />
            </Popup>

            <Notification notify={notify} setNotify={setNotify} />

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    );
};

export default InventoryTable;
