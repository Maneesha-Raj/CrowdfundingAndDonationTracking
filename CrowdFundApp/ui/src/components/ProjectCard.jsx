//ProjectCard

import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, userType}) => {

  console.log(project);
  console.log(userType);

  return (
    <div className='bg-white rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10'>
      {/* Project Information */}
      <h2 className='font-bold text-lg text-black'>{project.campaignId}</h2>
      <p className='text-black group-hover:text-white my-2 mx-5'>{project.description}</p>
      <p className='text-black group-hover:text-white my-2 mx-5'>Target: {project.goalAmount}</p>
      <p>Created By: {project.fundraiser}</p>

      {/* User-specific Buttons */}
      {userType === 'authority' && (
        <div className="flex flex-col space-y-4">
          <Link to={`/api/${project.campaignId}`}>
            <button className="rounded-full bg-teal-500 px-8 py-2 hover:outline-double hover:outline-teal-500">
              Approve
            </button>
          </Link>
          <Link to={`/api/${project.campaignId}`}>
            <button className="rounded-full bg-teal-500 px-8 py-2 hover:outline-double hover:outline-teal-500">
              Release Funds
            </button>
          </Link>
        </div>
      )}

      {userType === 'donor' && (
        <Link to={`/donate/${project.campaignId}`}>
          <button className="rounded-full bg-teal-500 px-8 py-2 hover:outline-double hover:outline-teal-500">
            Donate
          </button>
        </Link>
      )}

      {userType === 'bank' && (
        <Link to={`/api/${project.campaignId}`}>
          <button
            onClick={() => deleteProduct(project.campaignId)}
            className="rounded-full bg-red-600 px-8 py-2 hover:outline-double hover:outline-red-600"
          >
            Release Amount
          </button>
        </Link>
      )}

      {userType === 'fundraiser' && (
        <Link to={`/api/${project.campaignId}`}>
          <button className="w-[200px] border-2 bg-green-300 p-2 rounded-lg drop-shadow-lg hover:bg-green-500">
            Donate
          </button>
        </Link>
      )}
    </div>
  );
};

export default ProjectCard;






//--------------------------------------------------------------------------------------------

// import React from 'react';
// import { Link } from 'react-router-dom';

// const ProjectCard = ({ project }) => {
//   return (
//     <div className='bg-white rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10'>
//       <h2 className='font-bold text-lg text-black '>{project.campaignId}</h2>
//       <p className='text-black group-hover:text-white my-2 mx-5'>{project.description}</p>
//       <p className='text-black group-hover:text-white my-2 mx-5'>Target: {project.goalAmount}</p>
//       <p>Created By: {project.fundraiser}</p>

//       <Link to={`/api/${project.campaignId}`}>
//         <button className="w-[200px] border-2 bg-green-300 p-2 rounded-lg drop-shadow-lg hover:bg-green-500">
//           Donate
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default ProjectCard;


//---------------------------------------------------------------------------


   
// {userType === 'authority' && (
//   <Link to={`/api/${project.campaignId}`}>
//     <button class=" rounded-full bg-teal-500 px-8 py-2 hover:outline-double  hover:outline-teal-500">Approve</button>     
//     </Link>

//       <Link to={`/api/${project.campaignId}`}>
//       <button class=" rounded-full bg-teal-500 px-8 py-2 hover:outline-double  hover:outline-teal-500">Release Funds</button>     
//       </Link>
// )}

// {userType === 'donor' && (
//     <Link to={`/donate/${project.campaignId}`}>
//           <button class=" rounded-full bg-teal-500 px-8 py-2 hover:outline-double  hover:outline-teal-500">Donate</button>     
//       </Link>
// )}


// {userType === 'bank' && (
  
//   <Link to={`/api/${project.campaignId}`}>
//     <button onClick={() => deleteProduct(id)}  className="rounded-full bg-red-600 px-8 py-2 hover:outline-double hover:outline-red-600">Release amount</button>
//   </Link>
// )}




//------------------------------------------------------------------------------------------------------------------

// import React from 'react'
// import { Link } from 'react-router-dom'

// const ProjectCard = ({project}) => {
//   return (
//     <>
//         <div className='bg-white rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10'>
//         <h2 className='font-bold text-lg text-black '>{project.title}</h2>
//         <p className='text-black group-hover:text-white my-2 mx-5'>{project.tagline} </p>
//         <p className='text-black group-hover:text-white my-2 mx-5'>{project.description} </p>
//         <p className='text-black group-hover:text-white my-2 mx-5'>Target : {project.targetAmount} </p>
//         <p className='text-black group-hover:text-white my-2 mx-5'>Raised : {project.pledgedAmount} </p>
//         <p>Created By: {project.createdBy}</p>

//         <Link to={`/api/${project._id}`}>
//         <button className="w-[200px] border-2 bg-green-300 p-2 rounded-lg drop-shadow-lg hover:bg-green-500">
//           Donate
//         </button>
//       </Link>
//       </div>
//     </>
//   )
// }

// export default ProjectCard