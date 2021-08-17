import React, { Component, useEffect, useState } from 'react';
import './App2.css';
import mockup2 from '../../images/mockup2.png';


const MyLayers2 = () => {

    const [type, setType] = useState('tshirt');
    const [color, setColor] = useState('white');
    const [textcolor, setTextColor] = useState('black');
    const [text, setText] = useState('write here');

    console.log(color)

function handleAddrTypeChange(e) {
    setColor(e.target.value);
    console.log(color)
}


console.log(color)
  
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
                    <div className="custom well">
        
        <select defaultValue={color} onChange={handleAddrTypeChange}>
          <option selected value="white">White</option>
          <option value="#262626">Black</option>
        </select>
      </div>
          </div>

          <div className="col-md-4" style={{align: "center"}}>
          <div className="shirt">
        <img  style={{backgroundColor: color, width: 300}} src={mockup2} alt="shirt" />
      </div>
          </div>

          <div className="col-md-4">
            {/* <Price state={this.state}/> */}
          </div>
        </div>
      </div>
    );
 
}

export default MyLayers2;
