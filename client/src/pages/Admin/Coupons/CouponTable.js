import React, { useState,useEffect } from 'react';
import PageHeader from '../PageHeader';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import CouponForm from './CouponForm';
import EditCouponForm from './EditCouponForm';
import { Paper,TableBody,TableRow,TableCell,Toolbar, InputAdornment,Typography} from '@material-ui/core';
import useTable from '../../../components/Reusable/useTable';
import Controls from '../../../components/Reusable/Controls';
import Popup from '../../../components/Reusable/Popup';
import Notification from '../../../components/Reusable/Notification';
import ConfirmDialog from '../../../components/Reusable/ConfirmDialog';
import useStyles from '../style';
import AdminNav from "../../../components/Reusable/AdminNav"
import axios from 'axios';
import { API_URL } from '../../../_constants';

const headCells=[
    {id:'coupon_number',label:'Coupon Number'},
    {id:'discount_amount',label:'Discount Amount'},
    {id:'start_date',label:'Start Date'},
    {id:'end_date',label:'End Date'},
    {id:'options',label:'Options',disableSorting:true},
]


const CouponTable = () => {
    const classes=useStyles();
    const [records,setRecords]=useState([]);
    useEffect(()=>{
        axios.get(API_URL+"/coupons/").then((response)=>{
                  setRecords(response.data);
        });
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
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.coupon_number.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (data, resetForm) => {
        if (data.id === 0){
            axios.post(API_URL+"/coupons/", data).then(() => {
                axios.get(API_URL+"/coupons/").then((response)=>{
                    setRecords(response.data);
                });
         });
         resetForm();
         setRecordForEdit(null);
         setOpenPopup(false);
        axios.get(API_URL+"/coupons/").then((response)=>{
            setRecords(response.data);
            });
         setNotify({
             isOpen: true,
             message: 'Added Successfully !',
             type: 'success'
         });
        
        }else{
       axios.put(`/coupons/${data.id}`,data).then(() => {
        axios.get(API_URL+"/coupons/").then((response)=>{
            setRecords(response.data);
        });
    });;
        resetForm();
        setRecordForEdit(null);
        setOpenEditPopup(false);
        axios.get(API_URL+"/coupons/").then((response)=>{
            setRecords(response.data);
            });
        setNotify({
            isOpen: true,
            message: 'Edited Successfully !',
            type: 'info'
        });
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
     
      axios.delete(API_URL+`/coupons/${id}`).then(()=>{
        axios.get(API_URL+"/coupons/").then((response)=>{
        setRecords(response.data);
    }); //refresh the records array
    });
        setNotify({
            isOpen: true,
            message: 'Removed Successfully !',
            type: 'error'
        });

    }

    return (
        <div style={{display:"flex"}}>
        <AdminNav/>
        <main className={classes.content}>
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
              <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>COUPONS</Typography>
              <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.coupon_number}</TableCell>
                                        <TableCell>{item.discount_amount}</TableCell>
                                        <TableCell>{item.start_date.substring(0, 10)}</TableCell>
                                        <TableCell>{item.end_date.substring(0, 10)}</TableCell>
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