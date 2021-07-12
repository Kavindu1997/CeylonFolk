import React, { useState } from 'react';
import UserForm from './UserForm';
import PageHeader from './PageHeader';
import GroupIcon from '@material-ui/icons/Group';
import {Search} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Paper,TableBody,TableRow,TableCell,Toolbar, InputAdornment} from '@material-ui/core';
import useTable from './Reusable/useTable';
import * as userService from '../services/userService';
import Controls from './Reusable/Controls';
import Popup from './Reusable/Popup';
import Notification from './Reusable/Notification';
import ConfirmDialog from './Reusable/ConfirmDialog';

import Lottie from 'react-lottie';
import User from '../images/user.json';

const useStyles=makeStyles((theme)=>({
      pageContent:{
          margin:theme.spacing(5),
          padding:theme.spacing(3)
      },
      searchInput:{
          width:'50%'
      },
      newButton:{
          position:'absolute',
          right:'10px'
      }
}));

const headCells=[
    {id:'userType',label:'User Type'},
    {id:'firstName',label:'First Name'},
    {id:'lastName',label:'Last Name'},
    {id:'gender',label:'Gender'},
    {id:'mobile',label:'Mobile Number',disableSorting:true},
    {id:'email',label:'Email'},
    {id:'options',label:'Options',disableSorting:true},
]

const UserTable = () => {
    const classes=useStyles();
    const [records,setRecords]=useState(userService.getALLUsers());
    const [recordForEdit,setRecordForEdit]=useState(null)
    const [filterFn,setFilterFn]=useState({fn:items=>{return items;}});
    const [openPopup,setOpenPopup]=useState(false);
    const [notify,setNotify]=useState({isOpen:false,message:'',type:''});
    const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''})   
    const{
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }=useTable(records,headCells,filterFn);

    const handleSearch=e=>{
           let target=e.target;
           setFilterFn({
               fn:items=>{
                   if(target.value==="")
                      return items;
                   else
                      return items.filter(x=>x.firstName.toLowerCase().includes(target.value)) 
               }
           })
    }

    const addOrEdit=(user,resetForm)=>{
      if(user.id===0)  
        userService.insertUser(user);
      else
        userService.updateUser(user);  
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        setRecords(userService.getALLUsers());
        setNotify({
            isOpen:true,
            message:'Added Successfully !',
            type:'success'
        });
    }

    const openInPopup=item=>{
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete=id=>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen:false
        });
        userService.deleteUser(id);
        setRecords(userService.getALLUsers()); //refresh the records array
        setNotify({
            isOpen:true,
            message:'Removed Successfully !',
            type:'error'
        });
      
    }
    const defaultOptions={
        loop:true,
        autoplay:true,
        animationData:User,
        rendererSettings:{
          preserveAspectRatio:"xMidYMid slice"
        }
      };

    return (
        <div>
            <PageHeader
            title="USER MANAGEMENT"
            icon={< GroupIcon fontSize="large"/>}
            />

            {/* <Lottie options={defaultOptions} height={150} width={150} style={{marginTop:'-150px',marginRight:'30px'}} /> */}

            <Paper className={classes.pageContent}>
              
              <Toolbar>
                  <Controls.Input
                      label="Search User"
                      className={classes.searchInput}
                      InputProps={{
                          startAdornment:(
                            <InputAdornment position="start">
                                  <Search/>
                            </InputAdornment>)
                          }
                      }
                      onChange={handleSearch}
                  />
                  <Controls.Button
                      text="Add New User"
                      variant="outlined"
                      startIcon={<AddIcon/>}
                      className={classes.newButton}
                      onClick={()=>{setOpenPopup(true);setRecordForEdit(null);}}
                  />
              </Toolbar>
               <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                             recordsAfterPagingAndSorting().map(item=>(
                                <TableRow key={item.id}>
                                    <TableCell>{item.userType}</TableCell>
                                    <TableCell>{item.firstName}</TableCell>
                                    <TableCell>{item.lastName}</TableCell>
                                    <TableCell>{item.gender}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.email}</TableCell>       
                                    <TableCell>
                                          <Controls.ActionButton
                                          color="primary"
                                          onClick={()=>{openInPopup(item)}}
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
                                                  onConfirm:()=>{onDelete(item.id)}
                                                })
                                            //  onDelete(item.id)
                                            }}>
                                              <CloseIcon fontSize="small"/>
                                         </Controls.ActionButton>
                                    </TableCell>         
                                </TableRow>
                            ))
                        }
                    </TableBody>
               </TblContainer>
               <TblPagination/>
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
        </div>
    );
};

export default UserTable;