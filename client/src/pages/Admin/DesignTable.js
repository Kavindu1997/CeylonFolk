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
import DesignNameEdit from "./DesignNameEdit";
import DesignImageEdit from "./DesignImageEdit";
import DesignPriceEdit from "./DesignPriceEdit";
import DeleteIcon from '@material-ui/icons/Delete';


var collection_id = localStorage.getItem("collection_id");
console.log(collection_id);

const DesignTable = () => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [openPopup3, setOpenPopup3] = useState(false);
    const [designId, setDesignId] = useState([]);
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

    // const onSetId = (id) => { //'Itom007'
    //     localStorage.setItem("design_id", id);


    // };


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
                axios.get(`http://localhost:3001/designs/${collection_id}`).then((response) => {
                    console.log(response.data);
                    setListOfDesigns(response.data);
                });


            }



        });



    };




    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(listOfDesigns, "", filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.design_name.toLowerCase().includes(target.value) ||
                        x.types.toLowerCase().includes(target.value))
            }
        })
    }

    function setDesignNametoChange(value) {
        setOpenPopup1(true)
        setDesignId({
            design_id: value.id,
        })
    }

    function setImagetoChange(value) {
        setOpenPopup2(true)
        setDesignId({
            design_id: value.id,
        })
    }

    function setDesignPricetoChange(value) {
        setOpenPopup3(true)
        setDesignId({
            design_id: value.id,
        })
    }

    return (

        <div style={{ display: "flex" }}>
            <AdminNav />
            <main className={classes.content}>

                <PageHeader title="DESIGNS" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Input
                            label="Search Design"
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


                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1000px' }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Design Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Change Design Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Change Image</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Type</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Price</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Change Price</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recordsAfterPagingAndSorting()
                                            .map((value) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.design_name}</TableCell>
                                                        <TableCell align="center">


                                                            <Controls.ActionButton
                                                                color="primary"
                                                                onClick={() => setDesignNametoChange(value)}
                                                            >
                                                                <EditOutlinedIcon fontSize="small" />
                                                            </Controls.ActionButton>

                                                        </TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.coverImage} alt=""></img></TableCell>
                                                        <TableCell align="center">


                                                            <Controls.ActionButton
                                                                color="primary"
                                                                onClick={() => setImagetoChange(value)}
                                                            >
                                                                <EditOutlinedIcon fontSize="small" />
                                                            </Controls.ActionButton>

                                                        </TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>
                                                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <span className={classes.swatchVisible} style={{ backgroundColor: value.color }}></span>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.types}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.price}</TableCell>
                                                        <TableCell align="center">


                                                            <Controls.ActionButton
                                                                color="primary"
                                                                onClick={() => setDesignPricetoChange(value)}
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
                                                                        subTitle: "You can't undo this operation...",
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
                                <TblPagination />
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

                        <DesignNameEdit selectedDesignId={designId} />
                    </Popup>


                    <Popup

                        title="Edit Design Form"

                        openPopup={openPopup2}
                        setOpenPopup={setOpenPopup2}
                    >

                        <DesignImageEdit selectedDesignId={designId} />
                    </Popup>


                    <Popup

                        title="Edit Design Form"

                        openPopup={openPopup3}
                        setOpenPopup={setOpenPopup3}
                    >

                        <DesignPriceEdit selectedDesignId={designId} />
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
