import React, { useState, useEffect, Component } from "react";
import { CirclePicker } from "react-color";

const ColorPicker = (props) => {

const [itemColor, setItemColor] = useState(props.itemColor);
const stageRef = React.useRef(null);
const [circleSize, setCircleSize] = useState(35);
const [circleSpacing, setCircleSpacing] = useState(2);
const [tshirt, setTshirt] = useState([
  ["#ffffff", "#000000", "#ff0000", "	#008000"]
]);
const [sweater, setSweater] = useState([
  ["#ffffff", "#000000", "#ffff00", "#ff69b4"]
]);

  //changes the color to be shown depending on the clothing type
  
    return (
      <div className="color-picker">
        {props.clothing === "tshirt" ? (
          <CirclePicker
            id="circle-picker"
            width="max-content"
            circleSize={circleSize}
            colors={tshirt}
            onChange={color => {
              props.changeColor(color);
            }}
          />
        ) : (
          <CirclePicker
            id="circle-picker"
            width="max-content"
            circleSize={circleSize}
            colors={sweater}
            onChange={(color) => {
              props.changeColor(color);
            }}
          />
        )}
      </div>
    );
  }


export default ColorPicker;
