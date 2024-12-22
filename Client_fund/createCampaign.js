const { clientApplication } = require('./client');

let userClient = new clientApplication();

// Define the necessary variables
const campaignId = "Campaign-02";          // Unique identifier for the campaign
const fundraiser = "Fundraiser-01";        // Identifier for the fundraiser
const description = "Help us build a community center"; // Campaign description
const goalAmount = "5000.00";              // Goal amount as a string
const startDate = "2024-10-15";            // Campaign start date in YYYY-MM-DD format
const endDate = "2024-12-31";              // Campaign end date in YYYY-MM-DD format

// Define milestones as JSON (this could be an array of milestone descriptions, amounts, or dates)
// const milestonesJSON = JSON.stringify([
//     { description: "Phase 1: Foundation", targetAmount: "1000.00" },
//     { description: "Phase 2: Walls", targetAmount: "1500.00" },
//     { description: "Phase 3: Roofing", targetAmount: "2500.00" }
// ]);

userClient.submitTxn(
    "fundraisers",  // Role of the user (should match the MSP of Fundraisers)
    "cfchannel",  // Channel name
    "CrowdFundChain",  // Chaincode name (replace with your actual chaincode name)
    "CrowdfundingContract",  // Smart contract name (this should match the contract name in the chaincode)
    "invokeTxn",  // Transaction type
    "",  // Empty string if no specific transaction identifier is needed
    "createCampaign",  // The function name in the chaincode
    campaignId,  // Campaign ID
    fundraiser,  // Fundraiser name or ID
    description,  // Campaign description
    goalAmount,  // Goal amount
    startDate,  // Start date
    endDate  // End date
    //milestonesJSON  // Milestones in JSON format
    
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Campaign created")
})