import React, { useState, useEffect, Component, useRef } from "react";
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import "./MyLayerStyles.css";
import { Stage, Layer, Image, Text, Transformer } from "react-konva";
import { Button, TextField, Switch, FormControl, CssBaseline, Grid, Box } from "@material-ui/core";
import { CirclePicker } from "react-color";
import { Divider, Upload, Icon, Modal } from "antd";
import Konva from "konva";
import mockup2 from '../../images/new/front22.png';
import TShirt from "../Customize/Clothes/Tshirt";
import TextLayer from "../Customize/Layer/TextLayer";
import TransformerComponent from "../Customize/Transformer/Transformer";
import Clothes from "../Customize/Options/Clothes";
import TextAddOn from "../Customize/Options/Text";
import Controls from "../../components/Reusable/Controls";
import { IndeterminateCheckBox } from "@material-ui/icons";

const MyLayer = () => {

  const [color, setColor] = useState({ r: 255, g: 255, b: 255 });
  const [textOn, setTextOn] = useState(false);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('');
  const [textScale, setTextScale] = useState([]);
  const [clothing, setClothing] = useState('tshirt');
  const [textLayerColors, setTextLayerColors] = useState(["#ffffff", "#000000", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4",
    "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b", "#C0C0C0", "#C9AE5D"]);
  // const [itemColor, setItemColor] = useState(itemColor);
  const [circleSize, setCircleSize] = useState(35);
  const [tshirt, setTshirt] = useState(["#ffffff", "#000000", "#ff0000", "	#008000"]);
  const [sweater, setSweater] = useState(["#ffffff", "#000000", "#ffff00", "#ff69b4"]);

  const [selectedShapeName, setSelectedShapeName] = useState('');
  // const shirtRef = React.useRef();
  const transformer = React.useRef();
  const shapeRef = React.useRef();
  const [textEdited, setTextEdited] = useState(false);
  const [textPos, setTextPos] = useState({ x: 300, y: 300 });
  const [imageUrl, setImageUrl] = useState('');
  const [size, setSize] = useState('');
  const [pickerColorArray, setPickerColorArray] = useState([]);
  const [newText, setNewText] = useState('');
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false)
  const [selectedId, selectShape] = useState(null);
  const textRef = React.useRef();
  const cache = {};
  
  

  const onDragEnd = () => {
    setTextEdited(true)
    console.log('hello edited')
  };

  const onDragMove = (env) => {
    const txtPos = env.target._lastPos;
    console.log(txtPos)
    setTextPos(txtPos)
  };

  //Returns the type of clothing that user chooses
  const changeClothing = (clothes) => {
    if (clothes === "tshirt") {
      return <TShirt color={color} />;
    } 
    // else if (clothes === "sweater") {
    //   return <Button/>;
    // }
  };

  

  //Returns the text layer if true
  // const textLayer = () => {
    
  //     return (
  //       <TextLayer
  //         text={text}
  //         textColor={textColor}
  //         onTransform={newProps => {
  //           handleTextTransform(newProps);
  //         }}
  //       />
  //     );
    
  // };

  const changeText = (e) => {
    setNewText(e.target.value);
    console.log(e.target.value);
};


const addText = () =>
{
  const newIndex = index + 1;
  setIndex(newIndex)
  console.log('hi frim thashhh')
  setPickerColorArray([...pickerColorArray, newText])
  console.log(pickerColorArray)
}

const handleUpload = ({target}) =>{
  const reader = new FileReader();
  const file = target.files[0];
  // reader.onloadend = () => {
  //   this.props.dispatch({
  //     type: 'UPLOAD_IMAGE',
  //     image: reader.result, 
  //   });
  // };
  reader.readAsDataURL(file);
  console.log(file)
}

  const trRef = React.useRef();
  useEffect(() => {
    if (isSelected) {
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const changeTextColor = (e) => {
    setTextLayerColors(e.target.value)
  };

  //Handle text change as user input
  var handleTextChange = (e) => {
    console.log('hello text')
    console.log(e.target.value)
    setText(e.target.value)
  };

  const onsize = (e) => {
    setSize(e.target.value)
}

const sendItem2 = () => {
  console.log('hello ttt')

  // setPickerColorArray([...pickerColorArray, size]);
  // console.log(pickerColorArray)
};

  //Check if adding text is on or off, when user turns it off
  //color goes back to default and so user doesn't see the $3 charge
  // const handleTextChecked = (event) => {

  //   console.log(event.target.value)
  //   if (textOn) {
  //     console.log(event.target.value)
  //     setTextOn(event.target.value);
  //   } else {
  //     setTextOn(event.target.checked);
  //   }
  // };

  //Returns the type of clothing that user chooses
  // const changeClothing = (clothing) => {
  //   if (clothing === "tshirt") {
  //     console.log('hrlloooo')
  //     return <Button>ttt</Button>;
  //   } else if (clothing === "sweater") {
  //     // return <Sweater color={this.state.color} />;
  //   }
  // };

  //Handles change of clothing type and sets color to default
  var changeCloth = (e) => {
    const { value } = e.target;
    console.log(value)
    console.log(clothing)
    if (value !== clothing) {
      setClothing(value);
      setColor({ r: 255, g: 255, b: 255 });
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
    const text = textScale.concat();
    console.log('hello text thash');
    console.log(textScale[index]);
    text[index] = {
      ...text[index],
      ...newProps
    };
    setTextScale({
      textScale: text
    });
  };

  const select = (index) => {
    setIndex(index)
  }

  const handleChange = (e) => {
    const shape = e.target;
    console.log(shape)
    // console.log(onTransform)
    // onTransform({
    //   x: shape.x(),
    //   y: shape.y(),
    //   width: shape.width() * shape.scaleX(),
    //   height: shape.height() * shape.scaleY(),
    //   rotation: shape.rotation()
    // });
  };

  

  return (
    <div>
      <CommonNav />
      <CssBaseline />


      <div className="container" style={{ margin: '50px' }}>

        <div className="clothes" style={{ backgroundColor: color }}>
          <Stage
            width={500}
            height={500}
            onMouseDown={handleStageMouseDown}
          >
            <Layer>{changeClothing(clothing)}</Layer>
            <Layer>
            {pickerColorArray.map((value,index) => {
              console.log(pickerColorArray[index-1])
              console.log('index')
              console.log(index)
                                return (
                                  
      //       <Text
      //           name="text"
      //           offset={{
      //             x: -150,
      //             y: -150
      //           }}
      //           width={200}
                
      //           wrap="char"
      //           key = {index}
      //           isSelected={select(index)}
      //           align="center"
      //           fill={textColor}
      //           fontSize={20}
      //           fontFamily="Calibri"
      //           opacity={1}
      //           draggable={true}
      //           text={value}
      //           ref={textRef}
      //           onDragEnd={handleChange}
      //           onTransformEnd={handleChange}
      //           onTransform={newProps => {
      //                 handleTextTransform(newProps);
      //               }}
      // />

      <TextLayer
                // text={text}
                value={value}
                textColor={textColor}
                // onTransform={newProps => {
                //   handleTextTransform(newProps);
                // }}
                key={index}
                isSelected={index === selectedId}

                shapeProps={value}
                onSelect={() => {
                  selectShape(index);
                }}
                onChange={(newAttrs) => {
                  const rects = pickerColorArray.slice();
                  rects[index] = newAttrs;
                  // setPickerColorArray(rects);
                  console.log('hi bye')
                  console.log(rects)
                  console.log('hi bye')
                }}
                selectedShapeName={selectedShapeName}
                onDelete={() => {
                  const newString = [...pickerColorArray];
                  newString.splice(index, 1);
                  setPickerColorArray(newString);
                }}
              />
              
      
              // {/* {textLayer()} */}
              // {/* <TextLayer
              //   text={text}
              //   textColor={textColor}
              //   onTransform={newProps => {
              //     handleTextTransform(newProps);
              //   }}
              // /> */}
              // <TransformerComponent
              //   selectedShapeName={selectedShapeName}
              // />
              );
            })}

            {/* <TransformerComponent
                selectedShapeName={selectedShapeName}
              /> */}

            </Layer>
          </Stage>
        </div>

        <div className="options">
          <div className="clothes-type">
            <Button onClick={(e) => changeCloth({ target: { value: 'tshirt' } })} value="tshirt">T-Shirt</Button>
            <Button onClick={(e) => changeCloth({ target: { value: 'sweater' } })} value="sweater">Sweater</Button>
          </div>
          {/* <Clothes changeClothing={changeClothing} /> */}
          <div className="color-picker">
            {clothing === "tshirt" ? (
              <CirclePicker
                id="circle-picker"
                width="max-content"
                circleSize={circleSize}
                colors={tshirt}
                onChange={color => {
                  setColor(color.rgb);
                  console.log(color.rgb)
                }}
              />
            ) : (
              <CirclePicker
                id="circle-picker"
                width="max-content"
                circleSize={circleSize}
                colors={sweater}
                onChange={color => {
                  setColor(color.rgb);;
                }}
              />
            )}
          </div>
          <TextAddOn
            textOn={textOn}
            // handleTextChecked={handleTextChecked}
            handleTextChange={handleTextChange}
            changeTextColor={changeTextColor}
            sendItem2={sendItem2}
            textLayerColors={textLayerColors}
            changeText={changeText}
            addText={addText}
          />
          {/* <CirclePicker
              colors={textLayerColors}
              onChange={color => {
                changeTextColor(color.hex);
              }}
              console
              // onChange={props.changeTextColor}
              width="max-width"
            /> */}
            <CirclePicker
              colors={textLayerColors}
              onChange={textLColors => {
                setTextColor(textLColors.hex);
              }}
              width="max-width"
            />
          
          {/* <div className="text-container">
            Custom Text:
            <Switch
              checked={textOn}
              onChange={handleTextChecked}
              name="textOn"
            // value="textChecked"
            />
            {textOn ? (
              <span>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Add your custom text here"
                  type="text"
                  fullWidth
                  value={text}
                  onChange={handleTextChange}
                />
                <CirclePicker
                  colors={textLayerColors}
                  onChange={textLColors => {
                    setTextColor(textLColors.hex);
                  }}
                  width="max-width"
                />
              </span>
            ) : null}
          </div> */}

<Grid item xs={6}>
                        <Controls.Input
                            variant="outlined"
                            label="Price"
                            name="colorPrice"
                            onChange={changeText}
                        />
                    </Grid>

                    <Box>
                        <Button style={{ margin: '10px', padding: '10px', background: 'black', color: 'white' }}

                            onClick={addText}>ADD COLOR</Button>
                    </Box>



          {/* <FormControl className="w-75 mb-4 ml-3">
              <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader align"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleUpload}
                  >
                    {imageUrl ? (
                      <img className="img-fluid" src={imageUrl} alt="avatar" />
                    ) : (
                      <div>
                        <Icon type={this.state.loading ? "loading" : "plus"} />
                        <div className="ant-upload-text">Upload IMG</div>
                      </div>
                    )}
                  </Upload>
                </div>
                <Button
                  {...buttonSettings}
                  onClick={() => this.handleLogoEffects("noImg")}
                  variant="outlined"
                  color="secondary"
                >
                  Remove Image
                </Button>
              </div>
            </FormControl> */}
        </div>

      </div>
      <div>
        <input 
          value="Upload" 
          type="button" 
          // onClick={ () => { this.uploadInput.click() } } 
        />
        <input 
          id="inputUpload"
          // ref={ (ref) => { this.uploadInput = ref } }
          type="file" 
          // style={ { display: 'none' } } 
          // onChange = { (event) => { this.handleUpload(event) }}
        />
      </div>
      
    </div>
  );
}


export default MyLayer;
