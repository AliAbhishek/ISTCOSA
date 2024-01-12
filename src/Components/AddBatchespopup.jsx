import React, { memo, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import GlobalButton from "./GlobalComponent/GlobalButton";
import { postbatches } from "../utils/api/Batchesapi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddBatches = ({flag,setflag}) => {

  console.log("addbatch")
  
  const [isOpen,setIsOpen] = useState(false)

  const [batchYear, setBatchYear] = useState({
    BatchYear: "",
    Active: "true",
  });
  const [batchYearerror, setBatchYearerror] = useState("");

  // const [posteddata,setposteddata]= useState("")

  // useEffect (()=>{
  //   async ()=>{
  //  const data = await postbatches(batchYear).then(res=>console.log(res))
  //  console.log(data)
  //   }

  // })

  const handlereset = () => {
    setIsOpen(false);
    setBatchYearerror("")
    setBatchYear({
      BatchYear: "",
      Active: "true",
    })

  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    

    // const regex = /^[A-Za-z]+$/;
    let isvalid =true
    let validate = /^[0-9]{4}$/
    if (!batchYear.BatchYear ) {
      setBatchYearerror("Please enter Numbers");
      
      isvalid=false
    }
    // else if (!validate.test(batchYear.BatchYear)){
    //     setBatchYearerror("Please enter valid number")
    //     isvalid=false
    //   }
    
    if (isvalid) {
     postbatches(batchYear).then(res=>{
        if(res=="success"){
          toast.success("Batch Added Successfully")
          setflag(!flag)
          setIsOpen(false)
        }
      }).catch(err=>{if(err){
        toast.error("Batch did not added Successfully")
        setIsOpen(false)
        setBatchYear("")
      }})
     
    }

   
  };

  const handlechange = (e) => {
    setBatchYear((old) => ({ ...old, [e.target.name]: e.target.value }));
    setBatchYearerror("");
  };

  return (
    <div>
      <button onClick={() =>{setIsOpen(true)}}>
        <div className=" text-2xl  text-[#680d0d]">{<FiPlusCircle />}</div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative  md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    Add Batch Year
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
                      placeholder="Enter Batch Year Ex-1999"
                      name="BatchYear"
                      value={batchYear.BatchYear}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-red-400">{batchYearerror}</p>
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default memo(AddBatches);
