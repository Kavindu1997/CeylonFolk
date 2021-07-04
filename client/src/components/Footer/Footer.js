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
                                    <img src={require('../../images/logo.png').default} alt="CeylonFolk" height="100px"/>
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