import React from 'react';
import { Dialog,DialogTitle,DialogContent, makeStyles,Typography } from '@material-ui/core';
import Controls from './Controls';

const useStyles=makeStyles((theme)=>({
    dialogWrapper:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    },
    dialogTitle:{
        paddingRight:'0px'
    }

}));


const Popup = (props) => {
    const classes=useStyles();
    const {title,children,openPopup,setOpenPopup}=props;

    return (
        <Dialog open={openPopup} maxWidth="lg" classes={{paper:classes.dialogWrapper}}>
             <DialogTitle className={classes.dialogTitle}>
                 <div style={{display:'flex'}}>
                   <Typography
                    variant="h6"
                    component="div"
                    style={{flexGrow:1}}
                   >
                       {title}
                    </Typography>

                    <Controls.Button
                       color="secondary"
                       text="X"
                    >

                    </Controls.Button>
                 </div>   
             </DialogTitle>

             <DialogContent dividers>
                   {children}
             </DialogContent>
        </Dialog>
    );
};

export default Popup;