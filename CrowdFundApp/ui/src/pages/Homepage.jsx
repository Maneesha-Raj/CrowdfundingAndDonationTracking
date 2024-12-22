import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { useState } from "react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Logo and Welcome Message Section */}
      <div className="text-center mb-8">
        {/* <img
          src="/path-to-logo/logo.png"
          alt="Logo"
          className="w-28 mx-auto mb-6"
        /> */}
        <h1 className="text-3xl font-bold text-gray-800">
          Crowdfunding and Donation Tracking Portal
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Select a dashboard to proceed
        </p>
      </div>

      {/* Buttons Section */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="space-y-4">

          <Link to="/fundraiser" state={{ userType: "fundraiser" }}>
              <button className="w-full text-left px-4 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
                Fundraiser Dashboard
              </button>
            </Link>
            <Link to="/authorities" state={{ userType: "authority" }}>
              <button className="w-full text-left px-4 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
                Authorities Dashboard
              </button>
            </Link>
            <Link to="/donor" state={{ userType: "donor" }}>
              <button className="w-full text-left px-4 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
                Donors Dashboard
              </button>
            </Link>
            <Link to="/bank" state={{ userType: "bank" }}>
              <button className="w-full text-left px-4 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
                Bank Dashboard
              </button>
            </Link>


          {/* <Link to={{ pathname: "/fundraiser", state: { userType: "fundraiser" } }}>
            <button className="w-full text-left px-4 py-3  bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Fundraiser Dashboard
            </button>
          </Link>
          <Link to={{ pathname: "/authorities", state: { userType: "authority" } }}>
            <button className="w-full text-left px-4 py-3 mt-4 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Authorities Dashboard
            </button>
          </Link>
          <Link to={{ pathname: "/donor", state: { userType: "donor" } }}>
            <button className="w-full text-left px-4 py-3 mt-4 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Donors Dashboard
            </button>
          </Link>
          <Link to={{ pathname: "/bank", state: { userType: "bank" } }}>
            <button className="w-full text-left px-4 py-3 mt-4 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Bank Dashboard
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;





//------------------------------------------------------------------------------------------------------------------------

// import React from 'react'
// import DisplayCampaign from '../components/DisplayCampaign'

// const Homepage = () => {
//   return (
//     <>
//       <div className="h-[150px] bg-slate-100 m-[50px] rounded-lg align-center shadow-2xl">      
//         <p className="text-[35px] ml-[15%]">Community Driven, Dreams Funded.</p>
//         <span className="text-[35px] ml-[45%]">Let's Make Dreams Come True.</span>
//       </div>

//     <div className=' pl-2'>
//       <DisplayCampaign/> 
//     </div>
//     </>
//   )
// }

// export default Homepage