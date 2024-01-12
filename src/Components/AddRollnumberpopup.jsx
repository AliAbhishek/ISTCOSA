import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalButton from "./GlobalComponent/GlobalButton";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import { getbatches, postbatches } from "../utils/api/Batchesapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddRollnumberpopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [flag,setflag] = useState(false)


  const [batchList, setbatchList] = useState([]);
  const [rollnumberdetail, setrollnumberdetail] = useState({
    Active: true,
    BatchID: "",
    StartRollNumbers: "",
    EndRollNumbers: "",
  });

  const [error, seterror] = useState({
    StartRollNumberserr: "",
    EndRollNumberserr: "",
  });

  const handlereset = () => {
    setIsOpen(false);
    setrollnumberdetail({
      Active: true,
      BatchID: "",
      StartRollNumbers: "",
      EndRollNumbers: "",
    });
    seterror("")
  };

  useEffect(() => {
    getbatches().then((res) =>
      setbatchList(res.filter((item) => item.Active === true))
    );
  }, []);

  const handlechange = (e) => {
    setrollnumberdetail((old) => ({ ...old, [e.target.name]: e.target.value }));
    seterror((old) => ({ ...old, [`${e.target.name}err`]: "" }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    validation();

    setrollnumberdetail({
      Active: true,
      BatchID: "",
      StartRollNumbers: "",
      EndRollNumbers: "",
    });


  };

  let validate = /^[0-9]$/

  const validation = async () => {
    const err = {
      BatchIDerr:"",
      StartRollNumberserr: "",
      EndRollNumberserr: "",
    };

    let isvalid = true;
    if (!rollnumberdetail.StartRollNumbers) {
      err.StartRollNumberserr = "Enter Start Roll No.";
      isvalid = false;
    }
    if (!rollnumberdetail.BatchID) {
      err.BatchIDerr = "Enter Start Roll No.";
      isvalid = false;
    }
    // else if (!validate.test(rollnumberdetail.StartRollNumbers)) {
    //   err.StartRollNumberserr = "Enter valid Roll No.";
    //   isvalid = false;
    // }


    if (!rollnumberdetail.EndRollNumbers) {
      err.EndRollNumberserr = "Enter End Roll No.";
      isvalid = false;
    }
    // else if (!validate.test(rollnumberdetail.EndRollNumbers)) {
    //   err.EndRollNumberserr = "Enter valid Roll No.";
    //   isvalid = false;
    // }

    if (!isvalid) {
      seterror(err);
    }
    if (isvalid) {
      await postbatches(rollnumberdetail).then((res) => {
        if(res=="success"){
          setflag(!flag)
          toast.success("Roll Number get added")
          setIsOpen(false)
          setrollnumberdetail("")
        }
      }).catch(err=>{if(err){
        toast.error("Roll Number did not get added")
        setIsOpen(false)
        setrollnumberdetail("")

      }})
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <div className=" text-2xl  text-[#680d0d]">{<FiPlusCircle />}</div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    Add Roll Number
                  </h3>
                </div>

                <form
                  onSubmit={handlesubmit}
                  type="submit"
                  className="relative w-full   px-8 py-6  "
                >
                  <div className=" ">
                    <select
                      onChange={handlechange}
                      name="BatchID"
                      value={rollnumberdetail.BatchID}
                      id=""
                      className="bg-white text-black border border-black text-sm rounded-lg  block w-full  p-2.5  "
                    >
                      <option >Select Batch</option>
                      {batchList.map((batch) => {
                        return <option>{batch.BatchID}</option>;
                      })}
                    </select>
                    <p className="text-sm text-red-400">
                          {error.BatchIDerr}
                        </p>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between gap-3  mt-2 ">
                    
                      <div>
                        <GlobalInputfield
                          type="text"
                          handlechange={handlechange}
                          placeholder="Enter  Start Roll Number"
                          name="StartRollNumbers"
                          value={rollnumberdetail.StartRollNumbers}
                        />
                        <p className="text-sm text-red-400">
                          {error.StartRollNumberserr}
                        </p>
                      </div>
                    
                    <div>
                      <div className="">
                        <GlobalInputfield
                          type="text"
                          handlechange={handlechange}
                          placeholder="Enter End Roll Number"
                          name="EndRollNumbers"
                          value={rollnumberdetail.EndRollNumbers}
                        />
                        <p className="text-sm text-red-400">
                          {error.EndRollNumberserr}
                        </p>
                      </div>
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
    </div>
  );
}

export default AddRollnumberpopup;
