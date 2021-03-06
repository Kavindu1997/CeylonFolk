import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../../components/Reusable/Controls';
import ColorPicker from '../../../components/Reusable/ColorPicker';
import { useDispatch, useSelector } from "react-redux";
import { setColors } from '../../../_actions/colorActions'
import { ChromePicker } from 'react-color';
import { Typography, Button, Box } from '@material-ui/core';
import { fetchColors } from '../../../_actions/colorActions';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function  EditColour({ selectedColourId }) {

    const colour_id=selectedColourId.colour_id;

    const [colorPrice, setColorPrice] = useState('');
    const [colorName, setColorName] = useState('');
    const [pickerColor, setPickerColor] = useState('');
    const [pickerColorArray, setPickerColorArray] = useState([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        dispatch(fetchColors());
    }, []);

    const changePrice = (e) => {
        setColorPrice(e.target.value);
        console.log(e.target.value);
    };

    const changeColourName = (e) => {
        setColorName(e.target.value);
        console.log(e.target.value);
    };

    const pickedCOlor = (props) => {
        var colors = {
            color: pickerColor,
          

        }
        axios.put(`http://localhost:3001/availableColors/editColor/${selectedColourId.colour_id}`, colors).then((response) => {
         
            history.push('/availableColors');


        })
  
    };

    return (
        <div>
            <div>
                <Grid container>
                    
                    <Box>
                    <Button style={{ margin: '10px', padding: '10px', background: 'black', color: 'white' }} onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>{showColorPicker ? 'Close Color Picker' : 'Pick a Color'}</Button>
                        {showColorPicker && (
                            <ChromePicker
                                color={pickerColor}
                                onChange={updatedColor => setPickerColor(updatedColor.hex)}
                            />
                        )
                        }

                        <Typography>You Picked {pickerColor}</Typography>
                        {/* <Button type='submit' onClick={pickedCOlor}>Picked Color</Button> */}

                        </Box>
                        <Box>
                        <Button style={{ margin: '10px', padding: '10px', background: 'black', color: 'white' }}

                            onClick={pickedCOlor}>EDIT COLOR</Button>
                             </Box>
               
                </Grid>
            </div>
        </div >

    );
};

export default EditColour;