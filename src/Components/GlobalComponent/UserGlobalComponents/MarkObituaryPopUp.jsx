import React, { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { HiNoSymbol } from "react-icons/hi2";
import GlobalButton from "../GlobalButton";
import { activateDeactivateObituary } from "../../../utils/api/Userapi";
import { toast } from "react-toastify";

const MarkObituaryPopUp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusParam, setStatusparam] = useState("");
  const [activate, setactivate] = useState(false);
  return (
    <div>
      {props.IsAlive == true ? (
        <BsPersonFill
        name={props.name}
          onClick={() => {setIsOpen(true)
           
            let status = false;
            setStatusparam(status);
            console.log(status)}}
          className="text-[#680d0d] hover:cursor-pointer"
        />
      ) : (
        <HiNoSymbol
        name="deactivate"
          onClick={() => {
            let status = true;
            setStatusparam(status);
            console.log(statusParam);
            setactivate(true)}}
          className="text-black hover:cursor-pointer"
        />
      )}

      {isOpen || activate ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
          <div className="relative shadow-2xl shadow-gray   md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl font-thin text-black">
                {isOpen ? "Are you sure want to Obituary User?" : null}
                    {activate ? "Are you sure want to Alive User?" : null}
                </h3>
              </div>
              <div className="flex items-center justify-center mb-6">
                <div className="flex justify-end mt-5 gap-3 text-center ">
                  <GlobalButton
                    handlereset={() =>{ 
                      setactivate(false)
                      setIsOpen(false)}
                  }
                    name="No"
                    bgcolor="white"
                    type="button"
                    textcolor="[#680d0d]"
                    bordercolor="[#680d0d]"
                  />
                  <GlobalButton
                    handlereset={isOpen
                      ? () => {
                          activateDeactivateObituary(props.id, statusParam).then(
                            (res) => {
                              if (res == "success") {
                                props.setflag(!props.flag);
                                toast.success(
                                  "User made Obituary"
                                );
                                setIsOpen(false);
                              }
                            }
                          );
                        }
                      : () => {
                        console.log(props.id)
                              
                        activateDeactivateObituary(props.id, statusParam).then(
                          (res) => {
                            if (res == "success") {
                              props.setflag(!props.flag);
                              toast.success(
                                "User made Alive"
                              );
                              setactivate(false);
                            }
                          }
                        );
                      } }
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

export default MarkObituaryPopUp;
