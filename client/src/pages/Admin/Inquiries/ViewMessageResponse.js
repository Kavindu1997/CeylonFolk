import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from '../style';

function ViewMessageResponse({ selectedInquiryId }) {

    const classes = useStyles();
    const [response, setResponse] = useState([]);
    
    let history = useHistory();

            
    const [listOfSolvedInquiries, setListOfSolvedInquiries] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/notifications/solvedInquiries/${selectedInquiryId.contactus_id}`).then((response) => {
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
        
    );
};

export default ViewMessageResponse;