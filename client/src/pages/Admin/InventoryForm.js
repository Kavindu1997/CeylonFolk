import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { useForm } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "yup-phone";
import { makeStyles, TextField, Button } from '@material-ui/core';
import useStyles from './style';
import { CirclePicker } from "react-color";
import {useDispatch, useSelector} from "react-redux";
import {fetchColors} from '../../_actions/colorActions'


const InventoryForm = () => {

    const classes = useStyles();
    
    const [tshirt, setTshirt] = useState(["#fafafa","#ffffff"]);
    const [circleSize, setCircleSize] = useState(35);
    const [color, setColor] = useState(["#ffffff"]);
    const [size, setSize] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [margin, setMargin] = useState('');
    const [pickerColorArray, setPickerColorArray] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);


    const pickedItemColors = useSelector((state)=>state.colorReducer.pickerColor)
    console.log('hello')
    console.log(pickedItemColors)
    console.log('hello')

    const onsize = (e) => {
        setSize(e.target.value)
    }

    const ontype = (e) => {
        setType(e.target.value)
    }

    const onmargin = (e) => {
        setMargin(e.target.value)
    }

    const onquantity = (e) => {
        setQuantity(e.target.value)
    }
    // console.log(pickerColorArray)

    const setCol = (e) => {
        setColor(e.target.value)
        console.log(e.target.value)
    }


    const sendItem = (e) => {

        e.preventDefault();

        const Data = {
            size: size,
            type: type,
            margin: margin,
            quantity: quantity,
            color: color
        }
        
        console.log(Data);
        axios.post("http://localhost:3001/invent/inventory", Data).then(() => {
            alert('Item Inserted Successfully')
        });
        // props.resetForm();
    };

    return (

        <div>
            <form onSubmit={sendItem}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            id="size"
                            label="Size"
                            name="size"
                            autoComplete="size"
                            onChange={onsize}
                        />
                    </Grid>
                    <Grid item xs={6}>

                        <Controls.Input
                            variant="outlined"
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            id="type"
                            label="Type"
                            name="type"
                            autoComplete="type"
                            onChange={ontype}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Input
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            id="quantity"
                            label="quantity"
                            name="quantity"
                            autoComplete="quantity"
                            onChange={onquantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Input
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            id="margin"
                            label="margin"
                            name="margin"
                            autoComplete="margin"
                            onChange={onmargin}
                        />
                    </Grid>
                    <Box className={classes.tBox}>
                    <Typography>Select Color</Typography>
                    <Box style={{display:'flex'}}>
                        {pickedItemColors.map((pickColor) => {
                            const{color}=pickColor;
                            return (
                                <ul className={classes.clrsboxSize}>
                          <li className={classes.lbl}>
                                <label style={{ cursor: 'pointer' }} >
                                <div style={{ paddingBottom: '10px' }} >
                                    <input type="radio"  onClick={setCol} name="size" className={classes.sizeOption} value={color} checked />
                                    <span className={classes.swatchVisible} style={{backgroundColor:color }}></span>
                                </div>
                                </label>
                                </li>
                        </ul>
                                
                            // setPickerColorArray([...pickerColorArray, color])
                            );
                        })}



                        
                        {/* <CirclePicker id="circle-picker" width="max-content"
                            circleSize={circleSize}
                            colors={tshirt}
                            onChange={color => {
                                setColor(color.hex);;
                                console.log(color.hex)
                            }}
                        /> */}
                    </Box>
                    </Box>
                    
                    
                </Grid>
                <Box>
                    <Controls.Button
                        type="submit"
                        text="Add To Inventory"
                    />
                    </Box>

            </form>
        </div>

    );
};

export default InventoryForm;