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


const Home = () => {

    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    let history = useHistory();
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

    useEffect(() => {

        axios.get("http://localhost:3001/shop/offers").then((response) => {
            console.log(response.data);
            setListOfOffers(response.data);
        });
    }, []);

    const onSetId = (id) => {
        localStorage.setItem("collection_offer_id", id);


    };


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
                            <a href="/types/2"><button className={classes.svgBtn}><img height={50} src={icont} />
                                <Typography textDecoration='none' className={classes.svgFont}>T-Shirts</Typography></button></a>
                        </Grid>
                        {/* <Grid md={5} style={{marginLeft:'100px'}}>
                    <img src={mockup} style={{width:'100%'}}/>
                </Grid> */}
                        <Grid item xs={12} sm={6} md={4} className={classes.svgs}>
                            <a href="/types/1"><button className={classes.svgBtn}><img height={50} src={iconcp} />
                                <Typography textDecoration='none' className={classes.svgFont}>Crop Tops</Typography></button></a>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.svgs}>
                            <a href="/types/3"><button className={classes.svgBtn}><img height={50} src={iconk} />
                                <Typography textDecoration='none' className={classes.svgFont}>Kids</Typography></button></a>
                        </Grid>
                    </Grid>
                </Container>
            </center>

            <center>
                <Container className={classes.collectionContainer} maxWidth="lg">
                    <Typography variant="h4" className={classes.collectionTitle}>TOP SELLER</Typography>
                    <Grid container spacing={0} >
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia>
                                        <img src={Collection1} style={{ width: '100%' }} />
                                    </CardMedia>
                                    <CardContent style={{ display: 'flex' }}>
                                        <div>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left' }} className={classes.productTitle}>
                                                BUTTER
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h2" style={{ textAlign: 'left' }} className={classes.productSubTitle}>
                                                LKR 1300.00
                                            </Typography>

                                        </div>
                                        <div>
                                            {/* <Link href="/wishlist"> */}

                                            <FavoriteBorderOutlinedIcon className={classes.icon1} />

                                            {/* </Link> */}
                                        </div>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia>
                                        <img src={Collection2} style={{ width: '100%' }} />
                                    </CardMedia>

                                    <CardContent style={{ display: 'flex' }}>
                                        <div>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left' }} className={classes.productTitle}>
                                                FRIENDS
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h2" style={{ textAlign: 'left' }} className={classes.productSubTitle}>
                                                LKR 1300.00
                                            </Typography>

                                        </div>
                                        <div>
                                            {/* <Link href="/wishlist"> */}

                                            <FavoriteBorderOutlinedIcon className={classes.icon1} />

                                            {/* </Link> */}

                                        </div>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia>
                                        <img src={Collection3} style={{ width: '100%' }} />
                                    </CardMedia>
                                    <CardContent style={{ display: 'flex' }}>
                                        <div>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left' }} className={classes.productTitle}>
                                                BUTTER
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h2" style={{ textAlign: 'left' }} className={classes.productSubTitle}>
                                                LKR 1300.00
                                            </Typography>

                                        </div>
                                        <div>
                                            {/* <Link href="/wishlist"> */}

                                            <FavoriteBorderOutlinedIcon className={classes.icon1} />

                                            {/* </Link> */}

                                        </div>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia>
                                        <img src={Collection4} style={{ width: '100%' }} />
                                    </CardMedia>
                                    <CardContent style={{ display: 'flex' }}>
                                        <div>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left' }} className={classes.productTitle}>
                                                FRIENDS
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h2" style={{ textAlign: 'left' }} className={classes.productSubTitle}>
                                                LKR 1300.00
                                            </Typography>

                                        </div>
                                        <div>
                                            {/* <Link href="/wishlist"> */}

                                            <FavoriteBorderOutlinedIcon className={classes.icon1} />

                                            {/* </Link> */}

                                        </div>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography className={classes.view}>
                        + VIEW MORE
                    </Typography>
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
                                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                                <div>
                                                    <Typography gutterBottom variant="h5" component="h5" style={{ textAlign: 'left', fontSize: '18px' }} className={classes.productTitle}>
                                                        {value.collection_name}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{ marginLeft: '10px', paddingLeft: '10px', background: '#31c5ee' }} className={classes.offer}>
                                                        {value.rate}%
                                                    </Typography>

                                                </div>



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
                    {/* <Grid container spacing={0}>
                        <Carousel>   
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            style={{ backgroundImage:`url(${Snap1})`,height:'450px'}}
                                            title="Snap1"
                                        />      
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            style={{ backgroundImage:`url(${Snap2})`,height:'450px'}}
                                            title="Snap2"
                                        />
                                    </CardActionArea>
                                </Card>
                            </Grid>    
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                style={{ backgroundImage:`url(${Snap3})`,height:'450px'}}
                                                title="Snap3"
                                            />                                          
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                style={{ backgroundImage:`url(${Snap4})`,height:'450px'}}
                                                title="Sanp4"
                                            />                                          
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                style={{ backgroundImage:`url(${Snap5})`,height:'450px'}}
                                                title="Snap5"
                                            />                                          
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Carousel>     
                    </Grid> */}
                    <Grid container spacing={0} className={classes.cscontainer}>
                        <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                            <img height={250} src={cs1} style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                            <img height={250} src={cs2} style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                            <img height={250} src={cs3} style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                            <img height={250} src={cs4} style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                            <img height={250} src={cs5} style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                            <img height={250} src={cs6} style={{ width: '100%' }} />
                        </Grid>
                    </Grid>
                </Container>
            </center>





            <div>


            </div>
            <Footer />

        </div>

    );

};

export default Home;


