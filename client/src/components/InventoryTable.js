import React, { useState } from "react";
import PageHeader from "./PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InventoryForm from "./InventoryForm";
import {
    makeStyles,
    Paper,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    InputAdornment,
} from "@material-ui/core";
import useTable from "./Reusable/useTable";
import Controls from "./Reusable/Controls";
import Popup from "./Reusable/Popup";
import Notification from "./Reusable/Notification";
import ConfirmDialog from "./Reusable/ConfirmDialog";

import Lottie from "react-lottie";
import Collection from "../images/collection.json";

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
}));

const headCells = [
    { id: "code", label: "Code" },
    { id: "colour", label: "Colour" },
    { id: "size", label: "Size" },
    { id: "type", label: "Type" },
    { id: "quantity", label: "Quantity" },
    { id: "margin", label: "Margin" },
    // { id: "code", label: "Code", disableSorting: true },
];

const InventoryTable = () => {
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
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
        useTable("", headCells, "");

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

                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            <TableRow key={headCells.collectionId}>
                                <TableCell>{headCells.collectionId}</TableCell>
                                <TableCell>{headCells.collectionName}</TableCell>
                                <TableCell>
                                    {/* <Controls.ActionButton
                                          color="primary"
                                          //onClick={()=>{openInPopup(item)}}
                                          >
                                              <EditOutlinedIcon fontSize="small"/>
                                         </Controls.ActionButton>
                                         <Controls.ActionButton
                                          color="secondary"
                                          onClick={()=>{
                                              setConfirmDialog({
                                                  isOpen:true,
                                                  title:'Are you sure to delete this?',
                                                  subTitle:"You can't undo this operation...",
                                                  //onConfirm:()=>{onDelete(item.id)}
                                                })
                                            }}>
                                              <CloseIcon fontSize="small"/>
                                         </Controls.ActionButton> */}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </TblContainer>
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
