import React, { useState } from "react";
import logoimg from "../assets/Logo.png";
import { FiLogIn } from "react-icons/fi";
import { IoIosMenu, IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themeValue } from "../Slice";

function Header({ handlesidebar, state }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(false);
  const dispatch = useDispatch();

  const handlelogout = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };

  const handleTheme = () => {
    setTheme(!theme);

    dispatch(themeValue(theme));
  };

  return (
    <>
      <div
        className={`flex h-[70px]  fixed top-0 left-0 right-0 z-10 justify-between items-center px-5 ${
          theme ? "bg-white" : "bg-black text-white"
        } `}
      >
        <div className="flex gap-3 items-center">
          <div>
            <button onClick={handlesidebar}>
              {<IoIosMenu className="text-2xl " />}
            </button>
          </div>
          <img className="h-[40px]" src={logoimg} alt="logo" />
        </div>
        <div className="flex gap-3">
          <div>
            {theme ? (
              <IoMdMoon onClick={handleTheme} className="hover:cursor-pointer" />
            ) : (
              <IoMdSunny onClick={handleTheme} className="hover:cursor-pointer" />
            )}
          </div>
          <div className="text-xl text-[#680d0d] ">
            {state ? <FaRegUser /> : <FiLogIn onClick={handlelogout} />}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default Header;
