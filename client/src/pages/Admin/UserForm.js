import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';


const genderItems = [
    { id: 'Male', title: 'Male' },
    { id: 'Female', title: 'Female' },
    { id: 'Other', title: 'Other' }
]

const userTypes=[
    {id:'Admin',title:'Admin'},
    {id:'Manager',title:'Manager'},
    {id:'Assistant',title:'Assistant'}
]

const initialFvalues = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    mobile_no: '',
    gender: '',
    user_type: '',
    password: '',
    confirmPassword: ''
}
const UserForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('first_name' in fieldValues)
            temp.first_name = fieldValues.first_name ? "" : "First Name is required"
        if ('last_name' in fieldValues)
            temp.last_name = fieldValues.last_name ? "" : "Last Name is required"
        if ('email' in fieldValues)
            temp.email =(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(fieldValues.email) ? "" : "Email is not valid"
        if ('mobile_no' in fieldValues)
            temp.mobile_no = (/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/).test(fieldValues.mobile_no) ? "" : "Please Enter a valid Moblie Number"
        if ('user_type' in fieldValues)
            temp.user_type = fieldValues.user_type.length !== 0 ? "" : "This field is required"
        if ('password' in fieldValues)
            temp.password = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).test(fieldValues.password) ? "" :  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character" 
        if ('confirmPassword' in fieldValues)
            temp.confirmPassword=((fieldValues.password === fieldValues.confirmPassword) ? "" : "Passwords must match")
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
                        name="first_name"
                        id="first_name"
                        value={values.first_name}
                        onChange={handleInputChange}
                        error={errors.first_name}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                        variant="outlined"
                        label="Last Name"
                        name="last_name"
                        id="last_name"
                        value={values.last_name}
                        onChange={handleInputChange}
                        error={errors.last_name}
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
                        name="mobile_no"
                        id="mobile_no"
                        value={values.mobile_no}
                        onChange={handleInputChange}
                        error={errors.mobile_no}
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
                        name="user_type"
                        id="user_type"
                        label="User Type"
                        value={values.user_type}
                        onChange={handleInputChange}
                        options={userTypes}
                        error={errors.user_type}
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
                        error={errors.password}
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
                        error={errors.confirmPassword}
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
