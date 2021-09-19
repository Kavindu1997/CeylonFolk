import React, { useState, useEffect } from 'react';
import { Grid,Typography } from '@material-ui/core';
import { useForm, Form } from '../../../components/Reusable/useForm';
import Controls from '../../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from '../style';

var contactus_id = localStorage.getItem("contactus_id");

const ViewMessageResponse = () => {

    const classes = useStyles();
    const [response, setResponse] = useState([]);
    
    let history = useHistory();

            
    const [listOfSolvedInquiries, setListOfSolvedInquiries] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/notifications/solvedInquiries/${contactus_id}`).then((response) => {
            console.log(response.data);
            setListOfSolvedInquiries(response.data);
        })
    }, []);

    return (
        <div>
          
             {listOfSolvedInquiries
                                            .map((value) => {
                                                return (
            <div>
           
            <Typography variant="h6" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Message</Typography>
            <Typography variant="h7" style={{ fontFamily: 'Montserrat' }}>{value.message}</Typography>

            <Typography variant="h6" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Response</Typography>
            <Typography variant="h7" style={{ fontFamily: 'Montserrat' }}>{value.response}</Typography>
         
                 
            </div>
              );
            })}
        </div >
        // {/* <Form onSubmit={handleSubmit}>
        //     <Grid container>
        //         <Grid item xs={6}>
        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Collection Name"
        //                 name="collectionId"
        //                 value={values.collectionId}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionId}
        //             />

        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Colour"
        //                 name="collectionName"
        //                 value={values.collectionName}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionName}
        //             />
        //         </Grid>
        //         <Grid item xs={6}>
        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Collection Type"
        //                 name="collectionName"
        //                 value={values.collectionName}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionName}
        //             />
        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Cover Image"
        //                 name="collectionName"
        //                 value={values.collectionName}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionName}
        //             />
        //         </Grid>
        //         <Grid item xs={12}>
        //             <div style={{ paddingTop: '20px' }}>
        //                 <Controls.Button
        //                     type="submit"
        //                     text="Add New Collection"
        //                 />

        //                 <Controls.Button
        //                     color="default"
        //                     text="Reset"
        //                     onClick={resetForm}
        //                 />
        //             </div>
        //         </Grid>
        //     </Grid>
        // </Form> */}

    );
};

export default ViewMessageResponse;