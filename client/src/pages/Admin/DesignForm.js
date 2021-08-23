import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

var collection_id = localStorage.getItem("collection_id");
console.log(collection_id);


const DesignForm = () => {

    const [file, setfile] = useState(null);
    const [designName, setDesignName] = useState([]);
    const [colour, setColour] = useState([]);
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);


    let history = useHistory();

    const onFormSubmit = (e, data) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('designName', designName);
        formData.append('colour', colour);
        formData.append('types', types);
        formData.append('price', price);
        formData.append('collection_id',collection_id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };


        console.log("check");
        console.log(formData);

        axios.post("http://localhost:3001/designs", formData, config).then((response) => {
            alert('Image upload Successfull');
            history.push('/designs');


        }).catch((err) => {
            console.log('err', err);
        })
    };

    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

    const changeCollectionDesign = (e) => {
        setDesignName(e.target.value);
        console.log(e.target.value);
    };

    const changeCollectionColour = (e) => {
        setColour(e.target.value);
        console.log(e.target.value);
    };

    const changeCollectionTypes = (e) => {
        setTypes(e.target.value);
        console.log(e.target.value);
    };

    const changeCollectionPrice = (e) => {
        setPrice(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div>
            <div>
                <form onSubmit={onFormSubmit}>


                    <Grid container>

                        <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>

                            <Controls.Input
                                variant="outlined"
                                label="Design Name"
                                name="designName"
                                onChange={changeCollectionDesign}
                            />
                           

                            <Controls.Input
                                variant="outlined"
                                label="Colour"
                                name="colour"
                                onChange={changeCollectionColour}
                            />
                            <Controls.Input
                                variant="outlined"
                                name="photo"
                                type="file"
                                onChange={onInputChange}
                            />

                        </Grid>
                        <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>

                            <Controls.Input
                                variant="outlined"
                                label="Type"
                                name="types"
                                onChange={changeCollectionTypes}
                            />
                            <Controls.Input
                                variant="outlined"
                                label="Price"
                                name="price"
                                onChange={changeCollectionPrice}
                            />
                        </Grid>
                        <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>


                            <Controls.Button
                                type="submit"
                                text="Add New Design"
                            />
                        </Grid>


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

export default DesignForm;