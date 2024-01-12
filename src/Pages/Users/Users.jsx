import React, { useEffect, useState } from "react";

import { IoMdSearch } from "react-icons/io";

import AddUserpopup from "../../Components/AddUserpopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registered from "./Registereduser/Registered";
import AllUser from "./AllUsers/AllUser";
import Notregistered from "./NotRegistereduser/Notregistered";
import Obituary from "./Obituary/Obituary";
import Lifemember from "./LifeMember/Lifemember";
import { searchuser } from "../../utils/api/Userapi";

function Users() {
  const [user, setuser] = useState("registered");
  const [flag,setflag] = useState(false)
  const [search,setsearch] = useState("")
  const [searchvalue,setsearchvalue] = useState("")
  const [filteredresult,setfilteredresult] = useState([])
  // const navigate = useNavigate();

  const handlechange = (e) => {
    
    setuser(e.target.value);
    setsearch(e.target.value)
  };

  const serchfromalluser=(e)=>{
    setsearchvalue(e.target.value)
  }

  // useEffect(()=>{
    

  // },[])


  const handlesearch=()=>{
    console.log(searchvalue)
    searchuser(user,"1",searchvalue).then(res=>setfilteredresult(res))

  }

  console.log(filteredresult)
   
  // console.log(userdetails);

  return (
    <div className="m-8">
      <ToastContainer/>
      <div className="flex  items-center justify-between">
        <div className="">
          <div className=" text-3xl font-semibold text-[#680d0d]">Users</div>
        </div>
        <div>
          <div className=" text-2xl  text-[#680d0d]">{<AddUserpopup flag={flag} setflag={setflag}   />}</div>
        </div>
      </div>
      <div className="flex md:items-center flex-col lg:flex-row lg:justify-between mt-8 ">
        <div className=" flex flex-col md:flex-row gap-3">
          <div className="flex gap-2">
            <input
              type="radio"
              name="agree"
              onChange={handlechange}
              value="registered"
              className="w-4 "
              checked={user=="registered" ? true : null}
            />{" "}
            <p>Registered</p>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="agree"
              onChange={handlechange}
              value="nonRegistered"
              className="w-4 "
            />
            <p> Not-Registered</p>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="agree"
              onChange={handlechange}
              value="lifemember"
              className="w-4 "
            />
            <p> Life-Member</p>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="agree"
              onChange={handlechange}
              value="obituary"
              className="w-4 "
            />{" "}
            <p>Obituary</p>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="agree"
              onChange={handlechange}
              value="alluser"
              className="w-4 "
            />
            <p> All Users</p>
          </div>
        </div>

        <div className="flex items-center lg:mt-0  mt-2 gap-2 ">
          <div className="">
            <input
            type="text"
             
              onChange={serchfromalluser}
              className="border h-10 rounded-lg border-black p-2"
              placeholder="Search by Batch"
            />
          </div>
          <div className=" text-2xl mt-2 ">
            <IoMdSearch onClick={handlesearch} />
          </div>
        </div>
      </div>

      {user == "alluser" ? <AllUser flag={flag} setflag={setflag} filteredresult={filteredresult}   /> : null}
      {user == "registered" ? <Registered filteredresult={filteredresult}  /> : null}
      {user == "nonRegistered" ? <Notregistered filteredresult={filteredresult}   /> : null}
      {user == "lifemember" ? <Lifemember filteredresult={filteredresult}  /> : null}
      {user == "obituary" ? <Obituary filteredresult={filteredresult}  /> : null}
    </div>
  );
}

export default Users;
