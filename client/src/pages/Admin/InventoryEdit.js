import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Radio } from '@material-ui/core';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import "yup-phone";
import useStyles from './style';
import { CirclePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from '../../_actions/colorActions'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './adminStyles.css'

var inventory_id = localStorage.getItem("inventory_id");
console.log(inventory_id);

const InventoryEdit = () => {

    const classes = useStyles();

    const [tshirt, setTshirt] = useState(["#fafafa", "#ffffff"]);
    const [circleSize, setCircleSize] = useState(35);
    const [color, setColor] = useState(["#ffffff"]);
    const [size, setSize] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [margin, setMargin] = useState('');
    const [pickerColorArray, setPickerColorArray] = useState([]);
    const [check, setCheck] = useState()


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);

    const pickedItemColors = useSelector((state) => state.colorReducer.pickerColor)
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

    const handleCheck = (e) => {
        // const { name, value } = e.target;

    setCheck(e.target.value);

    }

    const onSubmit1 = (e) => {

        // e.preventDefault();

        const Data = {
            size: size,
            type: type,
            margin: margin,
            quantity: quantity,
            color: color
        }

        console.log(Data);
        axios.put(`http://localhost:3001/invent/inventory/${inventory_id}`, Data).then(() => {
            alert('Item Inserted Successfully')
        });
        // props.resetForm();
    };

    const [listOfSizes, setListOfSizes] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/invent/sizes").then((response) => {
            // console.log(response.data);
            setListOfSizes(response.data);
        });
    }, []);

    const [listOfTypes, setListOfTypes] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/invent/types").then((response) => {
            // console.log(response.data);
            setListOfTypes(response.data);
        });
    }, []);

    const [listOfItem, setListOfItem] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/invent/inventoryItem/${inventory_id}`).then((response) => {
            // console.log(response.data);
            setListOfItem(response.data);
        });
    }, []);


    return (
        <div>
              {listOfItem
                                            .map((value) => {
                                                return (
            <form onSubmit={onSubmit1}>
  
                <Grid container>
                    <Grid item xs={6}>
                    <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                    <select className={classes.icon} name="size"  onChange={onsize}>
                                    <option value="">{value.size}</option>
                                   
                                    {listOfSizes
                                            .map((value) => {
                                                return (

                                                    <option value={value.size} defaultValue={value.size}>{value.size}</option>
                                                    );
                                                })}

                                </select>
                                </ButtonGroup>
                   
                    </Grid>
                    <Grid item xs={6}>

                    <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                    <select className={classes.icon} name="type"  onChange={ontype}>
                                    <option value="">{value.types}</option>
                                   
                                    {listOfTypes
                                            .map((value) => {
                                                return (

                                                    <option value={value.types}>{value.types}</option>
                                                    );
                                                })}

                                </select>
                                </ButtonGroup>
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
                            defaultValue={value.quantity}
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
                            defaultValue={value.margin}
                            onChange={onmargin}
                        />
                    </Grid>
                    <Box className={classes.tBox}>
                        <Typography>Select Color</Typography>
                        <Box style={{ display: 'flex' }}>
                            {pickedItemColors.map((pickColor) => {
                                const { color,id } = pickColor;
                                return (
                                    <ul className="clrsboxSize">
                                        <li className={classes.lbl}>
                                            <label style={{ cursor: 'pointer' }} for={id}>
                                                <div style={{ paddingBottom: '10px' }} >
                                                    <input type="radio" onClick={setCol} name={id} className={classes.sizeOption} key={id} value={color} id={id} onChange={handleCheck} checked={check===color}/>
                                                    <span className="swatchVisible" style={{ backgroundColor: color }}></span>
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
                        text="Edit"
                    />
                </Box>
                   
            </form>
               );
            })}
        </div>
    );
};

export default InventoryEdit;

















