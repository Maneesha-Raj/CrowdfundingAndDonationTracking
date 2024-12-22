// CreateCampaignPage.jsx ---------------------------------------

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCampaignPage = () => {
  const [campaignId, setCampaignId] = useState('');
  const [fundraiser, setFundraiser] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const newCampaign = {
      campaignId,
      fundraiser,
      description,
      goalAmount,
      startDate,
      endDate,
    };

    addCampaign(newCampaign);
  };

  const addCampaign = async (newCampaign) => {
    const res = await fetch('/api/createcampaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCampaign)
    });

    const result = await res.json();

    if (result.success) {
      toast.success(`${result.message}`);
      // Pass the campaign data to the DisplayCampaign page
      navigate('/fundraiser', { state: { newCampaign } });
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  return (
    // Form JSX here...
    <>
      <section className="bg-white mb-20 flex">
        <div className="container m-auto max-w-xl py-2">
          <div className="bg-green-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-green-800 text-center font-semibold mb-6">
                Create Campaign
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Campaign ID
                </label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Campaign-01"
                  required
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Fundraiser
                </label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. JohnDoeFundraiser"
                  required
                  value={fundraiser}
                  onChange={(e) => setFundraiser(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Describe the campaign purpose"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Goal Amount
                </label>
                <input
                  type="number"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 10000"
                  required
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Milestones
                </label>
                <textarea
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder='[{ "milestone": "Phase 1", "amount": 5000 }, { "milestone": "Phase 2", "amount": 5000 }]'
                  required
                  value={milestones}
                  onChange={(e) => setMilestones(e.target.value)}
                />
              </div> */}

              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateCampaignPage;









//-----------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const CreateCampaignPage = () => {
//   const [campaignId, setCampaignId] = useState('');
//   const [fundraiser, setFundraiser] = useState('');
//   const [description, setDescription] = useState('');
//   const [goalAmount, setGoalAmount] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   // const [milestones, setMilestones] = useState('');

//   const navigate = useNavigate();

  
//   //---------------------------------------------

//   const submitForm = (e) => {
//     e.preventDefault();

//     const newCampaign = {
//       campaignId,
//       fundraiser,
//       description,
//       goalAmount,
//       startDate,
//       endDate
//      // milestones: JSON.parse(milestones)
//     };

//     addCampaign(newCampaign);
//   };

//   //--------------------------------------------------------------

//   const addCampaign = async (newCampaign) => {
//     const res = await fetch('/api/createcampaign', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newCampaign)
//     });

//     const result = await res.json();

//     if (result.success) {
//       toast.success(`${result.message}`);
//       navigate('/fundraiser');
//     } else {
//       toast.error(`Error: ${result.message}`);
//     }
//   };

//   return (
//     <>
//       <section className="bg-white mb-20 flex">
//         <div className="container m-auto max-w-xl py-2">
//           <div className="bg-green-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
//             <form onSubmit={submitForm}>
//               <h2 className="text-3xl text-green-800 text-center font-semibold mb-6">
//                 Create Campaign
//               </h2>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-2">
//                   Campaign ID
//                 </label>
//                 <input
//                   type="text"
//                   className="border rounded w-full py-2 px-3 mb-2"
//                   placeholder="eg. Campaign-01"
//                   required
//                   value={campaignId}
//                   onChange={(e) => setCampaignId(e.target.value)}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-2">
//                   Fundraiser
//                 </label>
//                 <input
//                   type="text"
//                   className="border rounded w-full py-2 px-3 mb-2"
//                   placeholder="eg. JohnDoeFundraiser"
//                   required
//                   value={fundraiser}
//                   onChange={(e) => setFundraiser(e.target.value)}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   className="border rounded w-full py-2 px-3 mb-2"
//                   placeholder="Describe the campaign purpose"
//                   required
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-2">
//                   Goal Amount
//                 </label>
//                 <input
//                   type="number"
//                   className="border rounded w-full py-2 px-3 mb-2"
//                   placeholder="eg. 10000"
//                   required
//                   value={goalAmount}
//                   onChange={(e) => setGoalAmount(e.target.value)}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-2">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   className="border rounded w-full py-2 px-3 mb-2"
//                   required
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-2">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   className="border rounded w-full py-2 px-3 mb-2"
//                   required
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>

//               {/* <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-2">
//                   Milestones
//                 </label>
//                 <textarea
//                   className="border rounded w-full py-2 px-3 mb-2"
//                   placeholder='[{ "milestone": "Phase 1", "amount": 5000 }, { "milestone": "Phase 2", "amount": 5000 }]'
//                   required
//                   value={milestones}
//                   onChange={(e) => setMilestones(e.target.value)}
//                 />
//               </div> */}

//               <div>
//                 <button
//                   className="bg-green-500 hover:bg-green-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
//                   type="submit"
//                 >
//                   Create Campaign
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default CreateCampaignPage;







//--------------------------------------------------------------------------------------------------------

// import React from 'react'

// const CreateCampaignPage = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CreateCampaignPage
