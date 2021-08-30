import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';


const initialFvalues={
    coupon_id:'',
    coupon_title:'',
}


const EditCouponForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const validate=(fieldValues=values)=>{
        let temp={...errors}
        if('coupon_id' in fieldValues)
           temp.coupon_id=fieldValues.coupon_id ? "" : "Coupon Id is required"
        if('coupon_title' in fieldValues)   
           temp.coupon_title=fieldValues.coupon_title ? "" : "Coupon Tittle is required"
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
        if(validate()){  
              addOrEdit(values,resetForm);
        }
      }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
    return (
        <Form onSubmit={handleSubmit}> 
        <Grid container>
            <Grid item xs={6}>
                <Controls.Input
                    variant="outlined"
                    label="Coupon Id"
                    name="coupon_id"
                    value={values.coupon_id}
                    onChange={handleInputChange}
                    error={errors.coupon_id}
                    />
            </Grid>
            <Grid item xs={6}>
                <Controls.Input
                    variant="outlined"
                    label="Coupon Title"
                    name="coupon_title"
                    value={values.coupon_title}
                    onChange={handleInputChange}
                    error={errors.coupon_title}
                    />
            </Grid>
            <Grid item xs={12}>   
                        <div style={{paddingTop:'20px'}}>
                            <Controls.Button
                            type="submit"
                            text="Edit Coupon"
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

export default EditCouponForm;