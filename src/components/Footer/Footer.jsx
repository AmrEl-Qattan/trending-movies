import React from "react";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" py-2  fixed-bottom text-center">
      <h3 className='fs-5'>Copyright &#169; 2024 All rights reserved | Design by <Link className='text-decoration-none' target={"_blank"} to={'https://www.amrelqattan.com/'}>Amr El-Qattan</Link></h3>

    </footer>
  );
}
