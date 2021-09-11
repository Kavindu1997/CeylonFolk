import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../../components/Reusable/Controls';
import ColorPicker from '../../../components/Reusable/ColorPicker';
import { useDispatch, useSelector } from "react-redux";
import { setColors } from '../../../_actions/colorActions'
import { ChromePicker } from 'react-color';
import { Typography, Button, Box } from '@material-ui/core';
import { fetchColors } from '../../../_actions/colorActions'

const AvailableColorsForm = () => {

    const [colorPrice, setColorPrice] = useState('');
    const [colorName, setColorName] = useState('');
    const [pickerColor, setPickerColor] = useState('');
    const [pickerColorArray, setPickerColorArray] = useState([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const dispatch = useDispatch();

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
            price: colorPrice,
            color_name: colorName,
        }

        console.log(colors)
        // setPickerColorArray([...pickerColorArray, pickerColor]);
        var result = dispatch(setColors(colors))
        console.log(result)

        if (result == 0) {
            alert("Not Added to Color")
            dispatch(fetchColors());
            props.resetForm();
        } else {
            alert("Added to color");
            //   window.location.reload(true)
            //   setColorPrice(''); 
        }

    };

    return (
        <div>
            <div>
                <Grid container>
                    <div>
                    
                    <Grid item xs={6}>
                        <Controls.Input
                            variant="outlined"
                            label="Colour Name"
                            name="colorName"
                            onChange={changeColourName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Input
                            variant="outlined"
                            label="Price"
                            name="colorPrice"
                            onChange={changePrice}
                        />
                    </Grid>
                 
                    

                      
                    </div>
                   
                    

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

                            onClick={pickedCOlor}>ADD COLOR</Button>
                             </Box>
               
                </Grid>
            </div>
        </div >

    );
};

export default AvailableColorsForm;