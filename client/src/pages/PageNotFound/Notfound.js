import React from 'react';
import Lottie from 'react-lottie';
import NotFound from '../../images/error.json'
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFound,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const Notfound = () => {
    let history=useHistory();
    return (
        <div>
            <div>
               <IconButton onClick={()=>{history.goBack()}}>
                       <ArrowBackIcon fontSize="large" color="secondary"/>
                       <span>Go Back</span>
               </IconButton>
               <Lottie options={defaultOptions} height={700} width={900} style={{marginTop:'20px',marginRight:'300px'}} />
            </div>
        </div>
    );
};

export default Notfound;