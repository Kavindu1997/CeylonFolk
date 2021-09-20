import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function TypesEdit({ selectedTypeId }) {

 
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
    let history = useHistory();

    const [listOfTypes, setListOfTypes] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/types/${selectedTypeId.types_id}`).then((response) => {
        
            setListOfTypes(response.data);
        })
    }, []);

    const onFormSubmit = (e) => {

      

        const Data = {
            types: types,
            price: price,
        }

       
        axios.put(`http://localhost:3001/types/${selectedTypeId.types_id}`, Data).then((response) => {
        

        });
    };


    const changeType = (e) => {
        setTypes(e.target.value);
      
    };
    const changePrice = (e) => {
        setPrice(e.target.value);
      
    };


    return (
        <div>
             {listOfTypes
                                            .map((value) => {
                                                return (
            <div>
                <form onSubmit={onFormSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                label="Type"
                                name="types"
                                defaultValue={value.types}
                                onChange={changeType}
                            />
                        </Grid>
                        
                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                label="Price"
                                name="price"
                                defaultValue={value.price}
                                onChange={changePrice}
                            />
                        </Grid>
                    
                        <Controls.Button
                            type="submit"
                            text="Edit Type"
                        />
                    </Grid>

                </form>
            </div>
                 );
                })}
        </div >

    );
};

export default TypesEdit;