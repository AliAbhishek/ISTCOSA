import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import GlobalInputfield from "../Components/GlobalComponent/GlobalInputfield";
import GlobalButton from "../Components/GlobalComponent/GlobalButton";
import { postlogindetails } from "../utils/api/Loginapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [border,setBorder] = useState(false)
  
  const [userdetails, setuserdetails] = useState({
    UserName: "",
    Password: "",
  });
  const [error, seterror] = useState({
    UserNameerr: "",
    Passworderr: "",
  });

  const [checked, setchecked] = useState(false);

  const handlechange = (e) => {
    setuserdetails((old) => ({ ...old, [e.target.name]: e.target.value }));
    seterror((old) => ({ ...old, [`${e.target.name}err`]: "" }));
    setBorder(false)
  };

  const handlechecked = () => {
    setchecked(!checked);
    console.log(checked);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    console.log(userdetails, "submit");
    validation();
    
    

  };
  
 

  const handlereset = () => {
    setuserdetails({
      email: "",
      password: "",
    });
  };

  const validation = () => {
    let isvalid = true;
    const err = {
      UserNameerr: "",
      Passworderr: "",
    };

    if (!userdetails.UserName) {
      err.UserNameerr = "Please enter Username";
      isvalid = false;
    }
    if (!userdetails.Password) {
      err.Passworderr = "Please enter Password";
      isvalid = false;
    }
    if (!isvalid) {
      seterror(err);
      setBorder(true)
    }
    if (isvalid) {
      
      postlogindetails(userdetails)
        .then((res) => {
          
           alert("welcome admin")
          
          const entrytoken = res[0].Token;

          if (entrytoken) {
            
            localStorage.setItem("Token", entrytoken);
            localStorage.setItem("userdetails", JSON.stringify(userdetails));

            navigate("/dashboard", {
             
            });
          }
        })
        .catch(()=>{
          toast.error("You entered wrong Email and Password",{
            position:"top-center"
          })
        });
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      <ToastContainer />

      <div>
        <section className="">
          <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border  sm:max-w-md xl:p-0  ">
              <div className=" shadow-md p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                <h1 className="text-[#680d0d] text-center text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                  Admin Login
                </h1>
                <form
                  onSubmit={handlesubmit}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium  "
                    >
                      Email ID
                    </label>
                    <GlobalInputfield
                      border={border}
                      placeholder="Email"
                      type="text"
                      name="UserName"
                      value={userdetails.UserName}
                      handlechange={handlechange}
                    />
                    <p className="text-sm text-red-400">{error.UserNameerr}</p>
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-black "
                    >
                      Password
                    </label>
                    <GlobalInputfield
                      placeholder="Password"
                      border={border}
                      type={checked ? "text" : "password"}
                      name="Password"
                      value={userdetails.Password}
                      handlechange={handlechange}
                    />
                    <p className="text-sm text-red-400">{error.Passworderr}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          onClick={handlechecked}
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="remember" className="text-black ">
                          Show Password
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <GlobalButton
                      name="Reset"
                      type="button"
                      bgcolor="white"
                      textcolor="[#680d0d]"
                      bordercolor="[#680d0d]"
                      handlereset={handlereset}
                    />
                    <GlobalButton
                      name="Submit"
                      type="submit"
                      bgcolor="[#680d0d]"
                      textcolor="white"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <p className="text-[#680d0d] text-end m-5">Created by : Abhishek</p>
        </section>
      </div>
    </div>
  );
}

export default Login;
