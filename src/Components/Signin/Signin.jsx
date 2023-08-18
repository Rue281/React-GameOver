import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup'
import './Signin.css'

export default function Signin({saveUserData}) {
  console.log(saveUserData);
  // let baseUrl = "https://route-ecommerce-app.vercel.app";
  let baseUrl = "https://ecommerce.routemisr.com";


  let [errorMessage,setErrorMessage] = useState("");
  let [loadingFlag,setLoadingFlag] = useState(true);

  let navigate = useNavigate();

  let validation = Yup.object({
    // last_name: Yup.string().required("Last Name is required").min(2,"min chars is 2").max(10,"max chars is 10"),
    email: Yup.string().email("please enter a valid email").required(),
    
    password: Yup.string().required()
  });

  let formik = useFormik({
    initialValues:{
      // last_name:"",
      email:"",
      password:""
    },
    onSubmit: (values)=>{
      console.log(values);
      console.log(typeof(values.number));
      sendRegistrationData(values)
    },
    validationSchema:validation
  });

  async function sendRegistrationData(values){
    console.log("login data: ");
    console.log(values);
    // let response = await axios.post('https://route-egypt-api.herokuapp.com/signup',values).catch((error)=>console.log(error));
    setLoadingFlag(false);

    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signin`,values).catch((error)=>{
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message)
      setLoadingFlag(true)});
    console.log(data);
    if(data.message === "success"){
      setLoadingFlag(true);
      //keep user's data
      saveUserData(data.user)
      //localStorage.setItem("token",JSON.stringify(values));
      //get token
      localStorage.setItem("token",data.token);
      //navigate to home
      navigate('/allGames');
    }
  }

  return (
    <div className='registration'>
      <h3 className='mt-5 mb-4'>Login Form</h3>
      <form onSubmit={formik.handleSubmit}>
        
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

        {errorMessage !== "" ? <div className="alert alert-danger">{errorMessage}</div> : ""}
          
         {loadingFlag === true ? 
         <>
         <button type="submit" disabled={!formik.isValid} className="btn btn-primary mb-4">Login</button>
         <br></br>
         <Link to='/forgetPassword' className='forgetPassword'>Forgot password?</Link>
         </>: <button type="button" className="btn btn-primary"><i className="fas fa-spinner fa-spin"></i></button>} 

</form>
    </div>
  )
}
