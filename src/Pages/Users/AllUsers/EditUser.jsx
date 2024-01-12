import React, { useEffect, useState } from "react";
import GlobalInputfield from "../../../Components/GlobalComponent/GlobalInputfield";
import { MultiSelect } from "react-multi-select-component";
import GlobalButton from "../../../Components/GlobalComponent/GlobalButton";
import { MdEdit } from "react-icons/md";
import { getdetailsforedit, updateuserdetails } from "../../../utils/api/Userapi";
import { toast } from "react-toastify";


function EditUser({ id , rollnumber,date}) {
 
  const [updatedata, setupdatedata] = useState({
    AboutYourSelf: "",
    AniversaryDate: "",
    Badges: "",
    CityName: "",
    Comments: "",
    CountryName: "",
    DateOfBirth: "",
    Email: "",
    FullName: "",
    Gender: "",
    ISTCAbout: "",
    ISTCFriendRoommate: "",
    ISTCNickName: "",
    MaritalStatus: "",
    PhoneNumber: "",
    PinCode: "",
    SearchKeywords: "",
    StateName: "",
    WhatsappNumber: "",
  });


  const [originalvalue, setoriginalvalue] = useState();

  const options = [
    { label: "President", value: "President" },
    { label: "Vice-President", value: "Vice-President" },
    { label: "Batch-Coordinator", value: "Batch-Coordinator" },
  ];
  const [selected, setselected] = useState([]);
  const [editdata, seteditdata] = useState(false);
  const [checkboxvalue, setcheckboxvalue] = useState(false);
  const [formateddate,setformateddate] = useState()


 

  useEffect(() => {
    getdetailsforedit(id).then(
      (res) =>{

       
        setupdatedata({
          CityList : res.CityList,
          StateList : res.StateList,
          CountryList : res.CountryList,
          BatchID : res.BatchID,
          AboutYourSelf: res.AboutYourSelf,
          AniversaryDate: res.AniversaryDate,
          Badges: res.Badges,
          CityName: res.CityName,
          Comments: res.Comments,
          CountryName: res.CountryName,
          // DateOfBirth: `${formateddate}`,
          Email: res.Email,
          FullName: res.FullName,
          Gender: res.Gender,
          ISTCAbout: res.ISTCAbout,
          ISTCFriendRoommate: res.ISTCFriendRoommate,
          ISTCNickName: res.ISTCNickName,
          MaritalStatus: res.MaritalStatus,
          PhoneNumber: res.PhoneNumber,
          PinCode: res.PinCode,
          SearchKeywords: res.SearchKeywords,
          StateName: res.StateName,
          WhatsappNumber: res.WhatsappNumber,
        })}

        

      
    );
  }, [id]);

  const changedateformat = (date) => {
    let myarr = date.split("");

    let newarr = myarr.slice(0, 10);
    let year = newarr.slice(0, 4).join("");

    let month = newarr.slice(5, 7).join("");

    let day = newarr.slice(8, 10).join("");

    let formateddate = year + "-" + month + "-" + day 

    setformateddate(formateddate);
    setupdatedata((old)=>({...old,DateOfBirth:formateddate}))
    
    
  };

  
 

  const handlechange = (e) => {
    setcheckboxvalue(e.target.checked);
    setoriginalvalue(e.target.value);
    setupdatedata((old) => ({ ...old, [e.target.name]: e.target.value }))
   
   
    
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(updatedata);
    updateuserdetails(id,updatedata).then(res=>{
      if(res=="sucess"){
        toast.success("User updated Successfully")
        seteditdata(false)
        setupdatedata("")

      }
    }).catch(err=>{if(err){
      toast.error("User can not updated Successfully")
      seteditdata(false)
        setupdatedata("")

    }})
    
  };

  return (
    <div>
      <div
        onClick={() => {
          seteditdata(true);
          changedateformat(date)

        }}
      >
        <MdEdit className="text-blue-900 hover:cursor-pointer" />
      </div>
      {editdata ? (
        <>        
        <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
          <div className="relative shadow-2xl shadow-gray   md:w-2/5 w-3/5 my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="text-center  font-thin p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className=" md:text-3xl text-lg font-thin text-[#680d0d]">
                  Update User Personal Details
                </h3>
              </div>
              <form
                onSubmit={handlesubmit}
                className="h-[400px] overflow-scroll no-scrollbar text-sm"
              >
                <div className="m-5">
                  <div className="flex flex-col md:flex-row  justify-between">
                    <div className="text-gray-400">
                      Batch
                      <GlobalInputfield
                        disabled="disabled"
                        name="BatchID"
                        value={updatedata.BatchID}
                      />
                    </div>
                    <div className="text-gray-400">
                      Roll Number
                      <GlobalInputfield
                        disabled="disabled"
                        name="RollNumberID"
                        value={rollnumber}
                      />
                    </div>
                  </div>
                  <div className="md:mt-3 mt-2">
                    Full name
                    <GlobalInputfield
                      name="FullName"
                      handlechange={handlechange}
                      value={updatedata?.FullName}
                    />
                  </div>
                  <div className="mt-3 rounded-xl h-10">
                    <p>Select Badges</p>
                    <MultiSelect
                    
                      options={options}
                      value={selected}
                      onChange={setselected}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:mt-10 mt-6 justify-between">
                    <div>
                      <p>Email</p>
                      <GlobalInputfield
                        name="Email"
                        value={updatedata?.Email}
                        handlechange={handlechange}
                      />
                    </div>
                    <div>
                      <p className="mt-2 md:mt-0 ">Contact Number</p>
                      <GlobalInputfield
                        name="PhoneNumber"
                        value={updatedata?.PhoneNumber}
                        handlechange={handlechange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center  gap-2 ">
                    <div className="">
                      <div className="mt-2 mb-2">Gender</div>

                      <div className="flex gap-3">
                        <div className="flex justify-center items-center gap-2 ">
                          <input
                            onChange={handlechange}
                            name="Gender"
                            checked={updatedata?.Gender == "Male" ? true : null}
                            type="radio"
                            className="w-5 h-5"
                            value="Male"
                            
                          />
                          <p className="text-sm text-black ">Male </p>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                          <input
                              onChange={handlechange}
                            name="Gender"
                            checked={
                              updatedata?.Gender == "Female" ? true : null
                            }
                            value="Female"
                            
                            type="radio"
                            className="w-5 h-5"
                          />
                          <p className="text-sm text-black">Female</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:ml-24 md:mt-4 w-full ">
                      <div>Choose Date of Birth</div>
                      <GlobalInputfield
                        handlechange={handlechange}
                        name="DateOfBirth"
                        value={updatedata?.DateOfBirth}
                        type="date"
                       
                        
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row  justify-between mt-4 gap-2">
                    <div className="md:w-[33%]">
                      <select
                        value={updatedata?.CountryName}
                        name="CountryName"
                        className="border w-full  border-black h-10 rounded-lg"
                        onChange={handlechange}
                      >
                        <option>Country</option>
                        {updatedata.CountryList?.map((country) => {
                          return <option>{country.countryName}</option>;
                        })}
                      </select>
                    </div>
                    <div className="md:w-[33%]">
                      <select
                        value={updatedata?.StateName}
                        className="border w-full border-black h-10 rounded-lg"
                        onChange={handlechange}
                      >
                        <option>State</option>
                        {updatedata?.StateList?.map((state) => {
                          return <option>{state.StateName}</option>;
                        })}
                      </select>
                    </div>
                    <div className="md:w-[33%]">
                      <select
                        value={updatedata?.CityName}
                        className="border w-full border-black h-10 rounded-lg"
                        onChange={handlechange}
                      >
                        <option>City</option>
                        {updatedata?.CityList?.map((city) => {
                          return <option>{city.CityName}</option>;
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="md:mt-4 mt-2">
                      <div>Pincode</div>
                      <GlobalInputfield value={updatedata?.PinCode} handlechange={handlechange} name="PinCode" />
                    </div>
                    <div className="md:mt-4 mt-2">
                      <div>Whatsapp Number</div>
                      <GlobalInputfield
                      handlechange={handlechange}
                      name="WhatsappNumber"
                        value={
                          checkboxvalue
                            ? updatedata?.PhoneNumber
                            : updatedata?.WhatsappNumber
                        }
                      />
                    </div>
                  </div>
                  <div className="flex  md:flex-row gap-2 mt-3 md:ml-60">
                    <input onChange={handlechange} type="checkbox" />
                    <div>Same as above</div>
                  </div>

                  <div className="mt-2 md:mt-0">Marrital Status</div>
                  <div className="flex gap-3 mt-2 ">
                    <div className="flex justify-center items-center gap-2 ">
                      <input
                          onChange={handlechange}
                        name="MaritalStatus"
                        checked={
                          updatedata?.MaritalStatus == "Single" ? true : null
                        }
                        type="radio"
                        className="w-5 h-5"
                        value="Single"
                      />
                      <p className="text-sm text-black ">Single</p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <input
                          onChange={handlechange}
                        name="MaritalStatus"
                        value="Married"
                        type="radio"
                        className="w-5 h-5"
                        checked={
                          updatedata?.MaritalStatus == "Married" ? true : null
                        }
                      />
                      <p className="text-sm text-black">Married</p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <input
                          onChange={handlechange}
                        name="MaritalStatus"
                        value="Divorce"
                        type="radio"
                        className="w-5 h-5"
                        checked={
                          updatedata?.MaritalStatus == "Divorce" ? true : null
                        }
                      />
                      <p className="text-sm text-black">Divorce</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row mt-3 md:gap-14 w-full ">
                    <div>
                      <div className="mb-1 ">Spouce Name</div>
                      <GlobalInputfield value={updatedata?.SpouseName} handlechange={handlechange} name="SpouseName" />
                    </div>
                    <div>
                      <div className="mb-1 mt-2 md:mt-0">Choose Anniversary date</div>
                      <GlobalInputfield
                        type="date"
                        name="AniversaryDate"
                        handlechange={handlechange}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-3 mb-1">Family Details</div>

                    <GlobalInputfield handlechange={handlechange} value={updatedata?.FamilyDetails} name="FamilyDetails" />
                  </div>

                  <div className="flex flex-col md:flex-row mt-3 justify-between">
                    <div>
                      <div className="mb-1 ">ISTC NickName</div>
                      <GlobalInputfield value={updatedata?.ISTCNickName} handlechange={handlechange} name="ISTCNickName"  />
                    </div>
                    <div>
                      <div className="mb-1 md:mt-0 mt-2">ISTC Friend Roommates</div>
                      <GlobalInputfield
                      handlechange={handlechange}
                      name="ISTCFriendRoommate"
                        value={updatedata?.ISTCFriendRoommate}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="mb-1">About Yourself</div>
                    <GlobalInputfield
                      name="AboutYourSelf"
                      handlechange={handlechange}
                      value={updatedata.AboutYourSelf}
                    />
                  </div>
                  <div className="mt-3">
                    <div className="mb-1">ISTC About</div>
                    <GlobalInputfield value={updatedata?.ISTCAbout} name="ISTCAbout" handlechange={handlechange} />
                  </div>
                  <div className="mt-3">
                    <div className="mb-1">Comments</div>
                    <GlobalInputfield value={updatedata?.Comments} name="Comments" handlechange={handlechange} />
                  </div>
                  <div className="mt-3">
                    <div className="mb-1">Search Keywords</div>
                    <GlobalInputfield value={updatedata?.SearchKeywords} name="SearchKeywords" handlechange={handlechange} />
                  </div>
                </div>

                <div className="flex items-center justify-end mr-5 mb-2 ">
                  <div className="flex justify-end mt-3 gap-3 ">
                    <GlobalButton
                      handlereset={() => seteditdata(false)}
                      name="Close"
                      bgcolor="white"
                      type="button"
                      textcolor="[#680d0d]"
                      bordercolor="[#680d0d]"
                    />
                    <GlobalButton
                      name="Update"
                      type="submit"
                      bgcolor="[#680d0d]"
                      textcolor="white"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default EditUser;
