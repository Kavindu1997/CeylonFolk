import React from 'react';
import { Button, TextField, CssBaseline, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Radio, RadioGroup, FormControl, Checkbox, TextareaAutosize } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/styles';

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
        backgroundColor: '#fafafa',
        fontFamily: 'Montserrat',
        width: '600px'
        // marginRight: '30px'
    },
    form: {
        width: '70%',
        marginTop: theme.spacing(2),
        fontFamily: 'Montserrat',
    },
    submit: {
        align: 'center',
        padding: '10px',
        marginTop: '30px',
        width: '550px'
    },
    note: {
        height: 50
      },
}));

function createData(image, name, quantity, total) {
    return { image, name, quantity, total };
}

const rows = [
    createData(
        <div>
            <img height={75} src={require('../images/ts1.jpg').default} />
        </div>,
        'Snowy Tshirt', 2, 2000),
    createData(
        <div>
            <img height={75} align="center" src={require('../images/ts2.jpg').default} />
        </div>,
        'Baby Tshirt', 1, 1000),
];

export default function Checkout() {
    const classes = useStyles();
    const [value, setValue] = React.useState('payment');

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    return (
        <container>
            <CssBaseline />
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> CHECKOUT</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>Billing Details</Typography>
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
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="city"
                            />
                            <FormControlLabel
                                control={<Checkbox value="address" color="primary" />}
                                label="Deliver to a different address"
                                style={{ float: 'left' }} />
                            <div id="addressNew">
                            <TextareaAutosize aria-label="minimum height" minRows={5} placeholder="Shipping Address" style={{width:'480px',height:'60px', textAlign:'justify', padding:'15px', fontFamily:'Montserrat', marginTop:'10px',borderRadius:'5px'}}/>
                                {/* <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="addnew1"
                                    label="Shipping Address"
                                    name="addnew"
                                    autoComplete="addnew"
                                /> */}
                            </div>
                            {/* <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    height="60px"
                                    id="note"
                                    label="Order Notes (optional)"
                                    name="note"
                                    autoComplete="note"
                                /> */}
                                <TextareaAutosize aria-label="minimum height" minRows={5} placeholder="Order Notes (optional)" style={{width:'480px',height:'100px', textAlign:'justify', padding:'15px', fontFamily:'Montserrat',marginTop:'30px',borderRadius:'5px'}}/>
                            
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>Order Summery</Typography>
                        <TableContainer style={{ marginTop: '30px' }}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" colSpan={2} style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Product</TableCell>
                                        <TableCell align="left" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, i) => (
                                        <TableRow key={`row-${i}`}>
                                            <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>{row.image}  </TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>{row.name} x {row.quantity}</TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>{row.total}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell align="left" colSpan={2} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                            Sub Total
                                        </TableCell>
                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>
                                            Rs. 3000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" colSpan={2} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                            Shipping
                                        </TableCell>
                                        <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat' }}>
                                            Rs. 200
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" colSpan={2} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                            Total
                                        </TableCell>
                                        <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                                            Rs. 3200
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'left', marginTop: '15px', marginBottom: '10px', marginLeft: '30px' }}>Payment Method</Typography>
                                        <FormControl component="fieldset">
                                            {/* <FormLabel component="legend">Gender</FormLabel> */}
                                            <RadioGroup aria-label="payment" name="payment1" value={value} onChange={handleChange} style={{ marginLeft: '20px' }}>
                                                <FormControlLabel value="cash" control={<Radio />} label="Cash on delivery" />
                                                <FormControlLabel value="bank" control={<Radio />} label="Bank Deposits" />
                                                <FormControlLabel value="online" control={<Radio />} label="Pay online" />
                                                <div>
                                                    <img height={50} src={require('../images/paymentnew.png').default} />
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div>
                            <center>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >Checkout
                                </Button>
                            </center>
                        </div>
                    </Grid>


                </Grid>
            </center>
        </container>

    );
}
