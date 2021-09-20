import PageHeader from "./PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import InventoryForm from "./InventoryForm";
import InventoryEdit from "./InventoryEdit";
import {
    Toolbar,
    InputAdornment,
} from "@material-ui/core";
import useTable from "../../components/Reusable/useTable";
import Controls from "../../components/Reusable/Controls";
import Popup from "../../components/Reusable/Popup";
import Notification from "../../components/Reusable/Notification";
import ConfirmDialog from "../../components/Reusable/ConfirmDialog";
import { useDispatch } from "react-redux";
import Collection from "../../images/collection.json";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button, Box, Container } from '@material-ui/core';
import useStyles from './style';
import AdminNav from "../../components/Reusable/AdminNav";
import DeleteIcon from '@material-ui/icons/Delete';


const InventoryTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [listOfItems, setListOfItems] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/invent/inventory").then((response) => {
          
            setListOfItems(response.data);
        });
    }, []);

    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [inventoryId, setInventoryId] = useState([]);

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const openInPopup = (item) => {
      
        setOpenPopup(true);
    };

    const openInPopup1 = (item) => {
  
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

  

    const onRemove = (id) => {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
          });

        const data = { id: id }

        axios.delete(`http://localhost:3001/invent/inventory`, { data }).then((response) => {

            if (response.data.data==0){
                setNotify({
                    isOpen: true,
                    message: 'Removed Failed !',
                    type: 'error'
                });
            }
            else if(response.data.data==1){
                setNotify({
                    isOpen: true,
                    message: 'Removed Successfully !',
                    type: 'success'
                  });
                  axios.get("http://localhost:3001/invent/inventory").then((response) => {
                    setListOfItems(response.data);
                });

            }
            else  if(response.data.data==2){
               
                

                setNotify({
                    isOpen: true,
                    message: 'Updated Quantity as 0 !',
                    type: 'success'
                  });
                  axios.get("http://localhost:3001/invent/inventory").then((response) => {
                    setListOfItems(response.data);
                });
               
            } 


        });



    };


    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const {
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(listOfItems,"", filterFn);
    
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.size.toLowerCase().includes(target.value)||
                    x.color_name.toLowerCase().includes(target.value) ||
                    x.types.toLowerCase().includes(target.value))
            }
        })
    }

    function setInventoryIdtoChange(value) {
        setOpenPopup1(true)
        setInventoryId({
            inventory_id: value.id,
        })
    }

    return (

       

        <div style={{ display: "flex" }}>
            
            <AdminNav />
            <main className={classes.content}>
           
                <PageHeader title="INVENTORY MANAGEMENT" icon={<LayersIcon fontSize="large" />} />
          
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        
                           
                                                <Controls.Input
                            label="Search Inventory"
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
                                                    text="Add new item to the Inventory"
                                                    variant="outlined"
                                                    startIcon={<AddIcon />}
                                                    className={classes.newButton}
                                                    onClick={() => {
                                                        setOpenPopup(true);
                                                    }}
                                                />

                                          

                    </Toolbar>

                    <Container>
                        <center>
                            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>INVENTORY</Typography>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour Name</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Size</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Type</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Quantity</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Margin</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Update</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {recordsAfterPagingAndSorting().map((value) =>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>
                                                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <span className={classes.swatchVisible} style={{ backgroundColor: value.color }}></span>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.color_name}</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.size}</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.types}</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat'}} className={value.quantity<=value.margin? classes.activeQuantityMargin : classes.quantityMargin} >{value.quantity}</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.margin}</TableCell>
                                            <TableCell align="center">
                                                <Controls.Button
                                                    text="Edit"
                                                    onClick={() => setInventoryIdtoChange(value)}
                                                />
                                            </TableCell>
                                       
                                       
                                            <TableCell align="center">
                                                            <Button name="remove" 
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => {
                                                                setConfirmDialog({
                                                                    isOpen: true,
                                                                    title: 'Are you sure to delete this?',
                                                                    subTitle: "If there are designs which are related to this inventory item, then the quantity will set to 0. Otherwise this item will be deleted",
                                                                    onConfirm: () => { onRemove(value.id) }
                                                                })
                                                            }}>
                                                            
                                                            </Button>
                                                        </TableCell>

                                        </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                            <TblPagination />
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

                    title="Edit Inventory Form"

                    openPopup={openPopup1}
                    setOpenPopup={setOpenPopup1}
                >
                  
                    <InventoryEdit selectedInventoryId={inventoryId} />
                </Popup>

                <Notification notify={notify} setNotify={setNotify} />

                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
               
            </main >

           
        </div >

    
    );
};

export default InventoryTable;
