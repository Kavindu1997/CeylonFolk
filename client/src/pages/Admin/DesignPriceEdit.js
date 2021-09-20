import React, { useState, useEffect } from 'react';
import { Grid} from '@material-ui/core';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import { useDispatch} from "react-redux";
import { fetchColors } from '../../_actions/colorActions'
import './adminStyles.css'

function DesignPriceEdit({ selectedDesignId }) {

    const classes = useStyles();
    const [price, setPrice] = useState([]);
   

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);


    const onFormSubmit = (e) => {

        const Data = {
           
            price: price,
        }

        axios.put(`http://localhost:3001/designs/editPrice/${selectedDesignId.design_id}`,Data).then((response) => {
        
        });
    };



    const changeCollectionPrice = (e) => {
        setPrice(e.target.value);
       
    };


    const [listOfDesign, setListOfDesign] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/designs/oneDesign/${selectedDesignId.design_id}`).then((response) => {
        
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
                                label="Price"
                                name="price"
                                defaultValue={value.price}
                                onChange={changeCollectionPrice}
                            />
                        </Grid>
                        <Grid item md={12} >


                            <Controls.Button
                                type="submit"
                                text="Change Design Price"
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

export default DesignPriceEdit;