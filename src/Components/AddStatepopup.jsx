import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import GlobalButton from "./GlobalComponent/GlobalButton";
import { getcountries } from "../utils/api/Companyapi/Index";
import { poststate, updatestate } from "../utils/api/Stateapi/Index";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

function AddStatepopup(props) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [addstate, setaddstate] = useState({
    StateName: "",
    CountryId: "",
    Active: true,
  });
  const [error, seterror] = useState({
    StateNameerr: "",
    CountryIderr: "",
    
  });
  const [country, setcountry] = useState([]);

  useEffect(() => {
    getcountries().then((res) => setcountry(res));
  }, []);

  const handlereset = () => {
    setIsOpen(false);
  };

  const handlechange=(e)=>{
         setaddstate((old)=>({...old,[e.target.name]:e.target.value}))
         seterror((old)=>({...old,[`${e.target.name}err`] : ""}))
  }


  const validity=async()=>{
    let err=({
        StateNameerr: "",
        CountryIderr: "",
        
      })

    let isvalid=true
    

    if(!addstate.StateName){
        err.StateNameerr = "Enter state name"
        isvalid=false
    }
    // if(addstate.StateName && addstate.StateName !== Text){
    //     err.StateNameerr = "Enter valid state name"
    //     isvalid=false
    // }
    if(!addstate.CountryId){
        err.CountryIderr = "Please Select Country"
        isvalid=false
    }
    
    if(!isvalid){
       seterror(err)
    }
    if(isvalid){
      if(props.name=="add"){
        poststate(addstate).then(res=>{
          if(res=="success"){
            props.setflag(!props.flag)
            toast.success("State get successfully added")
            setIsOpen(false)
            setaddstate("")
          }
        })

      }else{
        updatestate(props.id,addstate).then(res=>{
          if(res=="success"){
            props.setflag(!props.flag)
            toast.success("State get updated successfully ")
            setIsOpen(false)
            setaddstate("")
          }
        })
      }
        
        
       
        
    }

  }

  const handlesubmit=(e)=>{
    e.preventDefault()
    validity()
    
  }
 

  return (
    <div>
      <button onClick={() => {
        setIsOpen(true)
        
        setaddstate({
          StateName: props.sname,
          CountryId: props.cname,
          Active: true,
        })
        }}>
        <div className=" text-2xl  text-[#680d0d]">{props.name=="add"?<FiPlusCircle />:<MdEdit/>}</div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative  md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    {props.name=="add"?"Add State":"Update State"}
                  </h3>
                </div>

                <form
                    onSubmit={handlesubmit}
                  className="relative w-full  px-8 py-6  "
                >
                  <div className="flex flex-col md:flex-row justify-between gap-3">
                    <div>
                      <select
                        onChange={handlechange}
                        name="CountryId"
                        value={addstate.CountryId}
                        id=""
                        className="bg-white border text-black border-black text-sm rounded-lg  block w-full  p-2.5 md:h-12 h-10 "
                      >
                        <option>Select Country*</option>
                        {country.map((batch) => {
                          return (
                            <option value={batch.countryId}>
                              {batch.countryName}
                            </option>
                          );
                        })}
                      </select>
                      <p className="text-sm text-red-400">{error.CountryIderr}</p>
                    </div>
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Enter State*"
                        name="StateName"
                        value={addstate.StateName}
                      />
                      <p className="text-sm text-red-400">{error.StateNameerr}</p>
                    </div>
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
                      name={props.name=="add"?"Submit":"Update"}
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

export default AddStatepopup;
