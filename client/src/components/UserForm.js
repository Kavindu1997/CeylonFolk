import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from './Reusable/useForm';
import Controls from './Reusable/Controls';
import * as userService from '../services/userService';


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' }
]

const initialFvalues = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: 'male',
    userType: '',
    password: '',
    confirmPassword: ''
}
const UserForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required"
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required"
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid"
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required"
        if ('userType' in fieldValues)
            temp.userType = fieldValues.userType.length !== 0 ? "" : "This field is required"
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "");            //temp<- error messages
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFvalues, true, validate)

    const handleSubmit = e => {
        e.preventDefault();
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
                <Grid item xs={4}>
                    <Controls.Input
                        variant="outlined"
                        label="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                        variant="outlined"
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                        variant="outlined"
                        label="Mobile Number"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />

                </Grid>
                <Grid item xs={4}>
                    <Controls.Select
                        name="userType"
                        label="User Type"
                        value={values.userType}
                        onChange={handleInputChange}
                        options={userService.getUserType()}
                        error={errors.userType}
                    />

                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                        variant="outlined"
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        type="password"
                    />

                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                        variant="outlined"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleInputChange}
                        type="password"
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Add New User"
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

export default UserForm;