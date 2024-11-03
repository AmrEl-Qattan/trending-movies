import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { HelmetProvider , Helmet} from "react-helmet-async";




export default function Register() {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();


  // Yup validation 
  let validate = Yup.object({
    name:Yup.string().required('Name is required').min(3 , 'Name minlength is 3').max(10 , 'Name maxlength is 10'),
    email:Yup.string().required('email is required').email('Email is invalid'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}/ , 'password must start with Uppercase'),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], "password and rePassword doesn't matches"),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'phone must be valid number'),
  })


  // initialValues for form
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },validationSchema:validate,
    onSubmit : sendRegisterData
  });


  // function to send form data to api
  async function sendRegisterData(values){
    setLoading(true);
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).catch((error)=>{
      // console.log(error);
      setError(error.response.data.message)
      setLoading(false);
    })

    if(data.message == 'success'){
      setLoading(false);
      navigate('/login')
    }

  }



  return <>
  <HelmetProvider>
   <Helmet>
    <title>Trending Movies - Register</title>
   </Helmet>
   </HelmetProvider>

  <div className="w-75 mx-auto mt-5 register">
    <h3>Register Now</h3>
    <form onSubmit={formik.handleSubmit}>

      {error ? <div className="alert alert-danger">{error}</div> : ""}

      <label htmlFor="name">Name : </label>
      <input type="text" name="name" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2" value={formik.values.name}/>
      {formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div> : ""}
      
      <label htmlFor="email">Email : </label>
      <input autoComplete="username" type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2" value={formik.values.email}/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div> : ""}

      <label htmlFor="password">Password : </label>
      <input autoComplete="new-password" type="password" name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2" value={formik.values.password}/>
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div> : ""}

      <label htmlFor="rePassword">RePassword : </label>
      <input autoComplete="new-password" type="password" name="rePassword" id="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2" value={formik.values.rePassword}/>
      {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div> : ""}

      <label htmlFor="phone">Phone : </label>
      <input type="tel" name="phone" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2" value={formik.values.phone}/>
      {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div> : ""}

      <button type="submit" className="btn btn-outline-info">{loading?<i className="fas fa-spinner fa-spin"></i>:"Register"}</button>
    </form>

  </div>
  
  
  </>;
}
