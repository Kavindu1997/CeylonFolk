import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import AddIcon from "@material-ui/icons/Add";
import AvailableColorsForm from "./AvailableColorsForm";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button } from "@material-ui/core";
import Controls from "../../../components/Reusable/Controls";
import Popup from "../../../components/Reusable/Popup";
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import Collection from "../../../images/collection.json";
import AdminNav from "../../../components/Reusable/AdminNav"
import useStyles from '../style';
import axios from 'axios';
// import { actionDeleteCollection } from '../../../_actions/collections';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchColors } from '../../../_actions/colorActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import EditColour from "./EditColour";
import EditColourName from "./EditColourName";
import EditPrice from "./EditPrice";



const CollectionTable = () => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [openPopup3, setOpenPopup3] = useState(false);

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const dispatch = useDispatch();

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

    const [colourId, setColorId] = useState([]);

    const addOrEdit = (data, resetForm) => {

        //  userService.updateUser(user);
        resetForm();
        // setRecordForEdit(null);
        setOpenPopup(false);
        // axios.get("http://localhost:3001/users/").then((response)=>{
        // setRecords(response.data);
        // });
        setNotify({
            isOpen: true,
            message: 'Added Successfully !',
            type: 'success'
        });
    }

    useEffect(() => {
        dispatch(fetchColors());
    }, []);

    const pickedItemColors = useSelector((state) => state.colorReducer.pickerColor)

    console.log("color check" + pickedItemColors);

    // dispatch(fetchColors());

    const onSetId = (id) => { //'Itom007'
        localStorage.setItem("colour_id", id);
    };

    const onRemove = (id) => {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });

        const data = { id: id }

        axios.delete(`http://localhost:3001/availableColors`, { data }).then((response) => {

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


            }

        });



    };


    function setColorNametoChange(value) {
        setOpenPopup1(true)
        setColorId({
            colour_id: value.id,
        })
    }

    function setColortoChange(value) {
        setOpenPopup2(true)
        setColorId({
            colour_id: value.id,
        })
    }

    function setPricetoChange(value) {
        setOpenPopup3(true)
        setColorId({
            colour_id: value.id,
        })
    }

    return (
        <div style={{ display: "flex" }}>
            <AdminNav />
            <main className={classes.content}>
                <PageHeader title="COLORS" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Button
                            text="Add New Color"
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
                            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>COLORS</Typography>
                            <TableContainer style={{ marginTop: '20px', align: 'center', width: '1100px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Edit Colour Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Edit Colour</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Price</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Edit Price</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pickedItemColors.map((pickColor) => {
                                            const { id, color, price, color_name } = pickColor;
                                            return (
                                                <TableRow>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{color_name}</TableCell>
                                                    <TableCell align="center">


                                                        <Controls.ActionButton
                                                            color="primary"
                                                            onClick={() => setColorNametoChange(pickColor)}
                                                        >
                                                            <EditOutlinedIcon fontSize="small" />
                                                        </Controls.ActionButton>

                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>
                                                        {/* <img height={100} align="center" src={'http://localhost:3001/' + value.coverImage} alt=""></img> */}

                                                        <span className={classes.swatchVisible} style={{ backgroundColor: color }}></span>

                                                    </TableCell>
                                                    <TableCell align="center">


                                                        <Controls.ActionButton
                                                            color="primary"
                                                            onClick={() => setColortoChange(pickColor)}
                                                        >
                                                            <EditOutlinedIcon fontSize="small" />
                                                        </Controls.ActionButton>

                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{price}</TableCell>


                                                    <TableCell align="center">

                                                        <Controls.ActionButton
                                                            color="primary"
                                                            onClick={() => setPricetoChange(pickColor)}
                                                        >
                                                            <EditOutlinedIcon fontSize="small" />
                                                        </Controls.ActionButton>

                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Button name="remove"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: 'Are you sure to delete this?',
                                                                subTitle: "Inventory data and designs which are related to this colour will be automatically deleted. You can't undo this operation.",
                                                                onConfirm: () => { onRemove(id) }
                                                            })
                                                        }}>
                                                          
                                                        </Button>


                                                        {/* <Button

                                                            
                                                            name="remove"
                                                            onClick={() => {
                                                                setConfirmDialog({
                                                                    isOpen: true,
                                                                    title: 'Are you sure to delete this?',
                                                                    subTitle: "You can't undo this operation...",
                                                                    onConfirm: () => { onRemove(id) }
                                                                })
                                                            }} /> */}


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
                        title="Add Colour Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <AvailableColorsForm />
                    </Popup>


                    <Popup
                        title="Edit Colour Name Form"
                        openPopup={openPopup1}
                        setOpenPopup={setOpenPopup1}
                    >

                        <EditColourName selectedColourId={colourId} />
                    </Popup>

                    <Popup
                        title="Edit Colour Form"
                        openPopup={openPopup2}
                        setOpenPopup={setOpenPopup2}
                    >
                        <EditColour selectedColourId={colourId} />

                    </Popup>
                    <Popup
                        title="Edit Colour Price Form"
                        openPopup={openPopup3}
                        setOpenPopup={setOpenPopup3}
                    >
                        <EditPrice selectedColourId={colourId} />

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

export default CollectionTable;
