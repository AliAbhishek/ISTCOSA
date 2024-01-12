import React, { useEffect, useState } from "react";

const UseWindowResizeHook = () => {
  const [windowSize, SetWindowSize] = useState({
    height: undefined,
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      SetWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize",handleResize)
    handleResize()

    return()=>window.removeEventListener("resize",handleResize)
  },[]);

  return (windowSize)
  
};

export default UseWindowResizeHook;
