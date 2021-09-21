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

function DesignNameEdit({ selectedDesignId }) {

    const classes = useStyles();
    const [designName, setDesignName] = useState([]);
    const [check, setCheck] = useState()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);


    let history = useHistory();

    const onFormSubmit = (e) => {


        const Data = {
           
            designName: designName,
        }

        axios.put(`http://localhost:3001/designs/editDesignName/${selectedDesignId.design_id}`, Data).then((response) => {
            
            if (response.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully edited!',
                    type: 'error'
                });
            }
            else if (response.data == 1) {
                setNotify({
                    isOpen: true,
                    message: 'Successfully Edited!',
                    type: 'success'
                });
            }
            else if (response.data == 2) {
                setNotify({
                    isOpen: true,
                    message: 'Design name is already exist !',
                    type: 'error'
                });
            }


        });
    };

 

    const changeCollectionDesign = (e) => {
        setDesignName(e.target.value);
      
    };


    const handleCheck = (e) => {
        // const { name, value } = e.target;

    setCheck(e.target.value);

    }

    const [listOfDesign, setListOfDesign] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/designs/oneDesign/${selectedDesignId.design_id}`).then((response) => {
           
            setListOfDesign(response.data);
        });
    }, []);

    return (
        <div>
             <main className={classes.content}>
            <div>
                <form onSubmit={onFormSubmit}>

                {listOfDesign
                                            .map((value) => {
                                                return (
                    <Grid container>

                        <Grid item xs={6}>

                            <Controls.Input
                                variant="outlined"
                                label="Design Name"
                                name="designName"
                                defaultValue={value.design_name}
                                onChange={changeCollectionDesign}
                            />
                        </Grid>
                        
                        <Grid item md={12} >


                            <Controls.Button
                                type="submit"
                                text="Change Design Name"
                            />
                        </Grid>


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

export default DesignNameEdit;