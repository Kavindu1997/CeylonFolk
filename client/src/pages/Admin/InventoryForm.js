import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box} from '@material-ui/core';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import "yup-phone";
import useStyles from './style';
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from '../../_actions/colorActions';
import Notification from "../../components/Reusable/Notification";

import ButtonGroup from '@material-ui/core/ButtonGroup';


import './adminStyles.css'


const InventoryForm = () => {

    const classes = useStyles();
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

    
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const pickedItemColors = useSelector((state) => state.colorReducer.pickerColor)

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
  

    const setCol = (e) => {
        setColor(e.target.value)
      
    }

    const handleCheck = (e) => {
     

    setCheck(e.target.value);

    }

    const sendItem = (e) => {

        const Data = {
            size: size,
            type: type,
            margin: margin,
            quantity: quantity,
            color: color
        }

        console.log(Data);
        axios.post("http://localhost:3001/invent/inventory", Data).then((response) => {

            if (response.data.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully added ! ',
                    type: 'error'
                });
            }else if (response.data.data == 1) {
                setNotify({
                    isOpen: true,
                    message: 'Successfully Added !',
                    type: 'success'
                });
            } 
            
            else if(response.data.data == 2) {
                setNotify({
                    isOpen: true,
                    message: 'Quantity couldnt be greater than margin!',
                    type: 'error'
                });
            }
            else if(response.data.data == 3) {
                setNotify({
                    isOpen: true,
                    message: 'This item is already exist ',
                    type: 'error'
                });
            }
 

           
        });
    
    };

    const [listOfSizes, setListOfSizes] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/invent/sizes").then((response) => {
          
            setListOfSizes(response.data);
        });
    }, []);

    const [listOfTypes, setListOfTypes] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/invent/types").then((response) => {
       
            setListOfTypes(response.data);
        });
    }, []);

    return (
        <div>
            <form onSubmit={sendItem}>
                <Grid container>
                    <Grid item xs={6}>
                    <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                    <select className={classes.icon} name="size"  onChange={onsize}>
                                    <option value="">Size</option>
                                   
                                    {listOfSizes
                                            .map((value) => {
                                                return (

                                                    <option value={value.size}>{value.size}</option>
                                                    );
                                                })}

                                </select>
                                </ButtonGroup>
                   
                    </Grid>
                    <Grid item xs={6}>

                    <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                    <select className={classes.icon} name="type"  onChange={ontype}>
                                    <option value="">Type</option>
                                   
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
                                   
                                );
                            })}

                           
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
            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
};

export default InventoryForm;