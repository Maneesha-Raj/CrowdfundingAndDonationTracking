const { clientApplication } = require("./client");

// Define organizations to query
const organizations = ["fundraisers", "donors", "authorities", "bank"];
const userClient = new clientApplication();

async function queryAllCampaignsForAllOrgs() {
    for (const org of organizations) {
        try {
            const resultBytes = await userClient.submitTxn(
                org,                           // Dynamic organization
                "cfchannel",                   // Channel name
                "CrowdFundChain",              // Chaincode name
                "CrowdfundingContract",        // Contract name
                "queryTxn",                    // Transaction type for query
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
}

queryAllCampaignsForAllOrgs();




//----------------------Worked code-----------------------------------------


// const { clientApplication } = require('./client');

// let userClient = new clientApplication();
// userClient.submitTxn(
//     "donors",                     // Identity to use for transaction
//     "cfchannel",                 // Channel name
//     "CrowdFundChain",            // Chaincode name
//     "CrowdfundingContract",      // Contract name
//     "queryTxn",                  // Transaction type (in case you're using a custom query or invoke setup)
//     "",                          // Arguments (empty if none are needed, or provide appropriate arguments)
//     "queryAllCampaigns"          // Function name in chaincode
// ).then(result => {
//     // Decode the Uint8Array to a string
//     const decodedString = new TextDecoder().decode(result);
    
//     // Parse the string as JSON
//     const jsonObject = JSON.parse(decodedString);
    
//     console.log("All Campaigns:");
//     console.log(jsonObject);
// }).catch(error => {
//     console.error("Error querying all campaigns:", error);
// });


//----------------------------------------------------------------------------------------


// const { clientApplication } = require('./client');

// // Instantiate the client application
// let userClient = new clientApplication();

// // Submit the transaction
// userClient.submitTxn(
//     "campaignUser", // The identity (user) making the request
//     "cfchannel",    // The channel name
//     "CrowdFundChain",  // The chaincode name
//     "CrowdfundingContract", // The contract name within the chaincode
//     "queryTxn",  // Query type, assuming `queryTxn` initiates a query
//     "",          // Any additional settings for the query, leave blank if unnecessary
//     "queryAllCampaigns" // The function name to invoke within the contract
// )
// .then(result => {
//     // Decode the Uint8Array to a string
//     const decodedString = new TextDecoder().decode(result);

//     // Parse the string as JSON
//     const jsonObject = JSON.parse(decodedString);
    
//     console.log("All Campaigns:");
//     // Log the JSON object
//     console.log(jsonObject);
// })
// .catch(error => {
//     console.error("Error querying campaigns:", error);
// });

