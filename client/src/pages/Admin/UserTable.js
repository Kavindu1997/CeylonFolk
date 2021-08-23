import React, { useState,useEffect } from 'react';
import UserForm from './UserForm';
import PageHeader from './PageHeader';
import GroupIcon from '@material-ui/icons/Group';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../components/Reusable/useTable';
import * as userService from '../../services/userService';
import Controls from '../../components/Reusable/Controls';
import Popup from '../../components/Reusable/Popup';
import Notification from '../../components/Reusable/Notification';
import ConfirmDialog from '../../components/Reusable/ConfirmDialog';
import AdminPanel from './index';
import useStyles from './style';
import AdminNav from "../../components/Reusable/AdminNav"
import Lottie from 'react-lottie';
import User from '../../images/user.json';
import axios from 'axios';


const headCells = [
    { id: 'user_type', label: 'User Type' },
    { id: 'first_name', label: 'First Name' },
    { id: 'last_name', label: 'Last Name' },
    { id: 'gender', label: 'Gender' },
    { id: 'mobile_no', label: 'Mobile Number', disableSorting: true },
    { id: 'email', label: 'Email' },
    { id: 'options', label: 'Options', disableSorting: true },
]

const UserTable = () => {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/users/").then((response)=>{
                  setRecords(response.data);
        });
    },[]);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false);
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
                    return items.filter(x => x.first_name.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (data, resetForm) => {
        if (data.id === 0)
            axios.post("http://localhost:3001/users/", data).then(() => {
                axios.get("http://localhost:3001/users/").then((response)=>{
                    setRecords(response.data);
                });
         });
        else
          //  userService.updateUser(user);
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        axios.get("http://localhost:3001/users/").then((response)=>{
        setRecords(response.data);
        });
        setNotify({
            isOpen: true,
            message: 'Added Successfully !',
            type: 'success'
        });
    }

    const openInPopup = item => {
        axios.get(`http://localhost:3001/users/${item.id}`).then((response)=>{
         //  console.log(response.data);   
           setRecordForEdit(response.data);
        });
      
        setOpenPopup(true);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        axios.delete(`http://localhost:3001/users/${id}`).then(()=>{
            axios.get("http://localhost:3001/users/").then((response)=>{
            setRecords(response.data);
        }); //refresh the records array
        });
        setNotify({
            isOpen: true,
            message: 'Removed Successfully !',
            type: 'error'
        });

    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: User,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div style={{display:"flex"}}>
        <AdminNav/>

        <main className={classes.content}>
                <PageHeader
                    title="USER HANDLING"
                    icon={< GroupIcon fontSize="large" />}
                />

                <Lottie options={defaultOptions} height={150} width={150} style={{marginTop:'-150px',marginRight:'30px'}} />

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
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.user_type}</TableCell>
                                        <TableCell>{item.first_name}</TableCell>
                                        <TableCell>{item.last_name}</TableCell>
                                        <TableCell>{item.gender}</TableCell>
                                        <TableCell>{item.mobile_no}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            
                                         
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
                                                    //  onDelete(item.id)
                                                }}>
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
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


