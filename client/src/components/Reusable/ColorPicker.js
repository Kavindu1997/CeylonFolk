import React, {useState} from 'react';
import { ChromePicker } from 'react-color';
import { Typography, Button} from '@material-ui/core';
import {useDispatch,} from "react-redux";
import {setColors} from '../../_actions/colorActions'

const ColorPicker = () => {
    const [pickerColor, setPickerColor] = useState('');
    const [pickerColorArray, setPickerColorArray] = useState([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const dispatch = useDispatch();

    const pickedCOlor = () => {
        //   var colors = pickerColor;
        console.log(pickerColor)
        setPickerColorArray([...pickerColorArray, pickerColor]);
            var result = dispatch(setColors(pickerColorArray))   
            if(result == 0){
              alert("Not Added to Color")
            }else{
              alert("Added to color");
            }   
            console.log(pickerColorArray)
      };
    return(
        <div>
            <Button onClick={() => setShowColorPicker(showColorPicker => !showColorPicker )}>{showColorPicker ? 'Close Color Picker' : 'Pick a Color'}</Button>
            { showColorPicker && (
            <ChromePicker 
            color={pickerColor}
            onChange={updatedColor => setPickerColor(updatedColor.hex)}
            />
            )
            }
            
            <Typography>You Picked {pickerColor}</Typography>
            <Button type='submit' onClick={pickedCOlor}>Picked Color</Button>
        </div>

    );
};

export default ColorPicker;