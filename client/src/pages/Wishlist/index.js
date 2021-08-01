import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useStyles from './style';


// function createData(name, price, action) {
//     return { name, price, action };
// }

// const rows = [
//     createData(),

//     // createData(
//     //     <div>
//     //         <img height={100} align="center" src={require('../images/ts3.jpg').default} />
//     //     </div>,
//     //     'White Tshirt', 1300, 'Available'),
// ];

export default function Wishlist() {
    const classes = useStyles();


    const [listOfTshirts, setListOfShirts] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/wishlist").then((response) => {
            // console.log(response.data);
            setListOfShirts(response.data);
        });
    }, []);

    // const fileReaderInstance = new FileReader();
    // fileReaderInstance.readAsDataURL(blob); 
    // fileReaderInstance.onload = () => {
    // base64data = fileReaderInstance.result;                
    // console.log(base64data);
    // }

    // const getList = async () => {
    //     try {
    //         const data = await axios.get(
    //             "http://localhost:3001/wishlist"
    //         );
    //         console.log(data.data);
    //         // const img = new Buffer.from(data).toString("ascii")
    //         // console.log(img);
    //         setListOfShirts(data.data);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // useEffect(() => {
    //     getList();
    // }, []);

    // const base64String = btoa(String.fromCharCode(...new Uint8Array(data)));
    // console.log(base64String);



    return (
        <div>
          <CommonNav />
            <CssBaseline />

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
                            {listOfTshirts
                                .map((value) => {
                                    return (
                                        <TableRow key={value.id}>

                                            {/* <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> <img src={require({"'" + value.image+"'"}).default} /> </TableCell> */}
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> <img height={100} align="center" src={value.image} alt="" /> </TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.name} </TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.price} </TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}> {value.price} </TableCell>
                                            <TableCell align="center">
                                                <Button>
                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                </Button>
                                                <Button>
                                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    );

                                })}
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
        <Footer />
        </div>
    );
}