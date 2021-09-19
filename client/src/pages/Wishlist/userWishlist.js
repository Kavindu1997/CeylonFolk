import React from 'react';
import { Button, CssBaseline, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import Footer from '../../components/Footer/Footer';
import UserNav from '../../components/Navbars/UserNav';
import UserSideNav from '../../components/Navbars/UserSideNav';
import CommonNav from '../../components/Navbars/CommonNav';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../_actions/productAction';
import ConfirmDialog from '../../components/Reusable/ConfirmDialog';
import Notification from '../../components/Reusable/Notification';
import useStyles1 from './style1';
import { API_URL } from '../../_constants';

export default function ProfileWishlist() {
    const classes = useStyles1();
    let history = useHistory();
    
    if(localStorage.getItem("userId")=='0'){
        history.push("/auth")
    }
    const dispatch = useDispatch();

    const [listOfTshirts, setListOfShirts] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    useEffect(() => {
        const uid = localStorage.getItem("userId");
        axios.get(API_URL+"/wishlist/" + uid).then((response) => {
            console.log(response.data);
            setListOfShirts(response.data);
        });
    }, []);

    const onRemove = (id) => {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        });
        var uid = localStorage.getItem("userId")
            const data = { userId: uid, itemId: id }
            axios.put(API_URL+"/wishlist/remove/",data).then((response) => {
                if (response.data.data==0){
                    setNotify({
                        isOpen: true,
                        message: 'Removed Failed !',
                        type: 'error'
                    });
                }else{
                    setNotify({
                        isOpen: true,
                        message: 'Removed Successfully !',
                        type: 'success'
                      });
                      axios.get(API_URL+"/wishlist/" + uid).then((response) => {
                        console.log(response.data);
                        setListOfShirts(response.data);
                    });
                    dispatch(fetchProducts());
                } 
            })
         
        }
    

    
    return (
        <div>
          <CommonNav />
            <CssBaseline />

        <container>
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> MY WISHLIST</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                       <UserSideNav />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} sm={12} md={8} lg={7}>
                        <TableContainer style={{ marginTop: '30px' }}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Product Name</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Unit Price</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {listOfTshirts
                                    .map((value) => {
                                        return (
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> <img height={100} align="center" src={value.coverImage} alt="" onClick={() => {
                                                    history.push(`/productDetails/${value.id}`);
                                                }} /></TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.design_name} </TableCell>
                                            <TableCell align="center" style={{ display: value.discountedPrice==null?'none':'', fontFamily: 'Montserrat' }}>
                                                <div style={{ textDecoration: 'line-through'}}>
                                                Rs. {value.price}
                                                </div>
                                                <div>
                                                    Rs. {value.discountedPrice}
                                                </div>
                                            </TableCell>
                                            <TableCell align="center" style={{ display: value.discountedPrice==null?'':'none', fontFamily: 'Montserrat' }}>Rs. {value.price}</TableCell>
                                            <TableCell align="center">
                                                    <Button name="remove" onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Are you sure to delete this?',
                                                            subTitle: "You can't undo this operation...",
                                                            onConfirm: () => { onRemove(value.id) }
                                                        })
                                                    }}>
                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                    </Button>
                                                
                                                <Button onClick={() => {
                                                    history.push(`/productDetails/${value.id}`);
                                                }}>
                                                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                      );

                                    })}
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
                                    className={classes.back}
                                >Continue Shopping
                                </Button>
                           
                        </div>
                    </Grid>
                </Grid>
            </center>
        </container>
        <Footer />
        <Notification
        notify={notify}
        setNotify={setNotify}
      />
            <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog} />
        </div>

    );
}
