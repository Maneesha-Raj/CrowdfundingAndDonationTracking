import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DonatePage = () => {
  const [campaignTitle, setCampaignTitle] = useState('');
  const [donationID, setDonationID] = useState('');
  const [donorID, setDonorID] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const navigate = useNavigate();
  const { campaignID } = useParams();

  useEffect(() => {
    const fetchCampaignTitle = async () => {
      try {
        const response = await fetch(`/api/campaigns/${campaignID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCampaignTitle(data.title);
        } else {
          toast.error('Failed to fetch campaign details');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error fetching campaign title');
      }
    };
    fetchCampaignTitle();
  }, [campaignID]);

  const submitDonation = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString(); // Generate timestamp

    const donationData = {
      donationID,
      campaignID,
      donorID,
      donorName,
      amount: parseFloat(donationAmount),
      timestamp
    };

    try {
      const res = await fetch('/api/donateToCampaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('Donation successful');
        navigate('/payment', { state: { title: data.data.campaignID, amount: data.data.amount } });
      } else {
        toast.error('Donation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error processing donation');
    }
  };

  return (
    <div className='h-screen'>
      <form onSubmit={submitDonation}>
        <div className="mt-6">
          <h1 className='text-3xl text-center font-semibold'>Support This Campaign</h1>
          <div className='w-[700px] rounded-2xl shadow-2xl shadow-stone-950 mx-auto mt-6 p-4'>
            <div className='mt-4'>
              <label className='text-xl font-medium'>Campaign Title</label>
              <span id='campaignTitle' className='block text-lg'>{campaignTitle}</span>
            </div>

            <div className='mt-4'>
              <label className='text-xl font-medium'>Donation ID</label>
              <input
                type="text"
                id="donationID"
                name="donationID"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter Donation ID"
                required
                value={donationID}
                onChange={(e) => setDonationID(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <label className='text-xl font-medium'>Donor ID</label>
              <input
                type="text"
                id="donorID"
                name="donorID"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter Donor ID"
                required
                value={donorID}
                onChange={(e) => setDonorID(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <label className='text-xl font-medium'>Donor Name</label>
              <input
                type="text"
                id="donorName"
                name="donorName"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter Donor Name"
                required
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <label className='text-xl font-medium'>Donation Amount</label>
              <input
                type="number"
                id="donationAmount"
                name="donationAmount"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter Your Donation"
                required
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-[200px] mx-auto">
          <button
            type="submit"
            className="w-[200px] bg-green-300 p-2 rounded-lg mt-[30px] hover:bg-green-500"
          >
            Donate
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonatePage;







//-------------------------------------------------------------------------

// import React from 'react'

// const DonatePage = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default DonatePage
