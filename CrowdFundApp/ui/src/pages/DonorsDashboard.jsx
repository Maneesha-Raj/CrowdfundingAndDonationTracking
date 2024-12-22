import React from 'react'
import { Link , useLocation} from 'react-router-dom';
// import { useLocation } from "react-router-dom";
import DisplayCampaign from '../components/DisplayCampaign';
import CampaignListPage from './CampaignListPage';

const DonorsDashboard = () => {

  const location = useLocation();
  // const userType = location.state?.userType;

  const userType = location.state?.userType || "Unknown";
  return (
 
    <div>

        <div>
          <h1>Welcome to the {userType} Dashboard</h1>
          {/* Render content based on userType */}
        </div>

         <div className=' pl-2'>
          <CampaignListPage/> 
        </div>
     
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Logo and Welcome Message Section */}
      <div className="text-center mb-8">
        {/* <img
          src="/path-to-logo/logo.png"
          alt="Logo"
          className="w-28 mx-auto mb-6"
        /> */}
        <h1 className="text-3xl font-bold text-gray-800">
          Donors Dashboard
        </h1>
        {/* <p className="text-lg text-gray-600 mt-2">
          Select a function
        </p> */}
      </div>

      {/* Buttons Section */}
      {/* <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="space-y-4">
          <Link to="/create-campaign">
            <button className="w-full text-left px-4 py-3  bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Create Campaign
            </button>
          </Link>
          <Link to="/universitydashboard">
            <button className="w-full text-left px-4 py-3 mt-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              View Campaign
            </button>
          </Link> */}
          {/* <Link to="/govagency">
            <button className="w-full text-left px-4 py-3 mt-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Governing Agency Dashboard
            </button>
          </Link>
          <Link to="/SPdashboard">
            <button className="w-full text-left px-4 py-3 mt-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Scholarship Provider Dashboard
            </button>
          </Link> */}
        </div>
       
      </div>
    // </div>


    // </div>
  )
}

export default DonorsDashboard
