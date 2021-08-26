// import React, { Component } from "react";

// const Price = () => {
//   price = (clothing, color,  textColor) => {
//     let price = 0;
//     if (clothing === "tshirt") {
//       if (
//         (color.r === 0 && color.g === 0 && color.b === 0) ||
//         (color.r === 255 && color.g === 255 && color.b === 255)
//       ) {
//         price += 16.95;
//       } else if (
//         (color.r === 255 && color.g === 0 && color.b === 0) ||
//         (color.r === 0 && color.g === 128 && color.b === 0)
//       ) {
//         price += 18.95;
//       }
//     } else if (clothing === "sweater") {
//       if (
//         (color.r === 0 && color.g === 0 && color.b === 0) ||
//         (color.r === 255 && color.g === 255 && color.b === 255)
//       ) {
//         price += 28.95;
//       } else if (
//         (color.r === 255 && color.g === 105 && color.b === 180) ||
//         (color.r === 255 && color.g === 255 && color.b === 0)
//       ) {
//         price += 32.95;
//       }
//     }
//     if (textColor !== "#000000" && textColor !== "#ffffff") {
//       price += 3;
//     }

//   };

//   render() {
//     return (
//       <div className="price">
//         $
//         {price(
//           props.clothing,
//           props.color,
//           props.material,
//           props.textColor,
//           props.logoOn
//         )}
//       </div>
//     );
//   }
// }

// export default Price;
