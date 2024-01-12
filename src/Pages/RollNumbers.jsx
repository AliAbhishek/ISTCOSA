import React, { useEffect, useState } from "react";
import GlobalInputfield from "../Components/GlobalComponent/GlobalInputfield";
import { FiPlusCircle } from "react-icons/fi";
import { getbatches } from "../utils/api/Batchesapi";
import {
  deleteRollNumber,
  getRollNumberbyBatch,
} from "../utils/api/RollNumberapi";
import { MdDelete } from "react-icons/md";
import Pagination from "../Components/Pagination";
import AddRollnumberpopup from "../Components/AddRollnumberpopup";
import { BiUpArrowAlt } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RollNumbers() {
  const [batchList, setbatchList] = useState([]);
  const [inputvalue, setinputvalue] = useState([]);
  const [openrollnumberdata, setopenrollnumberdata] = useState("");
  const [allsearchdata, setallsearcheddata] = useState([]);
  const [itemperpage, setitemperpage] = useState(10);
  const [flag, setflag] = useState(false);

  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(
    itemperpage ? itemperpage : lastpageitem
  );

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = inputvalue.slice(firstindex, lastindex);
  const searchonepage = allsearchdata.slice(firstindex, lastindex);

  const [hover, sethover] = useState(true);
  const [search, setsearch] = useState("");

  useEffect(() => {
    getbatches().then((res) =>
      setbatchList(res.filter((item) => item.Active === true))
    );
  }, []);

  //  useEffect(()=>{
  //   getRollNumberbyBatch(1990)
  //   .then((res) => console.log(res))
  //  },[])

  const handledrop = async (e) => {
    setopenrollnumberdata(e.target.value);
  };

  useEffect(()=>{
     getRollNumberbyBatch(openrollnumberdata).then((res) =>
      setinputvalue(res)
    );
  },[openrollnumberdata,flag])

  const handlechange = (e) => {
    setsearch(e.target.value);
    setallsearcheddata(
      inputvalue.filter((item) => {
        return item.RollNumberID.toString().includes(e.target.value);
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
    console.log(typeof lastpageitem);
  };

  const handledelete = (id) => {
    deleteRollNumber(id)
      .then((res) => {
        if (res == "success") {
          toast.success("Successfully Deleted");
          setflag(!flag);
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Deletion failed");
        }
      });
  };

  return (
    <div className="m-8">
      <ToastContainer />
      <>
        <div className="flex  items-center justify-between ">
          <div className=" text-3xl font-semibold text-[#680d0d]">
            Roll Numbers
          </div>
          <div>
            <div className=" text-2xl  text-[#680d0d]">
              {<AddRollnumberpopup />}
            </div>
          </div>
        </div>
        <div className="mt-10 flex gap-2">
          <div className="w-3/12 items-end  ">
            <select
              onChange={handledrop}
              id=""
              className="bg-white border border-black text-sm rounded-lg  block w-full  p-2.5 md:h-12 h-10 "
            >
              <option selected disabled>
                Select Batch
              </option>
              {batchList.map((batch) => {
                return <option>{batch.BatchID}</option>;
              })}
            </select>
          </div>
          <div className="w-full">
            <GlobalInputfield
              handlechange={handlechange}
              placeholder="Filter"
              type="text"
            />
          </div>
        </div>
        {inputvalue[0] ? (
          <div className="overflow-auto h-[400px] mt-6">
            <table className="w-full ">
              <thead className="">
                <tr
                  onMouseEnter={handlehover}
                  onMouseLeave={hoverof}
                  className=" h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d] "
                >
                  <div>
                    <th className="text-left justify-start flex gap-2 items-center h-12  w-full  ">
                      <div className=" pl-5">Roll Numbers</div>
                      <div className="  text-xl text-gray-200 opacity-40">
                        {hover ? null : <BiUpArrowAlt />}
                      </div>
                    </th>
                  </div>

                  <th className="text-right px-5">Action</th>
                </tr>
              </thead>

              <tbody>
                {(allsearchdata[0] ? allsearchdata : onepage)
                  // .filter((item) => {
                  //   return search.toLowerCase() === ""
                  //     ? item
                  //     : item.RollNumberID.toString().includes(search);
                  // })
                  .map((batch) => (
                    <tr className="border h-12 hover:bg-gray-100">
                      <td className="px-5">{batch.RollNumberID}</td>
                      <td className="flex justify-end mt-3 px-5 text-orange-600 text-2xl">
                        {
                          <MdDelete
                            onClick={() => handledelete(batch.RollNumberID)}
                          />
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="mr-5 sticky bottom-0  bg-white ">
              <Pagination
                batchList={inputvalue}
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
        ) : (
          <div className="w-full border border-black mt-4 bg-gray-100 h-[500px] flex justify-center ">
            <p className="mt-10 text-xl font-bold">Please Select Roll Number</p>
          </div>
        )}
      </>
    </div>
  );
}

export default RollNumbers;
