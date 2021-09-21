import React from 'react';
import { Container, Box, Grid, Link, Typography, Icon } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import useStyles from './style';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const classes = useStyles();
    return (
        <footer>
            <Box className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h5" component="div" gutterBottom>Services</Typography>
                            <Box>
                                <NavLink to={"/aboutUs"} className={classes.appbarlink}>
                                    <Typography variant="body1" component="div" gutterBottom>About us</Typography>
                                </NavLink>
                                <NavLink to={"/contactus"} className={classes.appbarlink}>
                                    <Typography variant="body1" component="div" gutterBottom>Contact us</Typography>
                                </NavLink>
                                <NavLink to={"/Termnconditions"} className={classes.appbarlink}>
                                    <Typography variant="body1" component="div" gutterBottom>Terms & Conditions</Typography>
                                </NavLink>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h5" component="div" gutterBottom>Get in Touch</Typography>
                            <Box>
                                <Typography variant="body1" component="div" gutterBottom>+94 719 514 902</Typography>
                                <Typography variant="body1" component="div" gutterBottom>ceylonfolk@gmail.com</Typography>
                                <Icon>
                                    <Link style={{
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'none'
                                        }
                                    }} href="https://www.facebook.com/ceylonfolk" target="_blank"><FacebookIcon /> </Link>
                                    <Link style={{
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'none'
                                        }
                                    }} href="https://www.instagram.com/ceylonfolk/" target="_blank"><InstagramIcon /> </Link>
                                </Icon>
                            </Box>
                        </Grid>
                        <Grid stylr={{ alignItems: 'right' }} item xs={4} sm={4} lg={4}>
                            <Box style={{ float: 'right' }}>
                                <img src={require('../../images/logo.png').default} alt="CeylonFolk" height="50px" />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={{ xs: 5, sm: 5 }} pb={{ xs: 5, sm: 0 }}>
                        CeylonFolk &reg; {new Date().getFullYear()}
                    </Box>
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;