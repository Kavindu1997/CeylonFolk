import React, { useState } from 'react';
import PageHeader from './PageHeader';
import BrushIcon from '@material-ui/icons/Brush';
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
import Design from '../../images/design.json';
import AdminNav from "../../components/Reusable/AdminNav"
import useStyles from './style';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Design,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const DesignTable = () => {

  const classes = useStyles();

  return (
    <div style={{display:"flex"}}>
    <AdminNav/>

    <main className={classes.content}>
      <PageHeader
        title="DESIGN CREATIONS"
        icon={<BrushIcon fontSize="large" />}
      />

      {/* <Lottie options={defaultOptions} height={150} width={150} style={{marginTop:'-150px',marginRight:'30px'}} /> */}
      </main>
        </div>
  );
};

export default DesignTable;