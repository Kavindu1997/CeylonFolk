import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Notification from "../../components/Reusable/Notification";
import useStyles from './style';

function EditCollectionForm({ selectedCollectionId }) {

    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [collectionName, setCollectionName] = useState([]);
  
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



        axios.put(`http://localhost:3001/collection/edit/${selectedCollectionId.collection_id}`, formData, config).then((response) => {
           
            if (response.data== 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully edited',
                    type: 'error'
                });
            }else if (response.data == 1) {
                setNotify({
                    isOpen: true,
                    message: 'Successfully Edited!',
                    type: 'success'
                });
            } 
            
            else if(response.data == 2) {
                setNotify({
                    isOpen: true,
                    message: 'This collection is already exist !',
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

    const [listOfCollection, setListOfCollection] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/collection/oneCollection/${selectedCollectionId.collection_id}`).then((response) => {
         
            setListOfCollection(response.data);
        });
    }, []);

    return (
        <div>
             <main className={classes.content}>
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
                        <Grid item xs={12}>

                        <img height={100} align="center" src={'http://localhost:3001/' + value.coverImage} alt=""></img>
                        </Grid>

                    
                        <Controls.Button
                            type="submit"
                            text="Edit"
                        />
                    </Grid>
   );
})}
                </form>
              
            </div>
            
            <Notification notify={notify} setNotify={setNotify} />
            </main>
        </div >
       
    );
};

export default EditCollectionForm;