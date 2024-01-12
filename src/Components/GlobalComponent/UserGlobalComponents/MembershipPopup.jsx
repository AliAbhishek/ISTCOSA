import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdCardMembership } from "react-icons/md";
import GlobalButton from "../GlobalButton";
import GlobalInputfield from "../GlobalInputfield";
import { activateDeactivateMembership, postmembershipdetails } from "../../../utils/api/Userapi";
import { toast } from "react-toastify";

const MembershipPopup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error,seterror] = useState("")
  const [membername, setmembername] = useState("");
  const [alumniform, setalumniform] = useState(false);
  const [addmembership,setaddmembership]=useState({
    
    "PaymentDate": "",
    "Amount": "",
    "PaymentType": "",
    "Remarks": "",
    "UserID": props.id,
    "GatewayResponse": "",
    "Active": true
  })

  const handlechange=(e)=>{
    setaddmembership((old)=>({...old,[e.target.name]:e.target.value}))

  }

  const handlesubmit=(e)=>{
    e.preventDefault()

    validation()
    setaddmembership("")
    
    
  }

  const changemembership=()=>{
    console.log(props.id)
    activateDeactivateMembership(props.id,"true").then(res=>{
      if (res == "success") {
        props.setflag(!props.flag);
        toast.success(
          "Membership changed"
        );
        setIsOpen(false);
      }
    })

  }

  const validation = () => {
    let isvalid = true;
    const err = {
      "PaymentDateerr": "",
    "Amounterr": "",
    "PaymentTypeerr": "",
    "Remarkserr": "",
   
    "GatewayResponseerr": "",
    
    };

    if (!addmembership.PaymentDate) {
      err.PaymentDateerr = "Please Select Date";
      isvalid = false;
    }
    if (!addmembership.Amount) {
      err.Amounterr = "Please Enter Amount";
      isvalid = false;
    }
    if (!addmembership.PaymentType) {
      err.PaymentTypeerr = "Please Enter Pyment type";
      isvalid = false;
    }
    // if (!adduser.OldPicture) {
    //   err.OldPictureerr = "Please Upload Picture";
    //   isvalid = false;
    // }
    if (!addmembership.Remarks) {
      err.Remarkserr = "Please Enter Remarks";
      isvalid = false;
    }
    if (!addmembership.GatewayResponse) {
      err.GatewayResponseerr = "Please Enter Response";
      isvalid = false;
    }
    if (!isvalid) {
      seterror(err);
    }
    if (isvalid) {
      postmembershipdetails(addmembership).then(res=>{
        if(res=="success"){
          toast.success("Membership get Added")
          setalumniform(false)
          props.setflag(!props.flag)
          setaddmembership({
      
            "PaymentDate": "",
            "Amount": "",
            "PaymentType": "",
            "Remarks": "",
            "UserID": "",
            "GatewayResponse": "",
            "Active": true
          })
          
        }
      }).catch(err=>{if(err){
        toast.error("Membership did not get Added")
        setalumniform(false)
        setaddmembership("")
  
      }})
  };
}

  
  return (
    <div>
      {" "}
      {props.MembershipType == "Life Member" ? (
        <MdCardMembership
          onClick={() => {
            setmembername(props.membername);
            setIsOpen(true);
          }}
          className="text-yellow-600 hover:cursor-pointer"
        />
      ) : (
        <IoPerson
          onClick={() => {
            setalumniform(true);
          }}
          className="hover:cursor-pointer"
        />
      )}
      {isOpen ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
          <div className="relative shadow-2xl shadow-gray   md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-lg font-thin text-black">
                  {`Are You Sure want to change ${membername} Membership ?`}
                  {/* Are You Sure want to change Membership  */}
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
                    handlereset={changemembership}
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

      
      {alumniform ? (
        <>
        <div className="justify-center s items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
          <div className="relative shadow-2xl h-[400px] overflow-scroll shadow-gray   md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl  text-[#680d0d]">
                  Life Membership Details
                </h3>
              </div>
              <form
                onSubmit={handlesubmit}
                className="relative w-full  px-8 py-6  "
              >
                <div className="m-5 ">
                  <div className="flex flex-col md:flex-row items-center md:justify-between gap-3  ">
                    <div className="md:w-48 w-full">
                      <select
                        onChange={handlechange}
                        name="PaymentType"
                        value={addmembership.PaymentType}
                        id=""
                        className="bg-white border text-black border-black text-sm rounded-lg  block w-full  p-2.5 md:h-12 h-10 "
                      >
                        <option selected>Select Payment type</option>
                        <option value="Cash">Cash</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                      </select>
                      <p className="text-sm text-red-400">
                        {error.PaymentDateerr}
                      </p>
                    </div>

                    <div className="w-full md:w-1/2">
                      <GlobalInputfield
                        type="text"
                        handlechange={handlechange}
                        placeholder="Enter Amount"
                        name="Amount"
                        value={addmembership.Amount}
                      />
                      <p className="text-sm text-red-400">{error.Amounterr}</p>
                    </div>
                  </div>
                  <div className="w-full mt-4  ">
                    <textarea
                      name="GatewayResponse"
                      onChange={handlechange}
                      value={addmembership.GatewayResponse}
                      className=" text-lg rounded-lg border p-3 border-black w-full"
                      placeholder="Gateway Response"
                    ></textarea>
                    <p className="text-sm text-red-400">
                      {error.GatewayResponseerr}
                    </p>
                  </div>
                  <div className="w-full mt-3 ">
                    <textarea
                      name="Remarks"
                      onChange={handlechange}
                      value={addmembership.Remarks}
                      className="text-lg rounded-lg border p-3 border-black w-full"
                      placeholder="Remarks"
                    ></textarea>
                    <p className="text-sm text-red-400">{error.Remarkserr}</p>
                  </div>
                  <div className="mt-3">
                    <p className="m-1 text-sm">Payment Date</p>
                    <GlobalInputfield
                      handlechange={handlechange}
                      placeholder="yyyy/mm/dd"
                      type="date"
                      name="PaymentDate"
                      value={addmembership.PaymentDate}
                    />
                  </div>
                  <p className="text-sm text-red-400">{error.PaymentDateerr}</p>
                </div>
                <div className="flex justify-end m-5 gap-3  ">
                  <GlobalButton
                    handlereset={()=>{
                      setalumniform(false)
                      setaddmembership("")
                      seterror("")
                    }}
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
};

export default MembershipPopup;
