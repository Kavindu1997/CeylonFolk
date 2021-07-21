import {React, useState} from 'react';
import CommonNav from '../components/Navbars/CommonNav';
import Footer from '../components/Footer/Footer';
import useStyles from '../styles/customize_stlyes';
import {CssBaseline,Box,Typography,Container,Grid, Button, Tabs, Tab} from '@material-ui/core';
import text from '../images/text.svg'
import image from '../images/image.svg'
import upload from '../images/upload.svg'
import tshirt from '../images/tshirt.svg'
import color from '../images/drop.svg'
import mockup from '../images/mockup.png'
import front from '../images/front.png'
import back from '../images/back.png'

const Customize = () => {

    const classes = useStyles();
    const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

    return(
        
        <div>
            <CommonNav />
            <CssBaseline />
            <div className={classes.photoContainer} styles={{marginTop:'200px'}}>
                <Grid md={4} className={classes.barContainer}>
                    <Grid item md={3} className={classes.bar}>
                        {/* <Tabs>
                            <Tab> */}
                            <Box >
                                <Grid item md={2.4} style={{width:'100%'}}>
                                    <a href="#"><button
                                    className={toggleState === 1 ? classes.activeTabs : classes.tabs}
                                    onClick={() => toggleTab(1)}><img height={50} src={text} />
                                    <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography></button></a>
                                </Grid>
                            </Box>
                                
                            {/* </Tab>
                            <Tab> */}
                            <Box >
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#">
                                    <button 
                                    className={toggleState === 2 ? classes.activeTabs : classes.tabs}
                                    onClick={() => toggleTab(2)}
                                    >
                                    <img height={50} src={image} />
                                    <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography></button></a>
                                </Grid>
                            </Box>
                                
                            {/* </Tab>
                            <Tab> */}
                            <Box >
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#">
                                        <button 
                                        className={toggleState === 3 ? classes.activeTabs : classes.tabs}
                                        onClick={() => toggleTab(3)}
                                        >
                                        <img height={50} src={upload} />
                                    <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography></button></a>
                                </Grid>
                            </Box>
                                
                            {/* </Tab>
                            <Tab> */}
                            <Box >
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#">
                                    <button
                                    className={toggleState === 4 ? classes.activeTabs : classes.tabs}
                                    onClick={() => toggleTab(4)}
                                    >
                                    <img height={50} src={tshirt} />
                                    <Typography textDecoration='none' className={classes.barFont}>TYPE</Typography></button></a>
                                </Grid>
                            </Box>
                                
                            {/* </Tab>
                            <Tab> */}
                            <Box className={classes.tabs}>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#">
                                    <button 
                                    className={toggleState === 5 ? classes.activeTabs : classes.tabs}
                                    onClick={() => toggleTab(5)}
                                    >
                                    <img height={50} src={color} />
                                    <Typography textDecoration='none' className={classes.barFont}>COLOR</Typography></button></a>
                                </Grid>
                            </Box>
                                
                            {/* </Tab>
                        </Tabs> */}
                    </Grid>
                    <Grid item className={classes.bar2}>
                        <Box
                        className={toggleState === 0 ? classes.activeContent : classes.content}>
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{width:'100%'}}>
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={text} />
                                    <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography></button></a>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={image} />
                                    <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography></button></a>
                                </Grid>
                            </Grid>
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{width:'100%'}}>
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={upload} />
                                    <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography></button></a>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={tshirt} />
                                    <Typography textDecoration='none' className={classes.barFont}>SELECT TYPE</Typography></button></a>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box 
                        className={toggleState === 1 ? classes.activeContent : classes.content}
                        >
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{width:'100%'}}>
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={text} />
                                    <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography></button></a>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={image} />
                                    <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography></button></a>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box 
                        className={toggleState === 3 ? classes.activeContent : classes.content}
                        >
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{width:'100%'}}>
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={upload} />
                                    <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography></button></a>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={tshirt} />
                                    <Typography textDecoration='none' className={classes.barFont}>SELECT TYPE</Typography></button></a>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className={classes.content}>
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{width:'100%'}}>
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={text} />
                                    <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography></button></a>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={image} />
                                    <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography></button></a>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className={classes.content}>
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{width:'100%'}}>
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={upload} />
                                    <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography></button></a>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={tshirt} />
                                    <Typography textDecoration='none' className={classes.barFont}>SELECT TYPE</Typography></button></a>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid md={5} style={{marginLeft:'100px'}}>
                    <img src={mockup} style={{width:'100%'}}/>
                </Grid>
                <Grid style={{marginLeft:'100px'}}>
                <Grid item md={3} className={classes.bar4}>
                        <Grid item md={2.4} style={{width:'100%'}}>
                            <a href="#"><button className={classes.barBtn3}><img height={50} src={front} />
                            <Typography textDecoration='none' className={classes.barFont}>FRONT</Typography></button></a>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} >
                            <a href="#"><button className={classes.barBtn3}><img height={50} src={back} />
                            <Typography textDecoration='none' className={classes.barFont}>BACK</Typography></button></a>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} >
                            <a href="#"><Button className={classes.slevebtn}>SLEAVE DESIGNING</Button></a>
                        </Grid>
                        <Box>
                    <Button className={classes.slevebtn}>GET PRICE</Button>
                </Box>
                </Grid>
                </Grid>
                

            </div>
            </div>

    );
}

export default Customize;