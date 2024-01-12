import React, { useEffect, useState } from "react";
import GlobalInputfield from "../../Components/GlobalComponent/GlobalInputfield";
import { BiUpArrowAlt } from "react-icons/bi";
import {
  getcity,
  getcountries,
  getstate,
} from "../../utils/api/Companyapi/Index";
import { MdDelete } from "react-icons/md";
import AddCitypopup from "../../Components/AddCitypopup";
import Pagination from "../../Components/Pagination";
import { ToastContainer, toast } from "react-toastify";

import { deletecity } from "../../utils/api/Cityapi";

import "react-toastify/dist/ReactToastify.css";


function Cities() {
  const [hover, sethover] = useState(true);
  const [country, setcountry] = useState([]);
  const [flag, setflag] = useState(true);
  const [allsearchdata, setallsearcheddata] = useState([]);
  const [state, setstate] = useState([]);
  const [id, setid] = useState({
    c_id: "",
    s_id: "",
  });
  const [city, setcity] = useState([]);
  const [search, setsearch] = useState([]);
  console.log(city)

  const [itemperpage, setitemperpage] = useState(10);

  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(
    itemperpage ? itemperpage : lastpageitem
  );

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = city.slice(firstindex, lastindex);
  const searchonepage = allsearchdata.slice(firstindex, lastindex);
  console.log(onepage);

  const changepage = (pageNumbers) => setinitialpage(pageNumbers);

  const getdataonpage = (value) => {
    setlastpageitem(parseInt(value));
    console.log(typeof lastpageitem);
  };

  useEffect(() => {
    getcountries().then((res) => setcountry(res));
  }, []);
  useEffect(() => {
    getstate(id.c_id).then((res) => setstate(res));
  }, [id.c_id]);
  useEffect(() => {
    getcity(id.s_id).then((res) => setcity(res));
  }, [id.s_id, flag]);

  const handlechange = (e) => {
    setsearch(e.target.value);
    setallsearcheddata(
      city.filter((item) => {
        return item.CityName.toLowerCase().includes(e.target.value);
      })
    );
  };
  const handlehover = () => [sethover(false)];
  const hoverof = () => {
    sethover(true);
  };

  const handledrop = (e) => {
    setid((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handledelete=(id)=>{
    deletecity(id).then(res=>{if(res==="success"){
        setflag(!flag)
        toast.success("Delete Successfully")
    }})
  }

  return (
    <div className="m-8">
      <ToastContainer />
      <div className="flex  items-center justify-between ">
        <div className=" text-3xl font-semibold text-[#680d0d]">Cities</div>
        <div>
          <div className=" text-2xl  text-[#680d0d]">
            {<AddCitypopup name="add" flag={flag} setflag={setflag} />}
          </div>
        </div>
      </div>
      <div className="mt-10 flex gap-2">
        <div className="w-1/3 items-end  ">
          <select
            name="c_id"
            value={id.c_id}
            onChange={handledrop}
            id=""
            className="bg-white border border-black text-sm rounded-lg  block w-full  p-2.5 md:h-12 h-10 "
          >
            <option selected>Select Country*</option>
            {country?.map((batch) => {
              return (
                <option value={batch.countryId}>{batch.countryName}</option>
              );
            })}
          </select>
        </div>
        <div className="w-1/3 items-end  ">
          <select
            name="s_id"
            value={id.s_id}
            onChange={handledrop}
            id=""
            className="bg-white border border-black text-sm rounded-lg  block w-full  p-2.5 md:h-12 h-10 "
          >
            <option selected>Select State*</option>
            {state?.map((batch) => {
              return <option value={batch.StateId}>{batch.StateName}</option>;
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
      {id.s_id ? (
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
                    <div className=" pl-5">City List</div>
                    <div className="  text-xl text-gray-200 opacity-40">
                      {hover ? null : <BiUpArrowAlt />}
                    </div>
                  </th>
                </div>

                <th className="text-right px-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {(allsearchdata[0] ? searchonepage : onepage)
                // .filter((item)=>{
                //   return search === "" ? item : item.CityName.toLowerCase().includes(search)
                // })
                .map((batch) => (
                  <tr className="border h-12 hover:bg-gray-100">
                    <td className="px-5">{batch.CityName}</td>
                    <td className="flex justify-end mt-3 px-5 text-orange-600 text-2xl">
                      
                    {<AddCitypopup name="edit" flag={flag} setflag={setflag} CityName={batch.CityName} cName={batch.CountryId} sName={batch.StateId} id={batch.CityId} />}
                      {<MdDelete onClick={() => handledelete(batch.CityId)} />}
                      {console.log(batch.CountryId)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mr-5 sticky bottom-0  bg-white ">
            <Pagination
              batchList={city}
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
          <p className="mt-10 text-xl font-bold">
            Please Select Country and State
          </p>
        </div>
      )}
    </div>
  );
}

export default Cities;
