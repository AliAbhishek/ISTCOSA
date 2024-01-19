import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getdashboard } from "../utils/api/Dashboardapi";
import UseWindowResizeHook from "../Components/GlobalComponent/UseWindowResizeHook";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { themeValue } from "../Slice";

function Dashboard() {
  const { height, width } = UseWindowResizeHook();
  const [alldata, setalldata] = useState([]);
  const [size, setsize] = useState(false);

 

 
  

  useEffect(() => {
    if (width < 1150) {
      setsize(true);
    }
    if (width > 1150) {
      setsize(false);
    }
  }, [width]);

  useEffect(() => {
    getdashboard().then((res) => setalldata(res));
  }, []);

  

  return (
    <div className="m-8">
      <ToastContainer />
      <div className="flex  items-center justify-between ">
        <div className=" text-3xl font-semibold text-[#680d0d]">Dashboard</div>
        <div
          className="text-lg
        "
        >
          
        </div>
      </div>
      <div className="grid grid-flow-row gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
        <div className="mt-10 flex-gap-2">
          <div className={` border-[#680d0d] border-2 h-40 `}>
            <div className="bg-[#680d0d] w-full h-14 font-bold flex items-center justify-center">
              <div className="text-white text-xl">Registered Alumni</div>
            </div>
            <div className=" mt-5 border-b-[#680d0d]  items-center  w-full ">
              <div className="flex items-center justify-center gap-1">
                <div className="text-2xl">{alldata.Registered}</div>
                <div className="text-2xl">
                  {` (${(
                    (alldata.Registered / alldata.TotalUsers) *
                    100
                  ).toFixed(2)}%)`}{" "}
                </div>
              </div>
              <div className="  w-full h-1 flex justify-center items-center mt-5  ">
                <div className="bg-[#680d0d] w-1/2   h-full bg-gradient-to-r from-white to-[#680d0d]  "></div>
                <div className="bg-[#680d0d] w-1/2 h-full  bg-gradient-to-l from-white to-[#680d0d] "></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex-gap-2">
          <div className=" border-[#680d0d] border-2 h-40 ">
            <div className="bg-[#680d0d] w-full h-14 font-bold flex items-center justify-center">
              <div className="text-white text-xl">Non-Registered</div>
            </div>
            <div className="flex flex-col mt-5  items-center  w-full ">
              <div className="flex items-center gap-1">
                <div className="text-2xl">{alldata.NotRegistered}</div>
                <div className="text-2xl">
                  {` (${(
                    (alldata.NotRegistered / alldata.TotalUsers) *
                    100
                  ).toFixed(2)}%)`}{" "}
                </div>
              </div>
              <div className="  w-full h-1 flex justify-center items-center mt-5  ">
                <div className="bg-[#680d0d] w-1/2   h-full bg-gradient-to-r from-white to-[#680d0d]  "></div>
                <div className="bg-[#680d0d] w-1/2 h-full  bg-gradient-to-l from-white to-[#680d0d] "></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex-gap-2">
          <div className=" border-[#680d0d] border-2 h-40 ">
            <div className="bg-[#680d0d] w-full h-14 font-bold flex items-center justify-center">
              <div className="text-white text-xl">Obituary</div>
            </div>
            <div className="flex flex-col mt-5  items-center  w-full ">
              <div className="flex items-center gap-1">
                <div className="text-2xl">{alldata.Obituary}</div>
                <div className="text-2xl">
                  {` (${((alldata.Obituary / alldata.TotalUsers) * 100).toFixed(
                    2
                  )}%)`}{" "}
                </div>
              </div>
              <div className="  w-full h-1 flex justify-center items-center mt-5  ">
                <div className="bg-[#680d0d] w-1/2   h-full bg-gradient-to-r from-white to-[#680d0d]  "></div>
                <div className="bg-[#680d0d] w-1/2 h-full  bg-gradient-to-l from-white to-[#680d0d] "></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex-gap-2">
          <div className=" border-[#680d0d] border-2 h-40 ">
            <div className="bg-[#680d0d] w-full h-14 font-bold flex items-center justify-center">
              <div className="text-white text-xl">Total Users</div>
            </div>
            <div className="flex flex-col mt-5  items-center  w-full ">
              <div className="flex items-center gap-1">
                <div className="text-2xl">{alldata.TotalUsers}</div>
                <div className="text-2xl"></div>
              </div>
              <div className="  w-full h-1 flex justify-center items-center mt-5  ">
                <div className="bg-[#680d0d] w-1/2   h-full bg-gradient-to-r from-white to-[#680d0d]  "></div>
                <div className="bg-[#680d0d] w-1/2 h-full  bg-gradient-to-l from-white to-[#680d0d] "></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-flow-row gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
        <div className="mt-10 flex-gap-2">
          <div className=" border-[#680d0d] border-2 h-40 ">
            <div className="bg-[#680d0d] w-full h-14 font-bold flex items-center justify-center">
              <div className="text-white text-xl">Recent Registered</div>
            </div>
            <div className="flex flex-col mt-5  items-center  w-full ">
              <div className="flex items-center gap-1">
                <div className="text-2xl">{alldata.RecentRegistered}</div>
                <div className="text-2xl">
                  {` (${(
                    (alldata.RecentRegistered / alldata.TotalUsers) *
                    100
                  ).toFixed(2)}%)`}{" "}
                </div>
              </div>
              <div className="  w-full h-1 flex justify-center items-center mt-5  ">
                <div className="bg-[#680d0d] w-1/2   h-full bg-gradient-to-r from-white to-[#680d0d]  "></div>
                <div className="bg-[#680d0d] w-1/2 h-full  bg-gradient-to-l from-white to-[#680d0d] "></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex-gap-2">
          <div className=" border-[#680d0d] border-2 h-40 ">
            <div className="bg-[#680d0d] w-full h-14 font-bold flex items-center justify-center">
              <div className="text-white text-xl">LifeMembers</div>
            </div>
            <div className="flex flex-col mt-5  items-center  w-full ">
              <div className="flex items-center gap-1">
                <div className="text-2xl">{alldata.LifeMembers}</div>
                <div className="text-2xl">
                  {` (${(
                    (alldata.LifeMembers / alldata.TotalUsers) *
                    100
                  ).toFixed(2)}%)`}{" "}
                </div>
              </div>
              <div className="  w-full h-1 flex justify-center items-center mt-5  ">
                <div className="bg-[#680d0d] w-1/2   h-full bg-gradient-to-r from-white to-[#680d0d]  "></div>
                <div className="bg-[#680d0d] w-1/2 h-full  bg-gradient-to-l from-white to-[#680d0d] "></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex-gap-2">
          <div className=" border-[#680d0d] border-2 h-40 ">
            <div className="bg-[#680d0d] w-full h-14 font-bold flex items-center justify-center">
              <div className="text-white text-xl">Mentor</div>
            </div>
            <div className="flex flex-col mt-5  items-center justify-center  w-full ">
              <div className="flex items-center gap-1">
                <div className="text-2xl">{alldata.Mentor}</div>
                <div className="text-2xl">
                  {` (${((alldata.Mentor / alldata.TotalUsers) * 100).toFixed(
                    2
                  )}%)`}{" "}
                </div>
              </div>
              <div className="  w-full h-1 flex justify-center items-center mt-5  ">
                <div className="bg-[#680d0d] w-1/2   h-full bg-gradient-to-r from-white to-[#680d0d]  "></div>
                <div className="bg-[#680d0d] w-1/2 h-full  bg-gradient-to-l from-white to-[#680d0d] "></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex-gap-2">
          <div className=" border-[#680d0d] border-2 h-40 ">
            <div className="bg-[#680d0d] w-full h-14 font-bold flex items-center justify-center">
              <div className="text-white text-xl">Batch Coordinator</div>
            </div>
            <div className="flex flex-col mt-5  items-center  w-full ">
              <div className="flex items-center gap-1">
                <div className="text-2xl">{alldata.BatchCoordinator}</div>
                <div className="text-2xl">
                  {` (${(
                    (alldata.BatchCoordinator / alldata.TotalUsers) *
                    100
                  ).toFixed(2)}%)`}{" "}
                </div>
              </div>
              <div className="  w-full h-1 flex justify-center items-center mt-5  ">
                <div className="bg-[#680d0d] w-1/2   h-full bg-gradient-to-r from-white to-[#680d0d]  "></div>
                <div className="bg-[#680d0d] w-1/2 h-full  bg-gradient-to-l from-white to-[#680d0d] "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
