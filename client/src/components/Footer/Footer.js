import React from 'react';
import { Container,Box,Grid,Link,Typography,makeStyles,Icon } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles=makeStyles((theme)=>({
     root:{
         backgroundColor:'#2C2D2D',
         color:'white',
         marginTop:theme.spacing(8),
         paddingTop:theme.spacing(10),
         paddingBottom:theme.spacing(10)
     },
      
     
}));

const Footer = () => {
    const classes=useStyles();
    return (
        <footer>
            <Box className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={8}>
                         <Grid item xs={12} sm={3}>
                             <Typography variant="h6" component="div" gutterBottom>Services</Typography>
                                <Box>
                                     <Typography variant="body1" component="div" gutterBottom>Shipping & Returns</Typography>
                                     <Typography variant="body1" component="div" gutterBottom>Privacy Policy</Typography>
                                     <Typography variant="body1" component="div" gutterBottom>Terms & Conditions</Typography>
                                </Box>
                         </Grid>

                         <Grid item xs={12} sm={3}>
                            <Typography variant="h6" component="div" gutterBottom>Information</Typography>
                                <Box>
                                    <Typography variant="body1" component="div" gutterBottom>About Us</Typography>
                                    <Typography variant="body1" component="div" gutterBottom>Contact</Typography>
                                </Box>          
                         </Grid>

                         <Grid item xs={12} sm={3}>
                             <Typography variant="h6" component="div" gutterBottom>Get in Touch</Typography>
                                <Box>
                                    <Typography variant="body1" component="div" gutterBottom>+777123456</Typography>
                                    <Typography variant="body1" component="div" gutterBottom>ceylonfolk@gmail.com</Typography>
                                    <Icon>
                                        <FacebookIcon/>
                                        <InstagramIcon/>
                                    </Icon>
                                </Box>
                         </Grid>

                         <Grid item xs={12} sm={3}>
                                <Box>
                                    <img src="https://scontent.fcmb3-1.fna.fbcdn.net/v/t1.6435-9/72547378_676523962843055_3953570765231620096_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=973b4a&_nc_ohc=c6AYs5sz7QIAX84XMVA&_nc_ht=scontent.fcmb3-1.fna&oh=5a5a4ceaaf6d3c7d548debfa596ccf6d&oe=60D85E94" alt="CeylonFolk"/>
                                </Box>
                               
                         </Grid>
                    </Grid>
                    <Box textAlign="center"  pt={{xs:5,sm:5}}  pb={{xs:5,sm:0}}>
                        CeylonFolk &reg; {new Date().getFullYear()}
                    </Box>
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;