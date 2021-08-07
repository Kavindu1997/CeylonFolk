import React, { useState } from "react";
import PageHeader from "./PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CollectionForm from "./CollectionForm";
import {
    makeStyles,
    Paper,
    TableBody,
    TableRow,
    TableCell,
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
    { id: "collectionId", label: "Collection Id" },
    { id: "collectionName", label: "Collection Name" },
    { id: "options", label: "Options", disableSorting: true },
];

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
            <PageHeader title="COLLECTIONS" icon={<LayersIcon fontSize="large" />} />

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
                        text="Add New Collection"
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
                title="Add Collection Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CollectionForm />
            </Popup>

            <Notification notify={notify} setNotify={setNotify} />

            {<ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />}
        </div>
    );
};

export default CollectionTable;
