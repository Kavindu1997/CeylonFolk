import React from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import { CssBaseline, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TextField } from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import { useDispatch, useSelector } from "react-redux";
import { decrementCartCount, actionGetTotalDeduct, actionDeleteItem, calculateCartCount, getCart, getTotal, deleteCartUsingID, updateCartQuantity, actionUpdateItem, calculateTotalWhenChanged, emtyTotalLogout, emptyCartLogout } from '../../_actions/index';
import NumericInput from 'react-numeric-input';
import Notification from '../../components/Reusable/Notification';
import ConfirmDialog from '../../components/Reusable/ConfirmDialog';
import { fetchProducts } from '../../_actions/productAction';
import ceylonforkapi from '../../api/index';

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

  const onRemove = (id, size) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    var uid = localStorage.getItem("userId")
    if (uid > 0) {
      // dispatch(deleteCartUsingID(id,size))
      const data = { userId: uid, itemId: id, size: size }
      ceylonforkapi.put("/check/remove/", data).then((response) => {
        if (response.data.data == 0) {
          setNotify({
            isOpen: true,
            message: 'Removing Failed !',
            type: 'error'
          });
        }
        else {
          dispatch(getCart())
          dispatch(getTotal())
          dispatch(decrementCartCount());
          setNotify({
            isOpen: true,
            message: 'Removed Successfully !',
            type: 'success'
          });
        }
      });

    }
    else {
      var item = { id: id, size: size }
      dispatch(actionDeleteItem(id, size));
      dispatch(decrementCartCount())
      dispatch(actionGetTotalDeduct());
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

  var changedIndex;

  const updateQty = (event) => {
    changedValue = event;
    console.log(event)
  }
  
  const selectedQty = (index,quantity) => {
    console.log(index, quantity)
    setDisable(false);

    console.log(changedValue)
    let updatedItem = productCart[index];
    if (changedValue === undefined) {

      changedValue = quantity;
    }

    setProceedDisable(true)
    updatedItem.quantity = changedValue;

    dispatch(actionUpdateItem(productCart))

    dispatch(calculateTotalWhenChanged(productCart))
  }

  function saveUpdate() {
    var uid = localStorage.getItem("userId")
    if (uid > 0) {
      const data = {
        uid: uid,
        itemArray: productCart
      }
      // var result = dispatch(updateCartQuantity(data))
      ceylonforkapi.put("/check/updateQty/", data).then((response) => {
        if (response.data.data == 0) {
          setNotify({
            isOpen: true,
            message: 'Cart not updated',
            type: 'error'
          });
        } else {
          dispatch(getCart())
          dispatch(getTotal())
          setNotify({
            isOpen: true,
            message: 'Cart updated successfully !',
            type: 'success'
          });
          setDisable(true)
          setProceedDisable(false)
        }
      });
    }
    else {
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
    localStorage.clear()
    localStorage.setItem("userId", 0)
    history.push("./")
    dispatch(getCart())
    dispatch(getTotal())
    dispatch(emptyCartLogout());
    dispatch(emtyTotalLogout());
    dispatch(calculateCartCount())
    dispatch(fetchProducts());
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
                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.image} onClick={() => {
                          history.push(`/productDetails/${value.productId}`);
                        }} /></TableCell>
                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.name}</TableCell>
                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>Rs. {value.price}</TableCell>
                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.size}</TableCell>
                        <TableCell align="center">
                          <div onClick={() => selectedQty(index,value.quantity)}>
                          <NumericInput mobile min={1} max={value.stockMargin } defaultValue={value.quantity}  step={ 1 } precision={ 0 } size={ 1 }  onChange={updateQty}  onKeyDown={(event) => {event.preventDefault();console.log(event)}}  />
                          </div>
                        </TableCell>
                        {/* <TableCell align="center" className={classes.numeric} style={{ fontFamily: 'Montserrat' }}>{value.quantity}</TableCell> */}
                        <TableCell align="center">
                          <Button name="remove" onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: 'Are you sure to delete this?',
                              subTitle: "You can't undo this operation...",
                              onConfirm: () => { onRemove(value.productId, value.size) }
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
            <Box
              component="span"
              m={1}
              className={`${classes.spreadBox} ${classes.box}`}
            >
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

              <Button
                type="submit"
                disabled={disable}
                onClick={saveUpdate}
                variant="contained"
                color="primary"
                className={classes.submit}
              >Save Your New Changes
              </Button>
            </Box>
          </div>
        </center>
        <div>

          <center>
            <TableContainer style={{ marginTop: '50px', align: 'center', width: '600px' }}>
              <Table className={classes.table} aria-label="simple table">
                <TableRow>
                  <TableCell colSpan='2'>
                    <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'left', fontWeight: 600, fontFamily: 'Montserrat' }}>CART TOTALS</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>SUB TOTAL</TableCell>
                  <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>Rs. {cartTotal}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>SHIPPING</TableCell>
                  <TableCell align="center" style={{ fontWeight: 400, fontFamily: 'Montserrat' }}>Charges will be calculated <br />in the checkout process</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>ADD COUPON</TableCell>
                  <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>
                    <div>
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
                </TableRow> */}
                <TableRow>
                  <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>TOTAL</TableCell>
                  <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>Rs. {Number(cartTotal)}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
            <div>
              <Box
                component="span"
                m={1}
                className={`${classes.spreadBox} ${classes.box}`}
              >
                {/* <Button
                  type="submit"
                  onClick={onLogout}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >Logout
                </Button> */}

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


