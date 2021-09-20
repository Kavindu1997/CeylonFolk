import React, { useState} from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const TypesForm = () => {

    const [file, setfile] = useState(null);
    const [types, setTypes] = useState([]);
    const [price, setPrice] = useState([]);
    let history = useHistory();

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
                                onChange={changeType}
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
                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                label="Price"
                                name="price"
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
        </div >
       
    );
};

export default TypesForm;