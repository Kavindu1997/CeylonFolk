import React, {useState, useEffect} from 'react';
import { Button, CssBaseline, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import UserNav from '../../components/Navbars/UserNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import axios from 'axios';
import Popup from "../../components/Reusable/Popup";
import Controls from "../../components/Reusable/Controls";
import { useHistory } from 'react-router-dom';


const CustCustomizeOrders = () => {
    const classes = useStyles();
    const [custCustomizeOrder, setcustCustomizeOrder] = useState([])
    const [disable, setDisable] = React.useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    let history = useHistory();

    useEffect(() => {

        var id = localStorage.getItem("userId");
        console.log(id)
        axios.get('http://localhost:3001/customizeOrders/custCustomizeOrders/'+id).then((response) => {
            console.log(response.data);
            setcustCustomizeOrder(response.data);
        })
    }, []);

    const openInPopup = (item) => {
        setOpenPopup(true);
    };

    return (
        <div>
        <UserNav />
          <CssBaseline />
        <container>
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> ORDER HISTORY</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div>
                            <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'center', fontWeight: 600 }}>Hello </Typography>
                            <List style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ marginLeft: '130px' }}>NB</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText><Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', marginLeft: '15px', fontWeight: 600 }}>Nimal Bandara</Typography></ListItemText>
                                </ListItem>
                            </List>
                            <br />
                        </div>
                        <Divider orientation="horizontal" flexItem />
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
                                    <Link to="/deposit" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Bank Deposit Upload
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/custcustomizeOrders" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Customized Orders
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
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order ID</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Status</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Price</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Design</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {custCustomizeOrder
                                            .map((value,index) => {
                                                return (
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.customerId}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.status}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.price}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.image} alt=""></img></TableCell> 
                                            <TableCell align="center">
                                                <Button className={value.status === 'Accept' ? classes.activeQuantity : classes.quantity} color="primary"
                                                disabled={disable} 
                                                key={index}
                                                onClick={() => {
                                                    setDisable(true)
                                                    setOpenPopup(true);
                                                }}
                                                >
                                                    Confirm Order
                                                </Button>
                                                <Button className={value.status === 'Accept' ? classes.activeQuantity : classes.quantity} color="primary"
                                                disabled={disable} 
                                                key={index}
                                                onClick={() => {
                                                    history.push(`/orderView/${value.orderId}`);
                                                }}
                                                >
                                                    View Order
                                                </Button>
                                            </TableCell>

                                            <Popup
                                                        title="Send the Estimated Price"
                                                        openPopup={openPopup}
                                                        setOpenPopup={setOpenPopup}
                                                        >
                                                            <Grid item xs={4}>
                                                                <Typography>You Have to make 50% of your full amount to confirm your order</Typography>
                                                                <Typography>Your payment</Typography>
                        
                                                                <Typography>{value.price/2}</Typography>

                                                            </Grid>
                                                            <Grid item md={12} >
                                                                <Controls.Button
                                                                    type="submit"
                                                                    text="Proceed to Checkout"
                                                                    onClick={() => {
                                                                        history.push('/Checkout');
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Popup>

                                        </TableRow>
                                    );
                                })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </center>
        </container>
        <Footer />
        </div>

    );
};

export default CustCustomizeOrders;
