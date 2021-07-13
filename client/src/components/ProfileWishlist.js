import React from 'react';
import { Button, CssBaseline, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";


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
        // backgroundColor:'#fafafa',
        fontFamily: 'Montserrat',
        // alignItems:'center',
        width: '700px',
        marginLeft: '60px'
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
    margin: {
        margin: theme.spacing(2),
        width: '50ch',
        // marginRight: '50px'
    },
    avatar: {
        align: 'left'
    },
    listItemText: {
        fontSize: '3.0em',//Insert your required size
        marginLeft: '20px',
    },
}));

export default function ProfileWishlist() {
    const classes = useStyles();
    // const [value, setValue] = React.useState('payment');

    //   const handleChange = (event) => {
    //     setValue(event.target.value);
    //   };

    function createData(image, name, price, status, action) {
        return { image, name, price, status, action };
    }

    const rows = [
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
    return (
        <container>
            <CssBaseline />
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> MY WISHLIST</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div>
                            <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'center', fontWeight: 600 }}>Hello </Typography>
                            <List style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ marginLeft: '130px' }}>TP</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText><Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', marginLeft: '15px', fontWeight: 600 }}>Tanya Peries</Typography></ListItemText>
                                </ListItem>
                            </List>
                            <br />
                        </div>
                        <Divider />
                        <div>
                            <center>
                                <div>
                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginTop: '50px', marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            My Account
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/myOrders" style={{ textDecoration: 'none', hover: 'red' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Order History
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/myWishlist" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Wishlist
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/auth" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Logout
                                        </Typography>
                                    </Link>
                                </div>
                            </center>
                        </div>
                        <Divider orientation="vertical" flexItem />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} sm={12} md={8} lg={7}>
                        <TableContainer style={{ marginTop: '30px' }}>
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
                    </Grid>
                </Grid>
            </center>
        </container>

    );
}
