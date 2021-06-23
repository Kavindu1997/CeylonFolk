import React, { useState } from 'react';
import UserForm from './UserForm';
import PageHeader from './PageHeader';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles, Paper,TableBody,TableRow,TableCell } from '@material-ui/core';
import useTable from './Reusable/useTable';
import * as userService from '../services/userService';
const useStyles=makeStyles((theme)=>({
      pageContent:{
          margin:theme.spacing(5),
          padding:theme.spacing(3)
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
    const{
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }=useTable(records,headCells);


    return (
        <div>
            <PageHeader
            title="User Management"
            icon={< GroupIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
               <UserForm/>
             
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
        </div>
    );
};

export default UserTable;