import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import GlobalButton from "./GlobalComponent/GlobalButton";
import { postindustry, updateindustry } from "../utils/api/Industryapi/Index";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

function AddIndustriespopup({ flag, setflag, modalname,iname,id }) {
  const [isOpen, setIsOpen] = useState(false);

  const [industryname, setindustryname] = useState({
    IndustryName: "",
    Active: true,
  });

  const [error, seterror] = useState("");

  const handlereset = () => {
    setIsOpen(false);
   setindustryname( {
      IndustryName: "",
      Active: true,
    })
  };

  const handlechange = (e) => {
    setindustryname((old) => ({ ...old, [e.target.name]: e.target.value }));
    seterror("");
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    if (!industryname.IndustryName) {
      seterror("Enter Industry Name");
      isvalid = false;
    }
    // if (industryname.IndustryName && industryname.IndustryName !== Text ){
    //     seterror("Enter valid Industry Name")
    //     isvalid=false
    // }

    if (isvalid) {
      if(modalname=="add"){
        postindustry(industryname).then((res) => {
          setflag(!flag);
          setIsOpen(false);
          toast.success("Industry added successfully");
        });
      }
      if(modalname=="edit"){
        updateindustry(id,industryname).then(res=>{
          setflag(!flag)
          setIsOpen(false)
          toast.success("Industry Type get seccessfully updated")
        })

      }
     
    }
  };

  

  return (
    <div>
      <button onClick={() => {
       setindustryname( {
          IndustryName: iname?iname: "",
          Active: true,
        })
        setIsOpen(true)}}>
        <div className=" text-2xl  text-[#680d0d]">
        {(modalname == "add" ? <FiPlusCircle /> : <MdEdit />)}
        </div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                   {modalname=="add" ? " Add Industry Name" : "Edit Industry Name"}
                  </h3>
                </div>

                <form
                  onSubmit={handlesubmit}
                  className="relative w-full  px-8 py-6  "
                >
                  <div>
                    <GlobalInputfield
                      handlechange={handlechange}
                      type="text"
                      placeholder="Enter Industry name"
                      name="IndustryName"
                      value={industryname.IndustryName}
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
                      name={modalname=="add" ? "Submit" : "Update"}
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

export default AddIndustriespopup;
