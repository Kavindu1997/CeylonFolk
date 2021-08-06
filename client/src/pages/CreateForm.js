import React from "react";
import { Formik,Form,Field } from "formik";
import { Button } from '@material-ui/core';
// import * as Yup from 'yup';
import axios from 'axios';

function CreateForm() {

    const initialValues = {
        title: '',
        price: '',
        size: '',
        quantity: '',
        image: '',
    }

    const onSubmit = (data,props) =>{
        console.log(data);
        axios.post("http://localhost:3001/ProductDetails", data).then((response) => {
            alert(response.data);
        });
        props.resetForm();
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form method="POST" action="/" encType="multipart/form-date">
                    <label>Title</label>
                    <Field id="inputCreateForm" name="title" placeholder=""></Field>
                    <label>Price</label>
                    <Field id="inputCreateForm" name="price" placeholder=""></Field>
                    <label>Size</label>
                    <Field id="inputCreateForm" name="size" placeholder=""></Field>
                    <label>Quantity</label>
                    <Field id="inputCreateForm" name="quantity" placeholder=""></Field>
                    <label>Image</label>
                    <Field id="inputCreateForm" type="file" name="image" placeholder=""></Field>
                    <Button type="submit">Create Post</Button>
                </Form>

            </Formik> 
        </div>
    );
}

export default CreateForm;