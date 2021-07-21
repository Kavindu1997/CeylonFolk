import React, { useEffect, useState } from 'react';
import { Typography, IconButton, Collapse, Box, Button, Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import Image from '../images/Cover.png';
import Collection1 from '../images/ts1.jpg';
import Collection2 from '../images/ts2.jpg';
import Collection3 from '../images/ts3.jpg';
import Collection4 from '../images/ts4.jpg';
import backImage2 from '../images/ttttt.png';
import Snap1 from '../images/snap1.jpg'
import Snap2 from '../images/snap2.jpg'
import Snap3 from '../images/snap3.jpg'
import Snap4 from '../images/snap4.jpg'
import Snap5 from '../images/snap5.jpg'
import icont from '../images/tshirt.svg'
import iconk from '../images/kids.svg'
import iconcp from '../images/croptop.svg'
import iconh from '../images/hoodie.svg'
import cs1 from '../images/cs1.jpg'
import cs2 from '../images/cs2.jpg'
import cs3 from '../images/cs3.jpg'
import cs4 from '../images/cs4.jpg'
import cs5 from '../images/cs5.jpg'
import cs6 from '../images/cs6.jpg'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: '1000px',
        fontFamily: 'Open Sans',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: 'relative',
        padding: '100px',
        color: 'white',
        background: '#fff'
    },
    root2: {

        minHeight: '100vh',
        backgroundImage: `url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    colorText: {
        color: 'black',
        fontSize: '100px',
        fontWeight: '600',
        fontFamily: 'Open Sans',
    },
    title: {
        color: 'black',
        fontSize: '50px',
        textAlign: 'left',
        fontFamily: 'Open Sans',
        fontWeight: '500',
        marginBottom: '0px'

    },
    container: {
        textAlign: 'left',
        marginTop: '250px',
        marginLeft: '60px',
    },
    goDown: {
        color: '#fff',
        fontSize: '4rem'
    },
    collectionContainer: {
        paddingTop: '24px'
    },
    collectionTitle: {
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'Open Sans',
        padding: '60px',
        margin: '10px'
    },

    card: {
        maxWidth: '92%'
    },
    media: {
        height: '240px',
        width: '100%'

    },
    svgs: {
        color: 'red',
        '&:hover': {
            borderRadius: "10px",
            width: "50%",
        },
    },
    svgContainer: {
        width: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'borderBox'
    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'borderBox',
        marginTop: '63px',
        background: '#fafafa'
    },
    svgBtn: {
        padding: '20px',
        background: 'none',
        border: 'none',
        width: '90%',
        height: '100%',
        '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.2)',

        },
        cscontainer: {
            width: '50%'
        }
    },
    svgFont: {
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: '600'
    },

    productTitle: {
        fontFamily: 'Open Sans',
        fontSize: '16px',
        color: '#00',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontWeight: '600',
        lineHeight: '1.2',
        letterSpacing: '0.9px'
    },

    productSubTitle: {
        display: 'block',
        fontSize: '16px',
        color: '#4a4a4a',
        letterSpacing: '0.9px',
        lineHeight: '1.2'

    },

    subText: {
        display: 'block',
        fontSize: '16px',
        marginBottom: '1.2rem',
        color: 'white',
        letterSpacing: '0.9px',
        lineHeight: '1.2',
        color: 'black'
    },
    subsubText: {
        display: 'block',
        fontSize: '16px',
        marginBottom: '1.2rem',
        color: 'white',
        letterSpacing: '0.9px',
        lineHeight: '1.2',
        fontWeight: '300'
    },


    designbtn: {
        border: '2px solid rgba(0, 0, 0, 0.23)',
        padding: '5px 15px',
        color: 'black',
        borderColor: 'black',
        fontSize: '20px'
    },

    view: {
        padding: '10px',
        margin: '20px',
        float: 'right'
    },
    icon1: {
        color: 'black',
        fontSize: '2rem',
        marginLeft: '80px',
        marginRight: '10px',
        fontWeight: '50',


    },
    offer: {
        textAlign: 'left',
        background: '#31c5ee',
        marginLeft: '10px',
        paddingLeft: '10px',
        marginBottom: '20px',
        width: '70px',
        borderRadius: '30px',
        float: 'left',
        fontSize: '20px'
    }




}));
const Content = () => {

    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <div>
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

                                <a href='/customize' style={{ textDecoration: 'none' }}><Button

                                    variant="outlined"
                                    color="black"
                                    border-color="white" className={classes.designbtn}>START DESIGNING</Button></a>
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
                        <Grid item xs={12} sm={6} md={3} className={classes.svgs}>
                            <a href="/contactus"><button className={classes.svgBtn}><img height={50} src={icont} />
                                <Typography textDecoration='none' className={classes.svgFont}>T-Shirts</Typography></button></a>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className={classes.svgs}>
                            <a href="/contactus"><button className={classes.svgBtn}><img height={50} src={iconcp} />
                                <Typography textDecoration='none' className={classes.svgFont}>Crop Tops</Typography></button></a>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className={classes.svgs}>
                            <a href="/contactus"><button className={classes.svgBtn}><img height={50} src={iconk} />
                                <Typography textDecoration='none' className={classes.svgFont}>Kids</Typography></button></a>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className={classes.svgs}>
                            <a href="/contactus"><button className={classes.svgBtn}><img height={50} src={iconh} />
                                <Typography textDecoration='none' className={classes.svgFont}>Hoddies</Typography></button></a>
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
                                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left', marginLeft: '10px', paddingLeft: '10px', background: '#31c5ee' }} className={classes.offer}>
                                        10%
                                    </Typography>
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
                                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left', marginLeft: '10px', paddingLeft: '10px', background: '#31c5ee' }} className={classes.offer}>
                                        20%
                                    </Typography>
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
                                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left', marginLeft: '10px', paddingLeft: '10px', background: '#31c5ee' }} className={classes.offer}>
                                        10%
                                    </Typography>
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
                                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left', marginLeft: '10px', paddingLeft: '10px', background: '#31c5ee' }} className={classes.offer}>
                                        20%
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography className={classes.view}>
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
        </div>
    );
};

export default Content;