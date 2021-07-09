import React, { useState } from 'react';
import PageHeader from './PageHeader';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import {Search} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CouponForm from './CouponForm';
import { makeStyles, Paper,TableBody,TableRow,TableCell,Toolbar, InputAdornment} from '@material-ui/core';
import useTable from './Reusable/useTable';
import Controls from './Reusable/Controls';
import Popup from './Reusable/Popup';
import Notification from './Reusable/Notification';
import ConfirmDialog from './Reusable/ConfirmDialog';

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
    {id:'couponId',label:'Coupon Id'},
    {id:'couponTitle',label:'Coupon Title'},
    {id:'options',label:'Options',disableSorting:true},
]


const CouponTable = () => {
    const classes=useStyles();
    const [openPopup,setOpenPopup]=useState(false);
    const [notify,setNotify]=useState({isOpen:false,message:'',type:''});
    const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''})   
    const{
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }=useTable('',headCells,'');

    const openInPopup=item=>{
       // setRecordForEdit(item);
        setOpenPopup(true);
    };
    return (
        <div>
            <PageHeader
            title="COUPONS"
            icon={<LoyaltyIcon fontSize="large"/>}
            />

        <Paper className={classes.pageContent}>
         
            <Toolbar>
                  <Controls.Input
                      label="Search Coupon"
                      className={classes.searchInput}
                      InputProps={{
                          startAdornment:(
                            <InputAdornment position="start">
                                  <Search/>
                            </InputAdornment>)
                          }
                      }
                      //onChange={handleSearch}
                  />
                  <Controls.Button
                      text="Add New Coupon"
                      variant="outlined"
                      startIcon={<AddIcon/>}
                      className={classes.newButton}
                      onClick={()=>{setOpenPopup(true);}}
                  />
              </Toolbar>

            <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                             
                                <TableRow key={headCells.couponId}>
                                    <TableCell>{headCells.couponId}</TableCell>
                                    <TableCell>{headCells.couponTitle}</TableCell>   
                                    <TableCell>
                                          {/* <Controls.ActionButton
                                          color="primary"
                                          //onClick={()=>{openInPopup(item)}}
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
                                                  //onConfirm:()=>{onDelete(item.id)}
                                                })
                                            }}>
                                              <CloseIcon fontSize="small"/>
                                         </Controls.ActionButton> */}
                                    </TableCell>         
                                </TableRow>
                           
                        }
                    </TableBody>
               </TblContainer>
        </Paper>

        <Popup
            title="Add Coupon Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            >
                 <CouponForm/>
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
export default CouponTable;