import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Notification from "../../components/Reusable/Notification";
import useStyles from './style';

const CollectionForm = () => {

    const classes = useStyles();

    const [file, setfile] = useState(null);
    const [collectionName, setCollectionName] = useState([]);
    let history = useHistory();

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const onFormSubmit = (e) => {

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('collectionName', collectionName);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        
        axios.post("http://localhost:3001/collection", formData, config).then((response) => {

            if (response.data.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully added ! Image not found',
                    type: 'error'
                });
            }else if (response.data.data == 1) {
                setNotify({
                    isOpen: true,
                    message: 'Successfully Added !',
                    type: 'success'
                });
            } 
            
            else if(response.data.data == 2) {
                setNotify({
                    isOpen: true,
                    message: 'This collection is already exist !',
                    type: 'error'
                });
            }
            else if(response.data.data == 3) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully added ! Add Collection Name',
                    type: 'error'
                });
            }
 
        });

    
    };


    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

    const changeCollection = (e) => {
        setCollectionName(e.target.value);
      
    };


    return (
        <div>
            <div>
                <form onSubmit={onFormSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Input
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                label="Collection Name"
                                name="collectionName"
                                onChange={changeCollection}
                            />
                        </Grid>
                        <Grid item xs={6}>

                            <Controls.Input
                                variant="outlined"
                                name="photo"
                                required
                                type="file"
                                onChange={onInputChange}
                            />
                        </Grid>
                        
                        <Controls.Button
                            type="submit"
                            text="Add New Collection"
                        />
                    </Grid>

                </form>
             
            </div>
            <Notification notify={notify} setNotify={setNotify} />
        </div >
      
    );
};

export default CollectionForm;