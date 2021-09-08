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

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: '1000px',
        fontFamily: 'Montserrat',
        position: 'relative',
        color: 'white',
        padding: '100px',
    },
    table: {
        // minWidth: 400,
        // backgroundColor:'#fafafa',
        fontFamily: 'Montserrat',
        // alignItems:'center',
        width: '700px',
        marginLeft: '60px'
    },
    spreadBox: {
        justifyContent: "space-around",
        alignItems: "center",
    },
    box: {
        height: 100,
        display: "flex",
        padding: 8
    },
    back: {
        marginTop: 30,
        alignItems: "center",
        // marginLeft: 600,
    },
    submit: {
        marginTop: 30,
        alignItems: "center",
        // marginLeft: 600,
    },
    margin: {
        margin: theme.spacing(2),
        width: '50ch',
        // marginRight: '50px'
    },
    avatar: {
        align: 'left'
    },
    listItemText: {
        fontSize: '3.0em',//Insert your required size
        marginLeft: '20px',
    },
}));

export default function ProfileWishlist() {
    const classes = useStyles();
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
        axios.get("http://localhost:3001/wishlist/" + uid).then((response) => {
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
            axios.put("http://localhost:3001/wishlist/remove/",data).then((response) => {
                if (response.data.error){
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
                      axios.get("http://localhost:3001/wishlist/" + uid).then((response) => {
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
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.price} </TableCell>
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
