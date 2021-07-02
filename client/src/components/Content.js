import React,{ useEffect, useState} from 'react';
import {Typography,IconButton,Collapse,Box,Button,Container,Grid,Card,CardActionArea,CardActions,CardContent,CardMedia,createMuiTheme} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import Image from '../images/cover6.jpg';
import Collection1 from '../images/collection1.jpg';
import Collection2 from '../images/collection2.jpg';
import Collection3 from '../images/collection3.jpg';
import Snap1 from '../images/snap1.jpg'
import Snap2 from '../images/snap2.jpg'
import Snap3 from '../images/snap3.jpg'
import Snap4 from '../images/snap4.jpg'
import Snap5 from '../images/snap5.jpg'


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
        color: 'white'
      
    },
    backimage: {
        marginTop: '60px'

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
        fontWeight:'300',
        paddingBottom:'24px',
        textAlign:'center',
        fontFamily:'Segoe UI',
        padding: '50px',
    },
    card:{
        maxWidth:'95%'
        
    },
    media:{
        height:'240px',
       
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
                    YOU DECIDE<br/>
                    <span className={classes.colorText}>WE DESIGN</span>   
                </h1>
                <IconButton>
                    <ExpandMoreIcon className={classes.goDown}/>
                </IconButton>
            </div>
            </Collapse> 
            </Box>
            <Container className={classes.collectionContainer} maxWidth="lg">
                <Typography variant="h4" className={classes.collectionTitle}>TOP SELLER</Typography>
         
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={4}>
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
                                <CardActions>
                               
                                </CardActions>
                         </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
                                <CardActions>
                                        
                                </CardActions>
                            </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
            <Grid container spacing={0}>
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
            </Grid>
            </Container>
        </div>
    );
};

export default Content;