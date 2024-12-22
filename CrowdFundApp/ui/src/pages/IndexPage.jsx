

import React from 'react';
import Titleimage from '../assets/images/image1.png';

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar
      <nav className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-blue-400">FUND ME</div>
        <ul className="hidden md:flex space-x-8">
          <li><a href="#home" className="hover:text-blue-400">HOME</a></li>
          <li><a href="#about" className="hover:text-blue-400">ABOUT</a></li>
          <li><a href="#pages" className="hover:text-blue-400">PAGES</a></li>
          <li><a href="#explore" className="hover:text-blue-400">EXPLORE</a></li>
          <li><a href="#shop" className="hover:text-blue-400">SHOP</a></li>
          <li><a href="#blog" className="hover:text-blue-400">BLOG</a></li>
          <li><a href="#contact" className="hover:text-blue-400">CONTACT</a></li>
        </ul>
        <a href="/home"><button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Get Started</button></a>
      </nav> */}

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-6 py-10 md:py-20 space-y-8 md:space-y-0 md:space-x-10">
        
        {/* Text Section */}
        <div className="flex flex-col items-start text-left space-y-4 md:w-1/2">
          <p className="text-2xl md:text-3xl font-semibold text-yellow-400 animate-pulse p-8">Dreams Come True</p>
          <h1 className="text-7xl md:text-7xl font-bold p-8">Crowdfunding and Donation Tracking Platform</h1>

          {/* Amount Section */}
          <div className="flex items-center space-x-8 mt-6 p-12">
            <div className="text-center">
              <p className="text-3xl font-bold">$32,678</p>
              <p className="text-gray-400">Pledged</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">$33,467</p>
              <p className="text-gray-400">Target</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-700 rounded-full mt-4 relative p-12">
            <div className="absolute top-0 left-0 h-2 bg-purple-600 rounded-full" style={{ width: '98%' }}></div>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img src={Titleimage} alt="titleimage" className="w-full max-w-xl" />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;







//-----------------------------------------------------------------------------------------------------------------------------

// import React from 'react'
// import Titleimage from '../assets/images/image1.png'

// const IndexPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-6">
//         <div className="text-2xl font-bold text-blue-400">FUND ME</div>
//         <ul className="hidden md:flex space-x-8">
//           <li><a href="#home" className="hover:text-blue-400">HOME</a></li>
//           <li><a href="#about" className="hover:text-blue-400">ABOUT</a></li>
//           <li><a href="#pages" className="hover:text-blue-400">PAGES</a></li>
//           <li><a href="#explore" className="hover:text-blue-400">EXPLORE</a></li>
//           <li><a href="#shop" className="hover:text-blue-400">SHOP</a></li>
//           <li><a href="#blog" className="hover:text-blue-400">BLOG</a></li>
//           <li><a href="#contact" className="hover:text-blue-400">CONTACT</a></li>
//         </ul>
//         <a href="/"><button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500">Get Started</button></a>
//       </nav>

//       {/* Content Section */}
//       <div className='flex h-full'>
        
//                 <div className="flex flex-col items-center justify-center text-center mt-10 space-y-4">
//                     <p className="text-gray-400">Dreams Come True</p>
//                     <h1 className="text-6xl md:text-5xl font-bold"> Crowdfunding and Donation Tracking Platform</h1>

//                     {/* Amount Section */}
//                     <div className="flex items-center space-x-8 mt-6">
//                     <div className="text-center">
//                         <p className="text-3xl font-bold">$32,678</p>
//                         <p className="text-gray-400">Pledged</p>
//                     </div>
//                     <div className="text-center">
//                         <p className="text-3xl font-bold">$33,467</p>
//                         <p className="text-gray-400">Target</p>
//                     </div>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="w-3/4 md:w-1/2 h-2 bg-gray-700 rounded-full mt-4 relative">
//                     <div className="absolute top-0 left-0 h-2 bg-purple-600 rounded-full" style={{ width: '98%' }}></div>
//                     </div>
            

//             {/* VR Image */}
            
//         </div>
//             <div className="">
//             <img src={Titleimage} alt='titleimage' className="w-full max-w-md" />
//             </div>
//       </div>
//     </div>
//   )
// }

// export default IndexPage
