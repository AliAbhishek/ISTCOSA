import React, { useState } from "react";
import { MdDetails } from "react-icons/md";
import GlobalButton from "../GlobalButton";

const ShowProfessionalDetailPopup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openbox = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div>
        <MdDetails
          onClick={openbox}
          className="text-[#680d0d]  hover:cursor-pointer"
        />
      </div>
      <div>
        {isOpen ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
              <div className="relative md:w-2/5 w-3/5 h-80 overflow-y-scroll no-scrollbar bottom-0 my-6 mx-auto max-w-3xl ">
                <div className=" border-0 text-black text-lg rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
                  <div className="m-8">
                    <div className="">
                      <p className="font-bold">Company Name</p>
                      <p className="text-sm">{props.cname}</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-2">
                      <div>
                        <p className="font-bold">Profession</p>
                        <p className="text-sm">{props.Profession}</p>
                      </div>
                      <div>
                        <p className="font-bold">Designation</p>
                        <p className="text-sm">{props.Designation}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-2">
                      <div>
                        <p className="font-bold">From Date</p>
                        <p className="text-sm">{props.FromDate?props.FromDate:"None"}</p>
                      </div>
                      <div>
                        <p className="w-24 font-bold">To Date</p>
                        <p className="text-sm">{props.ToDate?props.ToDate:"None"}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="font-bold">Responsibility</p>
                      <p className="text-sm">{props.Responsibility}</p>
                    </div>
                  </div>

                  <div className="flex justify-end m-5  ">
                    <GlobalButton
                      handlereset={() => setIsOpen(false)}
                      name="Close"
                      bgcolor="white"
                      type="button"
                      textcolor="[#680d0d]"
                      bordercolor="[#680d0d]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ShowProfessionalDetailPopup;
