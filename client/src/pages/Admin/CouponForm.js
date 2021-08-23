import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
// import {useForm,Form} from './Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { makeStyles, TextField, Button } from '@material-ui/core';
import useStyles from './style';
import {useDispatch} from 'react-redux';
//import { createCoupon } from '../../actions/Coupons';


const initialFvalues = {
    couponId: '',
    couponTitle: '',
}

const validationSchema = Yup.object().shape({
    couponId: Yup.string().required(),
    couponTitle: Yup.string().required(),
});





const CouponForm = () => {
    const classes = useStyles();
    const dispatch=useDispatch();
    const onSubmit = (data) => {
        //e.preventDefault();
       // dispatch(createCoupon(data));
     
        // axios.post("http://localhost:3001/coupons/", data).then(() => {
        //    console.log(data);
        // });
       // if(validate()){  
       //       addOrEdit(values,resetForm);
       // }
   }


    // const validate=(fieldValues=values)=>{
    //     let temp={...errors}
    //     if('couponId' in fieldValues)
    //        temp.couponId=fieldValues.couponId ? "" : "This field is required"
    //     if('couponTitle' in fieldValues)   
    //        temp.couponTitle=fieldValues.couponTitle ? "" : "This field is required"
    //     setErrors({
    //         ...temp
    //     })

    //     if(fieldValues===values)
    //        return Object.values(temp).every(x=> x==="");            //temp<- error messages
    // }
    // const{
    //     values,
    //     setValues,
    //     errors,
    //     setErrors,
    //     handleInputChange,
    //     resetForm
    // }=useForm(initialFvalues,true,validate);



    return (
        // <Formik initialValues={initialFvalues} onSubmit={handleSubmit}>
        //  {(props) => (
        //      <Forum>
        //     <Form> 
        //     <Grid container>
        //         <Grid item xs={6}>
        //             <Field as={Controls.Input}
        //                 variant="outlined"
        //                 label="Coupon Id"
        //                 name="couponId"
        //                 value={values.couponId}
        //                 onChange={handleInputChange}
        //                 error={errors.couponId}
        //                 />
        //         </Grid>
        //         <Grid item xs={6}>
        //             <Field as={Controls.Input}
        //                 variant="outlined"
        //                 label="Coupon Title"
        //                 name="couponTitle"
        //                 value={values.couponTitle}
        //                 onChange={handleInputChange}
        //                 error={errors.couponTitle}
        //                 />
        //         </Grid>
        //         <Grid item xs={12}>   
        //                     <div style={{paddingTop:'20px'}}>
        //                         <Controls.Button
        //                         type="submit"
        //                         text="Add New Coupon"
        //                         />

        //                         <Controls.Button
        //                         color="default"
        //                         text="Reset"
        //                         onClick={resetForm}
        //                         />
        //                     </div> 
        //             </Grid>
        //     </Grid> 
        //     </Form>
        //     </Forum>
        //  )}  
        // </Formik> 

        <Formik initialValues={initialFvalues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(props) => (
                <Form>

                    <Grid container>

                        <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>


                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="couponId"
                                label="Coupon Id"
                                name="couponId"
                                helperText={<ErrorMessage name="couponId" />}
                            />



                        </Grid>
                        <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="couponTitle"
                                label="Coupon Title"
                                name="couponTitle"
                                helperText={<ErrorMessage name="couponTitle" />}
                            />

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Add Coupon</Button>

                    </Grid>

                </Form>
            )}
        </Formik>
    );
};

export default CouponForm;

