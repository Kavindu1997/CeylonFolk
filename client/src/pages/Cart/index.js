import React from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import { CssBaseline, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TextField } from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import { useDispatch, useSelector } from "react-redux";
import { actionDeleteItem, decrementCartCount, getCart, getTotal, deleteCartUsingID, updateCartQuantity,actionUpdateItem,calculateTotalWhenChanged } from '../../_actions/index';
import NumericInput from 'react-numeric-input';
import Notification from '../../components/Reusable/Notification';
import ConfirmDialog from '../../components/Reusable/ConfirmDialog';

export default function Cart() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const productCart = useSelector(state => state.cart.cart);
  const cartTotal = useSelector(state => state.cart.totalAmount);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [disable, setDisable] = React.useState(true);
  const [proceedDisable, setProceedDisable] = React.useState(false);
  var changedValue;

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
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
  });
    var uid = localStorage.getItem("userId")
    if (uid > 0) {
      dispatch(deleteCartUsingID(id))
      setNotify({
        isOpen: true,
        message: 'Removed Successfully !',
        type: 'success'
    });
    }
    else {
      dispatch(actionDeleteItem(id));
      dispatch(decrementCartCount());
      setNotify({
        isOpen: true,
        message: 'Removed Successfully !',
        type: 'success'
    });
    }
  };

  useEffect(() => {
    dispatch(getCart())
    dispatch(getTotal())
  }, []);

  const updateQty = (event) => {
    changedValue = event;
    console.log(changedValue)
  }

  const selectedQty = (index) => {
    console.log(index)
    setDisable(false)
    setProceedDisable(true)
    let updatedItem = productCart[index];
    updatedItem.quantity = changedValue;
    //updatedItem.totals = updatedItem.price*changedValue;
    dispatch(calculateTotalWhenChanged(productCart))
    dispatch(actionUpdateItem(productCart))
    console.log(productCart)
  }

  function saveUpdate() {
    var uid = localStorage.getItem("userId")
    if (uid > 0) {
      const data = {
        uid: uid,
        itemArray: productCart
      }
      var result = dispatch(updateCartQuantity(data))
      if (result == 0) {
        setNotify({
          isOpen: true,
          message: 'Cart not updated',
          type: 'error'
      });
      } else {
        setNotify({
          isOpen: true,
          message: 'Cart updated successfully !',
          type: 'success'
      });
        setDisable(true)
        setProceedDisable(false)
      }
    }else{
      dispatch(actionUpdateItem(productCart))
      setDisable(true)
      setProceedDisable(false)
      setNotify({
        isOpen: true,
        message: 'Cart updated successfully !',
        type: 'success'
    });
    }
  }

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
                  .map((value, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.image} /></TableCell>
                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.name}</TableCell>
                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>Rs. {value.price}</TableCell>
                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.size}</TableCell>
                        <TableCell align="center" onClick={() => selectedQty(index)}>
                          <NumericInput mobile min={0} value={value.quantity} size={1} style={{ fontFamily: 'Montserrat' }} onChange={updateQty} />
                        </TableCell>
                        {/* <TableCell align="center" className={classes.numeric} style={{ fontFamily: 'Montserrat' }}>{value.quantity}</TableCell> */}
                        <TableCell align="center">
                          <Button name="remove" onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this?',
                                                        subTitle: "You can't undo this operation...",
                                                        onConfirm: () => {  onRemove(value.id) }
                                                    })
                                                }}>
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
            <div>
              <Box
                component="span"
                m={1}
                className={`${classes.spreadBox} ${classes.box}`}
              >
                <Button
                  type="submit"
                  disabled={disable}
                  onClick={saveUpdate}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >Save Update
                </Button>

                <Button
                  type="submit"
                  disabled={proceedDisable}
                  onClick={onProceed}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >Proceed To Checkout
                </Button>
              </Box>
            </div>
            <div>
              <Button
                type="submit"
                onClick={onLogout}
                variant="contained"
                color="primary"
                className={classes.submit}
              >Logout
              </Button>
            </div>
          </center>
        </div>
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


