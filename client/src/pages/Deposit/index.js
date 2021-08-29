import React from 'react';
//import { Button, CssBaseline, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Box, Button, CssBaseline, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import UserNav from '../../components/Navbars/UserNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { viewOrderDetails } from '../../_actions/deposit.action';
import { NavLink } from 'react-router-dom';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import moment from 'moment';
import Notification from '../../components/Reusable/Notification';

export default function OrderHistory() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [orderId, setOrderId] = useState([]);
    const [file, setfile] = useState(null);
    const orderDetails = useSelector(state => state.order.order);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    function viewOrder(e){
         e.preventDefault()
        var id = localStorage.getItem("userId");
        var data = {
            id: id,
            orderId: orderId
        }
        console.log("here")
        var result =  dispatch(viewOrderDetails(data))
        if (result == 0) {
        setNotify({
          isOpen: true,
          message: 'Slip has already uploaded',
          type: 'error'
        });
      } 
    }

    const setOId = (event) => {
        setOrderId(event.target.value);
        console.log(orderId)
    }

    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

    const onFormSubmit = (e, data) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('orderId', orderId);
        formData.append('uid', localStorage.getItem("userId"));
        formData.append('date', moment().format());
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(formData)
        axios.post("http://localhost:3001/depositCollection", formData, config).then((response) => {
            alert('Image upload Successfull');
         


        }).catch((err) => {
            console.log('err', err);
        })
    };

    return (
        <div>
            <UserNav />
            <CssBaseline />
            <container>
                <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> Bank Deposit Slip Upload</Typography>
                <center>
                    <Grid container style={{ marginTop: '50px', align: 'center' }}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <div>
                                <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'center', fontWeight: 600 }}>Hello </Typography>
                                <List style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar style={{ marginLeft: '130px' }}>NB</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText><Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', marginLeft: '15px', fontWeight: 600 }}>Nimal Bandara</Typography></ListItemText>
                                    </ListItem>
                                </List>
                                <br />
                            </div>
                            <Divider />
                            <div>
                                <center>
                                    <div>
                                        <NavLink to={"/profile"} style={{ textDecoration: 'none' }}>
                                            <Typography component="h1" variant="h6" style={{ marginTop: '50px', marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                                My Account
                                            </Typography>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink to={"/myOrders"} style={{ textDecoration: 'none', hover: 'red' }}>
                                            <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                                Order History
                                            </Typography>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink to={"/myWishlist"} style={{ textDecoration: 'none' }}>
                                            <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                                Wishlist
                                            </Typography>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink to={"/deposit"} style={{ textDecoration: 'none' }}>
                                            <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                                Bank Deposit Upload
                                            </Typography>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink to={"/auth"} style={{ textDecoration: 'none' }}>
                                            <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                                Logout
                                            </Typography>
                                        </NavLink>
                                    </div>
                                </center>
                            </div>
                            <Divider orientation="vertical" flexItem />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={12} sm={12} md={8} lg={7}>
                            <form className={classes.form} noValidate onSubmit={onFormSubmit}>
                                <TextField
                                    onChange={setOId}
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="orderId"
                                    label="Enter your Order ID"
                                    name="orderId"
                                    autoComplete="oid"
                                //helperText={<ErrorMessage name="fullName" />}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={viewOrder}
                                >View Order
                                </Button>   
                           
                            <TableContainer style={{ marginTop: '30px' }}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Product</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Totals</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderDetails
                                      .map((value) => {
                                          return(
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.coverImage}></img></TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.design_name}</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.totals}</TableCell>
                                        </TableRow>
                                     );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                            <div>
                                
                            <Controls.Input
                                variant="outlined"
                                name="photo"
                                type="file"
                                onChange={onInputChange} 
                            />
                                <Box
                                    component="span"
                                    m={1}
                                    className={`${classes.spreadBox} ${classes.box}`}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >Upload Slip
                                    </Button>
                                </Box>
                            </div>
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
