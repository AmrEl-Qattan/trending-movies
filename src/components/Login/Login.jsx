import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { HelmetProvider , Helmet } from "react-helmet-async";




export default function Login({saveUserData}) {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();


  // Yup validation 
  let validate = Yup.object({
    email:Yup.string().required('email is required').email('Email is invalid'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}/ , 'password must start with Uppercase'), 
  })


  // initialValues for form
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },validationSchema:validate,
    onSubmit : sendLoginData
  });


  // function to send form data to api
  async function sendLoginData(values){
    setLoading(true);
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).catch((error)=>{
      // console.log(error.response.data.message);
      setError(error.response.data.message)
      setLoading(false);
    })

    if(data.message == 'success'){
      // save userToken in localStorage
      localStorage.setItem('userToken' , data.token);
      saveUserData()
      setLoading(false);
      navigate('/home')
    }

  }



  return <>

  <HelmetProvider>
  <Helmet>
  <title>Trending Movies - Login</title>
  </Helmet>
  </HelmetProvider>

  <div className="w-75 mx-auto mt-5">
    <h3>Login Now</h3>
    <form onSubmit={formik.handleSubmit}>

      {error ? <div className="alert alert-danger">{error}</div> : ""}

      <label htmlFor="email">Email : </label>
      <input autoComplete="username" type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2" value={formik.values.email}/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div> : ""}

      <label htmlFor="password">Password : </label>
      <input autoComplete="current-password" type="password" name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2" value={formik.values.password}/>
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div> : ""}

      <button type="submit" className="btn btn-outline-info">{loading?<i className="fas fa-spinner fa-spin"></i>:"Login"}</button>
    </form>

  </div>
  
  
  </>;
}
