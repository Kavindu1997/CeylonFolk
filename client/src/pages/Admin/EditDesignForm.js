import React, { useState, useEffect } from 'react';
// import { Grid } from '@material-ui/core';
import { Grid, Typography, Box } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useStyles from './style';
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from '../../_actions/colorActions'
import './adminStyles.css'

var design_id = localStorage.getItem("design_id");
console.log("dd");
console.log(design_id);
console.log("dd");

var collection_id = localStorage.getItem("collection_id");


const EditDesignForm = () => {

    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [designName, setDesignName] = useState([]);
    // const [colour, setColour] = useState([]);
    const [color, setColor] = useState(["#ffffff"]);
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
    const [pickerColorArray, setPickerColorArray] = useState([]);
    const [check, setCheck] = useState()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);


    let history = useHistory();

    const onFormSubmit = (e, data) => {

        e.preventDefault();

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


        console.log("check");
        console.log(formData);

        axios.put(`http://localhost:3001/designs/edit/${design_id}`, formData, config).then((response) => {
            alert('Image upload Successfull');
            history.push('/designs');


        }).catch((err) => {
            console.log('err', err);
        })
    };

    const [listOfTypes, setListOfTypes] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/invent/types").then((response) => {
            // console.log(response.data);
            setListOfTypes(response.data);
        });
    }, []);

    const pickedItemColors = useSelector((state) => state.colorReducer.pickerColor)

    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

    const changeCollectionDesign = (e) => {
        setDesignName(e.target.value);
        console.log(e.target.value);
    };

    const setCol = (e) => {
        setColor(e.target.value)
        console.log(e.target.value)
    }

    const changeCollectionTypes = (e) => {
        setTypes(e.target.value);
        console.log(e.target.value);
    };

    const changeCollectionPrice = (e) => {
        setPrice(e.target.value);
        console.log(e.target.value);
    };

    const handleCheck = (e) => {
        // const { name, value } = e.target;

    setCheck(e.target.value);

    }

    const [listOfDesign, setListOfDesign] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/designs/oneDesign/${design_id}`).then((response) => {
            // console.log(response.data);
            setListOfDesign(response.data);
        });
    }, []);

    return (
        <div>
            <div>
                <form onSubmit={onFormSubmit}>

                {listOfDesign
                                            .map((value) => {
                                                return (
                    <Grid container>

                        <Grid item xs={6}>

                            <Controls.Input
                                variant="outlined"
                                label="Design Name"
                                name="designName"
                                defaultValue={value.design_name}
                                onChange={changeCollectionDesign}
                            />
                        </Grid>
                        <Grid item xs={6}>

                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
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
                                onChange={onInputChange}
                            />

                        </Grid>
                        
                        <Grid item xs={6}>
                        <Controls.Input
                                variant="outlined"
                                label="Price"
                                name="price"
                                defaultValue={value.price}
                                onChange={changeCollectionPrice}
                            />
                        </Grid>
                        <Grid item xs={6}>

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
                        <Grid item md={12} >


                            <Controls.Button
                                type="submit"
                                text="Add New Design"
                            />
                        </Grid>


                    </Grid>

);
})}
                </form>
            </div>
        </div >
       

    );
};

export default EditDesignForm;