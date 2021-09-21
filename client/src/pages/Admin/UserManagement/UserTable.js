import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import EditUserForm from './EditUserForm';
import PageHeader from '../PageHeader';
import GroupIcon from '@material-ui/icons/Group';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment,Typography, IconButton } from '@material-ui/core';
import useTable from '../../../components/Reusable/useTable';
import Controls from '../../../components/Reusable/Controls';
import Popup from '../../../components/Reusable/Popup';
import Notification from '../../../components/Reusable/Notification';
import ConfirmDialog from '../../../components/Reusable/ConfirmDialog';
import useStyles from '../style';
import AdminNav from "../../../components/Reusable/AdminNav"
import axios from 'axios';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import logo from '../../../images/logo.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_URL } from '../../../_constants';


const headCells = [
    { id: 'user_type_id', label: 'User Type' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'contactNo', label: 'Mobile Number', disableSorting: true },
    { id: 'email', label: 'Email' },
    { id: 'options', label: 'Options', disableSorting: true },
]

const UserTable = () => {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    useEffect(() => {
        axios.get(API_URL+"/auth/").then((response) => {
            setRecords(response.data);
        });
    }, []);

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false);
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.firstName.toLowerCase().includes(target.value) ||
                        x.lastName.toLowerCase().includes(target.value) ||
                        x.type.toLowerCase().includes(target.value) ||
                        x.email.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (data, resetForm) => {
        if (data.id === 0) {
            axios.post(API_URL+"/auth/", data).then((response) => {
                if (response.data.error) {
                    setNotify({
                        isOpen: true,
                        message: response.data.error,
                        type: 'error'
                    });
                }else{
                axios.get(API_URL+"/auth/").then((response) => {
                    setRecords(response.data);
                });
                resetForm();
                setRecordForEdit(null);
                setOpenPopup(false);
                axios.get(API_URL+"/auth/").then((response) => {
                    setRecords(response.data);
                });
                setNotify({
                    isOpen: true,
                    message: 'Added Successfully !',
                    type: 'success'
                });
            }
            });
           
        } else {
            axios.put(`/auth/${data.id}`, data).then(() => {
                axios.get(API_URL+"/auth/").then((response) => {
                    setRecords(response.data);
                });
            });
            resetForm();
            setRecordForEdit(null);
            setOpenEditPopup(false);
            axios.get(API_URL+"/auth/").then((response) => {
                setRecords(response.data);
            });
            setNotify({
                isOpen: true,
                message: 'Edited Successfully !',
                type: 'info'
            });
        }

    }

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenEditPopup(true);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        axios.delete(API_URL+`/auth/${id}`).then(() => {
            axios.get(API_URL+"/auth/").then((response) => {
                setRecords(response.data);
            }); //refresh the records array
        });
        setNotify({
            isOpen: true,
            message: 'Removed Successfully !',
            type: 'error'
        });

    }
 
    const downloadPdf=()=>{
        const doc = new jsPDF("portrait","px","a4");
        doc.roundedRect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 3,3,'S');
        doc.addImage(logo,'PNG',20,5,36,0);
        doc.text("User Details Report",160,33);
        doc.autoTable({
            columns:headCells.slice(0,-1).map(col=>({...col,header:col.label,dataKey:col.id})),
            body:records,
            margin: {
                top: 40,
            },
            styles: {
                cellPadding: 3,
                fontSize: 10,
                valign: 'middle',
                overflow: 'linebreak',
                tableWidth: 'auto',
                lineWidth: 0,
            },
       
        });

     const pageCount = doc.internal.getNumberOfPages();
     for(var i = 1; i <= pageCount; i++) {
     doc.setPage(i);
     doc.text('Page ' + String(i) + ' of ' + String(pageCount),270-20,600-30,null,null,"right");
}

        doc.save("user-details-report.pdf");
    }

    return (
        <div style={{ display: "flex" }}>
            <AdminNav />

            <main className={classes.content}>
                <PageHeader
                    title="USER HANDLING"
                    icon={< GroupIcon fontSize="large" />}
                />
                   <IconButton onClick={()=>{downloadPdf()}} style={{marginTop:'-225px',marginLeft:'1100px',color:'#e74c3c'}}>
                                    <PictureAsPdfIcon fontSize="large"/>
                    </IconButton>
               

                <Paper className={classes.pageContent}>

                    <Toolbar>
                        <Controls.Input
                            label="Search User"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>)
                            }
                            }
                            onChange={handleSearch}
                        />
                        <Controls.Button
                            text="Add New User"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        />
                    </Toolbar>
                    <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>USERS</Typography>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.type.charAt(0).toUpperCase()+item.type.slice(1).toLowerCase()}</TableCell>
                                        <TableCell>{item.firstName}</TableCell>
                                        <TableCell>{item.lastName}</TableCell>
                                        <TableCell>{item.contactNo}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>

                                        {(item.type==="CUSTOMER")?"":
                                        <>
                                          <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <EditOutlinedIcon fontSize="small" />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this?',
                                                        subTitle: "You can't undo this operation...",
                                                        onConfirm: () => { onDelete(item.id) }
                                                    })
                                                 
                                                }}>
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                          </>}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </Paper>

                <Popup
                    title="Add User Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <UserForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                    />
                </Popup>

                <Popup
                    title="Edit User Form"
                    openPopup={openEditPopup}
                    setOpenPopup={setOpenEditPopup}
                >
                    <EditUserForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                    />
                </Popup>

                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />

                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </main>
        </div>
    );
};

export default UserTable;


