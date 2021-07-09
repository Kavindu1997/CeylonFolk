import React,{useState,useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {useForm,Form} from './Reusable/useForm';
import Controls from './Reusable/Controls';

const initialFvalues={
    collectionId:'',
    collectionName:'',
}



const CollectionForm = () => {

    const validate=(fieldValues=values)=>{
        let temp={...errors}
        if('collectionId' in fieldValues)
           temp.collectionId=fieldValues.collectionId ? "" : "This field is required"
        if('collectionName' in fieldValues)   
           temp.collectionName=fieldValues.collectionName ? "" : "This field is required"
        setErrors({
            ...temp
        })

        if(fieldValues===values)
           return Object.values(temp).every(x=> x==="");            //temp<- error messages
    }
    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }=useForm(initialFvalues,true,validate);

    const handleSubmit=e=>{
        e.preventDefault();
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
                    label="Collection Id"
                    name="collectionId"
                    value={values.collectionId}
                    onChange={handleInputChange}
                    error={errors.collectionId}
                    />
            </Grid>
            <Grid item xs={6}>
                <Controls.Input
                    variant="outlined"
                    label="Collection Name"
                    name="collectionName"
                    value={values.collectionName}
                    onChange={handleInputChange}
                    error={errors.collectionName}
                    />
            </Grid>
            <Grid item xs={12}>   
                        <div style={{paddingTop:'20px'}}>
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