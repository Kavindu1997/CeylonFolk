import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import { CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TextField } from '@material-ui/core';
import NumericInput from 'react-numeric-input';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import {actionDeleteItem,decrementCartCount} from '../../_actions/index';

export default function Cart() {

  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const productCart = useSelector(state => state.cart.cart)
  const cartTotal = useSelector(state => state.cart.totalAmount)
  
  function onProceed() {
    var id = localStorage.getItem("userId");
    if (id > 0) {
      history.push('/Checkout');
    }
    else {
      localStorage.setItem("fromTheCart", true);
      history.push('/auth');
    }
  }

  const onRemove = (id) => { //'Itom007'
    var uid = localStorage.getItem("userId")
    if (uid > 0) {
      dispatch(actionDeleteItem(id));
      dispatch(decrementCartCount());
      const url = "http://localhost:3001/check/remove/"
      const data = { userId: uid, itemId: id }
      axios.put(url, data).then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          const url1 = "http://localhost:3001/check/items/" + uid;
          axios.get(url1).then((response) => {
            setOfItems(response.data);
          });
          const url2 = "http://localhost:3001/check/total/" + uid;
          axios.get(url2).then((response) => {
            setOftotals(response.data);
          });
        }
      });
    }
    else {
      //TODO Update the local storage
      dispatch(actionDeleteItem(id));
      dispatch(decrementCartCount());
      setOfItems(productCart);
      var totalDetails = [];
      totalDetails.push({customerId:id,total:cartTotal});
      setOftotals(totalDetails);    
    }
  };

  var totalvalue = 0;
  const [totalDetails, setOftotals] = useState([]);
  const [itemDetails, setOfItems] = useState([]);
  useEffect(() => {
    var id = localStorage.getItem("userId");
    console.log(productCart)

    const url = "http://localhost:3001/check/items/" + id;
    axios.get(url).then((response) => {
      if (response.data.length > 0) {
        setOfItems(response.data);
        console.log(itemDetails)
        //todo calling from action
      } else {
        setOfItems(productCart);
        console.log(itemDetails)
      }

    });




  }, []);



  useEffect(() => {
    var id = localStorage.getItem("userId");

    const url = "http://localhost:3001/check/total/" + id;
    axios.get(url).then((response) => {
      if (id > 0) {
        setOftotals(response.data);
        console.log(response.data)
      } else {
        var totalDetails = [];
        totalDetails.push({customerId:id,total:cartTotal});
        setOftotals(totalDetails);
      }

    });
    }, []);
  

    function onLogout() {
      var cart = []
      localStorage.setItem("userId", 0);
      localStorage.setItem("userName", 0);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalDetails", 0);
    }


    //console.log(totalDetails[0]['total'])

    // var totalvalue = Number(totalDetails[0].total) + 200

    return (
      <div>
        <CommonNav />
        <CssBaseline />
        <container>
          <center>
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>CART</Typography>
            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Product Name</TableCell>
                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}> Price</TableCell>
                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Size</TableCell>
                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Quantity</TableCell>
                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Action</TableCell>
                    <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemDetails
                    .map((value) => {
                      return (
                        <TableRow key={value.customerId}>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={value.image} /></TableCell>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.name}</TableCell>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>Rs. {value.price}</TableCell>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.size}</TableCell>
                          <TableCell align="center" className={classes.numeric} style={{ fontFamily: 'Montserrat' }}>{value.quantity}</TableCell>
                          <TableCell align="center">
                            <Button name="remove" onClick={() => onRemove(value.itemId)}>
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </Button>
                          </TableCell>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>Rs.{value.totals}</TableCell>
                        </TableRow>
                      );
                    })}
                  {totalDetails
                    .map((value) => {
                      return (
                        <TableRow key={value.customerId}>
                          <TableCell align="center" colSpan={5} rowSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '15pt', height: '100px' }}>
                            Sub Total
                          </TableCell>
                          <TableCell align="center" rowSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '15pt' }}>
                            Rs. {value.total}
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
          <div>

            <center>
              <TableContainer style={{ marginTop: '50px', align: 'center', width: '600px' }}>
                <Table className={classes.table} aria-label="simple table">
                  <Typography variant="h6" style={{ marginTop: '20px', marginLeft: '15px', marginBottom: '20px', textAlign: 'left', fontWeight: 600, fontFamily: 'Montserrat' }}>CART TOTALS</Typography>
                  {totalDetails
                    .map((value) => {
                      return (
                        <TableRow key={value.cartId}>
                          <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>SUB TOTAL</TableCell>
                          <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>Rs. {value.total}</TableCell>
                        </TableRow>
                      );
                    })}
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>SHIPPING</TableCell>
                    <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>Rs. 200</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>ADD COUPON</TableCell>
                    <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>
                      <div>
                        {/* <TextField id="outlined-basic" label="Coupon ID" variant="outlined" style={{ width: 130, borderRadius: 100, borderWidth:2 }} /> */}
                        <TextField underlineShow={false} label="Coupon ID" style={{ width: 130, borderRadius: 25 }} />
                        <br />  <br />
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.coupon}
                        >Apply Coupon
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {totalDetails
                    .map((value) => {
                      return (
                        <TableRow key={value.cartId}>
                          <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>TOTAL</TableCell>
                          <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>Rs. {Number(value.total) + 200}</TableCell>
                        </TableRow>
                      );
                    })}
                </Table>
              </TableContainer>


              <Button
                type="submit"
                onClick={onProceed}
                variant="contained"
                color="primary"
                className={classes.submit}
              >Proceed To Checkout
              </Button>

              <Button
                type="submit"
                onClick={onLogout}
                variant="contained"
                color="primary"
                className={classes.submit}
              >Logout
              </Button>

            </center>
          </div>
        </container>
        <Footer />
      </div>

    );
  }


