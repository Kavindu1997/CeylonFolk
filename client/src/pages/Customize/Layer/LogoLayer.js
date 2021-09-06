import React, { Component, useState, useEffect } from "react";
import { Image, Transformer, Group } from "react-konva";
import Konva from "konva";
import mockup2 from "../../../images/new/cropTopMockup.png";
import useImage from "use-image";
import cancel from "../../../images/close.svg"


const LogoLayer = (props) => {

  const [images, setImage] = useState(null);
  const [imgPos, setimgPos] = useState({x: 300, y: 300 });
  const [edited, setedited] = useState(false)
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const imageRef = React.useRef();
  const trRef = React.useRef();
  const [deleteImage] = useImage(cancel);
  const [isShown, setIsShown] = useState(false);

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
  if (isShown) {
    setShowDeleteButton(true);
  } else {
    setTimeout(() => {
      setShowDeleteButton(false);
    }, 4000);
  }
}, [isShown]);

React.useEffect(() => {
  if (props.isImageSelected) {
    // shapeRef.current.cache();
    // we need to attach transformer manually
    trRef.current.setNode(imageRef.current);
    trRef.current.getLayer().batchDraw();
  }
}, [props.isImageSelected]);

  useEffect(() => {
    if (!imageRef.current) {
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
      imageRef.current.cache();
      imageRef.current.getLayer().batchDraw();
    }
  });

  // React.useLayoutEffect(() => {
  //   imageRef.current.cache();
  // }, [props.shapeProps, images, props.isSelected]);

  const onDragEnd = env => {
    setedited(true);
  };

  const onDragMove = (env) => {
    const imgPos = env.target._lastPos;
    // setimgPos(imgPos);
  };

  //Filters is used to change the color of the image
  
    return (
      <React.Fragment>

      <Group
        draggable
      >

        {showDeleteButton && (
        <Image
          onClick={props.onDelete}
          image={deleteImage}
          width={10}
          height={10}
          offset={{
            x: -160,
            y: -135
          }}
        />
        )}
          
      <Image
        image={images}
        x={0}
        y={0}
        width={400}
        height={300}
        {...props.shapeProps}
        // draggable={true}
        offset={{
          x: -150,
          y: -150
        }}
        // onDragEnd= {onDragEnd}
        onDragEnd={(e) => {
          const shape = e.target;
          props.onChange({
            ...props.shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            // width: shape.width() * shape.scaleX(),
            //   height: shape.height() * shape.scaleY(),
            //   rotation: shape.rotation()
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = imageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          node.width(Math.max(5, node.width() * scaleX));
          node.height(Math.max(node.height() * scaleY));

          props.onChange({
            ...props.shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: node.width(),
            height: node.height()
            
          });
        }}
        onDragMove= {onDragMove}
        // onTransformEnd= {onDragEnd}
        onClick={props.onSelect}
        onTap={props.onSelect}
        ref={imageRef}
        // {...imgPos}
        // {...(edited && { scale: { x: 0.5, y: 0.5 } })}

        onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}     
      />

        {props.isImageSelected && (
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
        )}

      </Group>

</React.Fragment>
    );
  
}

export default LogoLayer;
