import React, { useState, useEffect } from 'react';
import { Grid} from '@material-ui/core';
import Controls from '../../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from '../style';
import { useDispatch } from "react-redux";
import '../adminStyles.css'


function  EditColourName ({ selectedColourId }) {

    const classes = useStyles();
    const [colorName, setColorName] = useState([]);
    const dispatch = useDispatch();
 
    let history = useHistory();

    const onFormSubmit = (e) => {

        const Data = {
           
            colorName: colorName,
        }

        axios.put(`http://localhost:3001/availableColors/editColorName/${selectedColourId.colour_id}`, Data).then((response) => {
    
            history.push('/availableColors');


        }).catch((err) => {
         
        })
    };

 

    const changeColor = (e) => {
        setColorName(e.target.value);
      
    };

    const [listOfColor, setListOfColor] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/availableColors/fetchColors/${selectedColourId.colour_id}`).then((response) => {
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
                                label="Colour Name"
                                name="colorName"
                                defaultValue={value.color_name}
                                onChange={changeColor}
                            />
                        </Grid>
                        
                        <Grid item md={12} >


                            <Controls.Button
                                type="submit"
                                text="Change Colour Name"
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

export default EditColourName;