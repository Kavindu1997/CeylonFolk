import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

var collection_id = localStorage.getItem("collection_id");

const EditCollectionForm = () => {

    const [file, setfile] = useState(null);
    const [collectionName, setCollectionName] = useState([]);
    let history = useHistory();

    const onFormSubmit = (e, data) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('collectionName', collectionName);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };



        axios.put(`http://localhost:3001/collection/edit/${collection_id}`, formData, config).then((response) => {
            alert('Image upload Successfull');
            // history.push('/collections');


        }).catch((err) => {
            console.log('err', err);
        })
    };

   
   
    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

    const changeCollection = (e) => {
        setCollectionName(e.target.value);
        console.log(e.target.value);
    };

    const [listOfCollection, setListOfCollection] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/collection/oneCollection/${collection_id}`).then((response) => {
            // console.log(response.data);
            setListOfCollection(response.data);
        });
    }, []);

    return (
        <div>
            <div>
                <form onSubmit={onFormSubmit}>
                {listOfCollection
                                            .map((value) => {
                                                return (
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                label="Collection Name"
                                name="collectionName"
                                defaultValue={value.collection_name}
                                onChange={changeCollection}
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
                        {/* <input type='file' name='photo' onChange={onInputChange} /> */}


                        {/* <button type='submit'> Upload </button> */}
                        <Controls.Button
                            type="submit"
                            text="Edit"
                        />
                    </Grid>
   );
})}
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

export default EditCollectionForm;