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


const OffersForm = () => {

    const classes = useStyles();

    const [collection_id, setCollectionID] = useState('');
    const [from, setFrom] = useState('');
    const [rate, setRate] = useState('');
    const [to, setTo] = useState('');
  
    const [check, setCheck] = useState()


    const oncollectionID = (e) => {
        setCollectionID(e.target.value)
    }

    const onrate = (e) => {
        setRate(e.target.value)
    }

    const onfrom = (e) => {
        setFrom(e.target.value)
    }

    const onto = (e) => {
        setTo(e.target.value)
    }
  


    const sendItem = (e) => {

        // e.preventDefault();

        const Data = {
            collection_id: collection_id,
            rate: rate,
            from: from,
            to:to,
            

        }

        console.log(Data);
        axios.post("http://localhost:3001/offers", Data).then(() => {
            alert('Item Inserted Successfully')
        });
        // props.resetForm();
    };

    const [listOfCollections, setListOfCollections] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/collection").then((response) => {
            // console.log(response.data);
            setListOfCollections(response.data);
        });
    }, []);

    return (
        <div>
            <form onSubmit={sendItem}>
                <Grid container>
                    <Grid item xs={6}>
                        <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                            <select className={classes.iconForOffers} name="collection_id" onChange={oncollectionID}>
                                <option value="">Collection</option>

                                {listOfCollections
                                    .map((value) => {
                                        return (

                                            <option value={value.id}>{value.collection_name}</option>
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
                            id="rate"
                            label="Rate"
                            name="rate"
                            autoComplete="rate"
                            onChange={onrate}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className={classes.date}
                            id="date"
                            label="Starting Date"
                            type="date"
                            name="from"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onfrom}
                        />
                       
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className={classes.date}
                            id="date"
                            label="Ending Date"
                            type="date"
                            name="to"
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
                        text="Add Offer"
                    />
                </Box>
            </form>
        </div>
    );
};

export default OffersForm;