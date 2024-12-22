const { clientApplication } = require('./client');

// Instantiate the client application
let userClient = new clientApplication();

// Define the campaign ID to approve
const campaignID = "Campaign-02";  // Replace with the actual campaign ID you want to approve

// Submit the transaction to approve the campaign
userClient.submitTxn(
    "authorities",          // Role of the user (ensure it matches the MSP of the Authorities)
    "cfchannel",        // Channel name
    "CrowdFundChain",       // Chaincode name (replace with your actual chaincode name)
    "CrowdfundingContract",     // Smart contract name (should match the contract name in the chaincode)
    "invokeTxn",          // Transaction type
    "",                   // Empty string if no specific transaction identifier is needed
    "approveCampaign",    // Function name in the chaincode
    campaignID            // Argument: campaign ID to approve
).then(result => {
    console.log(new TextDecoder().decode(result));
    console.log("Campaign approved successfully");
}).catch(error => {
    console.error("Failed to approve campaign:", error);
});
