import React, { useEffect, useRef, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalButton from "./GlobalComponent/GlobalButton";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import { getbatches } from "../utils/api/Batchesapi";
import { getRollNumberbyBatch } from "../utils/api/RollNumberapi";
import {postnewuser} from "../utils/api/Userapi"
import { toast } from "react-toastify";


function AddUserpopup({flag,setflag}) {
  const [isOpen, setIsOpen] = useState(false);
  const [border,setBorder] = useState(false)
 
  const [batchList, setbatchList] = useState([]);
  const [rollnumberlist, setrollnumberlist] = useState([]);

 
  
 
 
  const handlereset = () => {
    setIsOpen(!isOpen);
    seterror("")
  };

  const [adduser, setadduser] = useState({
    FullName: "",
    RollNumberID: "",
    BatchID: "",
    // UserID: "",
    Gender: "",
    OldPicture: "str",
    // Path: "str",
  });

  const [error, seterror] = useState({
    FullNameerr: "",
    RollNumberIDerr: "",
    BatchIDerr: "",
    UserIDerr: "",
    Gendererr: "",
    OldPictureerr: "",
  });

  const handlechange = (e) => {
    setadduser((old) => ({ ...old, [e.target.name]: e.target.value })),
    setadduser((old)=>({...old,UserID:adduser.RollNumberID}))
    
    seterror((old) => ({ ...old, [`${e.target.name}err`]: "" }))
    setBorder(false)
    
  }
  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      
      setadduser((old) => ({ ...old,Path : reader.result }));
    };
    reader.oneerror = (error) => {
      console.log("Error", error);
    };
  };
 

  const handlesubmit = (e) => {
    e.preventDefault();

    validation();
    setadduser("")
  };

  useEffect(() => {
    getbatches().then((res) =>
      setbatchList(res.filter((item) => item.Active === true))
    );
  }, []);

 
 
  

  useEffect(() => {
    getRollNumberbyBatch(adduser.BatchID).then((res) => setrollnumberlist(res));
  }, [adduser.BatchID]);

  const validation = () => {
    let isvalid = true;
    const err = {
      FullNameerr: "",
      RollNumberIDerr: "",
      BatchIDerr: "",
      UserIDerr: "",
      Gendererr: "",
      OldPictureerr: "",
    };

    if (!adduser.BatchID) {
      err.BatchIDerr = "Please Select Batch";
      isvalid = false;
    }
    if (!adduser.RollNumberID) {
      err.RollNumberIDerr = "Please Select Roll Number";
      isvalid = false;
    }
    if (!adduser.FullName) {
      err.FullNameerr = "Please Enter Name";
      isvalid = false;
    }
    // if (!adduser.OldPicture) {
    //   err.OldPictureerr = "Please Upload Picture";
    //   isvalid = false;
    // }
    if (!adduser.Gender) {
      err.Gendererr = "Please Select Gender";
      isvalid = false;
    }
    if (!isvalid) {
      seterror(err);
      setBorder(true)
    }
    if (isvalid) {
      console.log(adduser);
      postnewuser(adduser).then(res=>{
        if (res=="success"){
          toast.success("User added successfully")
            setIsOpen(false)
            setflag(!flag)
            setadduser({
              FullName: "",
              RollNumberID: "",
              BatchID: "",
              UserID: "",
              Gender: "",
              OldPicture: "",
              Path: "",
            })
        }
      }).catch(err=>{
        if(err){
          toast.error("User did not added successfully")
          setIsOpen(false)
          setadduser({
            FullName: "",
            RollNumberID: "",
            BatchID: "",
            UserID: "",
            Gender: "",
            OldPicture: "",
            Path: "",
          })
        }
      })
    }
  };

  return (
    <div >
      <button onClick={() => setIsOpen(true)}>
        <div className=" text-2xl  text-[#680d0d]">{<FiPlusCircle />}</div>
      </button>
      {isOpen ? (
        <>
          <div 
                //  ref={ref} 

            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div  className="relative  md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div  className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div  className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    Add User
                  </h3>
                  
                 
                </div>

                <form
                  onSubmit={handlesubmit}
                  className="relative w-full  px-8 py-6  "
                >
                  <div className="flex flex-col md:flex-row  md:justify-between gap-3">
                    <div className="md:w-1/2">
                      <div className="w-full">
                        <select
                          onChange={handlechange}
                          name="BatchID"
                          value={adduser.BatchID}
                          className="bg-white border text-black border-black text-sm rounded-lg  block w-full  p-2.5 md:h-12 h-10 "
                        >
                          <option >
                            Select Batch
                          </option>
                          {batchList.map((batch) => {
                            return <option>{batch.BatchID}</option>;
                          })}
                        </select>
                      </div>

                      <div>
                        <p className="text-sm text-red-400">
                          {error.BatchIDerr}
                        </p>
                      </div>
                    </div>
                    <div>
                      <select
                        onChange={handlechange}
                        name="RollNumberID"
                        value={adduser.RollNumberID}
                        className="bg-white border text-black border-black text-sm rounded-lg   block w-full   p-2.5 md:h-12 h-10 "
                      >
                        <option >Select Roll Number</option>
                        {rollnumberlist.map((rollno) => {
                          return <option>{rollno.RollNumberID}</option>;
                        })}
                      </select>
                      <p className="text-sm text-red-400">
                        {error.RollNumberIDerr}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:w-full  md:items-center">
                    <div className="mt-5 w-full md:w-1/2 ">
                      <GlobalInputfield
                        handlechange={handlechange}
                        name="FullName"
                        value={adduser.FullName}
                        placeholder="Enter Full name"
                      />

                      <p className="text-sm text-red-400">
                        {error.FullNameerr}
                      </p>
                    </div>

                    <div className="md:ml-12  ">
                      <div className="flex gap-2 mt-8">
                        <div className="flex justify-center items-center gap-2 ">
                          <input
                            onChange={handlechange}
                            name="Gender"
                            value="Male"
                            type="radio"
                            className="w-5 h-5"
                          />
                          <p className="text-sm text-black ">Male </p>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                          <input
                            onChange={handlechange}
                            name="Gender"
                            value="Female"
                            type="radio"
                            className="w-5 h-5"
                          />
                          <p className="text-sm text-black">Female</p>
                        </div>
                      </div>

                      <p className="text-sm text-red-400">{error.Gendererr}</p>
                    </div>
                  </div>

                  <div className="text-sm text-black md:mt-4 mt-3">
                    <div>
                      Upload Image
                      <GlobalInputfield
                        handlechange={convertToBase64}
                        name="Path"
                        // value={adduser.Path}
                        className="block text-black  text-sm  border border-black w-full rounded-lg cursor-pointer"
                        type="file"
                      />
                    </div>
                    <p className="text-sm text-red-400">
                      {error.OldPictureerr}
                    </p>
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
          <div  className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default AddUserpopup;
