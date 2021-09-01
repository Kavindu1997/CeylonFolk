import React, { Component, useState, useEffect } from "react";
import { Image } from "react-konva";
import Konva from "konva";
import mockup2 from "../../../images/new/kidsMockup.png";


const TShirt = (props) => {

  const [images, setImage] = useState(new window.Image());
  const shirtRef = React.useRef();

  useEffect(() => {
    const MyImage = new window.Image()
    MyImage.src = mockup2;
    MyImage.onload = () => {
      setImage(MyImage)
    }
  }, []);

  useEffect(() => {
    if (!shirtRef.current) {
      // do componentDidMount logic
      shirtRef.current = true;
    } else {
      // do componentDidUpdate logic
      shirtRef.current.cache();
      shirtRef.current.getLayer().batchDraw();
      shirtRef.current.blue(props.color.b);
      shirtRef.current.red(props.color.r);
      shirtRef.current.green(props.color.g);
    }
  });

  //Filters is used to change the color of the image
  
    return (
      <Image
        filters={[Konva.Filters.RGB]}
        image={images}
        x={0}
        y={0}
        width={850}
        height={500}
        ref={shirtRef}
      />
    );
  
}

export default TShirt;
