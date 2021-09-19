import React, { useState, useEffect } from 'react';
// import { Grid } from '@material-ui/core';
import { Grid, Typography, Box } from '@material-ui/core';
import Controls from '../../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useStyles from '../style';
import { useDispatch, useSelector } from "react-redux";
import '../adminStyles.css'

var colour_id = localStorage.getItem("colour_id");

const EditPrice = () => {

    const classes = useStyles();
    const [price, setPrice] = useState([]);
    const [check, setCheck] = useState()

    const dispatch = useDispatch();
 


    let history = useHistory();

    const onFormSubmit = (e) => {

        // e.preventDefault();

        const Data = {
           
            price: price,
        }

 

        axios.put(`http://localhost:3001/availableColors/editPrice/${colour_id}`, Data).then((response) => {
            alert('Image upload Successfull');
            history.push('/colors');


        }).catch((err) => {
            console.log('err', err);
        })
    };

 

    const changeColor = (e) => {
        setPrice(e.target.value);
        console.log(e.target.value);
    };


    const handleCheck = (e) => {
        // const { name, value } = e.target;

    setCheck(e.target.value);

    }

    const [listOfColor, setListOfColor] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/availableColors/fetchColors/${colour_id}`).then((response) => {
            console.log(response.data);
            setListOfColor(response.data);
        });
    }, []);

    return (
        <div>
            <div>
              
                <form onSubmit={onFormSubmit}>

                {listOfColor
                                            .map((value) => {
                                                return (
                    <Grid container>

                        <Grid item xs={6}>

                            <Controls.Input
                                variant="outlined"
                                label="Price"
                                name="price"
                                defaultValue={value.price}
                                onChange={changeColor}
                            />
                        </Grid>
                        
                        <Grid item md={12} >


                            <Controls.Button
                                type="submit"
                                text="Change Price"
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

export default EditPrice;