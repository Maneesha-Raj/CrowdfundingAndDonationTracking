
const { clientApplication } = require('./client');

let userClient = new clientApplication();

const org = ["donors", "authorities"];

// Transient data for PDC (Private Data Collection)
const transientData = {
    donorID: Buffer.from("Donor123"),           // Example donor ID
    donorName: Buffer.from("John Doe"),         // Example donor name
    amount: Buffer.from("100"),                 // Example donation amount
    timestamp: Buffer.from(new Date().toISOString()) // Current timestamp
};

userClient
    .submitTxn(
        "donors",                  // Organization
        "cfchannel",               // Channel name
        "CrowdFundChain",          // Chaincode name
        "CrowdfundingContract",    // Contract name
        "privateTxn",              // Transaction type (use "privateTxn" for private data)              
        //  ["Donation-002", "Campaign-02"], // Args: Donation ID and Campaign ID
        "donateToCampaign", // Transaction name (function in chaincode)
        transientData,        // Transient data for private data  
        "Donation-003", "Campaign-02", // Arguments: Donation ID and Campaign ID 
         { 
            transientData,          // Properly formatted transient data
             endorsingOrganizations: ["DonorsMSP", "AuthoritiesMSP"] // Endorsing organizations
         }

    )
    .then((result) => {
        console.log("Transaction successful!");
        console.log(new TextDecoder().decode(result));
    })
    .catch((error) => {
        console.error("Failed to submit donation transaction:", error);
    });







//-------------------------------------------------------------------------------------------


// const { clientApplication } = require('./client');

// let userClient = new clientApplication();

// const org = ["donors", "authorities"];

// // Transient data for PDC (Private Data Collection)
// const transientData = {
//     donorID: Buffer.from("Donor123"),           // Example donor ID
//     donorName: Buffer.from("John Doe"),         // Example donor name
//     amount: Buffer.from("100"),                 // Example donation amount
//     timestamp: Buffer.from(new Date().toISOString()) // Current timestamp
// };

// // Submit the transaction
// userClient
//     .submitTxn(
//         "donors",                  // User's role (Donors)
//         "cfchannel",               // Channel name
//         "CrowdFundChain",          // Chaincode name
//         "CrowdfundingContract",    // Smart contract name
//         "donateToCampaign"   // Function name in the chaincode       
//         ["Donation-001", "Campaign-02"], // Args: Donation ID and Campaign ID
//         { 
//             transientData,          // Properly formatted transient data
//             endorsingOrganizations: ["DonorsMSP", "AuthoritiesMSP"] // Endorsing organizations
//         }
        
//     )
//     .then((result) => {
//         console.log("Transaction successful!");
//         console.log(new TextDecoder().decode(result));
//     })
//     .catch((error) => {
//         console.error("Failed to submit donation transaction:", error);
//     });









//------------------------------------------------------------------------------------------------------


// const { clientApplication } = require('./client');

// let userClient = new clientApplication();

// const org = [ "donors", "authorities"];

// // Transient data for PDC (Private Data Collection)
// const transientData = {
//     donorID: Buffer.from("Donor123"),           // Example donor ID (ensure it's a Buffer)
//     donorName: Buffer.from("John Doe"),         // Example donor name (ensure it's a Buffer)
//     amount: Buffer.from("100"),                 // Example donation amount as a string (ensure it's a Buffer)
//     timestamp: Buffer.from(new Date().toISOString()) // Current timestamp (ensure it's a Buffer)
// };

// userClient.submitTxn(
//     "donors",           // Role of the user (matches the MSP of Donors)
//     "cfchannel",        // Channel name
//     "CrowdFundChain",   // Chaincode name
//     "CrowdfundingContract", // Smart contract name
//     "privateTxn", 
//     transientData,      // Correct transient data for private data collection
//     "donateToCampaign", // Function name in the chaincode
//     "Donation-001",    // Donation ID (replace with actual ID)
//     "Campaign-02",      // Campaign ID (replace with actual ID)
//     {
//         endorsingOrganizations: ["DonorsMSP", "AuthoritiesMSP"]  // Replace with actual orgs from policy
//     }
// ).then(result => {
//     console.log(new TextDecoder().decode(result));
//     console.log("Donation successfully submitted");
// }).catch(error => {
//     console.error("Failed to submit donation transaction:", error);
// });






//---------------------------------------------------------------------------------------

// const { clientApplication } = require('./client');

// let userClient = new clientApplication();

// // Transient data for PDC (Private Data Collection)
// const transientData = {
//     donorID: Buffer.from("Donor123"),           // Example donor ID (ensure it's a Buffer)
//     donorName: Buffer.from("John Doe"),         // Example donor name (ensure it's a Buffer)
//     amount: Buffer.from("100"),                 // Example donation amount as a string (ensure it's a Buffer)
//     timestamp: Buffer.from(new Date().toISOString()) // Current timestamp (ensure it's a Buffer)
// };


// // Invoke the donateToCampaign transaction with transient data
// userClient.submitTxn(
//     "donors",           // Role of the user (should match the MSP of Donors)
//     "cfchannel",        // Channel name
//     "CrowdFundChain",   // Chaincode name
//     "CrowdfundingContract", // Smart contract name
//     "privateTxn", 
//        // Transaction type (for invoking the smart contract)
//     transientData,      // Correct transient data for private data collection
//     "donateToCampaign", // Function name in the chaincode
//     "Donation-001",    // Donation ID (replace with actual ID)
//     "Campaign-02"       // Campaign ID (replace with actual ID)
// ).then(result => {
//     // Decode the result to string (assuming the result is a buffer)
//     console.log(new TextDecoder().decode(result));
//     console.log("Donation successfully submitted");Next
// }).catch(error => {
//     console.error("Failed to submit donation transaction:", error);
// });








//------------------------------------------------------------------------------------------------------------

// const { clientApplication } = require('./client');

// let userClient = new clientApplication();
// userClient.submitTxn(
//     "donors",           // Role of the user (should match the MSP of Donors)
//     "cfchannel",     // Channel name
//     "CrowdFundChain",    // Chaincode name (replace with your actual chaincode name)
//     "CrowdfundingContract",  // Smart contract name (should match the contract name in the chaincode)
//     "invokeTxn",       // Transaction type
//     "",                // Empty string if no specific transaction identifier is needed
//     "donateToCampaign", // Function name in the chaincode
//     donationID,        // Donation ID
//     campaignID         // Campaign ID
// ).then(result => {
//     console.log(new TextDecoder().decode(result));
//     console.log("Donation successfully submitted");
// }).catch(error => {
//     console.error("Failed to submit donation transaction:", error);
// });