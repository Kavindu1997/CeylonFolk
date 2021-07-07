import React,{ useEffect, useState} from 'react';
import {Typography,IconButton,Collapse,Box,Button,Container,Grid,Card,CardActionArea,CardActions,CardContent,CardMedia} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import Image from '../images/cover6.jpg';
import Collection1 from '../images/ts1.jpg';
import Collection2 from '../images/ts2.jpg';
import Collection3 from '../images/ts3.jpg';
import Collection4 from '../images/ts4.jpg';
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
import Carousel from 'react-elastic-carousel';



const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex',
        justifyContent:'left',
        alignItems:'center',
        height:'1000px',
        fontFamily:'Segoe UI' ,
        backgroundImage:`linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position:'relative',
        padding: '100px',
        color: 'white',
        background: '#fff'
    },
    backimage: {
        marginTop: '60px',
        background: '#fff'
    },
    colorText:{
        color:'black',
        fontSize:'4rem',
    },
    title:{
     color:'black',
     fontSize:'3rem',
     textAlign: 'left',
     fontFamily:'Segoe UI',
    },
    container:{
        textAlign:'left'
    },
    goDown:{
        color:'#fff',
        fontSize:'4rem'
    },
    collectionContainer:{
        paddingTop:'24px'
    },
    collectionTitle:{
        fontWeight:'600',
        textAlign:'center',
        textTransform: 'uppercase',
        fontFamily:'Montserrat',
        padding: '60px',
        margin:'10px'
    },
    card:{
        maxWidth:'80%'
        
    },
    media:{
        height:'240px',
        
    },
    svgs:{
        color:'red',
        '&:hover': {
            borderRadius: "10px",
            width: "50%",
         },
    },
    svgContainer:{
        width: '50%',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'borderBox'
    },
    svgBtn:{
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
    svgFont:{
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: '600'
    }
    

}));
const Content = () => {

    const classes=useStyles();
    const [checked,setChecked]=useState(false);
    useEffect(()=>{
         setChecked(true);
    },[]);

    return (
        <div className={classes.backimage}>
            <Box className={classes.root} >
                <Collapse in={checked}  {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
                    <div className={classes.container}>
                        <h1 className={classes.title}>
                            YOU DESIGN<br/>
                            <span className={classes.colorText}>WE PRINT</span>   
                        </h1>
                        <Button fullWidth
                            variant="contained"
                            color="primary">START DESIGNING</Button>
                        {/* <IconButton>
                            <ExpandMoreIcon className={classes.goDown}/>
                        </IconButton> */}
                    </div>
                </Collapse> 
            </Box>

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
                                <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${Collection1})`}}
                                    // image="CeylonFolk/client/src/images/ts1.jpg"
                                    // image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Snowy"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                        Snowy
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions></CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${Collection2})`}}
                                    title="Marvel"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                        Marvel
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions></CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${Collection3})`}}
                                    title="BTS"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                            BTS
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>                   
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${Collection4})`}}
                                    title="BTS"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                            BTS
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>                   
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Container className={classes.collectionContainer} maxWidth="lg">
                <Typography variant="h4" className={classes.collectionTitle}>SPECIAL OFFERS</Typography>
         
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${Collection1})`}}
                                    title="Snowy"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                        Snowy
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions></CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${Collection2})`}}
                                    title="Marvel"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                        Marvel
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions></CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${Collection3})`}}
                                    title="BTS"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                            BTS
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>                   
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${Collection3})`}}
                                    title="BTS"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                            BTS
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>                   
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
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
                                <img height={250}src={cs1} style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                                <img height={250} src={cs2} style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                                <img height={250}src={cs3} style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                                <img height={250}src={cs4} style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                                <img height={250}src={cs5} style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} className={classes.svgs}>
                                <img height={250}src={cs6} style={{width: '100%'}}/>
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