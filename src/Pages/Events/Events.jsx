import React, { useEffect, useState } from "react";
import GlobalInputfield from "../../Components/GlobalComponent/GlobalInputfield";
import AddEventpopup from "../../Components/AddEventpopup";
import { deleteevents, getevents } from "../../utils/api/Event/Index";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosCamera, IoMdVideocam } from "react-icons/io";
import Pagination from "../../Components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AddVideoDetails from "./AddVideoDetails";

function Events() {
  const [alldata, setalldata] = useState([]);
  const [flag, setflag] = useState(true);
  const [allsearchdata,setallsearcheddata] = useState([])
  const [hover, sethover] = useState(true);
  const [search, setsearch] = useState("");

  const [itemperpage, setitemperpage] = useState(10);

  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(
    itemperpage ? itemperpage : lastpageitem
  );
  const navigate=useNavigate()

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = alldata.slice(firstindex, lastindex);
  const searchonepage = allsearchdata.slice(firstindex, lastindex);

  const changepage = (pageNumbers) => setinitialpage(pageNumbers);

  const getdataonpage = (value) => {
    setlastpageitem(parseInt(value));
    console.log(typeof lastpageitem);
  };

  useEffect(() => {
    getevents().then((res) => setalldata(res));
  }, [flag]);
  // useEffect(() => {
  //   getevents().then((res) => setalldata(res));
  // }, [search]);
 

  const handlechange = (e) => {
    setsearch(e.target.value);
    setallsearcheddata(alldata.filter((item)=>{
      return item.EventName.toLowerCase().includes(e.target.value)
    }))

  };
  

  const handledelete = (id) => {
    let conf = window.confirm("Do you want to delete Qualification");
    if (conf) {
      deleteevents(id).then((res) => {
        setflag(!flag);
        toast("Event Deleted");
      });
    }
  };

  return (
    <div className="m-8">
      <ToastContainer />
      {alldata[0] ? (
        <>
          <div className="flex  items-center justify-between ">
            <div className=" text-3xl font-semibold text-[#680d0d]">Events</div>
            <div>
              <div className=" text-2xl  text-[#680d0d]">
                {<AddEventpopup name="add" flag={flag} setflag={setflag} />}
              </div>
            </div>
          </div>
          <div className="mt-10 flex-gap-2">
            <GlobalInputfield
              placeholder="Filter by Event"
              type="text"
              handlechange={handlechange}
            />
          </div>

          <div className="overflow-auto h-[400px] mt-6">
            <table className="w-full">
              <thead className=" ">
                <tr className=" h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d] ">
                  <th className="text-left px-5">Event Name </th>
                  <th className="text-left px-5">Event Location </th>
                  <th className="text-left px-5">Event Date </th>
                  <th className="text-right px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {(allsearchdata[0]?searchonepage:onepage  )
                  // .filter((item) => {
                  //   return search.toLowerCase() === ""
                  //     ? item
                  //     : item.EventName.toLowerCase().includes(search);
                  // })
                  .map((item) => (
                    <tr className="border h-12 hover:bg-gray-100">
                      <td className="px-5">{item.EventName}</td>
                      <td className="px-5">{item.EventLocation}</td>
                      <td className="px-5">{item.EventDate}</td>
                      <td
                        // onClick={handledelete}
                        className="w-[0%] px-5 text-orange-600 text-2xl"
                      >
                        <div className="flex gap-2">
                          {
                            <AddEventpopup
                              name="edit"
                              EventName={item.EventName}
                              location={item.EventLocation}
                              date={item.EventDate}
                              folder={item.EventPicFolder}
                              pic={item.EventImage}
                              summary={item.Summary}
                              id={item.ID}
                              flag={flag}
                              setflag={setflag}
                            />
                          }
                          {<AddVideoDetails className="text-[#680d0d]" id={item.ID} />}
                          {<MdDelete className="hover:cursor-pointer" onClick={() => handledelete(item.ID)} />}
                          {<IoIosCamera onClick={()=>{
                            navigate("/events/videolist")
                           }} className="text-black hover:cursor-pointer" />}
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

export default Events;
