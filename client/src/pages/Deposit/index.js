import React from 'react';
//import { Button, CssBaseline, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Box, Button, CssBaseline, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import UserNav from '../../components/Navbars/UserNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { viewOrderDetails, claerOrderDetails } from '../../_actions/deposit.action';
import { NavLink } from 'react-router-dom';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import moment from 'moment';
import Notification from '../../components/Reusable/Notification';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import UserSideNav from '../../components/Navbars/UserSideNav';
import CommonNav from '../../components/Navbars/CommonNav';
import { API_URL } from '../../_constants';
import ceylonforkapi from '../../api/index'

export default function Deposit(props) {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    let id, orderIdFromEmail;

    if (localStorage.getItem("userId") == "0") {
        history.push("/auth");
    }

    if (props.location.search) {
        var splitted = props.location.search.split("?id=", 2);
        var splitted2 = splitted[1].split("&orderIdFromEmail=", 2)
        id = splitted2[0];
        orderIdFromEmail = splitted2[1];
        localStorage.setItem("userIdFromMail", id);
        localStorage.setItem("orderIdFromEmail", orderIdFromEmail);
    }

    var [orderId, setOrderId] = useState([]);
    const [file, setfile] = useState(null);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [orderDetails, setOrderDeatils] = useState([])
    const  [isDisabled, setIsDisabled] = useState(true)

    const uid = localStorage.getItem("userId");


    if (localStorage.getItem("userIdFromMail") != undefined && uid != localStorage.getItem("userIdFromMail")) {
        localStorage.setItem("fromTheEmail", true);
        localStorage.setItem("fromTheCart", false);
        history.push('/auth');
    }
    if(localStorage.getItem("orderIdFromEmail")!= undefined){
        orderIdFromEmail = localStorage.getItem("orderIdFromEmail")
    }

    function viewOrder(e) {
        e.preventDefault()
        if (orderId.length == 0 && orderIdFromEmail != undefined) {
            orderId = orderIdFromEmail;
        }
        var id = localStorage.getItem("userId");
        var data = {
            id: id,
            orderId: orderId
        }
        ceylonforkapi.post("/deposit/order/",data).then((response) => {
            if(response.data.length == 0){
                setIsDisabled(true)
                setNotify({
                    isOpen: true,
                    message: 'Slip has already uploaded',
                    type: 'error'
                });
            }else{
                setIsDisabled(false)
                setOrderDeatils(response.data)
            }
        })
    }

    const setOId = (event) => {
        setOrderId(event.target.value);
    }

    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

    const onFormSubmit = (e, data) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', file);
        if (orderId.length == 0 && orderIdFromEmail != undefined) {
            orderId = orderIdFromEmail;
        }
        formData.append('orderId', orderId);
        formData.append('uid', localStorage.getItem("userId"));
        formData.append('date', moment().format());
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(API_URL+"/depositCollection", formData, config).then((response) => {
            if(response.data.data==0){
                localStorage.removeItem("orderIdFromEmail")
                setNotify({
                    isOpen: true,
                    message: 'Slip is not successfully updated !',
                    type: 'error'
                  });
            }else{
                setNotify({
                    isOpen: true,
                    message: 'Slip is successfully updated !',
                    type: 'success'
                  }); 
                localStorage.removeItem("orderIdFromEmail")
                localStorage.removeItem("userIdFromMail")
                formData.delete('photo');
                props.location.search = null
                dispatch(claerOrderDetails())
                orderIdFromEmail = null;
                setTimeout(function(){
                    history.push("/myOrders")
                }, 1000);
                
            }
            
        }).catch((err) => {
        })
    };

    return (
        <div>
            <CommonNav />
            <CssBaseline />
            <container>
                <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> Bank Deposit Slip Upload</Typography>
                <center>
                    <Grid container style={{ marginTop: '50px', align: 'center' }}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <UserSideNav />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={12} sm={12} md={8} lg={7}>
                            <form  noValidate onSubmit={onFormSubmit}>
                                <div>
                                <TextField
                                    onChange={setOId}
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    style={{width:'43%'}}
                                    required
                                    id="orderId"
                                    label="Enter your Order ID"
                                    name="orderId"
                                    autoComplete="oid"
                                    value={orderIdFromEmail}
                                    
                                //helperText={<ErrorMessage name="fullName" />}
                                />
                                <Button
                                    style={{marginLeft:'60px'}}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={viewOrder}
                                >Validate First
                                </Button>
                                </div>
                                <div>

                                    <Controls.Input
                                        variant="outlined"
                                        name="photo"
                                        type="file"
                                        className={classes.upload}
                                        onChange={onInputChange}
                                       
                                    />
                                
                                        <Button
                                           style={{marginLeft:'55px',marginTop :'10px'}}
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                          disabled={isDisabled}
                                        >Upload Slip
                                        </Button>
                                   
                                </div>

                                <TableContainer style={{ marginTop: '30px' }}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Product</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Quantity</TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Totals</TableCell>
                                            </TableRow>
                                        </TableHead>                        
                                        <TableBody>
                                            {orderDetails
                                                .map((value) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={API_URL+'/' + value.coverImage}></img></TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.design_name}</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.quantity }</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.totals}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                
                            </form>
                        </Grid>
                    </Grid>
                </center>
            </container>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Footer />
        </div>

    );
}
