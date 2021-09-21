import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useStyles from './style';
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from '../../_actions/colorActions'
import './adminStyles.css';
import Notification from "../../components/Reusable/Notification";

var collection_id = localStorage.getItem("collection_id");

function DesignImageEdit({ selectedDesignId }) {

    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [check, setCheck] = useState()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    let history = useHistory();

    const onFormSubmit = (e, data) => {

    
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('collection_id', collection_id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

       
        axios.put(`http://localhost:3001/designs/editImage/${selectedDesignId.design_id}`, formData, config).then((response) => {

            if (response.data.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully Edited',
                    type: 'error'
                });
            }else {
                setNotify({
                    isOpen: true,
                    message: 'Successfully Edited !',
                    type: 'success'
                });
            } 

    });
    };



    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

  
   

    const handleCheck = (e) => {
       

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
                                required
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
            <Notification notify={notify} setNotify={setNotify} />
        </div >
       

    );
};

export default DesignImageEdit;