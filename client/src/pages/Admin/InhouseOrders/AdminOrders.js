import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import ViewListIcon from '@material-ui/icons/ViewList';
import AdminNav from "../../../components/Reusable/AdminNav"
import useStyles from './style';
import axios from 'axios';
import { Paper, Box } from "@material-ui/core";
import { useParams } from 'react-router';
import AllOrders from './AllOrders';
import PendingOrders from "./PendingOrders";
import DispatchedOrders from "./DispatchedOrders";
import AcceptedOrders from "./AcceptedOrders";
import RejectedOrders from "./RejectedOrders";

function AdminOrders() {
    const classes = useStyles();
    const { id } = useParams();
    const [pendingcount, setPendingCount] = useState();
    const [acceptcount, setAcceptCount] = useState();
    const [dispatchcount, setDispatchCount] = useState();
    const [cancelcount, setCancelCount] = useState();

    useEffect(() => {
        axios.get("http://localhost:3001/order/getCount").then((response) => {
            console.log(response.data.pendingOrders);
            setPendingCount(response.data.pendingOrders);
            setAcceptCount(response.data.acceptedOrders);
            setDispatchCount(response.data.dispatchedOrders);
            setCancelCount(response.data.rejectedOrders);
        });
    }, []);


    return (

        <div style={{ display: "flex" }}>
            <AdminNav />
            <div className={classes.content}>
                <PageHeader title="INHOUSE ORDERS" icon={<ViewListIcon fontSize="large" />} />
                <div className={classes.stat}>

                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Pending Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>{pendingcount}</span>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Accepted Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>{acceptcount}</span>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Dispatched Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>{dispatchcount}</span>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Delayed Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>{cancelcount}</span>
                            </div>
                        </div>
                    </Paper>

                </div>
                <Box className={id == 0 ? classes.activeContent : classes.hideContent}>
                    <AllOrders />
                </Box>
                <Box className={id == 1 ? classes.activeContent : classes.hideContent}>
                    <PendingOrders />
                </Box>
                <Box className={id == 2 ? classes.activeContent : classes.hideContent}>
                    <AcceptedOrders />
                </Box>
                <Box className={id == 3 ? classes.activeContent : classes.hideContent}>
                    <DispatchedOrders />
                </Box>
                <Box className={id == 4 ? classes.activeContent : classes.hideContent}>
                    <RejectedOrders />
                </Box>
            </div>
        </div>
    )
}

export default AdminOrders;

