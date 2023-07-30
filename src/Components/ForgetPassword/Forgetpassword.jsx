import { useFormik } from 'formik'
import axios from 'axios';
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

export default function Forgetpassword() {
  let baseUrl = "https://route-ecommerce-app.vercel.app";

  //flag to show 2nd form
  let [isCodeSent, setIsCodeSent] = useState(false);
  //flag to show loading spinner
  let [loadingFlag,setLoadingFlag] = useState(true);

  let navigate = useNavigate();


  let validationSchema = Yup.object({
    email: Yup.string().email("invalid email address").required()
  });

  //for 2nd form
  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required()
  });

  let formik = useFormik({
    initialValues:{
      email:""
    },
    onSubmit: (values)=>{
      console.log(values);
      sendCode(values);

    },
    validationSchema
  });

  //for 2nd form
  let formik2 = useFormik({
    initialValues:{
      resetCode:""
    },
    onSubmit: (values)=>{
      console.log(values);
      verifyCode(values);

    },
    validationSchema2
  });

  //send code to email to reset password
  async function sendCode(emailObj){
    setLoadingFlag(false);
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`,emailObj).catch((error)=>{console.log(error.response.data.message)});
    console.log(data);

    if(data.statusMsg === "success"){
      //hide loading spinner button
      setLoadingFlag(false);
      //show other form
      setIsCodeSent(true);
    }
  } 

  //verify reset code to reset password
  async function verifyCode(codeObj){
    //setLoadingFlag(false);
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`,codeObj).catch((error)=>{
      console.log(error.response.data.message);
      //show error message
      setIsCodeSent(error.response.data.message);
    });
    console.log(data);

    if(data.status === "Success"){
      //hide loading spinner button
      
      //go to ResetPassword component
      navigate('/resetPassword')
    }
  }

  return (
    <>
    {!isCodeSent ? 
      <div className='forgetPassword'>
        <h3 className='mt-5 mb-4'>Find Your Account</h3>
        <p>Please enter your email address to send you a code.</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input type="email" className="form-control" name="email" id="email" onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
          </div>
          {formik.touched.email && formik.errors.email ? 
            <p className="text-danger">{formik.errors.email}</p> : ""}
          {loadingFlag ? <button className="btn btn-primary mb-4" disabled={!formik.isValid}>Continue</button> :
          <button className="btn btn-primary mb-4">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>}
          
        </form>
      </div> : 
      <div className='resetPassword'>
        <h3 className='mt-5 mb-4'>Enter security code</h3>
        <p>Please check your email for a message with your code.</p>
        <form onSubmit={formik2.handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" name="resetCode" id="resetCode" onBlur={formik2.handleBlur} onChange={formik2.handleChange}></input>
          </div>
          {formik2.touched.resetCode && formik2.errors.resetCode ? 
            <p className="text-danger">{formik2.errors.resetCode}</p> : ""}
            <button className="btn btn-primary mb-4" disabled={!formik2.isValid}>Continue</button> 
          {/* {loadingFlag ? <button className="btn btn-primary mb-4" disabled={!formik2.isValid}>Continue</button> :
          <button className="btn btn-primary mb-4">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        } */}
        </form>
      </div>
    }
    </>
  )
}
