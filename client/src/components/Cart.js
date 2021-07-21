import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TextField } from '@material-ui/core';
import NumericInput from 'react-numeric-input';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
    backgroundColor: '#fafafa',
    fontFamily: 'Montserrat'
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
  coupon: {
    borderRadius: 20
  },
  numeric: {
    borderRadius: '50%'
    // rounded, 
    // textColor:'#B0228C', 
    // // iconStyle={{ color: 'white' }}, 
    // rightButtonBackgroundColor:'#EA3788', 
    // leftButtonBackgroundColor:'#E56B70',
  },
}));

function createData(image, name, price, quantity, action, total) {
  return { image, name, price, quantity, action, total };
}

const rows = [
  createData(
    <div>
      <img height={100} src={require('../images/ts1.jpg').default} />
    </div>,
    'Snowy Tshirt', 1000,
    <div>
      <NumericInput mobile min={0} max={100} value={2} size={1} />
    </div>,
    0, 2000),
  createData(
    <div>
      <img height={100} align="center" src={require('../images/ts2.jpg').default} />
    </div>,
    'Baby Tshirt', 800,
    <div>
      <NumericInput mobile min={0} max={100} value={1} size={1}
        style={{
          borderRadius: '20px 20px 20px 20px'
          //   wrap: {
          //       background: '#E2E2E2',
          //       // boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
          //       padding: '2px 2.26ex 2px 2px',
          //       borderRadius: '20px 20px 20px 20px',
          //       // fontSize: 32
          //   },
          //   input: {
          //     borderRadius: '20px 20px 20px 20px',
          //     color: '#988869',
          //     padding: '0.1ex 1ex',
          //     // border: '1px solid #ccc',
          //     marginRight: 4,
          //     // display: 'block',
          //     fontWeight: 100,
          //     // textShadow: 1px 1px 1px rgba(0, 0, 0, 0.1)
          // }} 
        }} />
    </div>,
    1000, 800),
  createData(
    <div>
      <img height={100} align="center" src={require('../images/ts3.jpg').default} />
    </div>,
    'White Tshirt', 800,
    <div>
      <NumericInput mobile min={0} max={100} value={1} size={1} />
    </div>,
    6.0, 800),
];

// function deleteItem(i) {
//   const { rows } = this.state;
//   rows.splice(i, 1);
//   this.setState({ rows });
// }

export default function Cart() {

  const classes = useStyles();

  return (
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
                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Quantity</TableCell>
                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Action</TableCell>
                <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={`row-${i}`}>
                  <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.image}</TableCell>
                  <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.name}</TableCell>
                  <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.price}</TableCell>
                  <TableCell align="center" className={classes.numeric} style={{ fontFamily: 'Montserrat' }}>{row.quantity}</TableCell>
                  <TableCell align="center">
                    <Button>
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </Button>
                  </TableCell>
                  <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.total}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="center" colSpan={5} rowSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '15pt', height: '100px' }}>
                  Sub Total
                </TableCell>
                <TableCell align="center" rowSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '15pt' }}>
                  3600
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
                <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}> Rs. 3600</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>SHIPPING</TableCell>
                <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>Rs. 100</TableCell>
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
                <TableCell align="center" style={{ fontWeight: 600, fontFamily: 'Montserrat' }}>Rs. 3700</TableCell>
              </TableRow>
            </Table>
          </TableContainer>


          <Link to="/Checkout" style={{ textDecoration: 'none' }}><Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >Proceed To Checkout
          </Button>
          </Link>
        </center>
      </div>
    </container>

  );
}