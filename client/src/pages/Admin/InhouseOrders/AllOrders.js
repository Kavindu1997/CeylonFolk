import React, { useState, useEffect } from "react";
import useStyles from './style';
import Popup from "../../../components/Reusable/Popup";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button } from "@material-ui/core";
import { useParams } from 'react-router';


function AllOrders() {
    const classes = useStyles();
    let { id } = useParams();

    return (
        <div style={{ display: "flex" }}>
            <div className={classes.content}>
                <div className={classes.info}>
                    <div className={classes.pageLinks}>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold', backgroundColor: '#bbd8ff' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/0">
                            All Orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/1">
                            Pending Orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/2">
                            Accepted Orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/3">
                            Dispatched Orders
                        </Button>
                        <Button style={{ borderRadius: '50px', borderWidth: '2px', borderColor: 'black', marginRight: '40px', fontWeight: 'bold' }} variant="outlined" color="primary" href="http://localhost:3000/AdminOrders/4">
                            Rejected Orders
                        </Button>
                    </div>
                </div>

                <div className={classes.info}>

                    <Paper elevation={2} className={classes.orderDetails}>
                        <Typography variant="h5" style={{ textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontWeight: '600', letterSpacing: '5px' }}>ORDER SUMMARY </Typography>
                        <TableContainer style={{ marginTop: '30px', align: 'center', width: '1200px' }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right" style={{ fontSize: '18px', fontWeight: '500' }}>Customer Name</TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px', fontWeight: '500' }}>Order Id</TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px', fontWeight: '500' }}>Full Amount</TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px', fontWeight: '500' }}>Status</TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px', fontWeight: '500' }}>Actions</TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px', fontWeight: '500' }}></TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px', fontWeight: '500' }}></TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px', fontWeight: '500' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default AllOrders;

