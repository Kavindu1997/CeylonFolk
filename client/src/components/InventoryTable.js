import React, { useState } from 'react';
import PageHeader from './PageHeader';
import BuildIcon from '@material-ui/icons/Build';
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

import Lottie from 'react-lottie';
import Inventory from '../images/inventory.json';

const defaultOptions={
    loop:true,
    autoplay:true,
    animationData:Inventory,
    rendererSettings:{
      preserveAspectRatio:"xMidYMid slice"
    }
  };


const InventoryTable = () => {
    return (
        <div>
        <PageHeader
            title="INVENTORY MANAGEMENT"
            icon={<BuildIcon fontSize="large"/>}
            />

        {/* <Lottie options={defaultOptions} height={150} width={150} style={{marginTop:'-150px',marginRight:'30px'}} /> */}
        </div>
    );
};

export default InventoryTable;