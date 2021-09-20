import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TypesForm from "./TypesForm";
import TypesEdit from "./TypesEdit";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button } from "@material-ui/core";
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
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';


const TypesTable = () => {
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
    const [typeId, setTypeId] = useState([]);

    const [listOfTypes, setListOfTypes] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/types").then((response) => {
           
            setListOfTypes(response.data);
        })
    }, []);



    const onRemove = (id) => {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
          });

        const data = { id: id }

        axios.delete(`http://localhost:3001/types`, { data }).then((response) => {

            if (response.data.data==0){
                setNotify({
                    isOpen: true,
                    message: 'Removed Failed !',
                    type: 'error'
                });
            }else{
               
                setNotify({
                    isOpen: true,
                    message: 'Removed Successfully !',
                    type: 'success'
                  });
                  axios.get("http://localhost:3001/types").then((response) => {
                    setListOfTypes(response.data);
                });
               
            } 


        });



    };


    function setTypeIdtoChange(value) {
        setOpenPopup1(true)
        setTypeId({
            types_id: value.id,
        })
    }

    return (

        <div style={{ display: "flex" }}>
            <AdminNav />

            <main className={classes.content}>
                <PageHeader title="TYPES" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>

                        <Controls.Button
                            text="Add New Type"
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
                            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>TYPES</Typography>
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1100px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Type</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Price</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Update</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listOfTypes
                                            .map((value) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.types}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.coverImage} alt=""></img></TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.price}</TableCell>
                                                        <TableCell align="center">
                                                            <Controls.Button
                                                                text="Edit"
                                                                onClick={() => setTypeIdtoChange(value)}
                                                            />
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <Button name="remove" 
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => {
                                                                setConfirmDialog({
                                                                    isOpen: true,
                                                                    title: 'Are you sure to delete this?',
                                                                    subTitle: "Inventory data and designs which are related to this type will be automatically deleted. You can't undo this operation.",
                                                                    onConfirm: () => { onRemove(value.id) }
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
                        title="Add Type Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <TypesForm />
                    </Popup>

                    <Popup

                        title="Edit Types Form"

                        openPopup={openPopup1}
                        setOpenPopup={setOpenPopup1}
                    >
                    
                    <TypesEdit selectedTypeId={typeId} />
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

export default TypesTable;
