import React, { useState } from 'react';
import PageHeader from './PageHeader';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CouponForm from './CouponForm';
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../components/Reusable/useTable';
import Controls from '../../components/Reusable/Controls';
import Popup from '../../components/Reusable/Popup';
import Notification from '../../components/Reusable/Notification';
import ConfirmDialog from '../../components/Reusable/ConfirmDialog';

import Lottie from 'react-lottie';
import Coupon from '../../images/coupon.json';
import useStyles from './style';
import AdminNav from "../../components/Reusable/AdminNav"


const headCells = [
    { id: 'couponId', label: 'Coupon Id' },
    { id: 'couponTitle', label: 'Coupon Title' },
    { id: 'options', label: 'Options', disableSorting: true },
]


const CouponTable = () => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable('', headCells, '');

    const openInPopup = item => {
        // setRecordForEdit(item);
        setOpenPopup(true);
    };
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
                icon={<LoyaltyIcon fontSize="large" />}
            />

            {/* <Lottie options={defaultOptions} height={150} width={150} style={{marginTop:'-150px',marginRight:'30px'}} /> */}

            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Coupon"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                        }
                        }
                    //onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New Coupon"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); }}
                    />
                </Toolbar>

                <TblContainer>
                    <TblHead />
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
                <CouponForm />
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