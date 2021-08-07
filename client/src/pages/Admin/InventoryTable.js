// import React, { useState } from "react";
import PageHeader from "./PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Grid } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InventoryForm from "./InventoryForm";
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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';



const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: "50%",
    },
    newButton: {
        position: "absolute",
        right: "10px",
    },
    submit: {
        align: 'center',
        padding: '5px',
        marginTop: '20px',
    },
}));

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
    const classes = useStyles();

    const [listOfItems, setListOfItems] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/invent/inventory").then((response) => {
            // console.log(response.data);
            setListOfItems(response.data);
        });
    }, []);



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

    return (
        <div>
            <PageHeader title="INVENTORY MANAGEMENT" icon={<LayersIcon fontSize="large" />} />

            {/* <Lottie options={defaultOptions} height={150} width={150} style={{marginRight:'30px'}} />marginTop:'-150px', */}

            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Collection"
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
                        text="Add new item to the Inventory"
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
                        <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>INVENTORY</Typography>
                        <TableContainer component={Paper} style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Code</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Size</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Type</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Quantity</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Margin</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listOfItems
                                        .map((value) => {
                                            return (
                                                <TableRow key={value.id}>

                                                    {/* <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> <img src={require({"'" + value.image+"'"}).default} /> </TableCell> */}
                                                    {/* <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> <img height={100} align="center" src={value.image} alt="" /> </TableCell> */}
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.code} </TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.colour} </TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.size} </TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.type} </TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.quantity} </TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.margin} </TableCell>
                                                    <TableCell align="center">
                                                        <Grid item md={6} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                                            <Button
                                                                type="submit"
                                                                fullWidth
                                                                variant="contained"
                                                                color="primary"
                                                                className={classes.submit}
                                                            >Edit</Button>
                                                        </Grid>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Grid item md={6} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                                            <Button
                                                                type="submit"
                                                                fullWidth
                                                                variant="contained"
                                                                color="primary"
                                                                className={classes.submit}
                                                            >Remove</Button>
                                                        </Grid>
                                                    </TableCell>




                                                </TableRow>
                                            );

                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </center>

                </container>
            </Paper>

            <Popup
                title="Add Inventory Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <InventoryForm />
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
