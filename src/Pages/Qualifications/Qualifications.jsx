import React, { useEffect, useState } from "react";
import GlobalInputfield from "../../Components/GlobalComponent/GlobalInputfield";
import AddQualificationpopup from "../../Components/AddQualificationpopup";
import {
  deletequalifications,
  getqualifications,
  postqualifications,
} from "../../utils/api/Qualificationapi";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiUpArrowAlt } from "react-icons/bi";
import Pagination from "../../Components/Pagination";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Qualifications() {
  const [batchList, setallbatchlist] = useState([]);
  const [allsearchdata, setallsearcheddata] = useState([]);
  const [hover, sethover] = useState(true);
  const [search, setsearch] = useState("");
  
  const [flag, setFlag] = useState(true);
  const [itemperpage, setitemperpage] = useState(10);
  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(
    itemperpage ? itemperpage : lastpageitem
  );

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = batchList.slice(firstindex, lastindex);
  const searchonepage = allsearchdata.slice(firstindex, lastindex);

  useEffect(() => {
    getqualifications().then((res) =>
      setallbatchlist(res.filter((items) => items.Active === true))
    );
  }, [flag]);

  const handlechange = (e) => {
    setsearch(e.target.value);
    setallsearcheddata(
      batchList.filter((item) => {
        return item.QualificationName.toLowerCase().includes(e.target.value);
      })
    );
  };

  const handlehover = () => [sethover(false)];
  const hoverof = () => {
    sethover(true);
  };
  const changepage = (pageNumbers) => setinitialpage(pageNumbers);

  const getdataonpage = (value) => {
    setlastpageitem(parseInt(value));
  };

  

  const handledelete = (id) => {
    let conf = window.confirm("Do you want to delete Qualification");

    if (conf) {
      deletequalifications(id)
        .then((res) => {
          if (res == "success") {
            toast.success("Qualification Deleted");
            setFlag(!flag);
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Qulaifiction did not deleted");
          }
        });
    }
  };

  return (
    <div className="m-8">
      <ToastContainer />
      {batchList[0] ? (
        <>
          <div className="flex  items-center justify-between ">
            <div className=" text-3xl font-semibold text-[#680d0d]">
              Qualifications
            </div>
            <div>
              <div className=" text-2xl  text-[#680d0d]">
                {
                  <AddQualificationpopup
                    modelname="add"
                    flag={flag}
                    setFlag={setFlag}

                  
                  />
                }
              </div>
            </div>
          </div>
          <div className="mt-10 flex-gap-2">
            <GlobalInputfield
              placeholder="Filter by Qualification"
              type="text"
              handlechange={handlechange}
            />
          </div>
          <div className="overflow-auto h-[400px] mt-6">
            <table className="w-full">
              <thead className="  ">
                <tr
                  onMouseEnter={handlehover}
                  onMouseLeave={hoverof}
                  className=" h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d] "
                >
                  <div>
                    <th className="text-left justify-start flex gap-2 items-center h-12  w-full">
                      <div className=" pl-5">Qualification type </div>
                      <div className="  text-xl text-gray-200 opacity-40">
                        {hover ? null : <BiUpArrowAlt />}
                      </div>
                    </th>
                  </div>
                  <th className="text-right px-5">Action</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll  ">
                {(search ? searchonepage : onepage)
                  // .filter((item) => {
                  //   return search.toLowerCase() === ""
                  //     ? item
                  //     : item.QualificationName.toLowerCase().includes(search);
                  // })
                  .map((item) => (
                    <tr className="border h-12 hover:bg-gray-100">
                      <td className="px-5">{item.QualificationName}</td>
                      <td className="w-[0%] px-5 text-orange-600 text-2xl">
                        <div className="flex gap-2">
                          {
                            <AddQualificationpopup
                              temp={item.QualificationID}
                              modelname="edit"
                              id={item.QualificationID}
                              qname={item.QualificationName}
                              flag={flag}
                              setFlag={setFlag}
                            />
                          }
                          {
                            <MdDelete
                              onClick={() => handledelete(item.QualificationID)}
                            />
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex justify-end item-center sticky bottom-0 border h-12  bg-white ">
              <Pagination
                batchList={batchList}
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

export default Qualifications;
