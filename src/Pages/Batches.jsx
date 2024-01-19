
import { BiUpArrowAlt } from "react-icons/bi";

import { deletebatch, getbatches } from "../utils/api/Batchesapi";
import { MdDelete } from "react-icons/md";
import GlobalInputfield from "../Components/GlobalComponent/GlobalInputfield";
import AddBatchespopup from "../Components/AddBatchespopup";
import Pagination from "../Components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalButton from "../Components/GlobalComponent/GlobalButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

function Batches() {
  const [batchList, setbatchList] = useState([]);
  const [allsearchdata, setallsearcheddata] = useState([]);
  const navigate = useNavigate();
  const [hover, sethover] = useState(true);
  const [search, setsearch] = useState("");
  const [flag, setflag] = useState(false);



 


  const [itemperpage, setitemperpage] = useState(10);

  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(
    itemperpage ? itemperpage : lastpageitem
  );

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = batchList.slice(firstindex, lastindex);
  const searchonepage = allsearchdata.slice(firstindex, lastindex);

  const changepage = (pageNumbers) => setinitialpage(pageNumbers);

  const getdataonpage = (value) => {
    setlastpageitem(parseInt(value));
    console.log(typeof lastpageitem);
  };
  



  useEffect (() => {
    getbatches().then((res) =>
      setbatchList(res.filter((item) => item.Active === true))
    );
  }, [flag]);

  // const { data: batchList } = useQuery("getbatches", getbatches);

  const handlechange = (e) => {
    setsearch(e.target.value);
    setallsearcheddata(
      batchList.filter((item) => {
        return item.BatchID.toString().includes(e.target.value);
      })
    );
  };

  const handledelete = (id) => {
    let conf = confirm("Do you want to delete Batch");

    if (conf) {
      deletebatch(id).then((res) => {
        if (res == "success") setflag(!flag);
        toast.success("Batch deleted successfully");
      }).catch(err=>{if(err){
        toast.error("Batch did not deleted successfully")
      }})
    } else {
      navigate("/batches");
    }
  };

  const handlehover = () => [sethover(false)];
  const hoverof = () => {
    sethover(true);
  };

  return (
    <div className="m-8">
      <ToastContainer />
      {batchList[0] ? (
        <>
          <div className="flex  items-center justify-between ">
            <div className=" text-3xl font-semibold text-[#680d0d]">
              Batches
            </div>
            <div
          className="text-lg
        "
        >
          
          
        </div>
            <div>
              <div className=" text-2xl  text-[#680d0d]">
                <AddBatchespopup flag={flag} setflag={setflag} />
              </div>
            </div>
          </div>
          <div className="mt-10 flex-gap-2">
            <GlobalInputfield
              placeholder="Filter by year"
              type="text"
              handlechange={handlechange}
            />
          </div>

          <div className="overflow-auto h-[400px] mt-6">
            <table className="w-full  ">
              <thead className=" ">
                <tr
                  onMouseEnter={handlehover}
                  onMouseLeave={hoverof}
                  className=" h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d] "
                >
                  <div className="   ">
                    <th className="text-left justify-start flex gap-2 items-center h-12  w-full   ">
                      <div className=" pl-5"> Batch Year </div>
                      <div className="  text-xl text-gray-200 opacity-40">
                        {hover ? null : <BiUpArrowAlt />}
                      </div>
                    </th>
                  </div>

                  <th className="text-right px-5  ">Action</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll  ">
                {(allsearchdata[0] ? searchonepage : onepage)
                  // .filter((item) => {
                  //   return search.toLowerCase() === ""
                  //     ? item
                  //     : item.BatchID.toString().includes(search);
                  // })
                  .map((item) => (
                    <tr className="border h-12 hover:bg-gray-100">
                      <td className="px-5 ">{item.BatchID}</td>
                      <td className="flex justify-end mt-3 px-5 text-orange-600 text-2xl">
                        {
                          <MdDelete
                            onClick={() => handledelete(item.BatchID)}
                          />
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="mr-5 sticky bottom-0  bg-white ">
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

export default Batches;
