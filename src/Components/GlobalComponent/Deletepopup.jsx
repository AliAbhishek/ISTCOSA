import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import GlobalButton from "./GlobalButton";

const Deletepopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
        <button onClick={() => setIsOpen(true)}>
        <div className=" text-2xl ">{<MdDelete s />}</div>
      </button>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative shadow-2xl shadow-gray   md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-lg font-thin text-black">
                    Are you sure want to Delete?
                  </h3>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <div className="flex justify-end mt-5 gap-3 text-center ">
                    <GlobalButton
                      handlereset={() => setIsOpen(false)}
                      name="No"
                      bgcolor="white"
                      type="button"
                      textcolor="[#680d0d]"
                      bordercolor="[#680d0d]"
                    />
                    <GlobalButton
                      // handlereset={handlereset}
                      name="Yes"
                      bgcolor="white"
                      type="button"
                      textcolor="[#680d0d]"
                      bordercolor="[#680d0d]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Deletepopup;
