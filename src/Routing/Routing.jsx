import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Home from "../Components/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Users from "../Pages/Users/Users";
import Batches from "../Pages/Batches";
import RollNumbers from "../Pages/RollNumbers";
import Qualifications from "../Pages/Qualifications/Qualifications";
import Companies from "../Pages/Comapnies/Companies";
import Industries from "../Pages/Industry/Industries";
import Employments from "../Pages/Employment/Employments";
import Events from "../Pages/Events/Events";
import MarqueeLink from "../Pages/MarqueeLink";

import Countries from "../Pages/Comman Type/Countries";
import States from "../Pages/Comman Type/States";
import Cities from "../Pages/Comman Type/Cities";

import Eventvideolist from "../Pages/Events/Eventvideolist";
import ShowProfessionalDetails from "../Components/GlobalComponent/UserGlobalComponents/ShowProfessionalDetails";




function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/dashboard" element={<ProtectedRoutes Component={Dashboard} />} />
          <Route path="/users" element={<ProtectedRoutes Component={Users} />} />
          <Route path="/users/showprofessionaldetails" element={<ProtectedRoutes Component={ShowProfessionalDetails} />} />
             

         
          
          <Route path="/batches" element={<ProtectedRoutes Component={Batches} />} />
          <Route path="/rollnumbers" element={<ProtectedRoutes Component={RollNumbers} />} />
          <Route path="/qualifications" element={<ProtectedRoutes Component={Qualifications} />} />
          <Route path="/companies" element={<ProtectedRoutes Component={Companies} />} />
          <Route path="/industries" element={<ProtectedRoutes Component={Industries} />} />
          <Route path="/employments" element={<ProtectedRoutes Component={Employments} />} />
          <Route path="/events" element={<ProtectedRoutes Component={Events} />} />
               <Route path="/events/videolist" element={<ProtectedRoutes Component={Eventvideolist} />} />
         

          <Route path="/marqueelink" element={<ProtectedRoutes Component={MarqueeLink} />} />
          
            <Route path="/commantypes/countries" element={<ProtectedRoutes Component={Countries} />} />
            <Route path="/commantypes/states" element={<ProtectedRoutes Component={States} />} />
            <Route path="/commantypes/cities" element={<ProtectedRoutes Component={Cities} />} />

          
        </Route>
      </Routes>
    </div>
  );
}

export default Routing;
