import React,{ useEffect, useState} from 'react';
import {Typography,IconButton,Collapse,Box,Button,Container,Grid,Card,CardActionArea,CardActions,CardContent,CardMedia, Link} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import Image from '../../images/cover6.jpg';
// import Collection1 from '../../images/collection1.jpg';
// import Collection2 from '../../images/collection2.jpg';
// import Collection3 from '../../images/collection3.jpg';
import Collection1 from '../../images/ts1.jpg';
import Collection2 from '../../images/ts2.jpg';
import Collection3 from '../../images/ts3.jpg';
import Collection4 from '../../images/ts4.jpg';
import Snap1 from '../../images/snap1.jpg'
import Snap2 from '../../images/snap2.jpg'
import Snap3 from '../../images/snap3.jpg'
import Snap4 from '../../images/snap4.jpg'
import Snap5 from '../../images/snap5.jpg'
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
        color:'#31C5EE',
        fontSize:'4rem',
    },
    title:{
     color:'white',
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
export const Product_grid = () => {

    const classes=useStyles();
    const [checked,setChecked]=useState(false);
    useEffect(()=>{
         setChecked(true);
    },[]);

    return (
        <div className={classes.backimage}>
        
        <Container className={classes.collectionContainer} maxWidth="lg">
                {/* <Typography variant="h4" className={classes.collectionTitle}>WORK WEAR</Typography>         */}
                <Grid container spacing={0} >
                    <Grid item xs={12} sm={6} md={3}>

                    <Link href="/productDetails">
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        Snowy
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,500.00
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                            <CardActions></CardActions>
                        </Card>
                        </Link>
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        Marvel
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,6500.00
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        Butter
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,2000.00
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        BTS
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,500.00
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
                {/* <Typography variant="h4" className={classes.collectionTitle}>WORK WEAR</Typography>         */}
                <Grid container spacing={0} >
                    <Grid item xs={12} sm={6} md={3}>

                    <Link href="/productDetails">
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        Snowy
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,500.00
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                            <CardActions></CardActions>
                        </Card>
                        </Link>
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        Marvel
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,6500.00
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        Butter
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,2000.00
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        BTS
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,500.00
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
                {/* <Typography variant="h4" className={classes.collectionTitle}>WORK WEAR</Typography>         */}
                <Grid container spacing={0} >
                    <Grid item xs={12} sm={6} md={3}>

                    <Link href="/productDetails">
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        Snowy
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,500.00
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                            <CardActions></CardActions>
                        </Card>
                        </Link>
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        Marvel
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,6500.00
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        Butter
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,2000.00
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
                                    <Typography gutterBottom variant="h9" component="h2" style={{textAlign:'center'}}>
                                        BTS
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h2" style={{textAlign:'center'}}>
                                        LKR 1,500.00
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                            <CardActions>                   
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>








            </Container>
            



            


        </div>
    );
};

