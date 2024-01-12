import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import GlobalButton from "./GlobalComponent/GlobalButton";
import { getcountries, getstate } from "../utils/api/Companyapi/Index";
import { postcity, updatecity } from "../utils/api/Cityapi";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

function AddCitypopup(props) {
  const [isOpen, setIsOpen] = useState(false);
  

  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [addcity, setaddcity] = useState({
    CityName: "",
    StateId: "",
    CountryId: "",
    Active: true,
  });
  const [error, seterror] = useState({
    CityNameerr: "",
    StateIderr: "",
    CountryIderr: "",
  });

  useEffect(() => {
    getcountries().then((res) => setcountry(res));
  }, []);
  useEffect(() => {
    getstate(addcity.CountryId).then((res) => setstate(res));
  }, [addcity.CountryId]);
  console.log(state);

  const handlereset = () => {
    setIsOpen(false);
    seterror("")
    setaddcity("")
  };

  const handlechange = (e) => {
    setaddcity((old) => ({ ...old, [e.target.name]: e.target.value }));
    seterror((old) => ({ ...old, [`${e.target.name}err`]: "" }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    validity();
    console.log(addcity);
  };

  const validity = async () => {
    let err = {
      CityNameerr: "",
      StateIderr: "",
      CountryIderr: "",
    };

    let isvalid = true;

    if (!addcity.CityName) {
      err.CityNameerr = "Please Enter City";
      isvalid = false;
    }

    if (!addcity.CountryId) {
      err.CountryIderr = "Please Select Country";
      isvalid = false;
    }
    if (!addcity.StateId) {
      err.StateIderr = "Please Select State";
      isvalid = false;
    }
    if (!isvalid) {
      seterror(err);
    }
    if (isvalid) {
      if(props.name=="add"){
        postcity(addcity).then((res) => {
          if (res === "success") {
            props.setflag(!props.flag);
            toast.success("City get added");
            setIsOpen(false);
            setaddcity("");
          }
        });

      }else{
        updatecity(props.id,addcity).then(res=>{if(res=="success"){
          props.setflag(!props.flag);
          toast.success("City get updated")
          setIsOpen(false);
          setaddcity("");
        }})
      }
      
    }
  };

  return (
    <div>
      <button onClick={() =>{ 
        setIsOpen(true)
        console.log(props.sName)
        console.log(props.cName)

       setaddcity({
        CityName: props.CityName,
        StateId: props.sName,
        CountryId: props.cName,
        Active: true,
      })

        }}>
        <div className="text-2xl  text-[#680d0d]">{props.name=="add"?<FiPlusCircle />:<MdEdit/>}</div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative  md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    {props.name=="add"?"Add City":"Update City"}
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
                        value={addcity.CountryId  }
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
                      <p className="text-sm text-red-400">
                        {error.CountryIderr}
                      </p>
                    </div>
                    <div>
                      <select
                        onChange={handlechange}
                        name="StateId"
                        value={addcity.StateId}
                        id=""
                        className="bg-white border text-black border-black text-sm rounded-lg  block w-full  p-2.5 md:h-12 h-10 "
                      >
                        <option>Select State*</option>
                        {state.map((batch) => {
                          return (
                            <option value={batch.StateId}>
                              {batch.StateName}
                            </option>
                          );
                        })}
                      </select>
                      <p className="text-sm text-red-400">{error.StateIderr}</p>
                    </div>
                    <div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        type="text"
                        placeholder="Enter City*"
                        name="CityName"
                        value={addcity.CityName}
                      />
                      <p className="text-sm text-red-400">
                        {error.CityNameerr}
                      </p>
                    </div>
                  </div>
                  {/* <div>
                    <p className="text-sm text-red-400">{error.CityNameerr}</p>
                  </div> */}

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

export default AddCitypopup;
