import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import ViewListIcon from '@material-ui/icons/ViewList';
import AdminNav from "../../../components/Reusable/AdminNav"
import useStyles from '../style';
import Popup from "../../../components/Reusable/Popup";

function InhouseOrderTable() {
    const classes = useStyles();

    return (
        <div style={{ display: "flex" }}>
            <AdminNav />
            <main className={classes.content}>
                <PageHeader title="INHOUSE ORDERS" icon={<ViewListIcon fontSize="large" />} />
            </main>
        </div>
    )
}

export default InhouseOrderTable;

