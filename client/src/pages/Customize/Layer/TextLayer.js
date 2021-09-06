import React, { Component, useState, useEffect, useHoverDirty } from "react";
import { Text, Transformer, Group, Image } from "react-konva";
import { render } from "react-dom";
import useImage from "use-image";
import cancel from "../../../images/close.svg"

const TextLayer = (props) => {

  // const [text, setText] = useState('')
  const textRef = React.useRef(null);
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [deleteImage] = useImage(cancel);
  // const isHovered = useHoverDirty(textRef)
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (props.isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [props.isSelected]);

  useEffect(() => {
    if (isShown) {
      setShowDeleteButton(true);
    } else {
      setTimeout(() => {
        setShowDeleteButton(false);
      }, 4000);
    }
  }, [isShown]);

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

        <Text
          name="text"
          offset={{
            x: -150,
            y: -150
          }}
          // width={100}
          wrap="char"
          align="center"
          fill={props.textColor}
          fontSize={20}
          fontFamily="Calibri"
          opacity={1}
          // draggable={true}
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

          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
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

      </Group>

    </React.Fragment>
  );

}

export default TextLayer;
