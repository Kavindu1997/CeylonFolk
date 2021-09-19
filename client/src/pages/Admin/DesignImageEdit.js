import React, { useState, useEffect } from 'react';
// import { Grid } from '@material-ui/core';
import { Grid, Typography, Box } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useStyles from './style';
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from '../../_actions/colorActions'
import './adminStyles.css'

var collection_id = localStorage.getItem("collection_id");

function DesignImageEdit({ selectedDesignId }) {

    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [check, setCheck] = useState()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);


    let history = useHistory();

    const onFormSubmit = (e, data) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('collection_id', collection_id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        console.log(formData);

        axios.put(`http://localhost:3001/designs/editImage/${selectedDesignId.design_id}`, formData, config).then((response) => {
            alert('Image upload Successfull');
            history.push('/designs');


        }).catch((err) => {
            console.log('err', err);
        })
    };



    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

  
   

    const handleCheck = (e) => {
        // const { name, value } = e.target;

    setCheck(e.target.value);

    }

    return (
        <div>
            <div>
                <form onSubmit={onFormSubmit}>

                    <Grid container>

                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                name="photo"
                                type="file"
                                onChange={onInputChange}
                            />

                        </Grid>
                        
                    
                        <Grid item md={12} >


                            <Controls.Button
                                type="submit"
                                text="Change Design Image"
                            />
                        </Grid>


                    </Grid>

                </form>
            </div>
        </div >
       

    );
};

export default DesignImageEdit;