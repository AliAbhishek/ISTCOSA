import React, { memo, useEffect, useState } from "react";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

function Pagination(props) {
  let pages = [];
  console.log("pagination")
  

  for (
    let i = 1;
    i <= Math.ceil(props.batchList.length / props.lastpageitem);
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:justify-end  overflow-hidden  mt-1 gap-2">
        <div className="flex md:justify-end gap-1  ">
          <p className="text-black text-sm opacity-70 mt-1">Item Per Page : </p>
          <select
            className="w-10 bg-gray-100"
            onChange={(e) => props.getdataonpage(e.target.value)}
          >
            <option selected disabled></option>
            <option>5</option>
            <option>10</option>
            <option>15</option>
          </select>
        </div>
        <div className="flex  items-center md:justify-end gap-2 ">
          <div className="text-black opacity-70 text-sm">
            {props.firstindex + 1} -{" "}
            {`${
              props.initialpage == pages.length
                ? props.batchList.length
                : props.lastindex
            }`}{" "}
            out of{" "}
            {props.allsearchdata[0]
              ? props.allsearchdata.length
              : props.batchList.length}
          </div>
          <div className="flex  justify-between items-center  h-8  text-2xl text-black opacity-90 ">
            <button
              onClick={() => {
                props.setinitialpage(pages[0]);
              }}
            >
              <BiFirstPage />
            </button>
            <button className="flex items-center justify-center px-3 ">
              {
                <MdSkipPrevious
                  onClick={() => {
                    if (props.initialpage != 1) {
                      props.setinitialpage(props.initialpage - 1);
                    }
                  }}
                />
              }
            </button>

            <button className="flex items-center justify-center px-3 ">
              {
                <MdSkipNext
                  onClick={() => {
                    if (props.initialpage != pages.length) {
                      props.setinitialpage(props.initialpage + 1);
                    }
                  }}
                />
              }
            </button>
            <button
              onClick={() => {
                props.setinitialpage(pages.length);
              }}
            >
              <BiLastPage />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Pagination);
