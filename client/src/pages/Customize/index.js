import React, { useState, useEffect } from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import { CssBaseline, Box, Typography, Container, Grid, Button, Tabs, Tab } from '@material-ui/core';
import text from '../../images/text.svg'
import image from '../../images/image.svg'
import upload from '../../images/upload.svg'
import tshirt from '../../images/tshirt.svg'
import color from '../../images/drop.svg'
import mockup from '../../images/mockup.png'
import front from '../../images/front.png'
import back from '../../images/back.png'
import { Image } from "react-konva";
import { fabric } from 'fabric';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import Konva from "konva";

const Customize = () => {

    const classes = useStyles();
    const [toggleState, setToggleState] = useState(0);
    const [canvas, setCanvas] = useState('');
    const [images, setImage] = useState('');

    // const stageRef = React.useRef();
    const stageRef = React.useRef(null);

    useEffect(() => {
        setCanvas(initCanvas());
        setImage(getImage());
    }, []);

    const getImage = () => {
        const MyImage = new window.Image()
        MyImage.src = mockup;
        MyImage.onload = () => {
            setImage(MyImage)
        };
    }

    const handleExportClick = () => {
        const uri = stageRef.current.toDataURL();
        console.log(uri);
        downloadURI(uri, "tshirt.jpg");
    }

    const downloadURI = (uri, name) => {
        const link = window.document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // var componentDidUpdate = () => {
    //     //image needs to be cached to display changes
    //     shirt.cache();
    //     shirt.blue(props.color.b);
    //     shirt.red(props.color.r);
    //     shirt.green(props.color.g);
    //   }

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 500,
            width: 500,
            //   backgroundColor:'pink'
        })
    )

    //   fabric.Image.fromURL('http://localhost:3000/static/media/tmockup.63c115d9.png',(img) => {
    //         canvas.backgroundImage = img
    //         canvas.renderAll();
    //     })

    // const setBackground = (url,canvas) => {
    //     fabric.Image.fromURL(url,(img) => {
    //         canvas.backgroundImage = img
    //         canvas.renderAll()  
    //     })
    //   }

    // setBackground('http://localhost:3000/static/media/tmockup.63c115d9.png',canvas);

    const addRect = canvi => {
        const rect = new fabric.Rect({
            height: 280,
            width: 200,
            fill: 'yellow'
        });
        canvi.add(rect);
        canvi.renderAll();
    }

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (

        <div>
            <CommonNav />
            <CssBaseline />
            <div className={classes.photoContainer} styles={{ marginTop: '200px' }}>
                <Grid md={4} className={classes.barContainer}>
                    <Grid item md={3} className={classes.bar}>
                        <Box >
                            <Grid item md={2.4} style={{ width: '100%' }}>
                                <a href="#"><button
                                    className={toggleState === 1 ? classes.activeTabs : classes.tabs}
                                    onClick={() => toggleTab(1)}><img height={50} src={text} />
                                    <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography></button></a>
                            </Grid>
                        </Box>
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
                        {/* <canvs style={{backgroundColor:'red',width:'800',height:'800'}}></canvs> */}

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
                    </Grid>
                    <Grid item className={classes.bar2}>
                        <Box className={toggleState === 0 ? classes.activeContent : classes.content}>
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{ width: '100%' }}>
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={text} />
                                        <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography></button></a>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={image} />
                                        <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography></button></a>
                                </Grid>
                            </Grid>
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{ width: '100%' }}>
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={upload} />
                                        <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography></button></a>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={tshirt} />
                                        <Typography textDecoration='none' className={classes.barFont}>SELECT TYPE</Typography></button></a>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className={toggleState === 1 ? classes.activeContent : classes.content}>
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{ width: '100%' }}>
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={text} />
                                        <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography></button></a>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4} >
                                    <a href="#"><button className={classes.barBtn2}><img height={50} src={image} />
                                        <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography></button></a>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className={toggleState === 3 ? classes.activeContent : classes.content}>
                            <Grid Container className={classes.bar3} >
                                <Grid item md={2.4} style={{ width: '100%' }}>
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
                                <Grid item md={2.4} style={{ width: '100%' }}>
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
                                <Grid item md={2.4} style={{ width: '100%' }}>
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
                <Grid md={5} className={classes.tshirtDiv}>
                    <button onClick={() => addRect(canvas)}>Rectangle</button>
                    <img src={mockup} style={{ width: '100%', verticalAlign: 'middle' }} />
                    <center>
                        <div className={classes.drawImage}>
                            <canvas id="canvas" />
                        </div>
                    </center>
                </Grid>
                <Grid style={{ marginLeft: '100px' }}>
                    <Grid item md={3} className={classes.bar4}>
                        <Grid item md={2.4} style={{ width: '100%' }}>
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

            <div>
                <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
                    <Layer>
                        <Image
                            image={images}
                            x={0}
                            y={0}
                            width={500}
                            height={500}
                        // ref={node => {
                        //   shirt = node;
                        // }}
                        />
                        <Rect width={50} height={50} fill="red" />
                        <Circle x={200} y={200} stroke="black" radius={50} />
                    </Layer>
                </Stage>
                <Button onClick={() => handleExportClick()}>Download</Button>
            </div>
            <Footer />
        </div>

    );
}

export default Customize;