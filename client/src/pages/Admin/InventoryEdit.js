import React, { useState, useEffect } from 'react';
import { Grid,Box} from '@material-ui/core';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import "yup-phone";
import useStyles from './style';
import { useDispatch} from "react-redux";
import { fetchColors } from '../../_actions/colorActions'
import './adminStyles.css'
import Notification from "../../components/Reusable/Notification";


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
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const onSubmit1 = (e) => {

       

        const Data = {
            margin: margin,
            quantity: quantity,
        }

        axios.put(`http://localhost:3001/invent/inventory/${selectedInventoryId.inventory_id}`, Data).then((response) => {

            if (response.data.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Not successfully edited !',
                    type: 'error'
                });
            } else if(response.data.data == 1){
                setNotify({
                    isOpen: true,
                    message: 'Successfully edited !',
                    type: 'success'
                });
            }
            else  if (response.data.data == 2) {
                setNotify({
                    isOpen: true,
                    message: 'This margin is greater than Current quantity!',
                    type: 'error'
                });
            } 
            else  if (response.data.data == 3) {
                setNotify({
                    isOpen: true,
                    message: 'Margin should be greater than 0!',
                    type: 'error'
                });
            } 
            else  if (response.data.data == 4) {
                setNotify({
                    isOpen: true,
                    message: 'This quantity is less than Current margin!',
                    type: 'error'
                });
            } 
            else  if (response.data.data == 5) {
                setNotify({
                    isOpen: true,
                    message: 'Quantity should be greater than 0!',
                    type: 'error'
                });
            }
            else  if (response.data.data == 6) {
                setNotify({
                    isOpen: true,
                    message: 'Quantity shouldnt be less than margin!',
                    type: 'error'
                });
            } 
            else  if (response.data.data == 7) {
                setNotify({
                    isOpen: true,
                    message: 'Quantity should be greater than 0!',
                    type: 'error'
                });
            } 
            else  if (response.data.data == 8) {
                setNotify({
                    isOpen: true,
                    message: 'Margin should be greater than 0!',
                    type: 'error'
                });
            }  
           
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
            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
};

export default InventoryEdit;

















