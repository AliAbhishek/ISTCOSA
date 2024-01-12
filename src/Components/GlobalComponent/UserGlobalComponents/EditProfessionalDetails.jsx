import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import GlobalInputfield from "../GlobalInputfield";
import GlobalButton from "../GlobalButton";
import { getcompnies } from "../../../utils/api/Companyapi/Index";
import {
  updateprofessionaldetails,
  updateuserdetails,
} from "../../../utils/api/Userapi";
import { toast } from "react-toastify";

const EditProfessionalDetails = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error,seterror] = useState("")
  const [comapnylist, setcomapnylist] = useState([]);
  const [formateddate, setformateddate] = useState("");

  const [professionaldetails, setprofessionaldetails] = useState({
    ProfessionalInformationID: "",
    Profession: "",
    CompanyID: "",
    Designation: "",
    Responsibility: "",
    UserID: "",
    Active: true,
    FromDate: "",
    ToDate: "",
  });

  const handlechange = (e) => {
    setprofessionaldetails((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getcompnies().then((res) => setcomapnylist(res));
  }, [setIsOpen]);

  const handleupdate = (e) => {
    e.preventDefault();

    validation();
  };

  const validation = () => {
    let isvalid = true;
    const err = {
      ProfessionalInformationIDerr: "",
      Professionerr: "",
      CompanyIDerr: "",
      Designationerr: "",
      Responsibilityerr: "",

      FromDateerr: "",
      ToDateerr: "",
    };

    if (!professionaldetails.ProfessionalInformationID) {
      err.ProfessionalInformationIDerr = "Please Select Batch";
      isvalid = false;
    }
    if (!professionaldetails.Profession) {
      err.Professionerr = "Please Select Roll Number";
      isvalid = false;
    }
    if (!professionaldetails.Designation) {
      err.Designationerr = "Please Enter Name";
      isvalid = false;
    }
    if (!professionaldetails.Responsibility) {
      err.Responsibilityerr = "Please Upload Picture";
      isvalid = false;
    }
    if (!professionaldetails.FromDate) {
      err.FromDateerr = "Please Select Gender";
      isvalid = false;
    }
    if (!professionaldetails.ToDate) {
      err.ToDateerr = "Please Select Gender";
      isvalid = false;
    }
    if (!isvalid) {
      seterror(err);
    }
    if (isvalid) {
      updateprofessionaldetails(props.pid, professionaldetails)
        .then((res) => {
          if (res=="success") {
            props.setflag(!props.flag);
            toast.success("Data updated Successfully");
            setIsOpen(false);
            setprofessionaldetails("");
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Data did not updated Successfully");
            setIsOpen(false);
            setprofessionaldetails("");
          }
        });
    }
  };

  const changedateformat = (date) => {
    let myarr = date.split("");

    let newarr = myarr.slice(0, 10);
    let year = newarr.slice(0, 4).join("");

    let month = newarr.slice(5, 7).join("");

    let day = newarr.slice(8, 10).join("");

    let formateddate = year + "-" + month + "-" + day;

    setformateddate(formateddate);

    setprofessionaldetails((old) => ({ ...old, FromDate: formateddate }));
  };

  return (
    <div>
      <div>
        <MdEdit
          onClick={() => {
            console.log(props.FromDate, "date");

            setIsOpen(true);
            setprofessionaldetails({
              ProfessionalInformationID: props.pid ? props.pid : "",
              Profession: props.Profession ? props.Profession : "",
              CompanyID: props.cid ? props.cid : "",
              Designation: props.Designation ? props.Designation : "",
              Responsibility: props.Responsibility ? props.Responsibility : "",
              UserID: props.UserID ? props.UserID : "",
              Active: true,
              FromDate: formateddate,
              ToDate: props.ToDate ? props.ToDate : "",
            });
            changedateformat(props.FromDate);
          }}
          className="text-blue-500 hover:cursor-pointer"
        />
      </div>

      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative md:w-2/5 w-3/5 h-80 overflow-y-scroll no-scrollbar bottom-0 my-6 mx-auto max-w-3xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
                <div className="text-center font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="md:text-3xl text-xl font-thin text-[#680d0d]">
                    Update User Professional Details
                  </h3>
                </div>

                <form
                  onSubmit={handleupdate}
                  className="relative w-full  px-8 py-6  text-sm text-black "
                >
                  <div>
                    Company Name
                    <select
                      name="CompanyID"
                      onChange={handlechange}
                      value={professionaldetails.CompanyID}
                      className="border-black border text-black text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-10 md:h-12  p-2.5   "
                    >
                      {comapnylist.map((item) => {
                        return (
                          <option value={item.CompanyID} className="w-80">
                            {item.CompanyName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex gap-3 flex-col md:flex-row item-center justify-between mt-2">
                    <div>
                      Profession
                      <select
                        onChange={handlechange}
                        name="Profession"
                        value={professionaldetails.Profession}
                        className="border-black  border text-black text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-10 md:h-12  p-2.5  "
                      >
                        <option value="Government Sector">
                          Government Sector
                        </option>
                        <option value="Private Sector">Private Sector</option>
                        <option value="Self Employed">Self Employed</option>
                        <option value="Own Bussiness/Enterpreneur">
                          Own Bussiness
                        </option>
                        <option value="Retired">Retired</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="md:w-44 w-full">
                      Designation
                      <GlobalInputfield
                        handlechange={handlechange}
                        name="Designation"
                        value={professionaldetails.Designation}
                        placeholder="Designation"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 flex-col md:flex-row  md:justify-between mt-2 ">
                    <div className="flex flex-col">
                      {" "}
                      <label htmlFor="">From Date</label>
                      <input
                        onChange={handlechange}
                        name="FromDate"
                        value={professionaldetails.FromDate}
                        type="date"
                        placeholder="From Date"
                        className="border-black border md:w-40 text-black text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-10 md:h-12  p-2.5 "
                      />
                    </div>
                    <div className="flex flex-col">
                      {" "}
                      <label htmlFor="">To Date</label>
                      <input
                        onChange={handlechange}
                        name="ToDate"
                        value={professionaldetails.ToDate}
                        type="date"
                        placeholder="To Date"
                        className="border-black border md:w-44 text-black text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-10 md:h-12  p-2.5   "
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    Responsibility
                    <GlobalInputfield
                      handlechange={handlechange}
                      name="Responsibility"
                      value={professionaldetails.Responsibility}
                      placeholder="Responsibility"
                    />
                  </div>

                  <div className="flex justify-end mt-5 gap-3 ">
                    <GlobalButton
                      handlereset={() => setIsOpen(false)}
                      name="Close"
                      bgcolor="white"
                      type="button"
                      textcolor="[#680d0d]"
                      bordercolor="[#680d0d]"
                    />
                    <GlobalButton
                      name="Update"
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

export default EditProfessionalDetails;
