import React, { useState } from "react";

import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import GlobalButton from "../GlobalButton";
import { activateDeactivate } from "../../../utils/api/Userapi";
import { toast } from "react-toastify";

const DeActivatingUserPopUp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activate, setactivate] = useState(false);
  const [statusParam, setStatusparam] = useState("");

  
  return (
    <div>
      {props.Active == true ? (
        <RxCross1
          name={props.name}
          onClick={() => {
            
            let status = false;
            setStatusparam(status);
            console.log(status);
            setIsOpen(true);
          }}
          className="text-red-500 hover:cursor-pointer"
        />
      ) : (
        <TiTick
          name="deactivate"
          onClick={() => {
            let status = true;
            setStatusparam(status);
            console.log(statusParam);
            setactivate(true);
          }}
          className="text-blue-500 hover:cursor-pointer"
        />
      )}

      {isOpen || activate ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative shadow-2xl shadow-gray   md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-lg font-thin text-black">
                    {isOpen ? "Are you sure want to Deactivate User?" : null}
                    {activate ? "Are you sure want to activate User?" : null}
                  </h3>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <div className="flex justify-end mt-5 gap-3 text-center ">
                    <GlobalButton
                      handlereset={() => {
                        setactivate(false);
                        setIsOpen(false);
                      }}
                      name="No"
                      bgcolor="white"
                      type="button"
                      textcolor="[#680d0d]"
                      bordercolor="[#680d0d]"
                    />
                    <GlobalButton
                      handlereset={
                        isOpen
                          ? () => {
                              activateDeactivate(props.id, statusParam).then(
                                (res) => {
                                  if (res == "success") {
                                    props.setflag(!props.flag);
                                    toast.success(
                                      "User Deactivate Successfully"
                                    );
                                    setIsOpen(false);
                                  }
                                }
                              );
                            }
                          : () => {
                              
                              activateDeactivate(props.id, statusParam).then(
                                (res) => {
                                  if (res == "success") {
                                    props.setflag(!props.flag);
                                    toast.success(
                                      "User Activate Successfully"
                                    );
                                    setactivate(false);
                                  }
                                }
                              );
                            }
                      }
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default DeActivatingUserPopUp;
