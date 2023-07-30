import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function ResetPassword() {
    let baseUrl = "https://route-ecommerce-app.vercel.app";
    let[errorMessage,setErrorMessage] = useState(null);

    let navigate = useNavigate();

    let validationSchema = Yup.object({
        email: Yup.string().email("please enter a valid email").required(),
        newPassword: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9-_%$#@!^&*()]{2,8}$/,"passowrd must start with a capital letter and 2-8 chars").required()
    });
    let formik = useFormik({
        initialValues :{
            email:"",
            newPassword:""
        },
        onSubmit:(values)=>{
            console.log(values);
            resetUserPassword(values);
        },
        validationSchema
    });
    //reset password for user
    async function resetUserPassword(info){
        let response = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`,info).catch((error)=>{
            console.log(error.response.data.message);
            setErrorMessage(error.response.data.message);
        });
        console.log(response);
        if(response.data.token){
            navigate('/signin');
        }
    }
  return (
    <div className='resetPassword'>
        <h3 className='mt-5 mb-4'>Create new password</h3>
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className="form-control" name="email" id="email"></input>
            </div>

            {formik.touched.email && formik.errors.email ? 
            <p className="text-danger">{formik.errors.email}</p> : ""}
            <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New password</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" name="newPassword" id="password"></input>
            </div>

            {formik.touched.newPassword && formik.errors.newPassword ? 
            <p className="text-danger">{formik.errors.newPassword}</p> : ""}

            {errorMessage != null ? <div className="alert alert-danger">{errorMessage}</div> : ""}

            <button type="submit" disabled={!formik.isValid} className="btn btn-primary">Reset Password</button>
        </form>
    </div>
  )
}
