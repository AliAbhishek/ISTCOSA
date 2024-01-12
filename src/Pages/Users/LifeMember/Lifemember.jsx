import React, { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { HiNoSymbol } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { getregistereduser } from "../../../utils/api/Userapi/RegisteredUser";
import EditUser from "../AllUsers/EditUser";
import DeActivatingUserPopUp from "../../../Components/GlobalComponent/UserGlobalComponents/DeActivatingUserPopUp";
import MembershipPopup from "../../../Components/GlobalComponent/UserGlobalComponents/MembershipPopup";
import ProfessionalDetails from "../../../Components/GlobalComponent/UserGlobalComponents/ProfessionalDetails";
import MarkObituaryPopUp from "../../../Components/GlobalComponent/UserGlobalComponents/MarkObituaryPopUp";
import UserPagination from "../UserPagination";

const Lifemember = (props) => {
  const [lifemembers, setlifemembers] = useState([]);
  const [flag, setflag] = useState(false);
  const [page,setpage] =useState(1)
  const changepage = (p) => {
    setpage(p);
  };

  useEffect(() => {
    getregistereduser("lifemember", page).then((res) => setlifemembers(res));
  }, [page,flag]);

  return (
    <div>
      {" "}
      <div>
        {/* {user == "Obituary" ? ( */}
        <div className="overflow-auto h-[400px] mt-6 border">
          <div className="mx-6 flex flex-col md:flex-row justify-between h-12 text-sm">
            <div className="flex  gap-3">
              <div className="flex items-center gap-1">
                <p className=" text-sm md:text-lg text-red-500">
                  <RxCross1 />
                </p>
                <p className="">De-Activate</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-sm md:text-lg text-blue-500">
                  <TiTick />
                </p>
                <p>Activate</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-sm md:text-lg text-[#680d0d]">
                  <BsPersonFill />
                </p>
                <p>Alive</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-sm md:text-lg text-black">
                  <HiNoSymbol />
                </p>
                <p>Obituary</p>
              </div>
            </div>
            <div>
              {" "}
              <UserPagination
                pages={lifemembers[0]?.PageSize}
                changepage={changepage}
                page={page}
                setpage={setpage}
                TotalPageCount={lifemembers[0]?.TotalPageCount}
                registeredUser={lifemembers}
              />
            </div>
          </div>
          <table className="w-full  ">
            <thead className=" ">
              <tr className="h-0 md:h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d]">
                <th className="text-left px-5 ">Action </th>

                <th className="text-left px-5 ">Roll Number</th>
                <th className="text-left px-5 ">Full Name</th>
                <th className="text-left px-5 "> Email</th>

                <th className="text-left   ">Phone</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll no-scrollbar lg:top-0  md:top-14      ">
              {(props.filteredresult[0]?props.filteredresult:lifemembers)
                // .filter((item) => {
                //   return props.searchvalue.toLowerCase() === ""
                //     ? item
                //     : item.BatchID.includes(searchvalue);
                // })
                .map((item) => (
                  <tr className="border h-12 hover:bg-gray-100  ">
                    <td className="pl-5 text-2xl">
                      <div className="flex gap-2">
                        <EditUser
                          id={item.UserID}
                          rollnumber={item.RollNumberID}
                          date={item.CreatedDate}
                          className="text-blue-900 hover:cursor-pointer"
                        />

                        <DeActivatingUserPopUp
                          name="activate"
                          Active={item.Active}
                           id={item.UserID}
                           flag={flag}
                           setflag={setflag}
                        />
                        <MembershipPopup
                          flag={flag}
                          setflag={setflag}
                          name="Membership"
                          MembershipType={item.MembershipType}
                          membername={item.FullName}
                          id={item.UserID}
                        />

                        <ProfessionalDetails id={item.UserID} className="text-gray-400 hover:cursor-pointer" />
                        <MarkObituaryPopUp  IsAlive={item.IsAlive}
                        Active={item.Active}
                        id={item.UserID}
                        flag={flag}
                        setflag={setflag} />
                      </div>
                    </td>
                    <td className="pl-5">{item.RollNumberID}</td>
                    <td className="pl-5">{item.FullName}</td>
                    <td className="pl-5">{item.Email}</td>
                    <td className="pl-5">{item.PhoneNumber}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mr-5 sticky bottom-0  bg-white ">
            {/* <Pagination
              batchList={batchList}
              lastpageitem={lastpageitem}
              changepage={changepage}
              firstindex={firstindex}
              initialpage={initialpage}
              setinitialpage={setinitialpage}
              lastindex={lastindex}
              getdataonpage={getdataonpage}
            /> */}
          </div>
        </div>
        {/* ) : (
          <div className="flex mt-10 justify-center min-h-screen p-5 bg-white min-w-screen">
            <div className="flex space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
              <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
              <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Lifemember;
