import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Signup(saveUserData = {saveUserData}) {
  console.log(saveUserData);
  let baseUrl = "https://route-ecommerce-app.vercel.app";

  let [errorMessage,setErrorMessage] = useState("");
  let [loadingFlag,setLoadingFlag] = useState(true);

  let navigate = useNavigate();

  let validation = Yup.object({
    name: Yup.string().required("First Name is required").min(6,"min chars is 6").max(10,"max chars is 10"),
    // last_name: Yup.string().required("Last Name is required").min(2,"min chars is 2").max(10,"max chars is 10"),
    email: Yup.string().email("please enter a valid email").required(),
    phone: Yup.string().required().matches(/^(012|015|011|010)[0-9]{8}$/gm,"please enter a valid phone number"),
    password: Yup.string().required().matches(/^[A-Z][a-z0-9-_%$#@!^&*()]{2,8}$/,"passowrd must start with a capital letter and 2-8 chars").required(),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")],"Re-password is not matched")
  });

  let formik = useFormik({
    initialValues:{
      name:"",
      // last_name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    onSubmit: (values)=>{
      console.log(values);
      console.log(typeof(values.phone));
      sendRegistrationData(values)
    },
    validationSchema:validation
  });

  async function sendRegistrationData(values){
    console.log("registration data: ");
    console.log(values);
    // let response = await axios.post('https://route-egypt-api.herokuapp.com/signup',values).catch((error)=>console.log(error));
    setLoadingFlag(false);

    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signup`,values).catch((error)=>{
      console.log(error.response.data);
      setErrorMessage(error.response.data.message)
      setLoadingFlag(true)});
    console.log(data);
    if(data.message === "success"){
      setLoadingFlag(true);
      //keep user's data
      saveUserData(data.user)
      //get token
      localStorage.setItem("token",data.token);
      //navigate to signin
      navigate('/signin');
    }
  }
  return(
    <div className='registration'>
      <h3 className='mt-5 mb-4'>Registration Form</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">First Name</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="form-control" name="name" id="name"></input>
        </div>
        {formik.touched.name && formik.errors.name ? 
          <p className="text-danger">{formik.errors.name}</p> : ""}
        

        {/* <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="form-control" name="last_name" id="lastName"></input>
        </div>

        {formik.touched.last_name && formik.errors.last_name ? 
          <p className="text-danger">{formik.errors.last_name}</p> : ""} */}

        <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className="form-control" name="email" id="email"></input>
        </div>

        {formik.touched.email && formik.errors.email ? 
          <p className="text-danger">{formik.errors.email}</p> : ""}

        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" name="password" id="password"></input>
        </div>

        {formik.touched.password && formik.errors.password ? 
          <p className="text-danger">{formik.errors.password}</p> : ""}

        <div className="mb-3">
        <label htmlFor="rePassword" className="form-label">Re-password</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" name="rePassword" id="rePassword"></input>
        </div>

        {formik.touched.rePassword && formik.errors.rePassword ? 
          <p className="text-danger">{formik.errors.rePassword}</p> : ""}

        <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="string" className="form-control" name="phone" id="phone"></input>
        </div>

        {formik.touched.phone && formik.errors.phone ? 
          <p className="text-danger">{formik.errors.phone}</p> : ""}

        {errorMessage !== "" ? <div className="alert alert-danger">{errorMessage}</div> : ""}
          
         {loadingFlag === true ? <button type="submit" disabled={!formik.isValid} className="btn btn-primary">Register</button> : <button type="button" className="btn btn-primary"><i className="fas fa-spinner fa-spin"></i></button>} 
        

      
</form>
    </div>
  )
}
