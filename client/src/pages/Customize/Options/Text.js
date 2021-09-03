import React from "react";
import { Button, TextField } from "@material-ui/core";

const TextAddOn = (props) => {

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
            <Button style={{background: 'black', color: 'white'}} onClick={props.addText}>ADD</Button>
            </form>
          </span>
      </div>
    );
  
}

export default TextAddOn;
