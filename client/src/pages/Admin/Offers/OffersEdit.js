import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Radio } from '@material-ui/core';
import Controls from '../../../components/Reusable/Controls';
import axios from 'axios';
import "yup-phone";
import useStyles from '../style';
import { CirclePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';


import '../adminStyles.css'


var collection_id = localStorage.getItem("collection_id");
// console.log(inventory_id);


const OffersEdit = () => {

    const classes = useStyles();

    const [rate, setRate] = useState('');
    const [to, setTo] = useState('');
  
 
    const onrate = (e) => {
        setRate(e.target.value)
    }

    const onto = (e) => {
        setTo(e.target.value)
    }
  


    const sendItem = (e) => {

        // e.preventDefault();

        const Data = {
            collection_id: collection_id,
            rate: rate,
            to:to,
            

        }

        console.log(Data);
        axios.put(`http://localhost:3001/offers/${collection_id}`, Data).then(() => {
            alert('Item Updated Successfully')
        });
        // props.resetForm();
    };

    const [listOfItem, setListOfItem] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/offers/offerItem/${collection_id}`).then((response) => {
            // console.log(response.data);
            setListOfItem(response.data);
        });
    }, []);

    return (
        <div>
               {listOfItem
                                            .map((value) => {
                                                return (
            <form onSubmit={sendItem}>
                <Grid container>
                
                        <Controls.Input
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            id="rate"
                            label="Rate"
                            name="rate"
                            autoComplete="rate"
                            defaultValue={value.rate}
                            onChange={onrate}
                        />
                   
                  
                    <Grid item xs={6}>
                        <TextField
                            className={classes.date}
                            id="date"
                            label="Ending Date"
                            type="date"
                            name="to"
                            defaultValue={value.to}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onto}
                        />
                    </Grid>

                </Grid>
                <Box>
                    <Controls.Button
                        type="submit"
                        text="Edit Offer"
                    />
                </Box>
            </form>
              );
            })}
        </div>
    );
};

export default OffersEdit;