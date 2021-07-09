import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        height:'1000px',
        fontFamily:'Montserrat',
        position:'relative',
        color: 'white',
        padding: '100px',  
    },
    table: {
        minWidth: 400,
        // backgroundColor:'#fafafa',
        fontFamily:'Montserrat',
        width: '600px'
        // marginRight: '30px'
    },
    form: {
        width: '70%',
        marginTop: theme.spacing(2),
        fontFamily:'Montserrat',
    },
    submit: {
      align:'center',
      padding:'10px',
      marginTop:'30px',
    },
    google: {
        align:'center',
        padding:'10px',
        marginTop:'30px',
        marginBottom:'30px',
        borderWidth:'thin',
        borderColor:'black',
        '&:hover': {
            background: 'none',
            borderWidth:'medium',
          }
      },
      forgot:{
        textDecoration:'none',
        float:'right',
        marginTop:'10px',
        '&:hover':{
            fontWeight:'500',
            textDecoration:'none',
        }
      },
  }));

  function createData(image, name, quantity, total) {
    return { image, name, quantity, total };
  }
  
  const rows = [
    createData(
      <div>
        <img height={75} src={require('../images/ts1.jpg').default}/>
      </div>,
      'Snowy Tshirt',2,2000),
    createData(
      <div>
        <img height={75} align="center" src={require('../images/ts2.jpg').default}/>
      </div>,
      'Baby Tshirt',1,800),
  ];

export default function Checkout() {
    const classes = useStyles();
    const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

    return (
        <container>
            <CssBaseline />
            <Typography variant="h5" style={{marginTop:'50px',textAlign: 'center',backgroundColor:'#C6C6C6',padding:'30px',fontFamily:'Montserrat'}}> CHECKOUT</Typography>
            <center>
            <Grid container style={{marginTop:'50px',align:'center'}}>
                <Grid item xs={12} sm={12} md={6} lg={6}> 
                    <Typography component="h1" variant="h5" style={{fontFamily:'Montserrat',textAlign:'center'}}>Billing Details</Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Your Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="number"
                            label="Phone Number(for delivery)"
                            name="number"
                            autoComplete="number"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="add1"
                            label="Address Line 1"
                            name="add1"
                            autoComplete="add1"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="add2"
                            label="Address Line 2"
                            name="add2"
                            autoComplete="add1"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                            autoComplete="country"
                        />
                        <FormControlLabel
                            control={<Checkbox value="address" color="primary" />}
                            label="Deliver to a different address"
                            style={{float:'left'}}/>
                        <Link href="#" className={classes.forgot}>Add New Address</Link>
                    </form>
                </Grid>  
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography component="h1" variant="h5" style={{fontFamily:'Montserrat',textAlign:'center'}}>Order Summery</Typography>
                    <TableContainer style={{marginTop:'30px',align:'center', marginRight:'50px'}}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" colSpan={2} style={{ fontFamily:'Montserrat', fontWeight: 600}}>Product</TableCell>
                                    <TableCell align="left" style={{ fontFamily:'Montserrat',fontWeight: 600 }}>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row,i) => (
                                <TableRow key={`row-${i}`}>
                                    <TableCell align="left"  style={{ fontFamily:'Montserrat'}}>{row.image}</TableCell>
                                    <TableCell align="left" style={{ fontFamily:'Montserrat'}}>{row.name}  x  {row.quantity}</TableCell>
                                    <TableCell align="left" style={{ fontFamily:'Montserrat'}}>{row.total}</TableCell>
                                </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell align="left" colSpan={2} style={{ fontFamily:'Montserrat', fontWeight: 600, height:'60px'}}>
                                        Sub Total
                                    </TableCell>
                                    <TableCell align="left" style={{ fontFamily:'Montserrat'}}>
                                        Rs. 2800
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" colSpan={2} style={{ fontFamily:'Montserrat', fontWeight: 600, height:'60px'}}>
                                        Shipping
                                    </TableCell>
                                    <TableCell align="left" colSpan={3} style={{ fontFamily:'Montserrat'}}>
                                        Rs. 200
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" colSpan={2} style={{ fontFamily:'Montserrat', fontWeight: 600, height:'60px'}}>
                                        Total
                                    </TableCell>
                                    <TableCell align="left" colSpan={3} style={{ fontFamily:'Montserrat',fontWeight: 600}}>
                                        Rs. 3000
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <Typography component="h1" variant="h6" style={{fontFamily:'Montserrat',textAlign:'left',marginTop:'15px',marginBottom:'10px'}}>Payment Method</Typography>
                                    <FormControl component="fieldset">
                                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                                    <RadioGroup aria-label="payment" name="payment1" value={value} onChange={handleChange}>
                                        <FormControlLabel value="cash" control={<Radio />} label="Cash on delivery" />
                                        <FormControlLabel value="bank" control={<Radio />} label="Bank Deposits" />
                                        <FormControlLabel value="online" control={<Radio />} label="Pay online" />
                                        <div>
                                            <img height={75} src={require('../images/payment.jpg').default}/> 
                                        </div>
                                    </RadioGroup>
                                    </FormControl>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}></Box>  
                </Grid>
                 
                
                </Grid>
            </center>
        </container>
        
  );
}
