import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
// import Product_grid from '../components/Product_grid/Product_grid';

// import { DropDown } from '../components/Product_grid/DropDown';

import { IconButton , Typography, Button, Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Image from '../../images/cover6.jpg';
import Collection1 from '../../images/ts1.jpg';
import Collection2 from '../../images/ts2.jpg';
import Collection3 from '../../images/ts3.jpg';
import Collection4 from '../../images/ts4.jpg';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import axios from 'axios';
import { useHistory } from 'react-router';
import useStyles1 from './style1';
import { setProducts, fetchProducts, actionAddToWishlist } from '../../_actions/productAction'
import { useDispatch, useSelector } from "react-redux";
import Notification from '../../components/Reusable/Notification';


const Shop = () => {

    const classes = useStyles1();
    const [checked, setChecked] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const products = useSelector((state) => state.productReducer.productObject)
    const dispatch = useDispatch();

    // const fetchProducts = async () =>{
    //     axios.get('http://localhost:3001/shop').then((response) => {
    //       // setProductObject(response.data);
    //       console.log(response.data[0])
    //       console.log('hello from response from server')
    //       dispatch(setProducts(response.data))
    //     });

    //   }
 
    useEffect(() => {
        dispatch(fetchProducts());
        setChecked(true);
    }, []);


    const [listOfDesigns, setListOfDesigns] = useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:3001/shop").then((response) => {
    //         setListOfDesigns(response.data);
    //     });
    // }, []);

    let history = useHistory()
 
    function addToWishlist(id){
        if(localStorage.getItem("userId")!='0'){
        dispatch(actionAddToWishlist(id))
        dispatch(fetchProducts());
        }else{
            setNotify({
                isOpen: true,
                message: 'Customer has not logged in !',
                type: 'error'
              });
        }   
    }
 

    return (
        <div>
            <CssBaseline />
            <CommonNav />


            <div>

                <center>
                    <Typography variant="h4" className={classes.collectionTitle}>SHOP</Typography>
                    <Grid item md={6}>
                        <div className={classes.filter}>
                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                                <select className={classes.icon}>
                                    <option value="">Collection</option>
                                    <option value="1">Snowy</option>
                                    <option value="0">Marvel</option>
                                </select>
                            </ButtonGroup>
                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                                <select className={classes.icon}>
                                    <option value="">Material</option>
                                    <option value="1">Cotton</option>
                                    <option value="0">Wet look</option>
                                </select>
                            </ButtonGroup>
                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                                <select className={classes.icon}>
                                    <option value="">color</option>
                                    <option value="1">Black</option>
                                    <option value="0">White</option>
                                </select>
                            </ButtonGroup>
                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                                <select className={classes.icon}>
                                    <option value="">Size</option>
                                    <option value="1">Small</option>
                                    <option value="0">Medium</option>
                                </select>
                            </ButtonGroup>
                            <Button variant="contained" color="primary">
                                Filter
                            </Button>
                        </div>
                    </Grid>
                </center>

                <Container className={classes.collectionContainer} maxWidth="lg">
                    <Grid container spacing={0} >

                        {products.map((product,index) => {
                            const { id, coverImage, design_name, price,isInWishList } = product;
                            return (
                                <Grid item xs={12} sm={6} md={3} >
                                    <Link style={{ textDecoration: 'none' }}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                {/* <CardMedia
                                                    className={classes.media}
                                                    style={{
                                                        backgroundImage: `url('http://localhost:3001/${coverImage}')`
                                                    }}
                                                    title="Snowy"
                                                /> */}
                                                <img style={{ width: '100%', overflow: 'hidden', objectFit: 'cover', hight: '293px' }} src={'http://localhost:3001/' + coverImage} alt="" onClick={() => {history.push(`/productDetails/${id}`);}}></img>

                                                <CardContent>
                                                    <div>
                                                        <Typography gutterBottom variant="h9" component="h2" style={{ textAlign: 'left', fontSize: '16px' }}>{design_name}</Typography>

                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography gutterBottom variant="h6" component="h2" style={{ textAlign: 'left', fontSize: '16px' }}>{"LKR " + price}</Typography>
                                                        <IconButton onClick={() => { addToWishlist(id) }}>
                                                        
                                                        <FavoriteBorderOutlinedIcon  className={classes.icon1}  style={{fill:product.isInWishList==1?"red":"primary"}}  /> 
      
                                                        </IconButton>
                                                    </div>   
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions></CardActions>
                                        </Card>
                                    </Link>
                                </Grid>

                            );
                        })}
                    </Grid>
                </Container>
            </div>
            <Footer />
            <Notification
        notify={notify}
        setNotify={setNotify}
      />
        </div>
    );
};

export default Shop;