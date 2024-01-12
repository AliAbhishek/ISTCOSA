import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import GlobalButton from "./GlobalComponent/GlobalButton";
import {
  getcity,
  getcountries,
  getstate,
  postcompanies,
  updatecompanies,
} from "../utils/api/Companyapi/Index";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

function AddComapniespopup({
  flag,
  setflag,
  name,
  cname,
  caddress,
  cemail,
  cnumber,
  id,
  countryname,
  statename,
  cityname,
  
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);

  const [companydata, setcompanydata] = useState({
    CompanyName: "",
    CompanyAddress: "",
    EmailAddress: "",
    ContactNumber: "",
    Active: true,
    CityID: "",
    StateID: "",
    CountryID: "",
    FileUpload: "123",
    test : "",
    FilePath: "",
  });

  // console.log(companydata,'uncomment')
  

  const [error, seterror] = useState({
    CompanyNameerror: "",
    CompanyAddresserror: "",
    EmailAddresserror: "",
    ContactNumbererror: "",

    CityIDerror: "",
    StateIDerror: "",
    CountryIDerror: "",
    FileUploaderror: "",
  });

  

  const handlereset = () => {
    setIsOpen(false);
    setcompanydata("");
    seterror("");
  };
 

  useEffect(() => {
    getcountries().then((res) => setcountry(res));
  }, []);

  useEffect(() => {
    getstate(companydata.CountryID).then((res) => setstate(res));
  }, [companydata.CountryID]);

  useEffect(() => {
    getcity(companydata.StateID).then((res) => setcity(res));
  }, [companydata.StateID]);
 
  const handlesubmit = (e) => {
    e.preventDefault();
    
   
    validation();
  };

  const handlechange = (e) => {
    setcompanydata((old) => ({ ...old, [e.target.name]: e.target.value }));

    seterror((old) => ({ ...old, [`${e.target.name}error`]: "" }));
  };

  const handleupdate = (e) => {
    e.preventDefault();
    console.log(id);
    updatecompanies(id, companydata).then((res) => {
      if (res=="success") {
        setIsOpen(false);
        setflag(!flag);

        toast.success("Company data get updated");
      }
    }).catch(err=>{if(err){
      toast.error("Company data did not get updated")
      setIsOpen(false)
    }})
   
  };

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setcompanydata((old) => ({ ...old, FilePath: reader.result }));
    };
    reader.oneerror = (error) => {
      console.log("Error", error);
    };
  };


  const validation =  () => {
    const err = {
      CompanyNameerror: "",
      CompanyAddresserror: "",
      EmailAddresserror: "",
      ContactNumbererror: "",

      CityIDerror: "",
      StateIDerror: "",
      CountryIDerror: "",
      FileUploaderror: "",
    };

    let isvalid = true;
    if (!companydata.CompanyName) {
      err.CompanyNameerror = "Enter Company Name";
      isvalid = false;
    }
    if (!companydata.CompanyAddress) {
      err.CompanyAddresserror = "Enter Company Address";
      isvalid = false;
    }
    if (!companydata.EmailAddress) {
      err.EmailAddresserror = "Enter Email Addres";
      isvalid = false;
    }
    if (!companydata.ContactNumber) {
      err.ContactNumbererror = "Enter Contact Number";
      isvalid = false;
    }
    if (!companydata.CityID) {
      err.CityIDerror = "Choose City";
      isvalid = false;
    }
    if (!companydata.StateID) {
      err.StateIDerror = "Choose State";
      isvalid = false;
    }
    if (!companydata.CountryID) {
      err.CountryIDerror = "Choose Country";
      isvalid = false;
    }
    // if (!companydata.FileUpload) {
    //   err.FileUploaderror = "Choose Image";
    //   isvalid = false;
    // }

    if (!isvalid) {
      seterror(err);
    }
    if (isvalid) {
      
console.log(companydata,'comment')
      if(name=="add"){
        console.log(companydata)
        
        postcompanies(companydata)
        .then((res) => {
          if (res == "success") {
            setflag(!flag);
            toast.success("Company get added");
            setIsOpen(false);
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Company did not get added");
            setIsOpen(false);
          }
        });

      }

      if(name=="edit"){
        updatecompanies(id, companydata).then((res) => {
          if (res=="success") {
            setIsOpen(false);
            setflag(!flag);
    
            toast.success("Company data get updated");
          }
        }).catch(err=>{if(err){
          toast.error("Company data did not get updated")
          setIsOpen(false)
        }})

      }

      
    }
  };

  return (
    <div>
  
      <button
        onClick={() => {
          setcompanydata({
            CompanyName: cname ? cname : "",
            CompanyAddress: caddress ? caddress : "",
            EmailAddress: cemail ? cemail : "",
            ContactNumber: cnumber ? cnumber : "",
            Active: true,
            CityID: cityname,
            StateID:statename,
            CountryID: countryname ,
            FileUpload: "",
            FilePath: "",
            Active:true
          });
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
            <div className="relative md:w-2/5 w-3/5 h-80 overflow-y-scroll bottom-0 my-6 mx-auto max-w-3xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    {name == "add" ? "Add Company" : "Edit Company"}
                  </h3>
                </div>

                <form
                  onSubmit={name=="add"? handlesubmit : handleupdate}
                  className="relative w-full  px-8 py-6  "
                >
                  <div className="flex flex-col gap-3 md:flex-row md:justify-between">
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Enter Name"
                        name="CompanyName"
                        value={companydata.CompanyName}
                      />
                      <p className="text-sm text-red-400">
                        {error.CompanyNameerror}
                      </p>
                    </div>

                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Enter Address"
                        name="CompanyAddress"
                        value={companydata.CompanyAddress}
                      />
                      <p className="text-sm text-red-400">
                        {error.CompanyAddresserror}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col  md:flex-row gap-3 md:justify-between md:mt-6 mt-3">
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Enter Email"
                        name="EmailAddress"
                        value={companydata.EmailAddress}
                      />
                      <p className="text-sm text-red-400">
                        {error.EmailAddresserror}
                      </p>
                    </div>

                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Enter Contact Number"
                        name="ContactNumber"
                        value={companydata.ContactNumber}
                      />
                      <p className="text-sm text-red-400">
                        {error.ContactNumbererror}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between justify-stretch text-black md:mt-6 mt-3 gap-3">
                    <div className=" w-full md:w-1/3">
                      <select
                        onChange={handlechange}
                        name="CountryID"
                        value={companydata.CountryID}
                        id=""
                        className="bg-white w-full border border-black text-sm rounded-lg  block  p-2.5  "
                      >
                        <option selected>Country*</option>
                        {country.map((country) => {
                          return (
                            <option value={country.countryId}>
                              {country.countryName}
                            </option>
                          );
                        })}
                      </select>
                      <p className="text-sm text-red-400">
                        {error.CountryIDerror}
                      </p>
                    </div>

                    <div className="w-full md:w-1/3">
                      <select
                        onChange={handlechange}
                        name="StateID"
                        value={companydata.StateID}
                        id=""
                        className="bg-white w-full border border-black text-sm rounded-lg  block  p-2.5  "
                      >
                        <option className="" selected>
                          State*
                        </option>
                        {state.map((state) => {
                          return (
                            <option className="" value={state.StateId}>
                              {state.StateName}
                            </option>
                          );
                        })}
                      </select>
                      <p className="text-sm text-red-400">
                        {error.StateIDerror}
                      </p>
                    </div>

                    <div className="w-full md:w-1/3">
                      <select
                        onChange={handlechange}
                        name="CityID"
                        value={companydata.CityID}
                        id=""
                        className="bg-white w-full border border-black text-sm rounded-lg  block  p-2.5  "
                      >
                        <option selected>City*</option>
                        {city.map((item) => {
                          return (
                            <option value={item.CityId}>{item.CityName}</option>
                          );
                        })}
                      </select>
                      <p className="text-sm text-red-400">
                        {error.CityIDerror}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-black md:mt-6 mt-3">
                    Upload Image
                    <input
                      onChange={convertToBase64}
                      name="FileUpload"
                      value={companydata.FileUpload}
                      className="font-bold md:text-sm text-xs w-full    py-2 px-2  rounded border border-black"
                      type="file"
                    />
                  </div>
                  <p className="text-sm text-red-400">
                    {error.FileUploaderror}
                  </p>

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

export default AddComapniespopup;
