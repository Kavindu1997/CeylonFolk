
import React, { Component, useState, useEffect } from "react";
import { Button } from "@material-ui/core";

const Clothes = (props) => {
  const [clothing, setClothing] = useState('tshirt');

  useEffect(() => {
    setClothing(props.clothing)
}, [props.clothing])
  
    return (
      <div className="clothes-type">
        <Button onClick={props.changeClothing} value="tshirt">
          T-Shirt
        </Button>
        <Button onClick={props.changeClothing} value="sweater">
          Sweater
        </Button>
      </div>
    );
  
}

export default Clothes;
