// import React, { Component, useState, useEffect } from "react";
// import { render } from "react-dom";
// import { Transformer,Group, Image } from "react-konva";
// import useImage from "use-image";
// import cancel from "../../../images/close.svg"

// const TransformerComponent = (props) => {

//   const transformerRef = React.useRef();
//   const [deleteImage] = useImage(cancel);

//   //Helper for transforming objects

// //   useEffect(() => {
// //     checkNode();
// // }, [])

// useEffect(() => {
//   if (!transformerRef.current) {
//     // do componentDidMount logic
//     checkNode();
//   } else {
//     // do componentDidUpdate logic
//     checkNode();
//   }
// });

//   // componentDidMount() {
//   //   this.checkNode();
//   // }
//   // componentDidUpdate() {
//   //   this.checkNode();
//   // }
//   const checkNode = (e) => {
//     // attach or detach Transformer node
//     const stage = transformerRef.current.getStage();
//     const { selectedShapeName } = props;

//     const selectedNode = stage.findOne("." + selectedShapeName);
//     // do nothing if selected node is already attached
//     if (selectedNode === transformerRef.current.node()) {
//       return;
//     }

//     if (selectedNode) {
//       // attach to another node
//       transformerRef.current.attachTo(selectedNode);
//     } else {
//       // remove transformer
//       transformerRef.current.detach();
//     }
//     transformerRef.current.getLayer().batchDraw();
//   }
  
//     return (
      
//       <Transformer
//         ref={transformerRef}
//       />
//     );
  
// }

// export default TransformerComponent;
