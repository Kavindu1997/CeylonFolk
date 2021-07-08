import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NumericInput from 'react-numeric-input';
import 'font-awesome/css/font-awesome.min.css';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { DriveEta } from '@material-ui/icons';


const useStyles = makeStyles((theme) =>({
    table: {
      minWidth: 400,
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
        alignItems:"center",
        marginLeft: 600,
      },
      submit: {
        marginTop: 30,
        alignItems:"center",
        marginLeft: 600,
      },
      coupon: {
        borderRadius: 20
      },
      remove: {
        color: 'red',
      },
      numeric: {
        borderRadius: '20px 20px 20px 20px'
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
        <img height={100} src={require('../../images/ts1.jpg').default}/>
      </div>,
      'Snowy Tshirt', 159, 
      <div>
        <NumericInput mobile min={0} max={100} value={2} size={ 1 }/>
      </div>, 
      4.0, 4.0),
    createData(
      <div>
        <img height={100} align="center" src={require('../../images/ts2.jpg').default}/>
      </div>,
      'Baby Tshirt',249,
      <div>
        <NumericInput mobile min={0} max={100} value={1} size={ 1 }
        style={{ borderRadius: '20px 20px 20px 20px'
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
        }}/>
      </div>,
      1000, 1000),
    createData(
      <div>
        <img height={100} align="center" src={require('../../images/ts3.jpg').default}/>
      </div>,
      'White Tshirt', 800, 
      <div>
        <NumericInput mobile min={0} max={100} value={1} size={ 1 }/>
      </div>, 
      6.0, 4.0),
    createData(
      <div>
        <img height={100} align="center" src={require('../../images/ts4.jpg').default}/>
      </div>,
      'Friends Tshirt', 3057,
      <div>
        <NumericInput mobile min={0} max={100} value={3} size={ 1 }/>
      </div>, 
      4.3, 4.0),
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
            <Typography variant="h4" style={{marginTop:'100px',textAlign: 'center'}}>CART</Typography>
      <TableContainer component={Paper} style={{marginTop:'30px',align:'center',marginLeft:'70px',width:'1200px'}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" style={{ fontFamily: "motesterrat", fontWeight: 600, width: 50, height:50 }}>Image</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}> Price</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>Quantity</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>Action</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => (
              <TableRow key={`row-${i}`}>
                <TableCell align="right">{row.image}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                 <TableCell align="right" className={classes.numeric}>{row.quantity}</TableCell>
                <TableCell align="right">
                  <Button
                    className={classes.remove}
                  >
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </Button>
                </TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
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

         <Typography variant="h6" style={{marginTop:'50px',marginLeft:'80px',textAlign: 'left',fontWeight: 600}}>Cart Totals</Typography> 
         <TableContainer style={{marginTop:'20px',marginLeft:'80px',align:'left',width:'600px'}}>
         <Table aria-label="simple table">
            <TableRow>
              <TableCell align="left" style={{ fontWeight: 600 }}>SUB TOTAL</TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}> $489</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: 600 }}>SHIPPING</TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>$7</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: 600 }}>ADD COUPON</TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
              <div>
                <TextField underlineShow={false} label="Coupon ID" style={{width:130, borderRadius: 25}}/>
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
              <TableCell align="left" style={{ fontWeight: 600 }}>TOTAL</TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>$496</TableCell>
            </TableRow>
          </Table>     
        </TableContainer>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >Proceed To Checkout
        </Button>
      </div>
      </container>
    );
  }

//     export const Table=()=>{
//     const data=[
//         {name: 'Ramesh',age:12},
//         {name: 'Kumar',age:12},
//         {name: 'Kamal',age:12},
//         {name: 'Amal',age:12},
//     ]
//     const columns=[
//         {
//             title:'Name',field:'name'
//         },
//         {
//             title:'Age',field:'age' 
//         }
//     ]
//     return(<div>
//         <MaterialTable title="Material Table"
//         data={data}
//         column={columns}
//         />
//         </div>)
// }


 
// export default function Cart() {
//     const classes = useStyles();

//     return (
//         <container>
//             <Typography variant="h4" style={{marginTop:'100px',textAlign: 'center'}}> MY CART</Typography>
//             <center>
//                 <Grid container style={{marginTop:'80px',align:'center'}}>
//                 <CssBaseline />
//                 <Grid item md={6} style={{align:'center'}}> 
//                     <Typography component="h1" variant="h5" style={{fontFamily:'Montserrat',textAlign:'center'}}>Already Registered?</Typography><br></br>
//                     <form className={classes.form} noValidate>
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                         />
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                         />
//                         <FormControlLabel
//                             control={<Checkbox value="remember" color="primary" />}
//                             label="Remember me"
//                             style={{float:'left'}}/>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             className={classes.submit}
//                         >Sign In</Button>
//                     </form>
//                 </Grid> 
//                 <Grid item md={6} style={{alignItems:'center'}}> 
//                     <Typography component="h1" variant="h5" style={{fontFamily:'Montserrat',textAlign:'center'}}>New Member?</Typography><br></br>
//                     <form className={classes.form} noValidate>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 autoComplete="fname"
//                                 name="firstName"
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="firstName"
//                                 label="First Name"
//                                 autoFocus
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="lastName"
//                                 label="Last Name"
//                                 name="lastName"
//                                 autoComplete="lname"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Email Address"
//                                 name="email"
//                                 autoComplete="email"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="mobileNumber"
//                                 label="Mobile Number"
//                                 name="mobileNumber"
//                                 autoComplete="mobileno"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 id="password"
//                                 autoComplete="current-password"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 name="confirmPassword"
//                                 label="Confirm Password"
//                                 type="password"
//                                 id="confirmPassword"
//                                 autoComplete="confirm-password"
//                             />
//                         </Grid>
//                         <FormControlLabel
//                             control={<Checkbox value="remember" color="primary" />}
//                             label="Accept Terms & Condition"
//                             style={{marginLeft:'6px'}}/>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             className={classes.submit}
//                         >Sign Up</Button>
//                     </Grid>
//                     </form>
//                 </Grid> 
//                 </Grid>
//             </center>
//         </container>
        
//   );
// }