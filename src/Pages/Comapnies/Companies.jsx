import React, { useEffect, useState } from "react";
import GlobalInputfield from "../../Components/GlobalComponent/GlobalInputfield";
import AddComapniespopup from "../../Components/AddComapniespopup";
import {
  deletecompanydetails,
  getcompnies,
} from "../../utils/api/Companyapi/Index";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiUpArrowAlt } from "react-icons/bi";
import Pagination from "../../Components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Companies() {
  const [alldata, setalldata] = useState([]);
  const [allsearchdata, setallsearcheddata] = useState([]);
  const [flag, setflag] = useState(false);
  const [search, setsearch] = useState("");
  const [itemperpage, setitemperpage] = useState(10);

  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(
    itemperpage ? itemperpage : lastpageitem
  );

  console.log(alldata,"data")

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = alldata.slice(firstindex, lastindex);
  const searchonepage = allsearchdata.slice(firstindex, lastindex);

  console.log(alldata, "data");

  const changepage = (pageNumbers) => setinitialpage(pageNumbers);

  const getdataonpage = (value) => {
    setlastpageitem(parseInt(value));
    console.log(typeof lastpageitem);
  };

  useEffect(() => {
    getcompnies().then((res) => setalldata(res));
  }, [flag]);

  const handlechange = (e) => {
    setsearch(e.target.value);
    setallsearcheddata(
      alldata.filter((item) => {
        return item.CompanyName.toLowerCase().includes(e.target.value);
      })
    );
  };

  const handledelete = (id) => {
    let conf = window.confirm("Do you want to delete Qualification");

    if (conf) {
      deletecompanydetails(id).then((res) => {
        if (res=="success") {
          setflag(!flag);
          toast.success("Qualification Deleted");
        }
      }).catch(err=>{if(err){
          toast.error("Qualification did not get Deleted")
      }})
    }
  };

  return (
    <div className="m-8">
      <ToastContainer />
      {alldata[0] ? (
        <>
          <div className="flex  items-center justify-between ">
            <div className=" text-3xl font-semibold text-[#680d0d]">
              Companies
            </div>
            <div>
              <div className=" text-2xl  text-[#680d0d]">
                {<AddComapniespopup name="add" setflag={setflag} flag={flag} />}
              </div>
            </div>
          </div>
          <div className="mt-10 flex-gap-2">
            <GlobalInputfield
              placeholder="Filter by Company Name"
              type="text"
              handlechange={handlechange}
            />
          </div>

          <div className="overflow-auto h-[400px] mt-6">
            <table className="w-full ">
              <thead className=" ">
                <tr className=" h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d]">
                  <th className="text-left px-5 ">Company Name </th>

                  <th className="text-left px-5 ">Company Address</th>
                  <th className="text-left px-5 ">Email ID</th>
                  <th className="text-left px-5 "> Contact No.</th>

                  <th className="text-left px-5  ">Action</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll  ">
                {(allsearchdata[0] ? searchonepage : onepage)
                  // .filter((item) => {
                  //   return search.toLowerCase() === ""
                  //     ? item
                  //     : item.CompanyName.toLowerCase().includes(search);
                  // })
                  .map((item) => (
                    <tr className="border h-12 hover:bg-gray-100">
                      <td className="px-5">{item.CompanyName}</td>
                      <td className="px-5">{item.CompanyAddress}</td>
                      <td className="px-5">{item.EmailAddress}</td>
                      <td className="px-5">{item.ContactNumber}</td>
                      <td
                        // onClick={handledelete}
                        className="w-[0%] px-5 text-orange-600 text-2xl"
                      >
                        <div className="flex gap-2">
                          {
                            <AddComapniespopup
                              name="edit"
                              cname={item.CompanyName}
                              caddress={item.CompanyAddress}
                              cemail={item.EmailAddress}
                              cnumber={item.ContactNumber}
                              id={item.CompanyID}
                              setflag={setflag}
                              flag={flag}
                              countryname={item.CountryID}
                              statename={item.StateID}
                              cityname={item.CityID}
                              imageurl={item.FilePath}
                            />
                          }
                          {
                            <MdDelete
                              onClick={() => handledelete(item.CompanyID)}
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

export default Companies;
