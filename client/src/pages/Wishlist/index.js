import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../../components/Reusable/ConfirmDialog';
import Notification from '../../components/Reusable/Notification';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../_actions/productAction'



export default function Wishlist() {
    const classes = useStyles();
    let history = useHistory();
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
                <center>
                    <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>WISHLIST</Typography>
                    <TableContainer component={Paper} style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Product Name</TableCell>
                                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Unit Price</TableCell>
                                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Stock Status</TableCell>
                                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listOfTshirts
                                    .map((value) => {
                                        return (
                                            <TableRow key={value.id}>

                                                {/* <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> <img src={require({"'" + value.image+"'"}).default} /> </TableCell> */}
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> <img height={100} align="center" src={value.coverImage} alt="" onClick={() => {
                                                    history.push(`/productDetails/${value.id}`);
                                                }} /></TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.design_name} </TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.price} </TableCell>
                                                <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.margin} </TableCell>
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
                                                </TableCell>

                                            </TableRow>
                                        );

                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.back}
                            >Continue Shopping
                            </Button>
                           
                        
                    </div>
                </center>

            </container>
            <Footer />
            <Notification
        notify={notify}
        setNotify={setNotify}
      />
            <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
        </div>
    );
}