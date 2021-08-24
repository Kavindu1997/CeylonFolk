import { Category } from "@material-ui/icons";
import { ColorActionTypes } from "../_constants";


const initialState = {
    pickerColor: []
  };
  
  export const colorReducer = (state=initialState, {type,payload}) => {
    switch (type){
      case ColorActionTypes.FETCH_COLORS:
        return {...state, pickerColor: payload}
        // return {...state, pickerColor: payload}

        // return {
        //   ...state,
        //   pickerColor: [...state.pickerColor, ...payload],
        // };

      //   return {
      //     ...state,
      //     pickerColor: [...state.pickerColor, payload]
      // };

          // return 
          //  [...state, payload],
       
        
      default:
      return state
    }
  };