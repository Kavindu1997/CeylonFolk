import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from './Reusable/useForm';
import Controls from './Reusable/Controls';
import axios from 'axios';

const initialFvalues = {
    collectionId: '',
    collectionName: '',
}



const CollectionForm = () => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('collectionId' in fieldValues)
            temp.collectionId = fieldValues.collectionId ? "" : "This field is required"
        if ('collectionName' in fieldValues)
            temp.collectionName = fieldValues.collectionName ? "" : "This field is required"
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "");            //temp<- error messages
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFvalues, true, validate);


    const handleSubmit = (e,data) => {

        e.preventDefault();
        axios.post("http://localhost:3001/collections/", data).then(() => {
            console.log(data);
        });
        // if(validate()){  
        //       addOrEdit(values,resetForm);
        // }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        variant="outlined"
                        label="Collection Name"
                        name="collectionId"
                        value={values.collectionId}
                        onChange={handleInputChange}
                        error={errors.collectionId}
                    />

                    <Controls.Input
                        variant="outlined"
                        label="Colour"
                        name="collectionName"
                        value={values.collectionName}
                        onChange={handleInputChange}
                        error={errors.collectionName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        variant="outlined"
                        label="Collection Type"
                        name="collectionName"
                        value={values.collectionName}
                        onChange={handleInputChange}
                        error={errors.collectionName}
                    />
                     <Controls.Input
                    variant="outlined"
                    label="Cover Image"
                    name="collectionName"
                    value={values.collectionName}
                    onChange={handleInputChange}
                    error={errors.collectionName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div style={{ paddingTop: '20px' }}>
                        <Controls.Button
                            type="submit"
                            text="Add New Collection"
                        />

                        <Controls.Button
                            color="default"
                            text="Reset"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
};

export default CollectionForm;