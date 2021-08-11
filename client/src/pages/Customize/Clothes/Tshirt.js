import React, { useState, useEffect, Component } from "react";
import { Image } from "react-konva";
import { render } from "react-dom";
import Konva from "konva";
// import tshirt from "../../img/tshirt.png";
import mockup from '../../../images/mockup.png';

const Tshirt = () => {

    const [images, setImage] = useState('');
    const [shirt, setShirt] = useState('');
    const shirtRef = React.useRef();

    

    useEffect(() => {
        setImage(getImage());
        // setShirt(getShirt());
    }, []);

    const getImage = () => {
        const MyImage = new window.Image()
        MyImage.src = mockup;
        MyImage.onload = () => {
            setImage(MyImage)
        };
    }

    // const getShirt = () => {
    //   //image needs to be cached to display changes
    //   shirtRef.cache();
    //   shirtRef.blue(this.props.color.b);
    //   shirtRef.red(this.props.color.r);
    //   shirtRef.green(this.props.color.g);
    // }

    return (
      <Image
        filters={[Konva.Filters.RGB]}
        image={images}
        x={0}
        y={0}
        width={500}
        height={500}
        ref={shirtRef}
        
      />
    );
  
}

export default Tshirt;
