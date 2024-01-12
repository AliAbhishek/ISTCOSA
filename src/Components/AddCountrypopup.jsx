import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import GlobalButton from "./GlobalComponent/GlobalButton";
import { Updatecountry, postcountry } from "../utils/api/Countryapi/Index";
import { getcountries } from "../utils/api/Companyapi/Index";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

function AddCountrypopup({name,flag,setflag,id,cname,code}) {
  const [isOpen, setIsOpen] = useState(false);
  const [addcountry, setaddcountry] = useState({
    countryName: "",
    countryCode: "",
    Active: true,
  });
  const [error, seterror] = useState({
    countryNameerr: "",
    countryCodeerr: "",
    Active: true,
  });

 

  const handlechange = (e) => {
    setaddcountry((old) => ({ ...old, [e.target.name]: e.target.value }));
    seterror((old) => ({ ...old, [`${e.target.name}err`]: "" }));
  };

  const validity = async () => {
    const err = {
      countryNameerr: "",
      countryCodeerr: "",
    };
    let isvalid = true;

    if (!addcountry.countryName) {
      err.countryNameerr = "Enter Country Name";
      isvalid = false;
    }
    
    
    if (!addcountry.countryCode) {
      err.countryCodeerr = "Enter Country Code";
      isvalid = false;
    }
  
    
    if (!isvalid) {
      seterror(err);
    }

    if (isvalid) {
     if(name=="add"){
      postcountry(addcountry).then((res) => {if(res=="success"){
        toast.success("Country get added")
        setIsOpen(false)
        setaddcountry("")
        setflag(!flag)
      }});
     }else{
         Updatecountry(id,addcountry).then(res=>{if(res=="success"){
          setflag(!flag)
          toast.success("Country get updated")
          setIsOpen(false)
          setaddcountry("")
          
         }})
     }
     
    }
  };

  const handlereset = () => {
    setIsOpen(false);
    setaddcountry("")
    seterror("")
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    validity();
  };

  return (
    <div>
      <button onClick={() => {setIsOpen(true)
     setaddcountry( {
        countryName: cname,
        countryCode: code,
        Active:true
        
      })
      
      }}>
        <div className=" text-2xl  text-[#680d0d]">{name=="add"?<FiPlusCircle />:<MdEdit/>}</div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative  md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                  {name=="add"?"Add Country":"Update Country"}
                  </h3>
                </div>

                <form
                  onSubmit={handlesubmit}
                  className="relative w-full  px-8 py-6  "
                >
                  <div className="flex flex-col md:flex-row justify-between gap-3">
                   
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Enter Country Code"
                        name="countryCode"
                        value={addcountry.countryCode}
                      />
                      <p className="text-sm text-red-400">
                        {error.countryCodeerr}
                      </p>
                    </div>
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Enter Country Name"
                        name="countryName"
                        value={addcountry.countryName}
                      />
                      <p className="text-sm text-red-400">
                        {error.countryNameerr}
                      </p>
                    </div>
                  </div>
                  <div>
                    {/* <p className="text-sm text-red-400">{batchYearerror}</p> */}
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
                      name={name=="add"?"Submit":"Update"}
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

export default AddCountrypopup;
