import React, {useState, useEffect} from 'react';
import { Button, CssBaseline, Grid, Typography,InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import UserNav from '../../components/Navbars/UserNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import axios from 'axios';
import Popup from "../../components/Reusable/Popup";
import Controls from "../../components/Reusable/Controls";
import { useHistory } from 'react-router-dom';
import UserSideNav from '../../components/Navbars/UserSideNav';
import CommonNav from '../../components/Navbars/HomeNav';
import useTable from "../../components/Reusable/useTable";
import { Search } from "@material-ui/icons";


const CustCustomizeOrders = () => {
    const classes = useStyles();
    const [custCustomizeOrder, setcustCustomizeOrder] = useState([])
    const [disable, setDisable] = React.useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    let history = useHistory();

    if (localStorage.getItem("userId") == "0") {
        history.push("/auth");
    }

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

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(custCustomizeOrder, "", filterFn);



    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                return items.filter(x => x.orderNo.toLowerCase().includes(target.value) ||
                
                x.status.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <div>
        <CommonNav />
          <CssBaseline />
        <container>
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> ORDER HISTORY</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <UserSideNav />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} sm={12} md={8} lg={7}>
                    <div style={{padding:"10px",marginTop:"25px"}}>
                            <Controls.Input
                            label="Search"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>

                                ),
                            }}
                            onChange={handleSearch}
                        />
                        </div>
                        <TableContainer style={{ marginTop: '30px' }}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Order No</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Status</TableCell>
                                        <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Price</TableCell>
                                        {/* <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Design</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {recordsAfterPagingAndSorting()
                                            .map((value,index) => {
                                                return (
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.orderNo}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.status}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.fixedPrice}</TableCell>
                                                        {/* <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.image} alt=""></img></TableCell>  */}
                                            <TableCell align="center">
                                            <Controls.Button  color="primary"
                                                disabled={disable} 
                                                key={index}
                                                onClick={() => {history.push(`/orderView/${value.orderId}`)}}
                                                text="VIEW ORDER"
                                                // onClick={() => {
                                                //     setDisable(true)
                                                //     setOpenPopup(true);
                                                // }}
                                                />
                                                
                                            </TableCell>

                                           

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
