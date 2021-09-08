import React, { useState, useEffect } from 'react';
// import { Grid } from '@material-ui/core';
import { Grid, Typography, Box } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from './style2';
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from '../../_actions/colorActions'

var design_id = localStorage.getItem("design_id");

var collection_id = localStorage.getItem("collection_id");


const EditOrderForm = ({ selectedOrderToEdit }) => {
   
    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [designName, setDesignName] = useState([]);
    // const [colour, setColour] = useState([]);
    const [color, setColor] = useState(["#ffffff"]);
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
    const [pickerColorArray, setPickerColorArray] = useState([]);
    const [check, setCheck] = useState()
    const [quantity, setQuantity] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);


    let history = useHistory();

    const onFormSubmit = (e, data) => {

        e.preventDefault();

    };

    const [productO, setProductO] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/ProductDetails/byId/${selectedOrderToEdit.itemId}`).then((response) => {
          setProductO(response.data);
          console.log('hello from product')
          console.log(response.data)
          console.log('hello from product')
        });
        axios.get(`http://localhost:3001/ProductDetails/quantity/${selectedOrderToEdit.itemId}`).then((response) => {
            setQuantity(response.data);
            console.log('hello handle2')
            console.log(response.data)
            console.log('hello handle2')
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

        axios.get(`http://localhost:3001/designs/oneDesign/34`).then((response) => {
            // console.log(response.data);
            setListOfDesign(response.data);
        });
    }, []);

    return (
        <div>
            <div>
                <form onSubmit={onFormSubmit}>
                                <Grid container>

                                    <Grid item xs={4}>

                                        <Controls.Input
                                            variant="outlined"
                                            label="Order ID"
                                            name="orderId"
                                            defaultValue={selectedOrderToEdit.oId}
                                            onChange={changeCollectionDesign}
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                    <Controls.Input
                                            variant="outlined"
                                            label="Quantity"
                                            name="quantity"
                                            defaultValue={selectedOrderToEdit.quantity}
                                            onChange={changeCollectionDesign}
                                
                                        />
                                       
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Controls.Input
                                            variant="outlined"
                                            label="Size"
                                            name="size"
                                            defaultValue={selectedOrderToEdit.size}
                                            onChange={changeCollectionPrice}
                                        />
                                    </Grid>
                                   
                                    <Grid item md={12} >
                                        <Controls.Button
                                            type="submit"
                                            text="Confrim Edit"
                                            style={{marginTop:"10px",marginLeft:"40%"}}
                                        />
                                    </Grid>


                                </Grid>

                </form>
            </div>
        </div >


    );
};

export default EditOrderForm;