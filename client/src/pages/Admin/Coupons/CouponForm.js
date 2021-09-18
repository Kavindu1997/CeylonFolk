import React, { useEffect } from 'react';
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../../../components/Reusable/useForm';
import Controls from '../../../components/Reusable/Controls';


const initialFvalues={
    id:0,
    coupon_number:'',
    discount_amount:'',
    start_date: new Date(),
    end_date: new Date()
}


const CouponForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const validate=(fieldValues=values)=>{
        let temp={...errors}
        if('coupon_number' in fieldValues)
           temp.coupon_number=fieldValues.coupon_number ? "" : "Coupon Number is required"
        if('discount_amount' in fieldValues)   
           temp.discount_amount=(/^[0-9]+\.?[0-9]{1,2}$/).test(fieldValues.discount_amount) ? "" : "Discount Amount is required"
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

    const handleSubmit = e => {
        e.preventDefault();
        console.log(values);
        if (validate()) {
            addOrEdit(values, resetForm);
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
                    label="Coupon Number"
                    name="coupon_number"
                    value={values.coupon_number}
                    onChange={handleInputChange}
                    error={errors.coupon_number}
                    />
            </Grid>
            <Grid item xs={6}>
                <Controls.Input
                    variant="outlined"
                    label="Discount Amount LKR"
                    name="discount_amount"
                    value={values.discount_amount}
                    onChange={handleInputChange}
                    error={errors.discount_amount}
                    />

            </Grid>

            <Grid item xs={6}>
                <Controls.DatePicker
                            name="start_date"
                            label="Start Date"
                            value={values.start_date}
                            onChange={handleInputChange}
                        />
            </Grid>
            <Grid item xs={6}>
                <Controls.DatePicker
                            name="end_date"
                            label="End Date"
                            value={values.end_date}
                            onChange={handleInputChange}
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