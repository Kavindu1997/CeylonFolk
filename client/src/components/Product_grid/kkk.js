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
  <option value="">Gender</option>
  <option value="1">Male</option>
  <option value="0">Female</option>
</select>
          <select  name="stateName" className="form-control mt-3">
            {users.map((user, index) => (
              <option value={user.id}>{user.stateName}</option>
            ))}
          </select>
       </div>

       <div class="col-sm-3">
        <h5 class="text-info mt-5 mb-3">Cities</h5>
         <select  name="cityName" class="form-control" >
          {req && req.length>0 && req.map((user, index) => (
              <option value={user.id}>{user.City_Name}</option>
              
            ))}
         </select>
      </div>

      <div class="col-sm-3">
        <h5 class="text-info  mt-5 mb-3">Stadiums List</h5>
        <select  id="stadium" class="form-control">
          {stadium && stadium.length>0 && stadium.map((user, index) => (
              <option value={user.id}>{user.Stadium_list}</option>
            ))}
        </select>
      </div>

      <div class="col-sm-3">
        <h5 class="text-info mt-5 mb-3">Stadiums Address</h5>
        <select id="address" class="form-control">
           {stadium && stadium.length>0 && stadium.map((user, index) => (
              <option value={user.id}>{user.Stadium_Address}</option>
            ))}
       </select>
    </div>

    <div class="col-sm-4 mt-4 offset-sm-4">
        <h5 class="text-info  mb-4">Stadium Details</h5>
           {stadium && stadium.length>0 && stadium.map((user, index) => (
              <option value={user.id}>{user.Stadium_detail}</option>
            ))}
    </div>

  </div>
</div>   

  )
}
