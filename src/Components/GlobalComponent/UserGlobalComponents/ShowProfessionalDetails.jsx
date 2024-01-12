import React, { useEffect, useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalInputfield from "../GlobalInputfield";
import {
  deleteprofessionaldetails,
  getuserdetails,
} from "../../../utils/api/Userapi";
import { MdDelete, MdDetails, MdEdit } from "react-icons/md";
import EditProfessionalDetails from "./EditProfessionalDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowProfessionalDetailPopup from "./ShowProfessionalDetailPopup";
import Pagination from "../../Pagination";
import { all } from "axios";
// import ShowProfessionalDetailPopup from "./ShowProfessionalDetailPopup";

const ShowProfessionalDetails = () => {
  const navigate = useNavigate();
 const[allsearchdata,setallsearcheddata] = useState([])
  const [flag, setflag] = useState(false);
  
  const [professionaldetails, setprofessionaldetails] = useState([]);
  const [itemperpage, setitemperpage] = useState(10);

  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(
    itemperpage ? itemperpage : lastpageitem
  );

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = professionaldetails.slice(firstindex, lastindex);
  const searchonepage = allsearchdata.slice(firstindex, lastindex);

 

  const changepage = (pageNumbers) => setinitialpage(pageNumbers);

  const handlechange=(e)=>{
    setallsearcheddata(professionaldetails.filter((item)=>{
     return item.CompanyName.toLowerCase().includes(e.target.value)
    }))
  }

  const getdataonpage = (value) => {
    setlastpageitem(parseInt(value));
    console.log(typeof lastpageitem);
  };

  const location = useLocation();

  useEffect(() => {
    getuserdetails(location.state.id).then((res) =>
      setprofessionaldetails(res)
    );
  }, [location.state.id, flag]);

  const handledelete = (id) => {
    let conf = confirm("Do you want to delete");
    if (conf) {
      deleteprofessionaldetails(id).then((res) => {
        if (res) {
          setflag(!flag);
        }
      });
      toast.success("Professional details deleted successfully");
    }
  };

  return (
    <div className="m-8">
      <ToastContainer />{" "}
      <>
        <div className="flex  items-center justify-between ">
          <div className=" text-3xl font-semibold text-[#680d0d]">
            Professional List
          </div>
          <div>
            <div className=" text-2xl  text-[#680d0d]">
              {<IoArrowBack onClick={() => navigate(-1)} />}
            </div>
          </div>
        </div>
        <div className="mt-10 flex-gap-2">
          <GlobalInputfield
            placeholder="Filter"
            type="text"
            name="search"
            handlechange={handlechange}
          />
        </div>
        <div className="overflow-auto h-[400px] mt-6">
          <table className="w-full">
            <thead className="  ">
              <tr className=" h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d] ">
                <th className=" px-5"> Action</th>
                <th className="">Company Name</th>
                <th className=" ">Profession</th>
                <th className=" ">Designation</th>
                <th className=" ">From Date</th>
                <th className=" ">To Date</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll  ">
              {(allsearchdata[0]?allsearchdata:professionaldetails)
                // .filter((item) => {
                //   return search.toLowerCase() === ""
                //     ? item
                //     : item.QualificationName.toLowerCase().includes(search);
                // })
                .map((item) => (
                  <tr className="border h-12">
                    <td className="w-[0%] px-5 text-orange-600 text-2xl">
                      <div className="flex gap-2">
                        <EditProfessionalDetails
                          flag={flag}
                          setflag={setflag}
                          pid={item.ProfessionalInformationID}
                          cid={item.CompanyID}
                          cname={item.CompanyName}
                          Designation={item.Designation}
                          FromDate={item.FromDate}
                          Profession={item.Profession}
                          Responsibility={item.Responsibility}
                          ToDate={item.ToDate}
                          UserID={item.UserID}
                          className="text-blue-500 hover:cursor-pointer"
                        />
                        <ShowProfessionalDetailPopup
                          cname={item.CompanyName}
                          Designation={item.Designation}
                          FromDate={item.FromDate}
                          Profession={item.Profession}
                          Responsibility={item.Responsibility}
                          ToDate={item.ToDate}
                        />
                        <MdDelete
                          onClick={() =>
                            handledelete(item.ProfessionalInformationID)
                          }
                          className="text-orange-500  hover:cursor-pointer"
                        />
                      </div>
                    </td>

                    <td className="px-5 text-center">{item.CompanyName}</td>
                    <td className="px-5 text-center">{item.Profession}</td>
                    <td className="px-5 text-center">{item.Designation}</td>
                    <td className="px-5 text-center">{item.FromDate}</td>
                    <td className="px-5 text-center">{item.ToDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-end item-center sticky bottom-0 border h-12  bg-white ">
            <Pagination
          batchList={professionaldetails}
          lastpageitem={lastpageitem}
          changepage={changepage}
          firstindex={firstindex}
          initialpage={initialpage}
          setinitialpage={setinitialpage}
          lastindex={lastindex}
          getdataonpage={getdataonpage}
          allsearchdata={allsearchdata}
        />
          </div>
        </div>
      </>
    </div>
  );
};

export default ShowProfessionalDetails;
