import React,{useState,useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {useForm,Form} from './Reusable/useForm';
import Controls from './Reusable/Controls';


const initialFvalues={
    couponId:'',
    couponTitle:'',
}


const CouponForm = () => {
    const validate=(fieldValues=values)=>{
        let temp={...errors}
        if('couponId' in fieldValues)
           temp.couponId=fieldValues.couponId ? "" : "This field is required"
        if('couponTitle' in fieldValues)   
           temp.couponTitle=fieldValues.couponTitle ? "" : "This field is required"
        setErrors({
            ...temp
        })

        if(fieldValues===values)
           return Object.values(temp).every(x=> x==="");            //temp<- error messages
    }
    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }=useForm(initialFvalues,true,validate);

    const handleSubmit=e=>{
        e.preventDefault();
        // if(validate()){  
        //       addOrEdit(values,resetForm);
        // }
      }

    return (
        <Form onSubmit={handleSubmit}> 
        <Grid container>
            <Grid item xs={6}>
                <Controls.Input
                    variant="outlined"
                    label="Coupon Id"
                    name="couponId"
                    value={values.couponId}
                    onChange={handleInputChange}
                    error={errors.couponId}
                    />
            </Grid>
            <Grid item xs={6}>
                <Controls.Input
                    variant="outlined"
                    label="Coupon Title"
                    name="couponTitle"
                    value={values.couponTitle}
                    onChange={handleInputChange}
                    error={errors.couponTitle}
                    />
            </Grid>
            <Grid item xs={12}>   
                        <div style={{paddingTop:'20px'}}>
                            <Controls.Button
                            type="submit"
                            text="Add New Coupon"
                            />

                            <Controls.Button
                            color="default"
                            text="Reset"
                            onClick={resetForm}
                            />
                        </div> 
                </Grid>
        </Grid> 
        </Form>   
    );
};

export default CouponForm;