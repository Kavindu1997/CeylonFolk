import React, { useState, useEffect } from 'react';
import { Grid,Box} from '@material-ui/core';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import "yup-phone";
import useStyles from './style';
import { useDispatch} from "react-redux";
import { fetchColors } from '../../_actions/colorActions'
import './adminStyles.css'


function InventoryEdit ({ selectedInventoryId }) {

    const classes = useStyles();

    const [quantity, setQuantity] = useState('');
    const [margin, setMargin] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);

  
    const onmargin = (e) => {
        setMargin(e.target.value)
    }

    const onquantity = (e) => {
        setQuantity(e.target.value)
    }
   

    const onSubmit1 = (e) => {

       

        const Data = {
            margin: margin,
            quantity: quantity,
        }

        axios.put(`http://localhost:3001/invent/inventory/${selectedInventoryId.inventory_id}`, Data).then(() => {
           
        });
      
    };



   

    const [listOfItem, setListOfItem] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/invent/inventoryItem/${selectedInventoryId.inventory_id}`).then((response) => {
          
            setListOfItem(response.data);
        });
    }, []);

    return (
        <div>
              {listOfItem
                                            .map((value) => {
                                                return (
            <form onSubmit={onSubmit1}>
  
                <Grid container>
                    <Grid item xs={6}>               
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Input
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            id="quantity"
                            label="quantity"
                            name="quantity"
                            autoComplete="quantity"
                            defaultValue={value.quantity}
                            onChange={onquantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Input
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            id="margin"
                            label="margin"
                            name="margin"
                            autoComplete="margin"
                            defaultValue={value.margin}
                            onChange={onmargin}
                        />
                    </Grid>
                </Grid>
                <Box>
                    <Controls.Button
                        type="submit"
                        text="Edit"
                    />
                </Box>
                   
            </form>
               );
            })}
        </div>
    );
};

export default InventoryEdit;

















