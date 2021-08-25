import { colors } from "@material-ui/core";
import ceylonforkapi from "../api/index";
import { ColorActionTypes } from "../_constants";

export const setColors = colors => async () =>{
    
    ceylonforkapi.post("/availableColors",colors).then((response) => {
      if (response.data.error) {
          alert(response.data);
          console.log('thash')
                }
      else {
        // alert('SUCCESS');
      }
    }); 
    // return { 
    //   type:  ColorActionTypes.SET_COLORS, 
    //   payload: colors,
    // };
    
  }

  export const fetchColors = () => async (dispatch) => {
    const response = await ceylonforkapi.get("/availableColors/fetchColors")
    dispatch({type: ColorActionTypes.FETCH_COLORS,payload: response.data})
  }

  

  