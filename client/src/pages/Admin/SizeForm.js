import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Notification from "../../components/Reusable/Notification";


const SizeForm = () => {

    const [size, setSize] = useState([]);
    let history = useHistory();
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

   

    const onFormSubmit = (e) => {

        const Data = {
            size: size
        }

        axios.post("http://localhost:3001/sizes", Data).then((response) => {

            if (response.data.data==0){
                setNotify({
                    isOpen: true,
                    message: 'Insert Failed !',
                    type: 'error'
                });
            }
            else if (response.data.data == 1) {
                setNotify({
                    isOpen: true,
                    message: 'Successfully Added !',
                    type: 'success'
                });
            }
            else if (response.data.data == 2) {
                setNotify({
                    isOpen: true,
                    message: 'Already Exist !',
                    type: 'error'
                });
            }
          
        });
      
    };

    const changeSize = (e) => {
        setSize(e.target.value);
     
    };


    return (
        <div>
            <div>
                <form onSubmit={onFormSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Input
                                variant="outlined"
                                label="Size"
                                name="size"
                                required
                                onChange={changeSize}
                            />
                        </Grid>
                      
                        <Controls.Button
                            type="submit"
                            text="Add New Size"
                        />
                    </Grid>

                </form>
            </div>
            <Notification notify={notify} setNotify={setNotify} />
        </div >
 

    

    );
};

export default SizeForm;