import React, { useState } from "react";
import { IoMdVideocam } from "react-icons/io";

import GlobalInputfield from "../../Components/GlobalComponent/GlobalInputfield";
import GlobalButton from "../../Components/GlobalComponent/GlobalButton";
import YouTube from 'react-youtube';
import { posteventvideo } from "../../utils/api/Event/Index";
import { toast } from "react-toastify";
// var getYouTubeID = require('get-youtube-id');

const AddVideoDetails = ({id}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [youtubeid,setyoutubeid]  =  useState("")
  const [postvideo, setpostvideo] = useState({
    VideoName: "",
    VideoURL: "",
    Active: true,
    EventID: id,
    Summary: "",
  });

  const [error,seterror] = useState({
    VideoNameerr: "",
    VideoURLerr: "",
  })

  const handlereset = () => {
    setIsOpen(false);
  };

  const handlechange=(e)=>{
       setpostvideo((old)=>({...old,[e.target.name]:e.target.value}))
       
  }

//   const handleVideoURL=(e)=>{
//        console.log(e.target.value)
       
//   }

const validation=()=>{
  let isvalid=true
  const err=({
    VideoNameerr: "",
    VideoURLerr: "",

  })

  if(!postvideo.VideoURL){
    err.VideoURLerr="Please enter URL"
    isvalid=false
  }
  if(!postvideo.VideoName){
    err.VideoNameerr="Please enter Name"
    isvalid=false
  }
  if(!isvalid){
    seterror(err)
  }
  if(isvalid){
   
    posteventvideo(postvideo).then(res=>{
      if(res){
          toast.success("Video added successfully")
          setIsOpen(false)
          setpostvideo({
              VideoName: "",
              VideoURL: "",
              Active: true,
              EventID: "",
              Summary: "",
            }

          )
      }
    })

  }
}

  const handlesubmit=(e)=>{
      e.preventDefault()

      validation()
      
  }
 

  return (
    <>
      <div className="text-[#680d0d] hover:cursor-pointer">
        <button onClick={() => setIsOpen(true)}>{<IoMdVideocam />}</button>
      </div>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative  md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    Add Video Details
                  </h3>
                </div>

                <form onSubmit={handlesubmit} className="relative w-full  px-8 py-6  ">
                  <div className="flex flex-col md:flex-row md:w-full  md:items-center">
                    <div className="mt-5 w-full  ">
                      <GlobalInputfield
                        handlechange={handlechange}
                        name="VideoName"
                        // value={postvideo.VideoName}
                        placeholder="Enter Video name" 
                        type="text"
                      />
                      <p className="text-sm text-red-400">{error.VideoNameerr}</p>
                    </div>
                  </div>

                  <div className="text-sm text-black md:mt-4 mt-3">
                    <div>
                      <GlobalInputfield
                        handlechange= {handlechange}
                        // onChange={handleVideoURL}
                        name="VideoURL"
                        // value={postvideo.VideoURL}
                        placeholder="Enter Video URL"
                       
                        type="text"
                      />
                       <p className="text-sm text-red-400">{error.VideoURLerr}</p>
                      
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
    </>
  );
};

export default AddVideoDetails;
