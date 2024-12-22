// routes.js

const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");

// // Route to read a campaign by campaign ID
// router.post("/readCampaign", async (req, res) => {
//   try {
//     const { campaignId } = req.body;
//     const fundraisersClient = new clientApplication();
    
//     const campaign = await fundraisersClient.submitTxn(
//       "fundraisers",
//       "cfchannel",
//       "CrowdFundChain",
//       "CampaignContract",
//       "queryTxn",
//       "",
//       "getCampaign",
//       campaignId
//     );

//     const data = new TextDecoder().decode(campaign);
//     const value = JSON.parse(data);

//     res.status(200).json({
//       success: true,
//       message: "Campaign data read successfully!",
//       data: value,
//     });
//   } catch (error) {
//     console.error("Error reading campaign:", error);
//     res.status(500).json({
//       success: false,
//       message: "Please check the Campaign ID!",
//       data: error.toString(),
//     });
//   }
// });

//-----------------------------------------------------------------

// Route to create a new campaign
router.post("/createCampaign", async (req, res) => {
  try {
    const { campaignId, fundraiser, description, goalAmount, startDate, endDate } = req.body;
    const fundraisersClient = new clientApplication();

    const result = await fundraisersClient.submitTxn(
      "fundraisers",
      "cfchannel",
      "CrowdFundChain",
      "CrowdfundingContract",
      "invokeTxn",
      "",
      "createCampaign",
      campaignId,
      fundraiser,
      description,
      goalAmount,
      startDate,
      endDate
    );

    res.status(201).json({
      success: true,
      message: "Campaign created successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create campaign!",
      data: error.toString(),
    });
  }
});

//-------------------------------------------------------

// Route to read a campaign by campaign ID
router.post("/readCampaign", async (req, res) => {
  try {
    const { campaignId } = req.body;
    const organizations = ["fundraisers", "donors", "authorities", "bank"];
    const fundraisersClient = new clientApplication();

    let campaignData;
    let success = false;

    // Try querying the campaign data for each organization
    for (const org of organizations) {
      try {
        const campaignBytes = await fundraisersClient.submitTxn(
          org,                       // Identity to use for transaction
          "cfchannel",               // Channel name
          "CrowdFundChain",          // Chaincode name
          "CrowdfundingContract",    // Contract name
          "queryTxn",                // Transaction type
          "", 
          "getCampaign",
          campaignId
        );
        
        // Decode and parse the campaign data
        const decodedString = new TextDecoder().decode(campaignBytes);
        campaignData = JSON.parse(decodedString);
        
        success = true;
        break; // Exit loop if successful
      } catch (error) {
        console.error(`Error querying campaign for ${org}:`, error);
      }
    }

    // Check if campaign data was successfully retrieved
    if (success) {
      res.status(200).json({
        success: true,
        message: "Campaign data read successfully!",
        data: campaignData,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve campaign data from all organizations.",
      });
    }
  } catch (error) {
    console.error("Error reading campaign:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred while reading campaign.",
      error: error.toString(),
    });
  }
});

//------------------------------------------------------------------------

// router.get('/readProjects', async (req, res) => {
//   try {
//     const projects = await fundraiserClient.submitTxn(
//       'fundraisers',
//       'cfchannel',
//       'CrowdFundChain',
//       'CampaignContract',
//       'queryAllCampaigns'
//     );

//     const data = new TextDecoder().decode(projects);
//     const campaigns = JSON.parse(data);

//     res.status(200).json({
//       success: true,
//       message: 'Campaigns fetched successfully!',
//       data: campaigns,
//     });
//   } catch (error) {
//     console.error('Error fetching campaigns:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching campaigns',
//       error: error.message,
//     });
//   }
// });



//-----------------------------------------------------------------------

// Route to get a list of all campaigns---------------------*********/\/\/\/\/\*/\*/\/-----------------------
// router.get("/readProjects", async (req, res) => {
//   try {
//     const org = ["fundraisers", "donors", "authorities", "bank"];
//     const userClient = new clientApplication();
   
//     // Fetch all campaigns; replace `queryAllCampaigns` with the correct function if needed
//     const campaignData = await userClient.submitTxn(
//       org,
//       "cfchannel",
//       "CrowdFundChain",
//       "CrowdfundingContract",
//       "queryAllTxn",
//       "",
//       "queryAllCampaigns"
//     );

//     const data = new TextDecoder().decode(campaignData);
//     const campaigns = JSON.parse(data);

//     res.status(200).json({
//       success: true,
//       message: "Campaigns fetched successfully!",
//       data: campaigns,
//     });
//   } catch (error) {
//     console.error("Error fetching campaigns:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch campaigns.",
//       data: error.toString(),
//     });
//   }
  
// });

//-----------------------------------------------------------------------------


router.post("/readProjects", async (req, res) => {

  for (const org of organizations) {
    const org = ["fundraisers", "donors", "authorities", "bank"];
    const userClient = new clientApplication();

      try {
          const resultBytes = await userClient.submitTxn(
              org,                           // Dynamic organization
              "cfchannel",                   // Channel name
              "CrowdFundChain",              // Chaincode name
              "CrowdfundingContract",        // Contract name
              "queryAllTxn",                    // Transaction type for query
              "",                            // No transient data for this query
              "queryAllCampaigns"            // Chaincode function
          );
    
          const decodedString = new TextDecoder().decode(resultBytes);
          const jsonObject = JSON.parse(decodedString);
    
          console.log(`All Campaigns for ${org}:`);
          console.log(jsonObject);
      } catch (error) {
          console.error(`Error querying campaigns for ${org}:`, error);
      }
    }
    
  });




//-------------------------------------------------------------------------------------------------------

// Route to donate to a campaign
router.post("/donateToCampaign", async (req, res) => {
  try {
    const { donationID, campaignID, donorID, donorName, amount, timestamp } = req.body;
    const client = new clientApplication();

    // Pass donation details as transient data
    const transientData = {
      donorID: Buffer.from(donorID),
      donorName: Buffer.from(donorName),
      amount: Buffer.from(amount.toString()),
      timestamp: Buffer.from(timestamp),
    };

    const result = await client.submitTxnWithTransient(
      "donors",
      "cfchannel",
      "CrowdFundChain",
      "CampaignContract",
      "donateToCampaign",
      transientData,
      donationID,
      campaignID
    );

    res.status(200).json({
      success: true,
      message: "Donation successful",
      data: JSON.parse(result),
    });
  } catch (error) {
    console.error("Error donating to campaign:", error);
    res.status(500).json({
      success: false,
      message: "Failed to donate to campaign",
      error: error.toString(),
    });
  }
});

module.exports = router;







//-------------------------------------------------------------------------------------------------

// const express = require("express");
// const router = express.Router();
// const { clientApplication } = require("./client");

// // // Route to read a campaign by campaign ID
// // router.post("/readCampaign", async (req, res) => {
// //   try {
// //     const { campaignId } = req.body;
// //     const fundraisersClient = new clientApplication();
    
// //     const campaign = await fundraisersClient.submitTxn(
// //       "fundraisers",
// //       "crowdfundchannel",
// //       "CrowdFundChain",
// //       "CampaignContract",
// //       "queryTxn",
// //       "",
// //       "getCampaign",
// //       campaignId
// //     );

// //     const data = new TextDecoder().decode(campaign);
// //     const value = JSON.parse(data);

// //     res.status(200).json({
// //       success: true,
// //       message: "Campaign data read successfully!",
// //       data: { value },
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Please check the Campaign ID!",
// //       data: { error },
// //     });
// //   }
// // });

// // Route to create a new campaign
// router.post("/createcampaign", async (req, res) => {
//   try {

//     console.log("hhjjh")
//     const { campaignId, fundraiser, description, goalAmount, startDate, endDate } = req.body;
//     const fundraisersClient = new clientApplication();

    

//     const result = await fundraisersClient.submitTxn(
//      "fundraisers",  // Role of the user (should match the MSP of Fundraisers)
//       "cfchannel",  // Channel name
//       "CrowdFundChain",  // Chaincode name (replace with your actual chaincode name)
//       "CrowdfundingContract",  // Smart contract name (this should match the contract name in the chaincode)
//       "invokeTxn",  // Transaction type
//       "",  // Empty string if no specific transaction identifier is needed
//       "createCampaign",  // The function name in the chaincode
//       campaignId,  // Campaign ID
//       fundraiser,  // Fundraiser name or ID
//       description,  // Campaign description
//       goalAmount,  // Goal amount
//       startDate,  // Start date
//       endDate // End date
//      // milestonesJSON  // Milestones in JSON format
//       // JSON.stringify(milestones)
//     );

//     res.status(201).json({
//       success: true,
//       message: "Campaign created successfully!",
//       data: { result },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to create campaign!",
//       data: { error },
//     });
//   }
// });

// // Route to get a list of campaigns
// router.get("/api/readCampaign", async (req, res) => {
//   try {
//     const fundraisersClient = new clientApplication();
    
//     // Fetch all campaigns; replace `getAllCampaigns` with the correct function if needed
//     const campaignData = await fundraisersClient.submitTxn(
//       "fundraisers",
//       "cfchannel",
//       "CrowdFundChain",
//       "CampaignContract",
//       "queryTxn",
//       "",
//       "queryAllCampaigns"
//     );

//     const data = new TextDecoder().decode(campaignData);
//     const campaigns = JSON.parse(data);

//     res.status(200).json({
//       success: true,
//       message: "Campaigns fetched successfully!",
//       data: campaigns,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch campaigns.",
//       data: { error },
//     });
//   }
// });


// // routes.js - backend
// router.post("/donateToCampaign", async (req, res) => {
//   try {
//     const { donationID, campaignID, donorID, donorName, amount, timestamp } = req.body;
//     const client = new clientApplication();

//     // Pass donation details as transient data
//     const transientData = {
//       donorID: Buffer.from(donorID),
//       donorName: Buffer.from(donorName),
//       amount: Buffer.from(amount.toString()),
//       timestamp: Buffer.from(timestamp)
//     };

//     const result = await client.submitTxnWithTransient(
//       "donors",
//       "crowdfundChannel",
//       "CrowdfundingNetwork",
//       "CampaignContract",
//       "donateToCampaign",
//       transientData,
//       donationID,
//       campaignID
//     );

//     res.status(200).json({
//       success: true,
//       message: "Donation successful",
//       data: JSON.parse(result)
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to donate to campaign",
//       error: error.toString()
//     });
//   }
// });


// module.exports = router;
