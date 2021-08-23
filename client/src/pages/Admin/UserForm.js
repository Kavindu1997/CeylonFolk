import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import * as userService from '../../services/userService';


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' }
]

const userTypes=[
    {id:'1',title:'Admin'},
    {id:'2',title:'Manager'},
    {id:'3',title:'Assistant'}
]

const initialFvalues = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    userType: '',
    password: '',
    confirmPassword: ''
}
const UserForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "First Name is required"
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "Last Name is required"
        if ('email' in fieldValues)
            temp.email =(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(fieldValues.email) ? "" : "Email is not valid"
        if ('mobile' in fieldValues)
            temp.mobile = (/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/).test(fieldValues.mobile) ? "" : "Please Enter a valid Moblie Number"
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
                        id="firstName"
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
                        id="lastName"
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
                        id="email"
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
                        id="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.RadioGroup
                        name="gender"
                        id="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />

                </Grid>
                <Grid item xs={4}>
                    <Controls.Select
                        name="userType"
                        id="userType"
                        label="User Type"
                        value={values.userType}
                        onChange={handleInputChange}
                        options={userTypes}
                        error={errors.userType}
                    />

                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                        variant="outlined"
                        label="Password"
                        name="password"
                        id="password"
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
                        id="confirmPassword"
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



// (/$^|.+@.+..+/)