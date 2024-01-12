import React, { useEffect, useState } from "react";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

const UserPagination = (props) => {
  let pagenumber = [];
  const [lastpage, setlastpage] = useState(false);
  let slidingpages = [];

  for (let i = 1; i <= props.pages; i++) {
    pagenumber.push(i);
  }
  
  for (let i = props.page; i <= props.pages - 1; i++) {
    slidingpages.push(i);
  }

  

 

  return (
    <div className="">
      <div className="flex    md:flex-row md:justify-end item-center md:h-12   overflow-hidden   gap-2">
        <div className="flex md:justify-end gap-3 hidden md:block w-52 ">
          <div className="flex gap-2 md:mt-2">
          <p className="text-black  text-md opacity-70 mt-1 ">
            Total Pages : {pagenumber.length}{" "}
          </p>
          <p className="text-black text-md opacity-70 mt-1">
            Current Page : {props.page}
          </p>
          </div>
        </div>
      
   
          <div className="flex flex-row    justify-between items-center    md:text-2xl text-sm text-black opacity-90 ">
            <button
              onClick={() => {
                props.setpage(pagenumber[0]);
              }}
            >
              <BiFirstPage
                onClick={() => {
                  setlastpage(true);
                  props.setpage(pagenumber[0]);
                }}
              />
            </button>
            <button className="flex items-center justify-center px-3 ">
              {
                <MdSkipPrevious
                  onClick={() => {
                    if (props.page != pagenumber[0]) {
                      props.setpage(props.page - 1);
                    }
                  }}
                />
              }
            </button>
            <div className="flex gap-3 overflow-x-scroll no-scrollbar w-14 text-sm md:text-lg  ">
              {(props.page<=1?[<div className="text-sm ml-5">1</div>]:slidingpages).map((p) => {
                return (
                  <p
                    onClick={() => {
                      props.changepage(p);
                    }}
                    className="hover:cursor-pointer"
                  >
                    {p}
                  </p>
                );
              })}
            </div>

            <button className="flex items-center justify-center px-3 ">
              {
                <MdSkipNext
                  onClick={() => {
                    if (props.page != pagenumber.length) {
                      props.setpage(props.page + 1);
                    }
                  }}
                />
              }
            </button>
            <button
              onClick={() => {
                setlastpage(true);
                props.setpage(pagenumber.length);
              }}
            >
              <BiLastPage />
            </button>
          </div>
       
      </div>
    </div>
  );
};

export default UserPagination;
