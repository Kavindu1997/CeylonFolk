import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from './PageHeader';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import CouponForm from './CouponForm';
import EditCouponForm from './EditCouponForm';
import { makeStyles, Paper,TableBody,TableRow,TableCell,Toolbar, InputAdornment} from '@material-ui/core';
import useTable from '../../components/Reusable/useTable';
import Controls from '../../components/Reusable/Controls';
import Popup from '../../components/Reusable/Popup';
import Notification from '../../components/Reusable/Notification';
import ConfirmDialog from '../../components/Reusable/ConfirmDialog';
import useStyles from './style';
import AdminNav from "../../components/Reusable/AdminNav"
import Lottie from 'react-lottie';
import Coupon from '../../images/coupon.json';
import {fetchCoupons,createCoupon,deleteCoupon,updateCoupon } from '../../_actions/couponAction';


const headCells=[
    {id:'coupon_id',label:'Coupon Id',disableSorting:true},
    {id:'coupon_title',label:'Coupon Title',disableSorting:true},
    {id:'options',label:'Options',disableSorting:true},
]


const CouponTable = () => {
    const classes=useStyles();
    const couponRecords=useSelector((state)=>state.couponReducer.coupons);
    const dispatch=useDispatch();
    useEffect(()=>{
       dispatch(fetchCoupons());
    },[]);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false);
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(couponRecords, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.coupon_title.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (data, resetForm) => {
        if (data.id === 0){
         dispatch(createCoupon(data));
        // window.location.reload(true);
         resetForm();
         setRecordForEdit(null);
         setOpenPopup(false);
         dispatch(fetchCoupons());
         setNotify({
             isOpen: true,
             message: 'Added Successfully !',
             type: 'success'
         });
        
        }else{
       // dispatch(updateCoupon(data,data.id));
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        dispatch(fetchCoupons());
        setNotify({
            isOpen: true,
            message: 'Edited Successfully !',
            type: 'info'
        });
        window.location.reload(true);
    }
    }
    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenEditPopup(true);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
     
      //  dispatch(deleteCoupon(id));
        window.location.reload(true);
        setNotify({
            isOpen: true,
            message: 'Removed Successfully !',
            type: 'error'
        });

    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Coupon,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div style={{display:"flex"}}>
        <AdminNav/>
        <main className={classes.content}>
            <PageHeader
            title="COUPONS"
            icon={<LoyaltyIcon fontSize="large"/>}
            />

        <Lottie options={defaultOptions} height={150} width={150} style={{marginTop:'-150px',marginRight:'30px'}} />

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
                      onChange={handleSearch}
                  />
                  <Controls.Button
                      text="Add New Coupon"
                      variant="outlined"
                      startIcon={<AddIcon/>}
                      className={classes.newButton}
                      onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                  />
              </Toolbar>

              <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key={item.coupon_id}>
                                        <TableCell>{item.coupon_id}</TableCell>
                                        <TableCell>{item.coupon_title}</TableCell>
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
            title="Add Coupon Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            >
                 <CouponForm
                  recordForEdit={recordForEdit}
                  addOrEdit={addOrEdit}
                  />
        </Popup>

        <Popup
            title="Edit Coupon Form"
            openPopup={openEditPopup}
            setOpenPopup={setOpenEditPopup}
            >
                <EditCouponForm
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
export default CouponTable;