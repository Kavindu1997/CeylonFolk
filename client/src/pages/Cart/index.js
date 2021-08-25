import React from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import { CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TextField } from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import { useDispatch, useSelector } from "react-redux";
import {actionDeleteItem,decrementCartCount,getCart,getTotal,deleteCartUsingID} from '../../_actions/index';

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

  const onRemove = (id) => { 
    var uid = localStorage.getItem("userId")
    if (uid > 0) {
      dispatch(deleteCartUsingID(id))
    }
    else {
      dispatch(actionDeleteItem(id));
      dispatch(decrementCartCount()); 
    }
  };

  useEffect(() => {
    dispatch(getCart())
    dispatch(getTotal())
  }, []);


    function onLogout() {
      localStorage.setItem("userId", 0);
      localStorage.setItem("userName", 0);
    }

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
                  {productCart
                    .map((value) => {
                      return (
                        <TableRow key={value.customerId}>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.image} /></TableCell>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.name}</TableCell>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>Rs. {value.price}</TableCell>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.size}</TableCell>
                          <TableCell align="center" className={classes.numeric} style={{ fontFamily: 'Montserrat' }}>{value.quantity}</TableCell>
                          <TableCell align="center">
                            <Button name="remove" onClick={() => onRemove(value.id)}>
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </Button>
                          </TableCell>
                          <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>Rs.{value.totals}</TableCell>
                        </TableRow>
                      );
                    })}

                        <TableRow>
                          <TableCell align="center" colSpan={5} rowSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '15pt', height: '100px' }}>
                            Sub Total
                          </TableCell>
                          <TableCell align="center" rowSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '15pt' }}>
                            Rs. {cartTotal}
                          </TableCell>
                        </TableRow>

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

                        <TableRow>
                          <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>SUB TOTAL</TableCell>
                          <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>Rs. {cartTotal}</TableCell>
                        </TableRow>

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
                        <TableRow>
                          <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>TOTAL</TableCell>
                          <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>Rs. {Number(cartTotal) + 200}</TableCell>
                        </TableRow>
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


