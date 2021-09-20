import React, { useState} from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Notification from "../../components/Reusable/Notification";

const TypesForm = () => {

    const [file, setfile] = useState(null);
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
    let history = useHistory();

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const onFormSubmit = (e) => {

       
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('types', types);
        formData.append('price', price);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };



        axios.post("http://localhost:3001/types", formData, config).then((response) => {

            if (response.data.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully added!',
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
                    message: 'Invalid Price !',
                    type: 'error'
                });
            }
            else if(response.data.data == 3) {
                setNotify({
                    isOpen: true,
                    message: 'Already exist',
                    type: 'error'
                });
            }
            
        });
    };

    const onInputChange = (e) => {
        setfile(e.target.files[0])
    };

    const changeType = (e) => {
        setTypes(e.target.value);
        
    };
    const changePrice = (e) => {
        setPrice(e.target.value);
      
    };


    return (
        <div>
            <div>
                <form onSubmit={onFormSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                label="Type"
                                name="types"
                                required
                                onChange={changeType}
                            />
                        </Grid>
                        <Grid item xs={6}>

                            <Controls.Input
                                variant="outlined"
                                name="photo"
                                type="file"
                                required
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                label="Price"
                                name="price"
                                required
                                onChange={changePrice}
                            />
                        </Grid>
                        
                        <Controls.Button
                            type="submit"
                            text="Add New Type"
                        />
                    </Grid>

                </form>
            </div>
            <Notification notify={notify} setNotify={setNotify} />
        </div >
       
    );
};

export default TypesForm;