import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "yup-phone";
import { makeStyles, TextField, Button } from '@material-ui/core';
import useStyles from './style';


var inventory_id = localStorage.getItem("inventory_id");
console.log(inventory_id);



const initialValues1 = {
    colour: '',
    size: '',
    type: '',
    quantity: '',
    margin: '',

}

const validationSchema1 = Yup.object().shape({
    colour: Yup.string().required("Colour is required"),
    size: Yup.string().required("Size is required"),
    type: Yup.string().required("Type is required"),
    quantity: Yup.string().required("Quantity is required"),
    margin: Yup.string().required("Margin is required"),

});

const onSubmit1 = (data, props) => {
    axios.put(`http://localhost:3001/invent/inventory/${inventory_id}`, data).then(() => {
        console.log(data);
    });
    props.resetForm();
};



const InventoryEdit = () => {

    const classes = useStyles();
    const [listOfInventory, setListOfInventory] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/invent/inventoryEdit/${inventory_id}`).then((response) => {
            console.log(response.data);
            setListOfInventory(response.data);
        })
    }, []);


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
                    {listOfInventory
                        .map((value) => {
                            return (
                                <Grid container>

                                    <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>

                                         <Field as={TextField}
                                            className={classes.textField}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="colour"
                                            name="colour"
                                            label="Colour"
                                            // defaultValue="Default Value"
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


                                    </Grid>
                                    <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>

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

                                    <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>


                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >Update</Button>
                                    </Grid>


                                </Grid>

                            );
                        })}

                </Form>
            )}
        </Formik>

    );
};

export default InventoryEdit;