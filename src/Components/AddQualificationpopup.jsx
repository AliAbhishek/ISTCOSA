import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import GlobalInputfield from "./GlobalComponent/GlobalInputfield";
import GlobalButton from "./GlobalComponent/GlobalButton";
import {
  editqualifications,
  getqualifications,
  postqualifications,
} from "../utils/api/Qualificationapi";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

function AddQualificationpopup({ modelname, id, qname, flag, setFlag,temp }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, seterror] = useState("");


  console.log(temp,'temp')

  const [addqualification, setaddqualification] = useState({
    QualificationName: "",
    Active: true,
  });

  const handlereset = () => {
    setIsOpen(false);
    setaddqualification({
      QualificationName: "",
      Active: true,
    });
    seterror("");
  };

  const handlechange = (e) => {
    setaddqualification((old) => ({ ...old, [e.target.name]: e.target.value }));
    seterror("");
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    if (!addqualification.QualificationName) {
      seterror("Enter Qualifications");
      isvalid(false);
    }
    if (isvalid) {
      postqualifications(addqualification)
        .then((res) => {
          if (res == "success") {
            toast.success("Qualification added");
            setFlag(!flag);
            setIsOpen(false);
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Qualification did not added");
            setIsOpen(false);
            setaddqualification("");
          }
        });
    }
  };

  const handleupdate = (e) => {
    e.preventDefault();
    let isvalid = true;
    if (!addqualification.QualificationName) {
      seterror("Enter Qualifications");
      isvalid=false;
    }
    if (isvalid) {
      editqualifications(id, addqualification)
        .then((res) => {
          if (res == "success") {
            toast.success("Qualification get Updated");
            setIsOpen(false);
            setFlag(!flag);
            setaddqualification("");
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Qualification did not get Updated");
            setIsOpen(false);
            setaddqualification("");
          }
        });
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setaddqualification({
            QualificationName: qname ? qname : "",
            Active: true,
          });

          setIsOpen(true);
        }}
      >
        <div className=" text-2xl  text-[#680d0d]">
          {modelname == "add" ? <FiPlusCircle /> : <MdEdit />}
        </div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    {modelname == "add"
                      ? "Add Qualifications"
                      : "Edit Qualifications"}
                  </h3>
                </div>

                <form
                  onSubmit={modelname == "add" ? handlesubmit : handleupdate}
                  className="relative w-full  px-8 py-6  "
                >
                  <div>
                    <GlobalInputfield
                      handlechange={handlechange}
                      type="text"
                      placeholder="Enter Qualification type"
                      name="QualificationName"
                      value={addqualification.QualificationName}
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
                      name={modelname == "add" ? "Submit" : "Update"}
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

export default AddQualificationpopup;
