import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import GlobalButton from "./GlobalComponent/GlobalButton";
import {
  postemployment,
  updateemployment,
} from "../utils/api/Employmentapi/Index";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

function AddEmploymentpopup({ name, flag, setflag, empname, id }) {
  const [isOpen, setIsOpen] = useState(false);

  const [employmentname, setemploymentname] = useState({
    EmployementTypeName: "",
    Active: true,
  });

  const [error, seterror] = useState("");

  const handlechange = (e) => {
    setemploymentname((old) => ({ ...old, [e.target.name]: e.target.value }));
    seterror("");
  };

 

  const handlesubmit = (e) => {
    e.preventDefault();

   
    if (!employmentname.EmployementTypeName) {
      seterror("Enter Name");
    } else {
      if (name == "add") {
        postemployment(employmentname).then((res) => {
          if(res=="success"){
            setflag(!flag);
          setIsOpen(false);
          toast.success("Employment type added successfully");
          setemploymentname("");
        }

          }
        )
          
      }
      else{
        updateemployment(id, employmentname).then((res) => {
          setflag(!flag);

          setIsOpen(false);
          toast.success("Employment get successfully updated");
        });
      }
    }
  };

  const handlereset = () => {
    setIsOpen(false);
    setemploymentname({
      EmployementTypeName: "",
      Active: true,
    });
    seterror("")
  };

 

  return (
    <div>
      <button
        onClick={() => {
          setemploymentname({
            EmployementTypeName: empname ? empname : "",
            Active: true,
          });
          console.log(id);
          setIsOpen(true);
        }}
      >
        <div className=" text-2xl  text-[#680d0d]">
          {name == "add" ? <FiPlusCircle /> : <MdEdit />}
        </div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    {name == "add"
                      ? "Add Employment Name"
                      : "Edit Employment Name"}
                  </h3>
                </div>

                <form
                  onSubmit={ handlesubmit }
                  className="relative w-full  px-8 py-6  "
                >
                  <div>
                    <GlobalInputfield
                      handlechange={handlechange}
                      type="text"
                      placeholder="Enter Name"
                      name="EmployementTypeName"
                      value={employmentname.EmployementTypeName}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-red-400">{error}</p>
                  </div>

                  <div className="flex justify-end mt-5 gap-3 ">
                    <GlobalButton
                      handlereset={handlereset}
                      name="Close"
                      bgcolor="white"
                      type="button"
                      textcolor="[#680d0d]"
                      bordercolor="[#680d0d]"
                    />
                    <GlobalButton
                      name={name == "add" ? "Submit" : "Update"}
                      type="submit"
                      bgcolor="[#680d0d]"
                      textcolor="white"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default AddEmploymentpopup;
