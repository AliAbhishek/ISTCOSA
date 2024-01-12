import React, { useState } from "react";
import logoimg from "../assets/Logo.png";
import { FiLogIn } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header({handlesidebar,state}) {

  const navigate = useNavigate()
    

  const handlelogout=()=>{
    localStorage.removeItem("Token")
    navigate("/")
  }
   
    


  return (
    <>
      <div className="flex h-[70px] bg-gray-50 fixed top-0 left-0 right-0 z-10 justify-between items-center px-5 ">
        <div className="flex gap-3 items-center">
          <div><button onClick={handlesidebar} >{<IoIosMenu className="text-2xl "/> }</button></div>
          <img className="h-[40px]" src={logoimg} alt="logo" />
        </div>
        <div className="text-xl text-[#680d0d] ">{state ? <FaRegUser /> : <FiLogIn onClick={handlelogout} /> }</div>
      </div>
      <div>
       
      </div>
    </>
  );
}

export default Header;
