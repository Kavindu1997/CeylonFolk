import React, { useState } from 'react';
import UserForm from './UserForm';
import PageHeader from './PageHeader';
import GroupIcon from '@material-ui/icons/Group';
import {Search} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Paper,TableBody,TableRow,TableCell,Toolbar, InputAdornment} from '@material-ui/core';
import useTable from './Reusable/useTable';
import * as userService from '../services/userService';
import Controls from './Reusable/Controls';
import Popup from './Reusable/Popup';

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
]

const UserTable = () => {
    const classes=useStyles();
    const [records,setRecords]=useState(userService.getALLUsers());
    const [filterFn,setFilterFn]=useState({fn:items=>{return items;}});
    const [openPopup,setOpenPopup]=useState(false);
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
    return (
        <div>
            <PageHeader
            title="User Management"
            icon={< GroupIcon fontSize="large"/>}
            />
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
                      onClick={()=>setOpenPopup(true)}
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
                  <UserForm/>
            </Popup>
        </div>
    );
};

export default UserTable;