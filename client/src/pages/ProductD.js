import React from "react";
import { Formik,Form,Field } from "formik";
import { Button } from '@material-ui/core';
// import * as Yup from 'yup';
import axios from 'axios';
import {useEffect,useState} from "react";

function ProductD() {

    const [listOfForms, setListOfForms] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/ProductDetails").then((response) => {
            setListOfForms(response.data);
        });
    },[]);

    return (
        <div>
            {listOfForms.map((value) => {
                return(
                    <div key = {value.id}>
                        <div>{value.title}</div>
                        <div>{value.price}</div>
                        <div>{value.quantity}</div>
                        <div>{value.image}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProductD;