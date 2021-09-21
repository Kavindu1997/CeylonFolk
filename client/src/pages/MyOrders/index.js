import React from "react";
import {
    Button,
    CssBaseline,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Divider,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    InputAdornment
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import UserNav from "../../components/Navbars/UserNav";
import Footer from "../../components/Footer/Footer";
import useStyles from "./style";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderHistory } from "../../_actions/orderHistory.action";
import UserSideNav from "../../components/Navbars/UserSideNav";
import CommonNav from "../../components/Navbars/CommonNav";
import ceylonforkapi from '../../api/index';
import axios from 'axios';
import { API_URL } from "../../_constants";
import useTable from "../../components/Reusable/useTable";
import Controls from "../../components/Reusable/Controls";
import { Search } from "@material-ui/icons";

export default function OrderHistory(props) {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    // const orders = useSelector((state) => state.orderHistory.orderHistory);
    if (localStorage.getItem("userId") == "0") {
        history.push("/auth");
    }
    let id;
    console.log(props.location.search);
    if (props.location.search) {
        var splitted = props.location.search.split("?id=", 2);
        id = splitted[1];
        localStorage.setItem("userIdFromMail", id);
    }

    const uid = localStorage.getItem("userId");

    if (
        localStorage.getItem("userIdFromMail") != undefined &&
        uid != localStorage.getItem("userIdFromMail")
    ) {
        localStorage.setItem("from", "email");
        localStorage.setItem("fromTheCart", false);
        localStorage.setItem("to", "orderHistory");
        history.push("/auth");
    }

    if (localStorage.getItem("fromTheEmail") == "true") {
        localStorage.setItem("fromTheEmail", false);
    }
    var [orders, setOrders] = useState([])
    useEffect(() => {
        // dispatch(getOrderHistory());
        var id = localStorage.getItem("userId");
        if (id != '0') {
            ceylonforkapi.get("/order/getHistory/"+ id).then((response) => {
                setOrders(response.data)
            })   
        }
    }, []);

    function routeToProduct(oId) {
        history.push(`/orderDetail/${oId}`);
    }

    function pending(){
        var id = localStorage.getItem("userId");
        axios.get(API_URL+"/order/pendingOrders/"+id).then((response) => {
            setOrders(response.data)
        })      
    }
    function placed(){
        var id = localStorage.getItem("userId");
        axios.get(API_URL+"/order/placedOrders/"+id).then((response) => {
            setOrders(response.data)
        })
    }
    function notDeposited(){
        var id = localStorage.getItem("userId");
        axios.get(API_URL+"/order/notDepositedOrders/"+id).then((response) => {
            setOrders(response.data)
        })
    }
    function deposited(){
        var id = localStorage.getItem("userId");
        axios.get(API_URL+"/order/depositedOrders/"+id).then((response) => {
            setOrders(response.data)
        })
    }
    function accepted(){
        var id = localStorage.getItem("userId");
        axios.get(API_URL+"/order/acceptedOrders/"+id).then((response) => {
            setOrders(response.data)
        })
    }
    function dispatched(){
        var id = localStorage.getItem("userId");
        axios.get(API_URL+"/order/dispatchedOrders/"+id).then((response) => {
            setOrders(response.data)
        })
    }
    function closed(){
        var id = localStorage.getItem("userId");
        axios.get(API_URL+"/order/closedOrders/"+id).then((response) => {
            setOrders(response.data)
        })
    }
    function all(){
        var id = localStorage.getItem("userId");
        axios.get(API_URL+"/order/getHistory/"+id).then((response) => {
            setOrders(response.data)
        })
    }

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(orders, "", filterFn);



    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                return items.filter(x => x.orderId.toLowerCase().includes(target.value) ||
                x.placedDate.toLowerCase().includes(target.value) ||
                x.decription.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <div>
            <CommonNav />
            <CssBaseline />

            <container>
                <Typography
                    variant="h5"
                    style={{
                        marginTop: "80px",
                        textAlign: "center",
                        backgroundColor: "#C6C6C6",
                        padding: "30px",
                        fontFamily: "Montserrat",
                    }}
                >
                    {" "}
                    ORDER HISTORY
                </Typography>
                <center>
                    <Grid container style={{ marginTop: "50px", align: "center" }}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <UserSideNav />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={12} sm={12} md={8} lg={7}>
                            <Box style={{ display: 'flex', padding: '24px 10px 0px 48px' }}>
                                
                                <Button className={classes.toggleButton} variant="outlined" onClick={() => pending()}>Pending Orders</Button>
                                
                                <Button className={classes.toggleButton} variant="outlined" onClick={() => placed()}>Placed Orders</Button>
                                
                                <Button className={classes.toggleButton} variant="outlined" onClick={() => notDeposited()}>Waiting to Deposit Oders</Button>
                                
                                <Button className={classes.toggleButton} variant="outlined" onClick={() => deposited()}>Deposit Verifying Orders</Button>
                                
                                <Button className={classes.toggleButton} variant="outlined" onClick={() => closed()}>Deposit Verification Falied Orders</Button>
                                
                                <Button className={classes.toggleButton} variant="outlined" onClick={() => accepted()}>Processing Orders</Button>
                                
                                <Button className={classes.toggleButton} variant="outlined" onClick={() => dispatched()}>Dispatched Orders</Button>
                                
                                <Button className={classes.toggleButton} variant="outlined" onClick={() => all()}>All</Button>
                                
                            </Box>
                            <div style={{padding:"10px",marginTop:"25px"}}>
                            <Controls.Input
                            label="Search"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>

                                ),
                            }}
                            onChange={handleSearch}
                        />
                        </div>
                            <TableContainer style={{ marginTop: "30px" }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                style={{ fontFamily: "Montserrat", fontWeight: 600 }}
                                            >
                                                Reference No
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ fontFamily: "Montserrat", fontWeight: 600 }}
                                            >
                                                Order Placement Date
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ fontFamily: "Montserrat", fontWeight: 600 }}
                                            >
                                                Total
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ fontFamily: "Montserrat", fontWeight: 600 }}
                                            >
                                                Order Status
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ fontFamily: "Montserrat", fontWeight: 600 }}
                                            >
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recordsAfterPagingAndSorting().map((row, i) => (
                                            <TableRow key={`row-${i}`}>
                                                <TableCell
                                                    align="center"
                                                    style={{ fontFamily: "Montserrat" }}
                                                >
                                                    {row.orderId}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{ fontFamily: "Montserrat" }}
                                                >
                                                    {row.placedDate}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{ fontFamily: "Montserrat" }}
                                                >
                                                    Rs. {row.fullAmount}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{ fontFamily: "Montserrat" }}
                                                >
                                                    {row.decription}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.viewOrder}
                                                        onClick={() => {
                                                            routeToProduct(row.orderId);
                                                        }}
                                                    >
                                                        View Order
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div>
                                <Button
                                    onClick={() => {
                                        history.push(`/shop`);
                                    }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </center>
            </container>
            <Footer />
        </div>
    );
}
