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
const UserTable = () => {
    const classes=useStyles();
    const [records,setRecords]=useState(userService.getALLUsers());
    const{
        TblContainer
    }=useTable();


    return (
        <div>
            <PageHeader
            title="User Management"
            icon={< GroupIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
               <UserForm/>
               <TblContainer>
                    <TableBody>
                        {
                            records.map(item=>(
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

            </Paper>
        </div>
    );
};

export default UserTable;