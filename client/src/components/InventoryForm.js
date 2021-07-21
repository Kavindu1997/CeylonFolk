import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm } from './Reusable/useForm';
import Controls from './Reusable/Controls';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "yup-phone";
import { makeStyles, TextField, Button } from '@material-ui/core';

const initialValues1 = {
    code: '',
    colour: '',
    size: '',
    type: '',
    quantity: '',
    margin: '',

}

const validationSchema1 = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    colour: Yup.string().required("Colour is required"),
    size: Yup.string().required("Size is required"),
    type: Yup.string().required("Type is required"),
    quantity: Yup.string().required("Quantity is required"),
    margin: Yup.string().required("Margin is required"),

});

const onSubmit1 = (data, props) => {
    axios.post("http://localhost:3001/invent/inventory", data).then(() => {
        console.log(data);
    });
    props.resetForm();
};



const useStyles = makeStyles((theme) => ({
    infoContent: {
        backgroundColor: '#f5f6fa',
        textAlign: 'center',
        padding: theme.spacing(5),
        '& .MuiTypography-h5': {
            fontFamily: 'Segoe UI',
        },
        '& .MuiIconButton-root': {
            color: '#1e272e',
        },
        '& .MuiTypography-subtitle1': {
            fontFamily: 'Nunito',
            color: '#596275'
        },
    },
    headStyle: {
        fontFamily: 'Nunito',
        color: '#222f3e',
        textAlign: 'center',
        fontSize: '2.5rem',
        '&:hover': {
            color: '#48dbfb',
        }
    },
    textStyle: {
        fontFamily: 'Segoe UI',
        color: '#2C2D2D',
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    submit: {
        align: 'center',
        padding: '10px',
        marginTop: '20px',
    },
    textField: {
        '& p': {
            color: 'red'
        }
    },
}));

const InventoryForm = () => {

    const classes = useStyles();

    // const validate=(fieldValues=values)=>{
    //     let temp={...errors}
    //     if('collectionId' in fieldValues)
    //        temp.collectionId=fieldValues.collectionId ? "" : "This field is required"
    //     if('collectionName' in fieldValues)   
    //        temp.collectionName=fieldValues.collectionName ? "" : "This field is required"
    //     setErrors({
    //         ...temp
    //     })

    //     if(fieldValues===values)
    //        return Object.values(temp).every(x=> x==="");            //temp<- error messages
    // }
    // const{
    //     values,
    //     setValues,
    //     errors,
    //     setErrors,
    //     handleInputChange,
    //     resetForm
    // }=useForm(initialFvalues,true,validate);

    // const handleSubmit=e=>{
    //     e.preventDefault();
    //     if(validate()){  
    //           addOrEdit(values,resetForm);
    //     }
    //   }

    return (

        <Formik initialValues={initialValues1} onSubmit={onSubmit1} validationSchema={validationSchema1}>
            {(props) => (
                <Form>

                    <Grid container>

                    <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>


                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="code"
                                label="Code"
                                name="code"
                                autoComplete="code"
                                helperText={<ErrorMessage name="code" />}
                            />
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="colour"
                                label="Colour"
                                name="colour"
                                autoComplete="colour"
                                helperText={<ErrorMessage name="colour" />}
                            />
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="size"
                                label="Size"
                                name="size"
                                autoComplete="size"
                                helperText={<ErrorMessage name="size" />}
                            />

<Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Add to the Inventory</Button>

                        </Grid>
                        <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="type"
                                label="Type"
                                name="type"
                                autoComplete="type"
                                helperText={<ErrorMessage name="type" />}
                            />
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="quantity"
                                label="Quantity"
                                name="quantity"
                                autoComplete="quantity"
                                helperText={<ErrorMessage name="quantity" />}
                            />
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="margin"
                                label="Margin"
                                name="margin"
                                autoComplete="margin"
                                helperText={<ErrorMessage name="margin" />}
                            />
                        </Grid>

                      
                    </Grid>

                </Form>
            )}
        </Formik>

    );
};

export default InventoryForm;