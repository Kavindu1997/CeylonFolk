import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: '1000px',
        fontFamily: 'Segoe UI',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: 'relative',
        padding: '100px',
        color: 'white'
    },

    backimage: {
        marginTop: '60px'
    },

    colorText: {
        color: '#31C5EE',
        fontSize: '4rem',
    },

    title: {
        color: 'white',
        fontSize: '3rem',
        textAlign: 'left',
        fontFamily: 'Segoe UI',
    },

    container: {
        textAlign: 'left'
    },

    goDown: {
        color: '#fff',
        fontSize: '4rem'
    },

    collectionContainer: {
        paddingTop: '24px'
    },

    collectionTitle: {
        marginTop: '40px',
        fontWeight: '300',
        paddingBottom: '24px',
        textAlign: 'center',
        fontFamily: 'Segoe UI',
        padding: '50px',
    },

    card: {
        maxWidth: '95%'
    },

    media: {
        height: '240px',
    },

    DropDown: {
        margin: theme.spacing(5),
    },

    filter: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
        color: 'black',
        boxShadow: 'none',
    },

    rt: {
        borderBottom: '1px solid white',
    },

    icon: {
        fill: 'white',
        padding: '8px',
        borderRadius: '50px',
        background: 'light blue',
        width: '100px',
        height: '78',
        color: 'black',
        boxShadow: 'none',

    },

    icon1: {
        color: 'black',
        fontSize: '2rem',
        marginLeft: '80px',
        marginRight: '10px',
        fontWeight: '50',
    },

    font2: {
        textAlign: 'left'
    }
}));

export const Product_grid = () => {

    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    const [listOfDesigns, setListOfDesigns] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/shop").then((response) => {
            setListOfDesigns(response.data);
        });
    },[]);

    let history = useHistory()

    return (
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
                return(

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
                                            <Typography gutterBottom variant="h6" component="h2" style={{ textAlign: 'left' }}>{"LKR "+value.price}</Typography>
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
    );

};