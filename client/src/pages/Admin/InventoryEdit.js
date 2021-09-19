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
import { useForm, Form } from '../../components/Reusable/useForm';
import './adminStyles.css'


function InventoryEdit ({ selectedInventoryId }) {

    const classes = useStyles();

    const [quantity, setQuantity] = useState('');
    const [margin, setMargin] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);

  
    const onmargin = (e) => {
        setMargin(e.target.value)
    }

    const onquantity = (e) => {
        setQuantity(e.target.value)
    }
    // console.log(pickerColorArray)

    const onSubmit1 = (e) => {

        // e.preventDefault();

        const Data = {
            margin: margin,
            quantity: quantity,
        }

        console.log(Data);
        axios.put(`http://localhost:3001/invent/inventory/${selectedInventoryId.inventory_id}`, Data).then(() => {
            // alert('Item Inserted Successfully')
        });
        // props.resetForm();
    };



   

    const [listOfItem, setListOfItem] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/invent/inventoryItem/${selectedInventoryId.inventory_id}`).then((response) => {
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
                    </Grid>
                    <Grid item xs={6}>

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

















