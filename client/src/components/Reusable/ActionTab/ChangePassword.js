import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm,Form } from '../useForm';
import Controls from '../Controls';

const initialFvalues = {
    id:'',
    newPassword: '',
    confirmPassword: ''
}
   

const ChangePassword = (props) => {

    const { addOrEdit} = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('newPassword' in fieldValues)
            temp.newPassword = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).test(fieldValues.newPassword) ? "" :  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character" 
        if ('confirmPassword' in fieldValues)
            temp.confirmPassword=((fieldValues.newPassword === fieldValues.confirmPassword) ? "" : "Passwords must match")
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
    } = useForm(initialFvalues, true,validate)

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }


    return (
       
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={10}>
                    <Controls.Input
                        variant="outlined"
                        label="New Password"
                        name="newPassword"
                        id="newPassword"
                        value={values.newPassword}
                        onChange={handleInputChange}
                        error={errors.newPassword}
                        type="password"
                    />

                </Grid>
                <Grid item xs={10}>
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
                            text="Change"
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

export default ChangePassword;