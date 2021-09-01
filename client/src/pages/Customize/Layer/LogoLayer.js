import React, { Component, useState, useEffect } from "react";
import { Image } from "react-konva";
import Konva from "konva";
import mockup2 from "../../../images/new/cropTopMockup.png";


const LogoLayer = (props) => {

  const [images, setImage] = useState(null);
  const [imgPos, setimgPos] = useState({x: 300, y: 300 });
  const [edited, setedited] = useState(false)
  const shirtRef = React.useRef();

//   useEffect(() => {
//     const MyImage = new window.Image()
//     MyImage.src = props.imageSrc;
//     MyImage.onload = () => {
//       setImage(MyImage,() =>{
//         shirtRef.current.cache();
//         shirtRef.current.getLayer().batchDraw();

//       }
//       )
//     }
    
//   }, []);

// const getDerivedStateFromProps = (nextProps, prevState) => {
//     console.log('ttt')
//     const image = new window.Image();
//     const { imgSrc } = nextProps;
//     image.src = imgSrc;
//     return { image };
    
//   }

  useEffect(() => {
    if (!shirtRef.current) {
      // do componentDidMount logic
    //   shirtRef.current = true;
    //   shirtRef.current.cache();
    //   shirtRef.current.getLayer().batchDraw();

    // const MyImage = new window.Image()
    // MyImage.src = props.imageSrc;
    // MyImage.onload = () => {
    //   setImage(MyImage)
    // }
    // shirtRef.current.cache();
    //     shirtRef.current.getLayer().batchDraw();


    } else {
      // do componentDidUpdate logic
      const MyImage = new window.Image()
    MyImage.src = props.image1;
    MyImage.onload = () => {
        setImage(MyImage)
      }
      shirtRef.current.cache();
      shirtRef.current.getLayer().batchDraw();
    }
  });

  const onDragEnd = env => {
    setedited(true);
  };

  const onDragMove = (env) => {
    const imgPos = env.target._lastPos;
    setimgPos(imgPos);
  };

  //Filters is used to change the color of the image
  
    return (
        <React.Fragment>
      <Image
        image={images}
        x={0}
        y={0}
        ref={shirtRef}
        width={400}
        height={300}
        draggable={true}
        onDragEnd= {onDragEnd}
        onDragMove= {onDragMove}
        onTransformEnd= {onDragEnd}
        // {...imgPos}
        {...(edited && { scale: { x: 0.5, y: 0.5 } })}
      />

      {/* {props.isImageSelected && (

        
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            //limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />

      
      )} */}

</React.Fragment>
    );
  
}

export default LogoLayer;
