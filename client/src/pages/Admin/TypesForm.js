import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const TypesForm = () => {

    const [file, setfile] = useState(null);
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
    let history = useHistory();

    const onFormSubmit = (e, data) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('types', types);
        formData.append('price', price);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };



        axios.post("http://localhost:3001/types", formData, config).then((response) => {
            alert('Upload Successfull');
            // history.push('/collections');


        }).catch((err) => {
            console.log('err', err);
        })
    };

    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

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
            <div>
                <form onSubmit={onFormSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                label="Type"
                                name="types"
                                onChange={changeType}
                            />
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
                            <Controls.Input
                                variant="outlined"
                                label="Price"
                                name="price"
                                onChange={changePrice}
                            />
                        </Grid>
                        {/* <input type='file' name='photo' onChange={onInputChange} /> */}


                        {/* <button type='submit'> Upload </button> */}
                        <Controls.Button
                            type="submit"
                            text="Add New Type"
                        />
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

export default TypesForm;