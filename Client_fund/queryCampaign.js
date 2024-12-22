
const { clientApplication } = require('./client')

const organizations = ["fundraisers", "donors", "authorities", "bank"];
const userClient = new clientApplication();
const campaignId = "Campaign-02";

async function queryCampaign() {
    for (const org of organizations) {
        try {
            const resultBytes = await userClient.submitTxn(
                org,                     // Identity to use for transaction
                "cfchannel",                 // Channel name
                "CrowdFundChain",            // Chaincode name
                "CrowdfundingContract",      // Contract name
                "queryTxn",                  // Transaction type (in case you're using a custom query or invoke setup)
                "", 
                "getCampaign",
                campaignId
            );
            const decodedString = new TextDecoder().decode(resultBytes);
            const jsonObject = JSON.parse(decodedString);

            console.log(` Campaign for ${org}:`);
            console.log(jsonObject);
        } catch (error) {
            console.error(`Error querying campaign for ${org}:`, error);
        }
    }
}

queryCampaign();


//------------------------------------------------------------------------------------------------------------

// const { clientApplication } = require('./client');

// let userClient = new clientApplication();
// userClient.submitTxn(
//     "authorities",                     // Identity to use for transaction
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
