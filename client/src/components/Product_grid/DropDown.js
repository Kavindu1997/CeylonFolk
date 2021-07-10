import React, { useState, useEffect ,useParams} from "react";
import axios from "axios";

export const DropDown = () => {
  const [users, setUser] = useState([]);
  const [req, setReq] = useState({
      stateName:"",
      cityName:""
  });
  const [stadium, setStadium] = useState([]);
  // const { ids } = useParams();

 
  return(




    <div className="container">
    <h3 className="mt-4 text-center text-secondary">Dependent Dropdown in REACT JS</h3>
     <div className="row">
       <div className="col-sm-3">
         <h5 className="mt-5 mb-3">Select State list</h5>


         
<select class="ui dropdown">
  <option value="">Collection</option>
  <option value="1">Snowy</option>
  <option value="0">Marvel</option>
</select>

<select class="ui dropdown">
  <option value="">Material</option>
  <option value="1">Cotton</option>
  <option value="0">Wet look</option>
</select>

<select class="ui dropdown">
  <option value="">color</option>
  <option value="1">Black</option>
  <option value="0">White</option>
</select>
          
<select class="ui dropdown">
  <option value="">Size</option>
  <option value="1">Small</option>
  <option value="0">Medium</option>
</select>
          

       </div>

  </div>
</div>   

  )
}
