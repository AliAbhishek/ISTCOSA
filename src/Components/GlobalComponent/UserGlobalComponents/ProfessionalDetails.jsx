import React, { useEffect, useState } from "react";
import { IoBagRemoveSharp } from "react-icons/io5";
import GlobalButton from "../GlobalButton";
import { getuserdetails } from "../../../utils/api/Userapi";
import { useNavigate } from "react-router-dom";

const ProfessionalDetails = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [professionaldetails, setprofessionaldetails] = useState([]);
  const [hitdetailapi, sethitdetailapi] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    getuserdetails(props.id).then((res) => setprofessionaldetails(res));
  }, [hitdetailapi]);



  return (
    <div>
      <>
        <IoBagRemoveSharp
          onClick={() => {
            sethitdetailapi(true);
            if (professionaldetails[0]) {
              navigate("/users/showprofessionaldetails",{state:{id:props.id}})
            } else {
              setIsOpen(true);
            }
          }}
          className="text-gray-400 hover:cursor-pointer"
        />
      </>

      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative shadow-2xl shadow-gray   md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-lg font-thin text-black">
                    User Have No Professional Record
                  </h3>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <div className="flex justify-end mt-5 gap-3 text-center ">
                    <GlobalButton
                      handlereset={() => setIsOpen(false)}
                      name="Ok"
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

export default ProfessionalDetails;
