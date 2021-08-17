import React, { useState, useEffect, Component } from "react";
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import "./MyLayerStyles.css";
import { Stage, Layer, Image, Text, Transformer } from "react-konva";
import { Button , TextField, Switch, FormControl, CssBaseline} from "@material-ui/core";
import { CirclePicker } from "react-color";
import { Divider, Upload, Icon, Modal } from "antd";
import Konva from "konva";
import mockup2 from '../../images/mockup2.png';

const MyLayer = ({ shapeProps, isSelected, onSelect, onChange }) => {

    const [color, setColor] = useState(["#ffffff"]);
    const [textOn, setTextOn] = useState(false);
    const [text, setText] = useState('');
    const [textColor, setTextColor] = useState('');
    const [textScale, setTextScale] = useState([]);
    const [clothing, setClothing] = useState('tshirt');
    const [textLayerColors, setTextLayerColors] = useState(["#ffffff","#000000","#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4",
    "#00bcd4","#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#ff5722","#795548","#607d8b","#C0C0C0","#C9AE5D"]);
    // const [itemColor, setItemColor] = useState(itemColor);
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

    useEffect(() => {
        setImage(getImage());
    }, []);

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
     
    const trRef = React.useRef();
    useEffect(() => {  
      if (isSelected) {  
        trRef.current.setNode(shapeRef.current);  
        trRef.current.getLayer().batchDraw();  
      }  
    }, [isSelected]);
    
  var  changeTextColor = (e) => {
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
    const {value} = e.target;
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
    const text = textScale.concat();
    console.log('hello text');
    console.log(textScale[index]);
    text[index] = {
      ...text[index],
      ...newProps
    };
    setTextScale({
      textScale: text
    });
  };

  const handleChange = (e) => {
    const shape = e.target;
    this.props.onTransform({
      x: shape.x(),
      y: shape.y(),
      width: shape.width() * shape.scaleX(),
      height: shape.height() * shape.scaleY(),
      rotation: shape.rotation()
    });
  };

  // const checkNode = () => {
  //   // attach or detach Transformer node
  //   const stage = transformer.getStage();

  //   const selectedNode = stage.findOne("." + selectedShapeName);
  //   // do nothing if selected node is already attached
  //   if (selectedNode === transformer.node()) {
  //     return;
  //   }

  //   if (selectedNode) {
  //     // attach to another node
  //     transformer.attachTo(selectedNode);
  //   } else {
  //     // remove transformer
  //     transformer.detach();
  //   }
  //   transformer.getLayer().batchDraw();
  // }

    return (
      <div>
        <CommonNav />
            <CssBaseline />

      
      <div className="container">
        
        <div className="clothes" style={{backgroundColor: color}}>
          <Stage
            width={500}
            height={500}
            onMouseDown={handleStageMouseDown}
            >
            <Layer>{clothing === 'tshirt' ? 
              <Image
                // filters={[Konva.Filters.RGB]}
                image={images}
                x={0}
                y={0}
                width={500}
                height={500}
                // ref={shirtRef}
              />:<></>}
            </Layer>
            <Layer>
              <Text text={text}  offset={{x: -150,y: -150}} width={200} wrap="char" align="center" fontSize={30} fill={textColor} 
              fontFamily="Calibri" opacity={1} draggable={true}
              />
              <Transformer
                selectedShapeName={selectedShapeName}
              />
            </Layer>
          </Stage>
        </div>

        <div className="options">
          <div className="clothes-type">
            <Button onClick={(e) => changeCloth({ target: { value: 'tshirt'} })} value="tshirt">T-Shirt</Button>
            <Button onClick={(e) => changeCloth({ target: { value: 'sweater'} })} value="sweater">Sweater</Button>
          </div>
          <div className="color-picker">
            {clothing === "tshirt" ? (
              <CirclePicker
                id="circle-picker"
                width="max-content"
                circleSize={circleSize}
                colors={tshirt}
                onChange={color => {
                  setColor(color.hex);;
                  console.log(color.hex)
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
      <div className="text-container">
        Custom Text:
        <Switch
          checked= {textOn}
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
      </div>

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
      </div>
    );
  }


export default MyLayer;
