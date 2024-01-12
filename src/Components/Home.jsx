import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { RiUserFollowFill } from "react-icons/ri";
import UseWindowResizeHook from "./GlobalComponent/UseWindowResizeHook";

function Home() {
  const [sdbar, setsdbar] = useState(true);
  const { height, width } = UseWindowResizeHook();

  useEffect(() => {
    if (width < 1150) {
      setsdbar(false);
    } else {
      setsdbar(true);
    }
  }, [width]);

  // const {state} = useLocation()
  // const {islogin} = state
  // console.log(state)

  // console.log(state.islogin)

  const handlesidebar = () => {
    console.log(sdbar);
    setsdbar(!sdbar);
  };

  return (
    <div className="h-full">
      <div className="">
        <Header
          handlesidebar={handlesidebar}
          sdbar={sdbar}
          setsdbar={setsdbar}
        />
      </div>
      <div className="flex   ">
        <Sidebar
          handlesidebar={handlesidebar}
          sdbar={sdbar}
          setsdbar={setsdbar}
        />

        

        <div
          className={`${
            sdbar ? "w-4/5" : "w-full"
          } right-0 md:top-16 top-16 absolute  `}
        >
          <Outlet />
        </div>
      </div>
      {/* <footer className="bg-[#680d0d] h-8 text-center w-full sticky bottom-0 z-10  ">
       
          <p className="text-white m-1 text-sm">© Copyright 2022 ISTCOSA. All Right Reserved</p>
       
      </footer> */}
    </div>
  );
}

export default Home;
