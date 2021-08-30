import React, { Component, useState } from "react";
import { Button, Switch, TextField } from "@material-ui/core";
import { CirclePicker } from "react-color";

const TextAddOn = (props) => {

  const [textOn, setTextOn] = useState(false);
  const [textLayerColors, setTextLayerColors] = useState(["#ffffff", "#000000", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4",
    "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b", "#C0C0C0", "#C9AE5D"]);

    

  //When text is turned on then user will be able to input and select the text color
  
    return (
      <div className="text-container">
          <span>
            <form onSubmit={props.sendItems2}>
            <TextField
              autoFocus
              margin="dense"
              label="Add your custom text here"
              type="text"
              fullWidth
              value={props.text}
              onChange={props.changeText}
            />
            {/* <CirclePicker
              colors={props.textLayerColors}
              onChange={color => {
                props.changeTextColor(color.hex);
              }}
              console
              // onChange={props.changeTextColor}
              width="max-width"
            /> */}
            <Button onClick={props.addText}>ADD</Button>
            </form>
          </span>
      </div>
    );
  
}

export default TextAddOn;
