import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../../components/Reusable/useForm';
import Controls from '../../../components/Reusable/Controls';

const userTypes=[
    {id:'1',title:'Admin'},
    {id:'3',title:'Manager'},
    {id:'4',title:'Assistant'}
]

const initialFvalues = {
    id:'',
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    user_type_id: '',
}
const EditUserForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "First Name is required"
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "Last Name is required"
        if ('email' in fieldValues)
            temp.email =(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(fieldValues.email) ? "" : "Email is not valid"
        if ('contactNo' in fieldValues)
            temp.contactNo = (/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/).test(fieldValues.contactNo) ? "" : "Please Enter a valid Moblie Number"
        if ('user_type_id' in fieldValues)
            temp.user_type_id = fieldValues.user_type_id.length !== 0 ? "" : "This field is required"
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
                        name="contactNo"
                        id="contactNo"
                        value={values.contactNo}
                        onChange={handleInputChange}
                        error={errors.contactNo}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.Select
                        name="user_type_id"
                        id="user_type_id"
                        label="User Type"
                        value={values.user_type_id}
                        onChange={handleInputChange}
                        options={userTypes}
                        error={errors.user_type_id}
                    />
                </Grid>
          
                <Grid item xs={4}>     
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Edit User"
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

export default EditUserForm;