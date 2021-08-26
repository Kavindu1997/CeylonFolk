import React, { useState, useEffect } from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import { CssBaseline, Box, Typography, Container, Grid, Button, Tabs, Tab, TextField, Switch, FormControl } from '@material-ui/core';
import addText from '../../images/text.svg'
import image from '../../images/image.svg'
import upload from '../../images/upload.svg'
import addTshirt from '../../images/tshirt.svg'
import addColor from '../../images/drop.svg'
import mockup from '../../images/mockup.png'
import front from '../../images/front.png'
import back from '../../images/back.png'
import { fabric } from 'fabric';
import "./MyLayerStyles.css";
import { Stage, Layer, Image, Text, Transformer } from "react-konva";
import { CirclePicker } from "react-color";
import { Divider, Upload, Icon, Modal } from "antd";
import Konva from "konva";
import mockup2 from '../../images/front22.png';
import { Formik, Form, Field } from "formik"
import UploadBar from "./UploadBar";


const Customize = () => {

  const classes = useStyles();
  const [toggleState, setToggleState] = useState(0);
  const [canvas, setCanvas] = useState('');
  const stageRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const [color, setColor] = useState(["#ffffff"]);
  const [textOn, setTextOn] = useState(false);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('');
  const [textScale, setTextScale] = useState([]);
  const [clothing, setClothing] = useState('tshirt');
  const [textLayerColors, setTextLayerColors] = useState(["#ffffff", "#000000", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4",
    "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b", "#C0C0C0", "#C9AE5D"]);
  const [circleSize, setCircleSize] = useState(35);
  const [tshirt, setTshirt] = useState(["#ffffff", "#000000", "#ff0000", "	#008000"]);
  const [sweater, setSweater] = useState(["#ffffff", "#000000", "#ffff00", "#ff69b4"]);
  const [images, setImage] = useState('');
  const [selectedShapeName, setSelectedShapeName] = useState('');
  const shirtRef = React.useRef();
  const transformer = React.useRef();
  const shapeRef = React.useRef();
  const [textEdited, setTextEdited] = useState(false);
  const [textPos, setTextPos] = useState({ x: 300, y: 300 });
  const [imageUrl, setImageUrl] = useState('');
  const [textTArray, setTextTArray] = useState([]);
  const [imageSrc, setImageSrc] = useState('');

  const trRef = React.useRef();
  const stageText = React.useRef();

  useEffect(() => {
    setCanvas(initCanvas());
    setImage(getImage());

  }, []);

  const setLogo = (imgSrc) => {
    setImageSrc(imgSrc)
  };

  const addTextArray = (data, props) => {
    setTextTArray(data)
    console.log('add to desing')
    console.log(data)
    console.log('add to desing')
    console.log(textTArray)
    props.resetForm();
  }

  const getImage = () => {
    const MyImage = new window.Image()
    MyImage.src = mockup2;
    MyImage.onload = () => {
      setImage(MyImage)
    };
  }

  const onDragEnd = () => {
    setTextEdited(true)
    console.log('hello edited')
  };

  const onDragMove = (env) => {
    const txtPos = env.target._lastPos;
    console.log(txtPos)
    setTextPos(txtPos)
  };

  var changeTextColor = (e) => {
    setTextLayerColors(e.target.value)
  };

  //Handle text change as user input
  var handleTextChange = (e) => {
    console.log('hello text')
    console.log(e.target.value)
    setText(e.target.value)
  };

  //Check if adding text is on or off, when user turns it off
  //color goes back to default and so user doesn't see the $3 charge
  const handleTextChecked = (event) => {
    if (textOn) {
      console.log(event.target.name)
      setTextOn({ ...textOn, [event.target.name]: event.target.checked });
    } else {
      setTextOn({ ...textOn, [event.target.name]: event.target.checked });
    }
  };

  //Returns the type of clothing that user chooses
  const changeClothing = (clothing) => {
    if (clothing === "tshirt") {
      console.log('hrlloooo')
      return <Button>ttt</Button>;
    } else if (clothing === "sweater") {
      // return <Sweater color={this.state.color} />;
    }
  };

  //Handles change of clothing type and sets color to default
  var changeCloth = (e) => {
    const { value } = e.target;
    console.log(value)
    console.log(clothing)
    if (value !== clothing) {
      setClothing(value);
      setColor("#ffffff");
    }
    console.log(clothing)
  };

  //When user clicks on logo or text, it will show the transformer
  const handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedShapeName('');
      return;
    }
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    if (name) {
      setSelectedShapeName(name);
    } else {
      setSelectedShapeName("");
    }
  };

  //The text object gets transformed as user scale
  const handleTextTransform = (index, newProps) => {
    const textT = textScale.concat();
    console.log('hello texttrans');
    console.log(textScale[index]);
    textT[index] = {
      ...textT[index],
      ...newProps
    };
    setTextScale({
      textScale: textT
    });
  };

  // const handleChange = (e) => {
  //   const shape = e.target;
  //   text.onTransform({
  //     x: shape.x(),
  //     y: shape.y(),
  //     width: shape.width() * shape.scaleX(),
  //     height: shape.height() * shape.scaleY(),
  //     rotation: shape.rotation()
  //   });
  // };

  const handleExportClick = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    downloadURI(uri, "tshirt.jpg");
  }

  const handleChange = (e) => {
    const shape = e.target;
    // {textScale
    //   x: shape.x(),
    //   y: shape.y(),
    //   width: shape.width() * shape.scaleX(),
    //   height: shape.height() * shape.scaleY(),
    //   rotation: shape.rotation()
    // };
  };

  const downloadURI = (uri, name) => {
    const link = window.document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 500,
      width: 500,
      //   backgroundColor:'pink'
    })
  )

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
                <a href="#">
                  <button className={toggleState === 1 ? classes.activeTabs : classes.tabs} onClick={() => toggleTab(1)}><img height={50} src={addText} />
                    <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography>
                  </button>
                </a>
              </Grid>
            </Box>
            <Box >
              <Grid item xs={12} sm={6} md={2.4} >
                <a href="#">
                  <button className={toggleState === 2 ? classes.activeTabs : classes.tabs} onClick={() => toggleTab(2)}>
                    <img height={50} src={image} />
                    <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography>
                  </button>
                </a>
              </Grid>
            </Box>
            <Box >
              <Grid item xs={12} sm={6} md={2.4} >
                <a href="#">
                  <button className={toggleState === 3 ? classes.activeTabs : classes.tabs} onClick={() => toggleTab(3)}>
                    <img height={50} src={upload} />
                    <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography>
                  </button>
                </a>
              </Grid>
            </Box>
            <Box >
              <Grid item xs={12} sm={6} md={2.4} >
                <a href="#">
                  <button className={toggleState === 4 ? classes.activeTabs : classes.tabs} onClick={() => toggleTab(4)}>
                    <img height={50} src={addTshirt} />
                    <Typography textDecoration='none' className={classes.barFont}>TYPE</Typography>
                  </button>
                </a>
              </Grid>
            </Box>
            <Box className={classes.tabs}>
              <Grid item xs={12} sm={6} md={2.4} >
                <a href="#">
                  <button className={toggleState === 5 ? classes.activeTabs : classes.tabs} onClick={() => toggleTab(5)}>
                    <img height={50} src={addColor} />
                    <Typography textDecoration='none' className={classes.barFont}>COLOR</Typography>
                  </button>
                </a>
              </Grid>
            </Box>
          </Grid>
          <Grid item className={classes.bar2}>
            <Box className={toggleState === 0 ? classes.activeContent : classes.content}>
              <Grid Container className={classes.bar3} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a href="#">
                    <button className={classes.barBtn2}><img height={50} src={addText} />
                      <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a href="#">
                    <button className={classes.barBtn2}><img height={50} src={image} />
                      <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
              <Grid Container className={classes.bar3} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={upload} />
                      <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={addTshirt} />
                      <Typography textDecoration='none' className={classes.barFont}>SELECT TYPE</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
            </Box>
            <Box className={toggleState === 1 ? classes.activeContent : classes.content}>
              <div className="text-container">
                <span>
                  <Formik onSubmit={addTextArray} initialValues=''>
                    {(props) => (
                      <Form>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Add your custom text here"
                          type="text"
                          fullWidth
                          value={text}
                          onChange={handleTextChange}
                        />
                        <Button type="submit">Add To Design</Button>
                      </Form>
                    )}
                  </Formik>
                  <Box>Change Font Color</Box>
                  <CirclePicker
                    border="black" borderColor='black' stroke="black" width="max-width"
                    colors={textLayerColors}
                    onChange={textLColors => {
                      setTextColor(textLColors.hex);
                    }}
                  />
                </span>
              </div>
            </Box>
            <Box className={toggleState === 3 ? classes.activeContent : classes.content}>
              <Grid Container className={classes.bar3} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={upload} />
                      <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={tshirt} />
                      <Typography textDecoration='none' className={classes.barFont}>SELECT TYPE</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
            </Box>
            <Box className={toggleState === 5 ? classes.activeContent : classes.content}>
              <Grid Container className={classes.bar3} >
                <div className="color-picker">
                  {clothing === "tshirt" ? (
                    <CirclePicker id="circle-picker" width="max-content"
                      circleSize={circleSize}
                      colors={tshirt}
                      onChange={color => {
                        setColor(color.hex);;
                        console.log(color.hex)
                      }}
                    />
                  ) : (
                    <CirclePicker id="circle-picker" width="max-content"
                      circleSize={circleSize}
                      colors={sweater}
                      onChange={color => {
                        setColor(color.rgb);;
                      }}
                    />
                  )}
                </div>
              </Grid>
            </Box>
            <Box className={classes.content}>
              <Grid Container className={classes.bar3} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={text} />
                      <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={image} />
                      <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.content}>
              <Grid Container className={classes.bar3} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={upload} />
                      <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={tshirt} />
                      <Typography textDecoration='none' className={classes.barFont}>SELECT TYPE</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid md={5} className={classes.tshirtDiv}>
          <div className="clothes" style={{ backgroundColor: color, width: '460px' }}>
            <Stage width={500} height={500} onMouseDown={handleStageMouseDown}>
              <Layer>
                {clothing === 'tshirt' ?
                  <Image
                    image={images}
                    x={0}
                    y={0}
                    width={500}
                    height={500}
                    ref={imageRef}
                  /> : <></>
                }
              </Layer>
              <Layer>
                <Text text={text} offset={{ x: -150, y: -150 }} width={200} wrap="char" align="center" fontSize={30} fill={textColor}
                  fontFamily="Calibri" opacity={1} draggable={true} name="stageText"
                  ref={stageText}
                  // onDragEnd={handleChange}
                  onTransform={newProps => {
                    handleTextTransform(newProps);
                  }}
                  onDragEnd={handleChange}

                />
                <Transformer
                  ref={trRef}
                  selectedShapeName={selectedShapeName}
                />
              </Layer>
            </Stage>
          </div>
        </Grid>
        <Grid style={{ marginLeft: '100px' }}>
          <Grid item md={3} className={classes.bar4}>
            <Grid item md={2.4} style={{ width: '100%' }}>
              <a href="#">
                <button className={classes.barBtn3}>
                  <img height={50} src={front} />
                  <Typography textDecoration='none' className={classes.barFont}>FRONT</Typography>
                </button>
              </a>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4} >
              <a href="#">
                <button className={classes.barBtn3}>
                  <img height={50} src={back} />
                  <Typography textDecoration='none' className={classes.barFont}>BACK</Typography>
                </button>
              </a>
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
            {/* <Rect width={50} height={50} fill="red" />
                <Circle x={200} y={200} stroke="black" radius={50} /> */}
          </Layer>
        </Stage>
        {/* <UploadBar
        setLogo={setLogo}>

        </UploadBar> */}
        <Button onClick={() => handleExportClick()}>Download</Button>
      </div>
      <Footer />
    </div>

  );
}

export default Customize;