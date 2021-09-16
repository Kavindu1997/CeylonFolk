import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
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
import { fetchColors } from '../../../_actions/colorActions'


const CollectionTable = () => {
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

    // dispatch(fetchColors());

    const onRemove = (id) => {
        // dispatch(actionDeleteCollection(id));
        const data = { id: id }
    };

    const onSetId = (id) => { //'Itom007'
        localStorage.setItem("collection_id", id);
    };

    return (
        <div style={{ display: "flex" }}>
            <AdminNav />
            <main className={classes.content}>
                <PageHeader title="COLORS" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Input
                            label="Search Colors"
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
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1100px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Price</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Edit Colour</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Delete Colour</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pickedItemColors.map((pickColor) => {
                                            const {color, price,color_name } = pickColor;
                                            return (
                                                <TableRow>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{color_name}</TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>
                                                        {/* <img height={100} align="center" src={'http://localhost:3001/' + value.coverImage} alt=""></img> */}

                                                        <span className={classes.swatchVisible} style={{ backgroundColor: color }}></span>

                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{price}</TableCell>
                                                    <TableCell align="center">
                                                        <Button name="remove"
                                                        // onClick={() => onRemove(value.id)}
                                                        >
                                                            <i className="fa fa-times" aria-hidden="true"></i>
                                                        </Button>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Button name="remove"
                                                        // onClick={() => onRemove(value.id)}
                                                        >
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
                        title="Add Colors Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <AvailableColorsForm
                            addOrEdit={addOrEdit}
                        />
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
