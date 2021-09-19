import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const SizeForm = () => {

    const [size, setSize] = useState([]);
    let history = useHistory();
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const onFormSubmit = (e) => {

        // e.preventDefault();

        const Data = {
            size: size
        }

        console.log(Data);
        axios.post("http://localhost:3001/sizes", Data).then((response) => {

            if (response.data.data==0){
                setNotify({
                    isOpen: true,
                    message: 'Insert Failed !',
                    type: 'error'
                });
            }else{
                setNotify({
                    isOpen: true,
                    message: 'Added Successfully !',
                    type: 'success'
                  });
                      
            } 
          
        });
        // props.resetForm();
    };

    const changeSize = (e) => {
        setSize(e.target.value);
        console.log(e.target.value);
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
        </div >
 

    

    );
};

export default SizeForm;