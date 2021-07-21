import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';

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

}));

function createData(image, name, price, status, action) {
    return { image, name, price, status, action };
}

const rows = [
    // createData(
    //   <div>
    //     <img height={100} src={require('../images/ts1.jpg').default}/>
    //   </div>,
    //   'Snowy Tshirt',1000, 'Available'),
    createData(
        <div>
            <img height={100} align="center" src={require('../images/ts2.jpg').default} />
        </div>,
        'Baby Tshirt', 1000, 'Not Available'),
    createData(
        <div>
            <img height={100} align="center" src={require('../images/ts3.jpg').default} />
        </div>,
        'White Tshirt', 1300, 'Available'),
];

export default function Wishlist() {

    const classes = useStyles();

    return (
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
                            {rows.map((row, i) => (
                                <TableRow key={`row-${i}`}>
                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.image}</TableCell>
                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.name}</TableCell>
                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.price}</TableCell>
                                    <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{row.status}</TableCell>
                                    <TableCell align="center">
                                        <Button>
                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </Button>
                                        <Button>
                                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                        </Button>
                                    </TableCell>
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.back}
                        >Continue Shopping
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Proceed to Checkout
                        </Button>
                    </Box>
                </div>
            </center>

        </container>

    );
}