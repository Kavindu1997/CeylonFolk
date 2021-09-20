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
import Notification from "../../../components/Reusable/Notification";

import '../adminStyles.css'

function OffersEdit({ selectedCollectionId }) {

    const classes = useStyles();

    const [rate, setRate] = useState('');
    const [to, setTo] = useState('');
  
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const onrate = (e) => {
        setRate(e.target.value)
    }

    const onto = (e) => {
        setTo(e.target.value)
    }
  


    const sendItem = (e) => {

      const Data = {
            collection_id: selectedCollectionId.collection_id,
            rate: rate,
            to:to,
            

        }

       
        axios.put(`http://localhost:3001/offers/${selectedCollectionId.collection_id}`, Data).then((response) => {

            if (response.data.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully Edited',
                    type: 'error'
                });
            }else {
                setNotify({
                    isOpen: true,
                    message: 'Successfully Edited !',
                    type: 'success'
                });
            } 
           
        });
        
    };

    const [listOfItem, setListOfItem] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/offers/offerItem/${selectedCollectionId.collection_id}`).then((response) => {
          
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

<Notification notify={notify} setNotify={setNotify} />
        </div>
    );
};

export default OffersEdit;