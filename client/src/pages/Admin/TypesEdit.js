import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Notification from "../../components/Reusable/Notification";

function TypesEdit({ selectedTypeId }) {

 
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
    let history = useHistory();

    const [listOfTypes, setListOfTypes] = useState([]);

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

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
        
            if (response.data.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully edited',
                    type: 'error'
                });
            }else if (response.data.data == 1) {
                setNotify({
                    isOpen: true,
                    message: 'Successfully Edited !',
                    type: 'success'
                });
            } 
            else  if (response.data.data == 2) {
                setNotify({
                    isOpen: true,
                    message: 'Invalid Price !',
                    type: 'error'
                });
            }
            else  if (response.data.data == 3) {
                setNotify({
                    isOpen: true,
                    message:  'This type is Already exist!',
                    type: 'error'
                });
            }

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

<Notification notify={notify} setNotify={setNotify} />
        </div >

    );
};

export default TypesEdit;