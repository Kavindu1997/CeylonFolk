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

var collection_id = localStorage.getItem("collection_id");
console.log(collection_id);


const DesignForm = () => {

    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [designName, setDesignName] = useState([]);
    // const [colour, setColour] = useState([]);
    const [color, setColor] = useState(["#ffffff"]);
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
    const [pickerColorArray, setPickerColorArray] = useState([]);

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

        axios.post("http://localhost:3001/designs", formData, config).then((response) => {
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

    return (
        <div>
            <div>
                <form onSubmit={onFormSubmit}>


                    <Grid container>

                        <Grid item xs={6}>

                            <Controls.Input
                                variant="outlined"
                                label="Design Name"
                                name="designName"
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
                        <Box className={classes.tBox}>
                        <Typography>Select Color</Typography>
                        <Box style={{ display: 'flex' }}>
                            {pickedItemColors.map((pickColor) => {
                                const { color } = pickColor;
                                return (
                                    <ul className={classes.clrsboxSize}>
                                        <li className={classes.lbl}>
                                            <label style={{ cursor: 'pointer' }} >
                                                <div style={{ paddingBottom: '10px' }} >
                                                    <input type="radio" onClick={setCol} name="size" className={classes.sizeOption} value={color} checked />
                                                    <span className={classes.swatchVisible} style={{ backgroundColor: color }}></span>
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
                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                label="Price"
                                name="price"
                                onChange={changeCollectionPrice}
                            />
                        </Grid>
                        <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>


                            <Controls.Button
                                type="submit"
                                text="Add New Design"
                            />
                        </Grid>


                    </Grid>


                </form>
            </div>
        </div >
        // {/* <Form onSubmit={handleSubmit}>
        //     <Grid container>
        //         <Grid item xs={6}>
        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Collection Name"
        //                 name="collectionId"
        //                 value={values.collectionId}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionId}
        //             />

        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Colour"
        //                 name="collectionName"
        //                 value={values.collectionName}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionName}
        //             />
        //         </Grid>
        //         <Grid item xs={6}>
        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Collection Type"
        //                 name="collectionName"
        //                 value={values.collectionName}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionName}
        //             />
        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Cover Image"
        //                 name="collectionName"
        //                 value={values.collectionName}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionName}
        //             />
        //         </Grid>
        //         <Grid item xs={12}>
        //             <div style={{ paddingTop: '20px' }}>
        //                 <Controls.Button
        //                     type="submit"
        //                     text="Add New Collection"
        //                 />

        //                 <Controls.Button
        //                     color="default"
        //                     text="Reset"
        //                     onClick={resetForm}
        //                 />
        //             </div>
        //         </Grid>
        //     </Grid>
        // </Form> */}

    );
};

export default DesignForm;