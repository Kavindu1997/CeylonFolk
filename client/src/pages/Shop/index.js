import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
// import Product_grid from '../components/Product_grid/Product_grid';

// import { DropDown } from '../components/Product_grid/DropDown';

import { Typography, Button, Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Link } from '@material-ui/core';
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


const Shop = () => {


    const classes = useStyles1();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    const [listOfDesigns, setListOfDesigns] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/shop").then((response) => {
            setListOfDesigns(response.data);
        });
    }, []);

    let history = useHistory()


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

                        {listOfDesigns.map((value) => {
                            return (

                                <Grid item xs={12} sm={6} md={3} onClick={() => {
                                    history.push(`/productDetails/${value.designId}`);
                                }}>
                                    <Link>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    style={{ backgroundImage: `url(${value.designImage})` }}
                                                    title="Snowy"
                                                />

                                                <CardContent style={{ display: 'flex' }}>
                                                    <div>
                                                        <Typography gutterBottom variant="h9" component="h2" style={{ textAlign: 'left' }}>{value.designName}</Typography>
                                                        <Typography gutterBottom variant="h6" component="h2" style={{ textAlign: 'left' }}>{"LKR " + value.price}</Typography>
                                                    </div>
                                                    <div><FavoriteBorderOutlinedIcon className={classes.icon1} /></div>
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
        </div>
    );
};

export default Shop;