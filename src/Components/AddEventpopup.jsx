import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalButton from "./GlobalComponent/GlobalButton";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import {  postevents, updateevents } from "../utils/api/Event/Index";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

function AddEventpopup({
  flag,
  setflag,
  name,
  EventName,
  date,
  location,
  folder,
  summary,
  pic,
  id
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setimage] = useState("");
  const [formatdate,setformateddate] = useState("")

  const handlereset = () => {
    setIsOpen(false);
    seteventdetails("");
  };

  const [eventdetails, seteventdetails] = useState({
    EventName: "",
    EventDate: "",
    EventLocation: "",
    EventPicFolder: "",
    EventImage: "",
    FilePath: "",
    Summary: "",
    Active: true,
  });

  const [error,seterror] = useState({
    
      EventNameerr: "",
      EventDateerr: "",
      EventLocationerr: "",
      EventPicFoldererr: "",
     
      Summaryerr: "",
      
    
  })

  const handlechange = (e) => {
    seteventdetails((old) => ({ ...old, [e.target.name]: e.target.value }));
    seterror((old=>({...old,[`${e.target.name}err`]: " "})))
  };

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setimage(reader.result);
      seteventdetails((old) => ({ ...old, FilePath: reader.result }));
    };
    reader.oneerror = (error) => {
      console.log("Error", error);
    };
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    
    validation()

   
    
  };

  const validation=()=>{
    let isvalid=true
    const err=({
      EventNameerr: "",
      EventDateerr: "",
      EventLocationerr: "",
      EventPicFoldererr: "",
     
      Summaryerr: "",
    })

    if(!eventdetails.EventName){
      err.EventNameerr="Please enter Event"
      isvalid=false
    }
    if(!eventdetails.EventDate){
      err.EventDateerr="Please enter date"
      isvalid=false
    }
    if(!eventdetails.EventLocation){
      err.EventLocationerr="Please enter Location"
      isvalid=false
    }
    if(!eventdetails.EventPicFolder){
      err.EventPicFoldererr="Please enter folder"
      isvalid=false
    }
    if(!eventdetails.Summary){
      err.Summaryerr="Please enter Summary"
      isvalid=false
    }
    if(!isvalid){
      seterror(err)
    }
    if(isvalid){

      if(name=="add"){
        postevents(eventdetails).then((res) => {
          if(res=="success"){
            
            setIsOpen(false);
            toast.success("Event get added");
            setflag(!flag);
            seteventdetails("");
    
          }
         
        });
       
      }
      else{
        console.log(eventdetails, "eventdetails");
        updateevents(id,eventdetails).then(res=>{if(res=="success"){
          setIsOpen(false);
          toast.success("Event get updated");
          setflag(!flag);
        }
    
        })
      

      }
      
      
    }

  }

  // console.log(eventdetails,"outer")
 

  const changedateformat = (date) => {
    let myarr = date.split("");

    let newarr = myarr.slice(0, 10);
    let year = newarr.slice(0, 4).join("");

    let month = newarr.slice(5, 7).join("");

    let day = newarr.slice(8, 10).join("");

    let formateddate = year + "-" + month + "-" + day 

    setformateddate(formateddate);
    
    
  };

 

  function seteditdate() {
    seteventdetails({
      EventName: EventName ? EventName : "",
      EventDate: `${formatdate}`,
      EventLocation: location ? location : "",
      EventPicFolder: folder ? folder : "",
      EventImage: pic ? pic : "",
      FilePath: null,
      Summary: summary ? summary : "",
      Active: true,
    });
  }
  

  

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
          changedateformat(date);
          seteditdate()
         

         
        }}
      >
        <div className=" text-2xl  text-[#680d0d]">
          {name == "add" ? (
            <FiPlusCircle />
          ) : (
            <MdEdit className="text-blue-900" />
          )}{" "}
        </div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative md:w-2/5 w-3/5 h-80 overflow-y-scroll bottom-0 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    {name == "add" ? "Add Event Details" : "Edit Event Details"}
                  </h3>
                </div>

                <form
                  onSubmit={handlesubmit}
                  className="relative w-full text-sm px-8 py-6  "
                >
                  <div className="flex flex-col gap-3 md:flex-row md:justify-between md:mt-6 mt-3">
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Event Name"
                        name="EventName"
                        value={eventdetails.EventName}
                      />
                      <p className="text-sm text-red-400">{error.EventNameerr}</p>
                    </div>
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Event Location"
                        name="EventLocation"
                        value={eventdetails.EventLocation}
                      />
                       <p className="text-sm text-red-400">{error.EventLocationerr}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:justify-between md:mt-6 mt-3">
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="date"
                        name="EventDate"
                        value={eventdetails.EventDate}
                      />
                       <p className="text-sm text-red-400">{error.EventDateerr}</p>
                    </div>
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Event Folder"
                        name="EventPicFolder"
                        value={eventdetails.EventPicFolder}
                      />
                       <p className="text-sm text-red-400">{error.EventPicFoldererr}</p>
                    </div>
                  </div>
                  <div className="md:mt-6 mt-3">
                    <GlobalInputfield
                      handlechange={handlechange}
                      type="text"
                      name="Summary"
                      value={eventdetails.Summary}
                      placeholder="Summary"
                    />
                     <p className="text-sm text-red-400">{error.Summaryerr}</p>
                  </div>
                  <div className="md:mt-6 mt-3 text-black">
                    <p className="ml-1">Upload Image</p>
                    {/* <GlobalInputfield
                      handlechange={handlechange}
                      name="EventImage"
                      value={eventdetails.EventImage}
                      type="file"
                    /> */}
                    <input
                    className="font-bold md:text-sm text-xs w-full    py-2 px-2  rounded border border-black"
                      onChange={convertToBase64}
                      name="FilePath"
                      type="file" 
                      
                      
                    />
                    {/* <img className="mt-2" src={eventdetails.EventImage} alt="Image"/> */}
                  </div>

                  <div className="flex justify-end mt-5 gap-3">
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

export default AddEventpopup;
