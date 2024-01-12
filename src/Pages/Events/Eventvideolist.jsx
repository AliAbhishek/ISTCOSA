import React, { useEffect, useState } from 'react'
import GlobalInputfield from '../../Components/GlobalComponent/GlobalInputfield'
import { eventvideolist } from '../../utils/api/Event/Index'
import { IoIosCamera, IoMdVideocam } from 'react-icons/io'
import { MdDelete, MdEdit } from 'react-icons/md'
import Pagination from '../../Components/Pagination'
import { useNavigate } from 'react-router-dom'
import {  IoReturnDownBackSharp } from 'react-icons/io5'

const Eventvideolist = () => {

   const [alldata,setalldata] = useState([])
   const [itemperpage, setitemperpage] = useState(10);
   const [allsearchdata,setallsearcheddata] = useState([])
   const navigate=useNavigate()

  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(
    itemperpage ? itemperpage : lastpageitem
  );

  

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = alldata.slice(firstindex, lastindex);
  const changepage = (pageNumbers) => setinitialpage(pageNumbers);
  
  const getdataonpage = (value) => {
    setlastpageitem(parseInt(value));
    console.log(typeof lastpageitem);
  };    

  const handlechange = (e) => {
    
    setallsearcheddata(alldata.filter((item)=>{
      return item.VideoName.toLowerCase().includes(e.target.value)
    }))

  };
  

  



    useEffect(()=>{
        eventvideolist().then(res=>setalldata(res))

    },[])

  return (
    <div className="m-8">
    
   
      <>
        <div className="flex  items-center justify-between ">
          <div className=" text-3xl font-semibold text-[#680d0d]">Event Video Lists</div>
          
          <div>
            <div className=" text-2xl  text-[#680d0d]">
              {<IoReturnDownBackSharp onClick={()=>navigate(-1)}  />}
            </div>
          </div>
        </div>
        <div className="mt-10 flex-gap-2">
          <GlobalInputfield
            placeholder="Filter by Event"
            type="text"
            handlechange={handlechange}
          />
        </div>

        <div className="overflow-auto h-[400px] mt-6">
          <table className="w-full">
            <thead className=" ">
              <tr className=" h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d] ">
                <th className="text-left px-5">Event Name </th>
                
                <th className="text-right px-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {(allsearchdata[0]? allsearchdata:onepage)
               
                .map((item) => (
                  <tr className="border h-12">
                    <td className="px-5">{item.VideoName}</td>
                    
                    <td
                      // onClick={handledelete}
                      className="w-[0%] px-5 text-orange-600 text-2xl"
                    >
                      <div className="flex gap-2">
                        {
                        //   <AddEventpopup
                        //     name="edit"
                        //     EventName={item.EventName}
                        //     location={item.EventLocation}
                        //     date={item.EventDate}
                        //     folder={item.EventPicFolder}
                        //     pic={item.EventImage}
                        //     summary={item.Summary}
                        //     id={item.ID}
                        //     flag={flag}
                        //     setflag={setflag}
                        //   />
                        }
                        {<MdEdit className='text-blue-900'/>}
                        {<IoMdVideocam className="text-[#680d0d]" />}
                        {<MdDelete className="hover:cursor-pointer" o />}
                        {<IoIosCamera  className="text-black hover:cursor-pointer" />}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mr-5 sticky bottom-0  bg-white ">
            <Pagination
              batchList={alldata}
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
      </>
    {/* ) : (
      <div className="flex items-center justify-center min-h-screen p-5 bg-white min-w-screen">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
          <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
          <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
        </div>
      </div>
    )} */}
  </div>
  )
}

export default Eventvideolist