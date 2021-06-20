import React from 'react';
import {Paper,Card,Typography,makeStyles} from '@material-ui/core';

const useStyles=makeStyles((theme)=>({
    root:{
        backgroundColor:''
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(3)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:''
    },
    pageTitle:{
         padding:theme.spacing(1),
         
    }

}));
const PageHeader = (props) => {
    const classes=useStyles();
    const {title,icon}=props;
    return (
        <Paper elevation={0} square className={classes.root}>
        <div className={classes.pageHeader}>
            <Card className={classes.pageIcon}>
                 {icon}
            </Card>
            <div className={classes.pageTitle}>
                <Typography
                variant="h6"
                component="div"
                >
                    {title}
                </Typography>
            </div>
        </div>
        </Paper>
    );
};

export default PageHeader;