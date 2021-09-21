import React, { useEffect, useState } from 'react';
import { CssBaseline, Typography, IconButton, Collapse, Box, Button, Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import Footer from '../../components/Footer/Footer';
import HomeNav from '../../components/Navbars/HomeNav';
import Image from '../../images/Cover.png';
import Collection1 from '../../images/ts1.jpg';
import Collection2 from '../../images/ts2.jpg';
import Collection3 from '../../images/ts3.jpg';
import Collection4 from '../../images/ts4.jpg';
import icont from '../../images/tshirt.svg'
import iconk from '../../images/kids.svg'
import iconcp from '../../images/croptop.svg'
import iconh from '../../images/hoodie.svg'
import cs1 from '../../images/cs1.jpg'
import cs2 from '../../images/cs2.jpg'
import cs3 from '../../images/cs3.jpg'
import cs4 from '../../images/cs4.jpg'
import cs5 from '../../images/cs5.jpg'
import cs6 from '../../images/cs6.jpg'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import mockup from '../../images/tmockup.png'
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Notification from "../../components/Reusable/Notification";
import ceylonforkapi from "../../api/index";
import InstagramFeed  from 'react-ig-feed'
import 'react-ig-feed/dist/index.css'


const Home = () => {

    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    let history = useHistory();
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    useEffect(() => {
        setChecked(true);
    }, []);

    var id = localStorage.getItem("userId");

    const onDesign = () => {
        if (id > 0) {
            history.push('/customize');

        }
        else {
            history.push('/auth');
        }

    }

    const [listOfOffers, setListOfOffers] = useState([]);
    const [listOfOfTopSellers, setListOfTopSellers] = useState([]);


    useEffect(() => {
        const uId = localStorage.getItem("userId")
        axios.get("http://localhost:3001/shop/offers").then((response) => {
            console.log(response.data);
            setListOfOffers(response.data);
        });

        axios.get("http://localhost:3001/shop/topseller/" + uId).then((response) => {
            console.log(response.data);
            setListOfTopSellers(response.data);
        });
    }, []);

    const onSetId = (id) => {
        localStorage.setItem("collection_offer_id", id);


    };

    function addToWishlist(id, isInWishList) {
        const uid = localStorage.getItem("userId");
        if (localStorage.getItem("userId") != "0") {
            const data = {
                uid: uid,
                id: id,
            };
            console.log(data)
            if (isInWishList == 1) {
                setNotify({
                    isOpen: true,
                    message: "This product is already in your wishlist !",
                    type: "error",
                });
            } else {
                ceylonforkapi
                    .post("/shop/addwishlist/", data)
                    .then((response) => {
                        if (response.data.status == 0) {
                            setNotify({
                                isOpen: true,
                                message: "Not successfully added to your wishlist !",
                                type: "error",
                            });
                        } else {
                            setListOfTopSellers(response.data.data);
                            setNotify({
                                isOpen: true,
                                message: "Successfully added to your wishlist !",
                                type: "success",
                            });
                        }
                    });
            }
        } else {
            setNotify({
                isOpen: true,
                message: "Customer has not logged in !",
                type: "error",
            });
        }
    }

    return (

        <div>

            <HomeNav />
            <CssBaseline />
            <div className={classes.root2}>

                <Grid container >
                    <Grid item md={6}>

                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className={classes.svgs}>
                        <Collapse in={checked}  {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
                            <div className={classes.container}>
                                <h1 className={classes.title}>
                                    YOU DECIDE<br />
                                    <span className={classes.colorText}>WE DESIGN</span>
                                </h1>
                                <Typography className={classes.subText} >All about quality products and reasonable price !</Typography>

                                <a style={{ textDecoration: 'none' }}><Button

                                    variant="outlined"
                                    color="black"
                                    border-color="white" className={classes.designbtn}
                                    onClick={onDesign}
                                >START DESIGNING</Button></a>
                                {/* <IconButton>
                                    <ExpandMoreIcon className={classes.goDown}/>
                                </IconButton> */}
                            </div>
                        </Collapse>
                    </Grid>


                </Grid>

            </div>

            <center>
                <Container className={classes.collectionContainer} maxWidth="lg">
                    <Typography variant="h4" className={classes.collectionTitle}>IN THE STORE</Typography>

                    <Grid container spacing={0} className={classes.svgContainer}>
                        <Grid item xs={12} sm={6} md={4} className={classes.svgs}>
                            <a href="/types/6"><button className={classes.svgBtn}><img height={50} src={icont} />
                                <Typography textDecoration='none' className={classes.svgFont}>T-Shirts</Typography></button></a>
                        </Grid>
                        {/* <Grid md={5} style={{marginLeft:'100px'}}>
                    <img src={mockup} style={{width:'100%'}}/>
                </Grid> */}
                        <Grid item xs={12} sm={6} md={4} className={classes.svgs}>
                            <a href="/types/8"><button className={classes.svgBtn}><img height={50} src={iconcp} />
                                <Typography textDecoration='none' className={classes.svgFont}>Crop Tops</Typography></button></a>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.svgs}>
                            <a href="/types/9"><button className={classes.svgBtn}><img height={50} src={iconk} />
                                <Typography textDecoration='none' className={classes.svgFont}>Kids</Typography></button></a>
                        </Grid>
                    </Grid>
                </Container>
            </center>

            <center>
                <Container className={classes.collectionContainer} maxWidth="lg">
                    <Typography variant="h4" className={classes.collectionTitle}>TOP SELLER</Typography>
                    <Grid container spacing={0}>
                        {listOfOfTopSellers.map((value) => {
                            return (
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card className={classes.card} >
                                        <CardActionArea>
                                            <CardMedia>
                                                <img align="center" src={'http://localhost:3001/' + value.coverImage} alt="" style={{ width: '100%' }}

                                                    onClick={() => {
                                                        history.push(`/productDetails/${value.itemId}`);
                                                    }}
                                                ></img>
                                            </CardMedia>
                                            <CardContent style={{ height: '120px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h9"
                                                        component="h2"
                                                        style={{ textAlign: "left", fontSize: "16px" }}
                                                    >
                                                        {value.design_name}
                                                    </Typography>
                                                    <IconButton
                                                        style={{
                                                            padding: '0px',
                                                            borderRadius: '0px'
                                                        }}
                                                        onClick={() => {
                                                            addToWishlist(value.itemId, value.isInWishList);
                                                        }}
                                                    >
                                                        <FavoriteBorderOutlinedIcon
                                                            className={classes.icon1}
                                                            style={{
                                                                fill:
                                                                    value.isInWishList == 1
                                                                        ? "red"
                                                                        : "primary",
                                                            }}
                                                        />
                                                    </IconButton>
                                                </div>
                                                

                                                <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        {value.discountedPrice === null ?
                                                            <Typography
                                                                gutterBottom
                                                                variant="h6"
                                                                component="h2"
                                                                style={{ textAlign: "left", fontSize: "16px" }}
                                                            >
                                                                {"LKR " + value.price}
                                                            </Typography>
                                                            :
                                                            <div>
                                                                <div style={{display:'flex'}}>
                                                                    <Typography
                                                                        gutterBottom
                                                                        variant="h6"
                                                                        component="h2"
                                                                        style={{ textAlign: "left", fontSize: "16px" }}
                                                                    >

                                                                        {"LKR " + value.discountedPrice}

                                                                    </Typography>
                                                                    <div>
                                                                        <span className={classes.offer2}>
                                                                            {value.rate}%
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="h6"
                                                                    component="h2"
                                                                    style={{ textAlign: "left", fontSize: "16px" }}
                                                                >
                                                                    <s>{"LKR " + value.price}</s>
                                                                </Typography>

                                                            </div>

                                                        }

                                                        
                                                    </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>



                <Container className={classes.collectionContainer} maxWidth="lg">

                    <Typography variant="h4" className={classes.collectionTitle}>SPECIAL OFFERS</Typography>

                    <Grid container spacing={0}>
                        {listOfOffers.map((value) => {
                            return (
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card className={classes.card} >
                                        <CardActionArea>
                                            <CardMedia>
                                                <img align="center" src={'http://localhost:3001/' + value.coverImage} alt="" style={{ width: '100%' }}

                                                    onClick={() => {
                                                        onSetId(value.id);
                                                        history.push(`/specialOffers/${value.id}`);


                                                    }}
                                                ></img>
                                            </CardMedia>
                                            <CardContent style={{ height: '80px', display: 'flex' }}>

                                                <Typography gutterBottom variant="h5" component="h5" style={{ textAlign: 'left', fontSize: '18px' }} className={classes.productTitle}>
                                                    {value.collection_name}
                                                </Typography>

                                                <span style={{ marginLeft: '210px' }} className={classes.offer2}>
                                                    {value.rate}%
                                                </span>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Typography className={classes.view}
                        onClick={() => {
                            history.push('/offerCollections');

                        }}>
                        + VIEW MORE
                    </Typography>

                </Container>

                <Container className={classes.collectionContainer} maxWidth="lg">
                    <Typography variant="h4" className={classes.collectionTitle}>Customer Snaps</Typography>
                    

<Box>
            <InstagramFeed token="IGQVJWRmNjSWhCYnNiVnZAhb0dKS0E5R0VYajB2TGlaOUJzelE0cUNOd2h1NFlHdS1xSEFZASldESUpOa2VGUTNURzgxRVVRVmxxcTc2eEpHdVd5SlB4UlcxOFpKTm1pRXFjLVNLWmpITVVfc3NmWGFuegZDZD"  counter="6"/>
                </Box>
                    
                </Container>
            </center>

            





            <div>


            </div>
            <Footer />
            <Notification notify={notify} setNotify={setNotify} />
        </div>

    );

};

export default Home;


