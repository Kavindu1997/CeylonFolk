import React from 'react';
import Lottie from 'react-lottie';
import NotFound from '../../images/error.json'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFound,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
const notfound = () => {
    return (
    
             <div>
               <Lottie options={defaultOptions} height={700} width={900} style={{marginTop:'20px',marginRight:'300px'}} />
            </div>
    
    );
};

export default notfound;