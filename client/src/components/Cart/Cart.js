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
  }));
  
  function createData(image, name, price, quantity, action, total) {
    return { image, name, price, quantity, action, total };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 4.0),
    createData('Ice cream sandwich',237, 9.0, 37, 4.3, 4.0),
    createData('Eclair', 262, 16.0, 24, 6.0, 4.0),
    createData('Cupcake', 305, 3.7, 67, 4.3, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 4.0),
  ];
  
  export default function Cart() {
    const classes = useStyles();
  
    return (
        <container>
            <Typography variant="h4" style={{marginTop:'100px',textAlign: 'center'}}> MY CART</Typography>
      <TableContainer component={Paper} style={{marginTop:'30px',align:'center',marginLeft:'70px',width:'1200px'}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
            {/* <TableCell padding="checkbox">
                        <Checkbox
                        //   checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell> */}
              <TableCell align="right" style={{ fontWeight: 600 }}>Image</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}> Price</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>Quantity</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>Action</TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                {/* <TableCell> 
                </TableCell> */}
                <TableCell align="right">{row.image}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
      <Box
  component="span"
  m={1}
  className={`${classes.spreadBox} ${classes.box}`}
>   
{/* Cart buttons  */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.back}
      >CONTINUE SHOPPING</Button>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >CHECK OUT</Button>
      </Box>
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