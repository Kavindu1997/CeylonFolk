import React from 'react';
import UserForm from './UserForm';
import PageHeader from './PageHeader';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles=makeStyles((theme)=>({
      pageContent:{
          margin:theme.spacing(5),
          padding:theme.spacing(3)
      }
}));
const UserTable = () => {
    const classes=useStyles();
    return (
        <div>
            <PageHeader
            title="User Management"
            icon={< GroupIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
               <UserForm/>
            </Paper>
        </div>
    );
};

export default UserTable;