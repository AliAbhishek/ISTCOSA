import React from "react";
import GlobalInputfield from "../Components/GlobalComponent/GlobalInputfield";
import GlobalButton from "../Components/GlobalComponent/GlobalButton";

function MarqueeLink() {
  return (
    <div className="m-8">
      <div className="flex   items-center  justify-between ">
        <div className=" text-3xl font-semibold text-[#680d0d]">
          Add Marquee Link
        </div>
        <div>
          <div className=" text-2xl  text-[#680d0d]">
            {/* {<AddRollnumberpopup />} */}
          </div>
        </div>
      </div>
      <div className="mt-10 w-full flex flex-col md:flex-row gap-2">
        <div className="w-full items-end  ">
          <GlobalInputfield 
          placeholder="Marque Title*"
          /> 
        </div>
        <div className="w-full">
          <GlobalInputfield
            // handlechange={handlechange}
            placeholder="Marque Link*"
            type="text"
          />
        </div>
      </div>
      <div className="flex justify-end mt-8 gap-3">
                    <GlobalButton
                      // handlereset={handlereset}
                      name="Reset"
                      bgcolor="white"
                      type="button"
                      textcolor="[#680d0d]"
                      bordercolor="[#680d0d]"
                    />
                    <GlobalButton
                      name="Submit"
                      bgcolor="[#680d0d]"
                      textcolor="white"
                    />
                  </div>
    </div>
  );
}

export default MarqueeLink;
