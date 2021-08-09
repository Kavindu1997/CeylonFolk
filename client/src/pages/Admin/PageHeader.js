import React from 'react';
import {Paper,Card,Typography,makeStyles} from '@material-ui/core';
import useStyles1 from './style1';


const PageHeader = (props) => {
    const classes=useStyles1();
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