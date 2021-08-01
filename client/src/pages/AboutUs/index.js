import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, CssBaseline } from '@material-ui/core';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import aboutUs from '../../images/cover4.jpg';
import 'font-awesome/css/font-awesome.min.css';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 400,
        backgroundColor: '#fafafa',
        fontFamily: 'Montserrat'
    },
    spreadBox: {
        justifyContent: "space-around",
        alignItems: "center",
    },
    box: {
        height: 100,
        display: "flex",
        padding: 8
    },
    back: {
        marginTop: 30,
        alignItems: "center",
        // marginLeft: 600,
    },
    submit: {
        marginTop: 30,
        alignItems: "center",
        // marginLeft: 600,
    },
    image: {
        marginTop: '30px',
        // minHeight:'100vh',
        height: '500px',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    subsubText: {
        display: 'block',
        fontSize: '16px',
        // marginBottom: '1.2rem',
        color: 'white',
        letterSpacing: '0.9px',
        lineHeight: '1.2',
        fontWeight: '300',
        textAlign: 'flex'
    },

}));

export default function AboutUs() {

    const classes = useStyles();

    return (
        <div>
            <CommonNav />
            <CssBaseline />
            <container>
                <center>
                    <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>ABOUT</Typography>
                    <Grid container>
                        <Grid item xs={12}>
                            <div>
                                <img src={aboutUs} className={classes.image} />
                            </div>
                            <div>
                                <Typography variant="h5" style={{ marginTop: '50px', textAlign: 'center', fontFamily: 'Montserrat' }}>COMPANY PROFILE</Typography>
                                <Typography className={classes.subText} style={{ marginTop: '20px', marginLeft: '90px', marginRight: '95px', fontFamily: 'Montserrat', textAlign: 'cebter' }}>
                                    Ceylonfolk a young and vibrant company founded by Pasan Ranatunga a graduate of UCSC, University of Colombo was live from 11th October 2019. The founder
                                    himself was motivated by the idea that everyone should be able to express themselves wearing what they truly love. armed with the mission Ceylonfolk was
                                    created, making it a platform for the Sri Lankan customers to get t-shirts printed with what they actually adore. The company's line of business includes the retail and
                                    wholesale customized t-shirts whereas the main product line comprises crew neck t-shirts and hoodies. The crew uses three printing techniques as in heat transfer method,
                                    screen printing method, and embroidery service to customerize t-shirts according to the need of the customer. Last but not least Ceylonfolk is a combination of best service, quality
                                    products and reasonable price. Delighted customers are the company's utmost wealth.
                                </Typography>
                            </div>
                            {/* <div>
            <Typography variant="h5" style={{marginTop:'50px',textAlign: 'center',fontFamily:'Montserrat'}}>OUR MISSION</Typography>
            <Typography className={classes.subText} style={{marginTop:'20px',marginLeft:'90px',marginRight:'95px',fontFamily:'Montserrat',textAlign:'justify'}}>Get featured in your "favourite obsession" Wear Ceylonfolk 
            #ceylonfolk #customtshirts #fashion #tshirts #customizedtshirts  #customtees #customtshirts #tshirts 
            #smallbusiness #apparel  #shoplocal #supportsmallbusiness #madeinsrilanka #customizedtshirt</Typography>
            </div> */}
                        </Grid>
                    </Grid>

                </center>
            </container>
            <Footer />
        </div>
    );
}