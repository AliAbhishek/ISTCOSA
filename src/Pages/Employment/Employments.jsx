import React, { useEffect, useState } from "react";
import GlobalInputfield from "../../Components/GlobalComponent/GlobalInputfield";
import AddEmploymentpopup from "../../Components/AddEmploymentpopup";
import {
  deleteemployment,
  getemployment,
} from "../../utils/api/Employmentapi/Index";
import { getindustry } from "../../utils/api/Industryapi/Index";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiUpArrowAlt } from "react-icons/bi";
import Pagination from "../../Components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employments() {
  const [alldata, setalldata] = useState([]);
  const [allsearchdata,setallsearcheddata]=useState([])
  const [hover, sethover] = useState(true);
  const [flag, setflag] = useState(false);
  const [search, setsearch] = useState("");

  const [itemperpage, setitemperpage] = useState(10);

  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(
    itemperpage ? itemperpage : lastpageitem
  );

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = alldata.slice(firstindex, lastindex);

  const changepage = (pageNumbers) => setinitialpage(pageNumbers);

  const getdataonpage = (value) => {
    setlastpageitem(parseInt(value));
    console.log(typeof lastpageitem);
  };

  useEffect(() => {
    getemployment().then((res) =>
      setalldata(res.filter((item) => item.Active === true))
    );
  }, [flag]);

  const handlechange = (e) => {
    setsearch(e.target.value);
    setallsearcheddata(alldata.filter((item)=>{
      return item.EmployementTypeName.toLowerCase().includes(e.target.value)
    }))
  };

  const handlehover = () => [sethover(false)];
  const hoverof = () => {
    sethover(true);
  };

  const handledelete = (id) => {
    let conf = window.confirm("Do you want to delete Employment type");

    if (conf) {
      deleteemployment(id).then((res) => {
        setflag(!flag);
        toast.success("Qualification get deleted");
      });
    }
  };

  return (
    <div className="m-8">
      <ToastContainer />
      {alldata[0] ? (
        <>
          <div className="flex  items-center justify-between ">
            <div className=" text-3xl font-semibold text-[#680d0d]">
              Employment
            </div>
            <div>
              <div className=" text-2xl  text-[#680d0d]">
                {
                  <AddEmploymentpopup
                    name="add"
                    flag={flag}
                    setflag={setflag}
                  />
                }
              </div>
            </div>
          </div>
          <div className="mt-10 flex-gap-2">
            {/* <input
      type="text"
      className="text-[#680d0d]  border-[#680d0d] border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      placeholder="Filter by year"
      required=""
      onChange={handlechange}
    /> */}

            <GlobalInputfield
              placeholder="Filter by Name"
              type="text"
              handlechange={handlechange}
            />
          </div>
          <div className="overflow-auto h-[400px] mt-6">
            <table className="w-full">
              <thead className="">
                <tr
                  onMouseEnter={handlehover}
                  onMouseLeave={hoverof}
                  className=" h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d] "
                >
                  <div>
                    <th className="text-left justify-start flex gap-2 items-center h-12  w-full   ">
                      <div className="text-left pl-5">Employment Name </div>
                      <div className="  text-xl text-gray-200 opacity-40">
                        {hover ? null : <BiUpArrowAlt />}
                      </div>
                    </th>
                  </div>
                  <th className="text-right px-5">Action</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll  ">
                {(allsearchdata[0]?allsearchdata:onepage)
                  // .filter((item) => {
                  //   return search.toLowerCase() === ""
                  //     ? item
                  //     : item.EmployementTypeName.toLowerCase().includes(search);
                  // })
                  .map((item) => (
                    <tr className="border h-12 hover:bg-gray-100">
                      <td className="px-5">{item.EmployementTypeName}</td>
                      <td className="w-[0%] px-5 text-orange-600 text-2xl">
                        <div className="flex gap-2">
                          {
                            <AddEmploymentpopup
                              empname={item.EmployementTypeName}
                              id={item.EmploymentTypeID}
                              flag={flag}
                              setflag={setflag}
                              name="edit"
                              className="text-blue-900"
                            />
                          }
                          {
                            <MdDelete
                              onClick={() =>
                                handledelete(item.EmploymentTypeID)
                              }
                            />
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="mr-5 sticky bottom-0  bg-white ">
              <Pagination
                batchList={alldata}
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
      ) : (
        <div className="flex items-center justify-center min-h-screen p-5 bg-white min-w-screen">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
            <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
            <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employments;
