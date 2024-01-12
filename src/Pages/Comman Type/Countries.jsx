import React, { useEffect, useState } from 'react'
import GlobalInputfield from '../../Components/GlobalComponent/GlobalInputfield'
import { BiUpArrowAlt } from 'react-icons/bi'
import { getcountries } from '../../utils/api/Companyapi/Index'
import { MdDelete } from 'react-icons/md'
import AddCountrypopup from '../../Components/AddCountrypopup'
import Pagination from "../../Components/Pagination";
import { deletecountry } from '../../utils/api/Countryapi/Index'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Countries() {

    const [hover,sethover] = useState(true)
    const [country,setcountry] = useState([])
    const [search,setsearch] = useState("")
    const [allsearchdata, setallsearcheddata] = useState([]);
    const [flag,setflag] = useState(true)

    const [itemperpage,setitemperpage] = useState(10)

  const [initialpage, setinitialpage] = useState(1);
  const [lastpageitem, setlastpageitem] = useState(itemperpage ? itemperpage : lastpageitem);

  const lastindex = lastpageitem * initialpage;
  const firstindex = initialpage * lastpageitem - lastpageitem;

  const onepage = country.slice(firstindex, lastindex);
  const searchonepage = allsearchdata.slice(firstindex, lastindex);
  console.log(onepage);

  const changepage = (pageNumbers) => 
  setinitialpage(pageNumbers);

  const getdataonpage=(value)=>{

    
    setlastpageitem(parseInt(value))
    console.log(typeof(lastpageitem))
    
  }


    const handlehover =()=>[
        sethover(false)
      ]
      const hoverof=()=>{
        sethover(true)
      }

      useEffect(() => {
        getcountries().then((res) => setcountry(res));
      }, [flag]);
     

      const handlechange = (e) => {
        setsearch(e.target.value);
        setallsearcheddata(
          country.filter((item) => {
            return item.countryName.toLowerCase().includes(e.target.value);
          })
        );
      };

      const handledelete=(id)=>{
         console.log(id)
         deletecountry(id).then(res=>{if(res){
          setflag(!flag)
          toast.success("Country get deleted")
          
         }})
      }

  return (
    <div className=" m-8">
      {country[0] ? 
      <>
      <ToastContainer/>
    <div className="flex  items-center justify-between ">
      <div className=" text-3xl font-semibold text-[#680d0d]">Countries</div>
      <div>
        <div className=" text-2xl  text-[#680d0d]">{<AddCountrypopup name="add" flag={flag} setflag={setflag} />}</div>
      </div>
    </div>
    <div className="mt-10 flex-gap-2">
      

      <GlobalInputfield
        placeholder="Filter by Country"
        type="text"
        handlechange={handlechange}
      />
    </div>

    <div className="overflow-auto h-[400px] mt-6">
      <table className="w-full  ">
        <thead className=" ">
          <tr onMouseEnter={handlehover} onMouseLeave={hoverof} className=" h-12 text-white overflow-hidden mt-2 sticky  top-0 gap-1  bg-[#680d0d] ">
            
              <th className="text-left justify-start flex gap-2 items-center h-12  w-full   ">
               <div className=" pl-5"> Country Code </div>
                
              </th>
              <th className="text-start">Country name</th>
              
            
            
            <th className="text-right px-5  ">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll  ">
          {(allsearchdata[0] ? searchonepage : onepage)
          // .filter((item)=>{
          //   return search.toLowerCase() === "" ? item : item.countryName.toLowerCase().includes(search)
          // })
          .map((item) => (
            <tr className="border h-12 hover:bg-gray-100">
              <td className="px-5 ">{item.countryCode}</td>
              <td className="px-5 ">{item.countryName}</td>
              <td
                
                className="flex justify-end mt-3 px-5 text-orange-600 text-2xl"
              >
                {<AddCountrypopup name="edit" flag={flag} setflag={setflag} id={item.countryId} cname={item.countryName} code={item.countryCode} />}
                {<MdDelete onClick={()=>handledelete(item.countryId)} />}
              </td>
            </tr>
          ))}
         
        </tbody>
      </table>
      <div className="mr-5 sticky bottom-0  bg-white ">
              <Pagination
                batchList={country}
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
    </>:<div className="flex items-center justify-center min-h-screen p-5 bg-white min-w-screen">
            <div className="flex space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
              <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
              <div className="w-3 h-3 bg-[#680d0d] rounded-full"></div>
            </div>
          </div>}
  </div>
  )
}

export default Countries