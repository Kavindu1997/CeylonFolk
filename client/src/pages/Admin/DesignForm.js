import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useStyles from './style';
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from '../../_actions/colorActions'
import './adminStyles.css';
import Notification from "../../components/Reusable/Notification";

var collection_id = localStorage.getItem("collection_id");
console.log(collection_id);


const DesignForm = () => {

    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [designName, setDesignName] = useState([]);
    const [color, setColor] = useState(["#ffffff"]);
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
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


    let history = useHistory();

    const onFormSubmit = (e) => {

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('designName', designName);
        formData.append('color', color);
        formData.append('types', types);
        formData.append('price', price);
        formData.append('collection_id', collection_id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };


        axios.post("http://localhost:3001/designs", formData, config).then((response) => {


            if (response.data== 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully Added!',
                    type: 'error'
                });
            }
            else if (response.data== 1) {
                setNotify({
                    isOpen: true,
                    message: 'Successfully Added !',
                    type: 'success'
                });
            }
            else if (response.data== 2) {
                setNotify({
                    isOpen: true,
                    message: 'This type and Colour is not in the inventory !',
                    type: 'error'
                });
            }
            else if (response.data == 3) {
                setNotify({
                    isOpen: true,
                    message: 'This Design name is already exist !',
                    type: 'error'
                });
            }
            else if (response.data == 4) {
                setNotify({
                    isOpen: true,
                    message: 'Price is not valid!',
                    type: 'error'
                });
            }
            else if (response.data == 5) {
                setNotify({
                    isOpen: true,
                    message: 'Select a type!',
                    type: 'error'
                });
            }
            else if (response.data == 6) {
                setNotify({
                    isOpen: true,
                    message: 'Select a colour!',
                    type: 'error'
                });
            }

        });
    };

    const [listOfTypes, setListOfTypes] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/invent/types").then((response) => {
         
            setListOfTypes(response.data);
        });
    }, []);

    const pickedItemColors = useSelector((state) => state.colorReducer.pickerColor)

    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

    const changeCollectionDesign = (e) => {
        setDesignName(e.target.value);
    
    };

    const setCol = (e) => {
        setColor(e.target.value)
       
    }

    const changeCollectionTypes = (e) => {
        setTypes(e.target.value);
      
    };

    const changeCollectionPrice = (e) => {
        setPrice(e.target.value);
     
    };

    const handleCheck = (e) => {
     

    setCheck(e.target.value);

    }

    return (
        <div>
            <main className={classes.content}>
            <div>
                <form onSubmit={onFormSubmit}>


                    <Grid container>

                        <Grid item xs={6}>

                            <Controls.Input
                                variant="outlined"
                                label="Design Name"
                                name="designName"
                                required
                                onChange={changeCollectionDesign}
                            />
                        </Grid>
                        <Grid item xs={6}>

                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }} required>
                                <select className={classes.icon} name="type" onChange={changeCollectionTypes}>
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
                                variant="outlined"
                                name="photo"
                                type="file"
                                required
                                onChange={onInputChange}
                            />

                        </Grid>
                        
                        <Grid item xs={6}>
                        <Controls.Input
                                variant="outlined"
                                label="Price"
                                name="price"
                                required
                                onChange={changeCollectionPrice}
                            />
                        </Grid>
                        <Grid item xs={6}>

                        <Box className={classes.tBox}>
                        <Typography>Select Color</Typography>
                        <Box style={{ display: 'flex' }} required>
                            
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
                        <Grid item md={12} >


                            <Controls.Button
                                type="submit"
                                text="Add New Design"
                            />
                        </Grid>


                    </Grid>
                  

                </form>
            </div>
            <Notification notify={notify} setNotify={setNotify} />
            </main>
        </div >
       
    );
};

export default DesignForm;