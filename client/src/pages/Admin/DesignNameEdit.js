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

function DesignNameEdit({ selectedDesignId }) {

    const classes = useStyles();
    const [designName, setDesignName] = useState([]);
    const [check, setCheck] = useState()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);


    let history = useHistory();

    const onFormSubmit = (e) => {

        e.preventDefault();

        const Data = {
           
            designName: designName,
        }

        axios.put(`http://localhost:3001/designs/editDesignName/${selectedDesignId.design_id}`, Data).then((response) => {
            alert('Image upload Successfull');
            history.push('/designs');


        }).catch((err) => {
            console.log('err', err);
        })
    };

 

    const changeCollectionDesign = (e) => {
        setDesignName(e.target.value);
        console.log(e.target.value);
    };


    const handleCheck = (e) => {
        // const { name, value } = e.target;

    setCheck(e.target.value);

    }

    const [listOfDesign, setListOfDesign] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/designs/oneDesign/${selectedDesignId.design_id}`).then((response) => {
            // console.log(response.data);
            setListOfDesign(response.data);
        });
    }, []);

    return (
        <div>
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
        </div >
       

    );
};

export default DesignNameEdit;