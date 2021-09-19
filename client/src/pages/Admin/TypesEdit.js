import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

var types_id = localStorage.getItem("types_id");

const TypesEdit = () => {

    // const [file, setfile] = useState(null);
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
    let history = useHistory();

    const [listOfTypes, setListOfTypes] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/types/${types_id}`).then((response) => {
            console.log(response.data);
            setListOfTypes(response.data);
        })
    }, []);

    const onFormSubmit = (e) => {

        // e.preventDefault();

        const Data = {
            types: types,
            price: price,
        }

        // // const formData = new FormData();
        // // formData.append('photo', file);
        // formData.append('types', types);
        // formData.append('price', price);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //     },
        // };



        axios.put(`http://localhost:3001/types/${types_id}`, Data).then((response) => {
            alert('Upload Successfull');
            // history.push('/collections');


        }).catch((err) => {
            console.log('err', err);
        })
    };

    // const onInputChange = (e) => {
    //     setfile(e.target.files[0])
    // };

    const changeType = (e) => {
        setTypes(e.target.value);
        console.log(e.target.value);
    };
    const changePrice = (e) => {
        setPrice(e.target.value);
        console.log(e.target.value);
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
                        {/* <Grid item xs={6}>

                            <Controls.Input
                                variant="outlined"
                                name="photo"
                                type="file"
                                onChange={onInputChange}
                            />
                        </Grid> */}
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