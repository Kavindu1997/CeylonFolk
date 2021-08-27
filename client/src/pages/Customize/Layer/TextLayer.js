import React, { Component, useState, useEffect } from "react";
import { Text,Transformer } from "react-konva";
import { render } from "react-dom";

const TextLayer = (props) => {

  // const [text, setText] = useState('')
  const textRef = React.useRef();
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  useEffect(() => {
    if (props.isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [props.isSelected]);

  //The component waints for changes in the text,
  //it updates the text as it receives new character
  // useEffect(() => {
  //   if (isSelected) {
  //     trRef.current.setNode(shapeRef.current);
  //     trRef.current.getLayer().batchDraw();
  //   }
  // }, [isSelected]);
//   useEffect(() => {
//     setText(props.text)
// }, [props.text])
  // componentWillReceiveProps(newProps) {
  //   if (newProps.text !== this.props.text) {
  //     this.setState({
  //       text: newProps.text
  //     });
  //   }
  // }

  //The onTransform function helps scale the text
  //to users needs
  // const handleChange = (e) => {
  //   const shape = e.target;
  //   console.log(shape)
  //   console.log(props.onTransform)
  //   props.onTransform({
  //     x: shape.x(),
  //     y: shape.y(),
  //     width: shape.width() * shape.scaleX(),
  //     height: shape.height() * shape.scaleY(),
  //     rotation: shape.rotation()
  //   });
  // };
  
    return (
      <React.Fragment>
      <Text
        name="text"
        offset={{
          x: -150,
          y: -150
        }}
        width={200}
        wrap="char"
        align="center"
        fill={props.textColor}
        fontSize={20}
        fontFamily="Calibri"
        opacity={1}
        draggable={true}
        text={props.value}
        ref={textRef}
        // onDragEnd={handleChange}
        // onTransformEnd={handleChange}
        onClick={props.onSelect}
        onTap={props.onSelect}
        onDragEnd={(e) => {
          const shape = e.target;

          props.onChange({
            // ...shapeProps,
            x: shape.x(),
      y: shape.y(),
      width: shape.width() * shape.scaleX(),
      height: shape.height() * shape.scaleY(),
      rotation: shape.rotation()
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = textRef.current.getStage();
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          props.onChange({
            // ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {props.isSelected && (
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
      </React.Fragment>
    );
  
}

export default TextLayer;
