import React, { useState } from "react";
import logo1 from "../assets/istc-logo.png";
import { AiOutlineDashboard } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";
import { BsUiChecksGrid } from "react-icons/bs";
import { RiContactsBook2Fill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { FaIndustry } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { MdEmojiEvents } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { LuGlobe } from "react-icons/lu";
import { useLocation, useNavigate} from "react-router-dom";

import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";

function Sidebar({ sdbar }) {
  const navigate = useNavigate();
  const [commantype, setcommantype] = useState(true);
 

   const location = useLocation()
   let path = (location.pathname)

  

   

  return (
    <div
      className={`${
        sdbar ? "w-2/5 " : "hidden"
      }  w-64 fixed float-left top-16  overflow-y-scroll no-scrollbar bottom-0 bg-white border  left-0  z-10 `}
    >
      <div className=" shadow-md h-[120px] border flex justify-between items-center pt-3 px-2 gap-2   ">
        <div className="">
          <img className="min-h-14 bg-contain" src={logo1} alt="logo1" />
        </div>
        <div className="">
          <div className="text-lg font-bold">Admin</div>
          <div className="">admin@istcosa.com</div>
        </div>
      </div>
      <div
        onClick={() => navigate("/dashboard")}
        className={` ${path === "/dashboard" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] items-center gap-5  text-xl px-4 h-12 hover:bg-gray-200 hover:cursor-pointer`}
      >
        <div>{<AiOutlineDashboard className="text-2xl " />}</div>
        <div className="pl-2 text-lg ">Dashboard</div>
      </div>

      <div
        onClick={() => navigate("/users")}
        className={` ${path === "/users" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl px-4 h-12 hover:cursor-pointer`}
      >
        <div>{<CgMenuGridR className="text-2xl" />}</div>
        <div className="pl-2 text-lg ">Users</div>
      </div>
      <div
        onClick={() => navigate("/batches")}
        className={` ${path === "/batches" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl px-4 h-12 hover:cursor-pointer`}
      >
        <div>{<BsUiChecksGrid className="text-2xl" />}</div>
        <div className="pl-2 text-lg ">Batches</div>
      </div>
      <div
        onClick={() => {
          navigate("/rollnumbers")}}
        className={` ${path === "/rollnumbers" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl px-4 h-12 hover:cursor-pointer`}
      >
        <div>{<RiContactsBook2Fill className="text-2xl" />}</div>
        <div className="pl-2 text-lg ">Roll Numbers</div>
      </div>
      <div
        onClick={() => navigate("/qualifications")}
        className={` ${path === "/qualifications" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl px-4 h-12 hover:cursor-pointer`}
      >
        <div>{<FaBook className="text-2xl" />}</div>
        <div className="pl-2 text-lg ">Qualifications</div>
      </div>
      <div
        onClick={() => navigate("/companies")}
        className={` ${path === "/companies" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl px-4 h-12 hover:cursor-pointer`}
      >
        <div>{<BsBuildingsFill className="text-2xl" />}</div>
        <div className="pl-2 text-lg ">Companies</div>
      </div>
      <div
        onClick={() => navigate("/industries")}
        className={` ${path === "/industries" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl px-4 h-12 hover:cursor-pointer`}
      >
        <div>{<FaIndustry className="text-2xl" />}</div>
        <div className="pl-2 text-lg ">Industries</div>
      </div>
      <div
        onClick={() => navigate("/employments")}
        className={` ${path === "/employments" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl px-4 h-12 hover:cursor-pointer`}
      >
        <div>{<HiUserGroup className="text-2xl" />}</div>
        <div className="pl-2 text-lg ">Employments</div>
      </div>
      <div
        onClick={() => navigate("/events")}
        className={` ${path === "/events" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl px-4 h-12 hover:cursor-pointer`}
      >
        <div>{<MdEmojiEvents className="text-2xl" />}</div>
        <div className="pl-2 text-lg ">Events</div>
      </div>
      <div
        onClick={() => navigate("/marqueelink")}
        className={` ${path === "/marqueelink" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl px-4 h-12 hover:cursor-pointer`}
      >
        <div>{<FaLink className="text-2xl" />}</div>
        <div className="pl-2 text-lg ">Marquee Link</div>
      </div>

      <div className="border mt-4">
        <div className="flex  items-center  gap-5  text-xl px-4  pb-4   hover:cursor-pointer">
          <div className="flex gap-5 mt-4 ">
            <div>
              <LuGlobe className="text-2xl " />
            </div>

            <div className="  pl-2 text-lg  ">
              <button
                onClick={() => setcommantype(!commantype)}
                className="flex gap-3"
              >
                <div className="">Comman Type</div>
                <div className="mt-2   ">
                  {commantype ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </div>
              </button>
              {commantype ? null : (
                <div>
                  <ul>
                    <li
                      onClick={() => navigate("/commantypes/countries")}
                      className={` ${path === "/commantypes/countries" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl  h-12 hover:cursor-pointer`}
                    >
                      <div>
                        <IoIosArrowForward />
                      </div>
                      <div className="text-lg">Countries</div>
                    </li>
                    <li
                      onClick={() => navigate("/commantypes/states")}
                      className={` ${path === "/commantypes/states" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl  h-12 hover:cursor-pointer`}
                    >
                      <div>
                        <IoIosArrowForward />
                      </div>
                      <div className="text-lg">States</div>
                    </li>
                    <li
                      onClick={() => navigate("/commantypes/cities")}
                      className={` ${path === "/commantypes/cities" ? "border-l-4 border-[#680d0d]" : "border-none"} flex hover:text-[#680d0d] hover:bg-gray-100 items-center gap-5  text-xl  h-12 hover:cursor-pointer`}
                    >
                      <div>
                        <IoIosArrowForward />
                      </div>
                      <div className="text-lg">Cities</div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
