import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { toast } from "react-toastify";

const DisplayCampaign = ({ userType }) => {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const newCampaign = location.state?.newCampaign;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // If there's a new campaign, add it to the projects list
        if (newCampaign) {
          setProjects((prevProjects) => [newCampaign, ...prevProjects]);
        }

        // Fetch list of all campaigns using POST method
        const res = await fetch("http://localhost:5000/api/readProjects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userType, // Optionally pass userType to filter campaigns (if needed by your backend)
          }),
        });

        const result = await res.json();
        if (result.success) {
          // Update the projects list with fetched data
          setProjects((prevProjects) => [...result.data, ...prevProjects]);
          toast.success("Campaigns retrieved successfully!");
        } else {
          toast.error("Failed to fetch campaigns: " + result.message);
        }
      } catch (error) {
        toast.error("An error occurred while fetching campaigns.");
        console.error("Fetch error:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className="text-2xl text-center mt-2 font-black">Top Projects</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.campaignId}
              project={project}
              userType={userType}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No projects found.</p>
        )}
      </div>
    </>
  );
};

export default DisplayCampaign;





//-----------------------------------Working  code ------------------------------------------------------------------------------

// DisplayCampaign.jsx

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import ProjectCard from "./ProjectCard";

// const DisplayCampaign = ({userType}) => {
//   const [projects, setProjects] = useState([]);
//   const location = useLocation();
//   const newCampaign = location.state?.newCampaign;

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         // If there's a new campaign, add it to the projects list
//         if (newCampaign) {
//           setProjects((prevProjects) => [newCampaign, ...prevProjects]);
//         }

//         // Fetch list of all campaigns
//         const res = await fetch("/api/readProjects");
//         const data = await res.json();

//         if (data.success) {
//           // Update the projects list with fetched data
//           setProjects((prevProjects) => [...data.data, ...prevProjects]);
//         } else {
//           console.error("Failed to fetch campaigns:", data.message);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchProjects();
//   }, [newCampaign]);

//   return (
//     <>
//       <div className="text-2xl text-center mt-2 font-black">Top Projects</div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <ProjectCard key={project.campaignId} project={project} userType={userType}/>
//           ))
//         ) : (
//           <p className="text-center col-span-full">No projects found.</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default DisplayCampaign;





//---------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import ProjectCard from "./ProjectCard";

// const DisplayCampaign = () => {
//   const [projects, setProjects] = useState([]);
//   const location = useLocation();
//   const newCampaign = location.state?.newCampaign;

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch(`/api/readCampaign`);
//         const response = await res.json();
        
//         if (response.success) {
//           const data = response.data; // Assuming 'data' contains an array of campaigns

//           // If data is not an array, set it to an empty array to prevent map error
//           const projectsArray = Array.isArray(data) ? data : [];

//           // If there's a new campaign, add it to the projects list
//           if (newCampaign) {
//             setProjects([newCampaign, ...projectsArray]);
//           } else {
//             setProjects(projectsArray);
//           }
//         } else {
//           console.log("Error fetching projects:", response.message);
//         }
//       } catch (error) {
//         console.log("Fetch error:", error);
//       }
//     };
//     fetchProjects();
//   }, [newCampaign]);

//   return (
//     <>
//       <div className="text-2xl text-center mt-2 font-black">Top Projects</div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
//         {projects.map((project) => (
//           <ProjectCard key={project.campaignId} project={project} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default DisplayCampaign;




//-----------------------------------------****\/\/\/\/\*******--------------------------------------------

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import ProjectCard from "./ProjectCard";

// const DisplayCampaign = () => {
//   const [projects, setProjects] = useState([]);
//   const location = useLocation();
//   const newCampaign = location.state?.newCampaign;

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch(`/api/readCampaign`);
//         const data = await res.json();
        
//         // If there's a new campaign, add it to the projects list
//         if (newCampaign) {
//           setProjects([newCampaign, ...data]);
//         } else {
//           setProjects(data);
//         }
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
//     fetchProjects();
//   }, [newCampaign]);

//   return (
//     <>
//       <div className="text-2xl text-center mt-2 font-black">Top Projects</div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
//         {projects.map((project) => (
//           <ProjectCard key={project.campaignId || project._id} project={project} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default DisplayCampaign;






//-------------------------------------------------------------------------------------------------------------------------

// import React from "react";
// import { useEffect, useState } from "react";
// import ProjectCard from "./ProjectCard";

// const DisplayCampaign = () => {
//   const [project, setProject] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch(`api/readCampaign/${id}`);
//         const data = await res.json();
//         setProject(data);
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const projects = project.slice(0, 3);

//   return (
//     <>
//       <div className="text-2xl text-center mt-2 font-black">Top Projects</div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
//         {projects.map((project) => (
//           <ProjectCard key={project._id} project={project} />
//         ))}
//       </div>
//     </>
//   );
// };
// export default DisplayCampaign;