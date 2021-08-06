import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import mockup from '../images/tmockup.png'


const MyCanvas = () => {

  const [canvas, setCanvas] = useState('');
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  // const canvast = window._canvas = new fabric.Canvas('canvas');
  // canvast.setBackgroundColor(
  //   {source: 'http://localhost:3000/static/media/tmockup.63c115d9.png'}, 
  //   canvast.renderAll.bind(canvast)
  //   );

  const initCanvas = (id) => (
    new fabric.Canvas('canvas', {
      height: 500,
      width: 500,
      backgroundColor:'pink',
    })
  )

  // const addRect = canvi => {
  //   const rect = new fabric.Rect({
  //     height: 280,
  //     width: 200,
  //     fill: 'yellow'
  //   });
  //   canvi.add(rect);
  //   canvi.renderAll();
  // }

  // const addImg = (url, canvi) => {
  //   new fabric.Image.fromURL('../images/tmockup.png', img => {
  //     canvi.add(img);
  //     canvi.renderAll();
  //   });
  // }

  // componentDidMount = () => {
  //   const canvas = this.refs.canvas
  //   const ctx = canvas.getContext("2d")
  //   const img = this.refs.image
  //   img.onload = () => {
  //     ctx.drawImage(img, 0, 0)
  //     ctx.font = "40px Courier"
  //     ctx.fillText(this.props.text, 210, 75)
  //   }
  // }

//   const canvas2 = new fabric.Canvas('canvas');
// canvas2.setHeight(480);
// canvas2.setWidth(640);

// $('#myImage').change(function () {
//     var imgData = $(this).files[0];
//     fabric.util.loadImage(imgData, function(img) {
//         var oImg = new fabric.Image(img);
//         oImg.scale(0.2).set({
//             left: 100,
//             top: 100,
//         });
//     canvas2.add(oImg);
//     });
// }); 

  // const imageAdded = () => {
    // console.log(e)
  //   const inputEle = document.getElementById('myImage')
  //   const file = inputEle.files[0];

  //   reader.readAsDataURL(file)
  // }

  // const addImg = (e, url, canvi) => {
  //   e.preventDefault();
  //   new fabric.Image.fromURL(url, img => {
  //     img.scale(0.75);
  //     canvi.add(img);
  //     canvi.renderAll();
  //     setImgURL('');
  //   });
  // }

  // const reader = new FileReader()

  // const inputFile = document.getElementById('myImage');
  // inputFile.addEventListener('change',imageAdded)
  
  // reader.addEventListener('load', () => {
  //   console.log(reader.result)
  //   fabric.Image.fromURL(reader.result, img => {
  //     canvas.add(img)
  //     canvas.renderAll();
  //   })
  // })

  // const setBackground = (url,canvas) => {
  //       fabric.Image.fromURL(url,(img) => {
  //           canvas.backgroundColor = img
  //           canvas.renderAll()     
  //       })
  //     }
  //     setBackground('http://localhost:3000/static/media/tmockup.63c115d9.png',canvas);

  // const zcanvas = new fabric.Canvas('c');

  // zcanvas.setBackgroundImage('http://localhost:3000/static/media/tmockup.63c115d9.png', zcanvas.renderAll.bind(zcanvas));

  return(
    <div>
      <h1>Fabric.js on React - fabric.Canvas('...')</h1>
      <img ref="image" src={mockup} className="hidden" />
      {/* <button onClick={() => addRect(canvas)}>Rectangle</button>
      <form onSubmit={e => addImg(e, imgURL, canvas)}>
        <div>
          <input 
            type="text" 
            value={imgURL} 
            onChange={ e => setImgURL(e.target.value)} 
          />
          <button type="submit">Add Image</button>
        </div>
      </form> */}
     <br/><br/>
      <canvas id="canvas" />
    </div>
  );
}

export default MyCanvas;