/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

// Helper function to determine collection name based on organization------------------------------------------
async function getCollectionName(ctx, collection) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID === 'DonorsMSP') {
        return collection;
    }
    throw new Error(`No valid collection for MSP ${mspID}`);
}

class CrowdfundingContract extends Contract {

    // Check if the campaign exists---------------------------------------------------
    async campaignExists(ctx, campaignId) {
        const campaignData = await ctx.stub.getState(campaignId);
        return campaignData && campaignData.length > 0;
    }

    // // Create a new crowdfunding campaign-------------------------------------------------------------

    // Create a new crowdfunding campaign-------------------------------------------------------------
async createCampaign(ctx, campaignId, fundraiser, description, goalAmount, startDate, endDate) {
    const mspID = ctx.clientIdentity.getMSPID();

    if (mspID === 'FundraisersMSP') {
        const campaignExists = await this.campaignExists(ctx, campaignId);
        if (campaignExists) {
            throw new Error(`The campaign ${campaignId} already exists`);
        }

        const campaign = {
            assetType: 'campaign', // For distinguishing campaign assets
            campaignId,
            fundraiser,
            description,
            goalAmount: parseFloat(goalAmount),
            raisedAmount: 0,
            startDate,
            endDate,
            status: 'Open',
            isApproved: false
        };

        await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));

        const campaignEvent = { Type: 'Campaign Creation', ID: campaignId, Fundraiser: fundraiser };
        await ctx.stub.setEvent('CampaignCreated', Buffer.from(JSON.stringify(campaignEvent)));

        return JSON.stringify(campaign);
    } else {
        return `User under the following MSP: ${mspID} cannot perform this action`;
    }
}


    //----------------------------------------------------------------------------------------------------------------

 
    //-----------------------------------------------------------------------------------------------------------

    // Approve a campaign
    async approveCampaign(ctx, campaignId) {
        const campaignAsBytes = await ctx.stub.getState(campaignId);
        if (!campaignAsBytes || campaignAsBytes.length === 0) {
            throw new Error(`Campaign ${campaignId} does not exist`);
        }

        const campaign = JSON.parse(campaignAsBytes.toString());
        campaign.isApproved = true;

        await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));
        return JSON.stringify(campaign);
    }

    // Donate to a campaign with Private Data Collection
    async donateToCampaign(ctx, donationID, campaignId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'DonorsMSP') {
            throw new Error(`Organization with MSP ID ${mspID} is not authorized to donate.`);
        }

        const campaignAsBytes = await ctx.stub.getState(campaignId);
        if (!campaignAsBytes || campaignAsBytes.length === 0) {
            throw new Error(`Campaign ${campaignId} does not exist`);
        }

        const campaign = JSON.parse(campaignAsBytes.toString());

        if (!campaign.isApproved || campaign.status !== 'Open') {
            throw new Error(`Campaign ${campaignId} is not approved or not open for donations`);
        }

        const transientData = ctx.stub.getTransient();
        if (!transientData.has('donorID') || !transientData.has('donorName') || !transientData.has('amount') || !transientData.has('timestamp')) {
            throw new Error('The expected keys "donorID", "donorName", "amount", or "timestamp" were not provided in transient data.');
        }

        const donation = {
            donationID,
            donorID: transientData.get('donorID').toString("utf8"),
            donorName: transientData.get('donorName').toString("utf8"),
            campaignId,
            amount: parseFloat(transientData.get('amount').toString("utf8")),
            timestamp: transientData.get('timestamp').toString("utf8")
        };

        campaign.raisedAmount += donation.amount;

        if (campaign.raisedAmount >= campaign.goalAmount) {
            campaign.status = 'Closed';
        }

        await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));

        const collectionName = await getCollectionName(ctx, 'CrowdfundCollection');

        await ctx.stub.putPrivateData(collectionName, donationID, Buffer.from(JSON.stringify(donation)));

        return JSON.stringify(donation);
    }

    // Function to retrieve donor details from the private data collection
    async getDonorDetails(ctx, donationID) {
        const collectionName = "CrowdfundCollection";
        const donorDetailsAsBytes = await ctx.stub.getPrivateData(collectionName, donationID);

        if (!donorDetailsAsBytes || donorDetailsAsBytes.length === 0) {
            throw new Error(`Donor details for donation ID ${donationID} do not exist in private data collection`);
        }

        const donorDetails = JSON.parse(donorDetailsAsBytes.toString());
        return JSON.stringify(donorDetails);
    }

    //--------------------------------------------------------------------------------------------

    // Release funds to the fundraiser if a milestone is met

    // Release funds to the fundraiser if the campaign is successful
    async releaseFunds(ctx, campaignId) {
        // Fetch the campaign details
        const campaignAsBytes = await ctx.stub.getState(campaignId);
        if (!campaignAsBytes || campaignAsBytes.length === 0) {
            throw new Error(`Campaign ${campaignId} does not exist`);
        }

        const campaign = JSON.parse(campaignAsBytes.toString());

        // Ensure the campaign is closed and its goal has been met
        if (campaign.status !== 'Closed' || campaign.raisedAmount < campaign.goalAmount) {
            throw new Error(`Funds cannot be released. Campaign ${campaignId} is either not closed or has not met its goal.`);
        }

        // Add a flag or message to indicate that the funds have been released
        if (campaign.fundsReleased) {
            throw new Error(`Funds for campaign ${campaignId} have already been released.`);
        }

        campaign.fundsReleased = true;

        // Update the campaign state on the ledger
        await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));

        return `Funds for campaign ${campaignId} have been successfully released to the fundraiser: ${campaign.fundraiser}`;
    }




    //--------------------------------------------------------------------------------------------------


    // async releaseFunds(ctx, campaignId, milestoneIndex) {
    //     const campaignAsBytes = await ctx.stub.getState(campaignId);
    //     if (!campaignAsBytes || campaignAsBytes.length === 0) {
    //         throw new Error(`Campaign ${campaignId} does not exist`);
    //     }

    //     const campaign = JSON.parse(campaignAsBytes.toString());

    //     if (milestoneIndex >= campaign.milestones.length || campaign.milestoneStatus[milestoneIndex]) {
    //         throw new Error(`Invalid milestone index or milestone already released`);
    //     }

    //     campaign.milestoneStatus[milestoneIndex] = true;

    //     await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));
    //     return JSON.stringify(campaign);
    // }

    //-----------------------------------------------------------------------------------------------------------

    // Get campaign details
    async getCampaign(ctx, campaignId) {
        const campaignAsBytes = await ctx.stub.getState(campaignId);
        if (!campaignAsBytes || campaignAsBytes.length === 0) {
            throw new Error(`Campaign ${campaignId} does not exist`);
        }

        return campaignAsBytes.toString();
    }

    // Refund donation if campaign fails
    async refundDonation(ctx, donationID) {
        const donationAsBytes = await ctx.stub.getState(donationID);
        if (!donationAsBytes || donationAsBytes.length === 0) {
            throw new Error(`Donation ${donationID} does not exist`);
        }

        const donation = JSON.parse(donationAsBytes.toString());
        const campaignAsBytes = await ctx.stub.getState(donation.campaignId);
        if (!campaignAsBytes || campaignAsBytes.length === 0) {
            throw new Error(`Campaign ${donation.campaignId} does not exist`);
        }

        const campaign = JSON.parse(campaignAsBytes.toString());

        if (campaign.status !== 'Failed') {
            throw new Error(`Campaign ${donation.campaignId} is not in failed state`);
        }

        await ctx.stub.deleteState(donationID);
        return JSON.stringify(donation);
    }

    // Query all campaigns

    // Query all campaigns
    async queryAllCampaigns(ctx) {
        const queryString = {
            selector: {
                assetType: 'campaign'
            }
        };

        const resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const result = await this._getAllResults(resultIterator);
        return JSON.stringify(result);
    }




    //-----------------------------------------------------------------


   

    // Get donation details
    async getDonationDetails(ctx, campaignId, donorID) {
        const collectionName = 'CrowdfundCollection';
        const queryString = {
            selector: {
                campaignId: campaignId,
                donorID: donorID
            }
        };

        const resultIterator = await ctx.stub.getPrivateDataQueryResult(collectionName, JSON.stringify(queryString));
        const result = await this._getAllResults(resultIterator);

        if (result.length === 0) {
            throw new Error(`No donation records found for donor ${donorID} in campaign ${campaignId}`);
        }

        return JSON.stringify(result);
    }

    // Helper function to fetch all results from the iterator
    async _getAllResults(iterator) {
        const allResults = [];
        let res = { done: false, value: null };

        while (!res.done) {
            res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                const record = JSON.parse(res.value.value.toString('utf8'));
                allResults.push(record);
            }
        }
        await iterator.close();
        return allResults;
    }
}

module.exports = CrowdfundingContract;


//---------------------------------------------------------------------------


 // async queryAllCampaigns(ctx) {
    //     const queryString = {
    //         selector: {
    //             assetType: 'campaign'
    //         }
    //     };
    //     const collectionName = 'CrowdfundCollection';
    //     const resultIterator = await ctx.stub.getPrivateDataQueryResult(collectionName, JSON.stringify(queryString));
    //     const result = await this._getAllResults(resultIterator);
    //     return JSON.stringify(result);
    // }

//------------------------------------------------------------------------------------------

   // async createCampaign(ctx, campaignId, fundraiser, description, goalAmount, startDate, endDate, milestonesJSON) {
    //     const mspID = ctx.clientIdentity.getMSPID();

    //     if (mspID === 'FundraisersMSP') {
    //         const campaignExists = await this.campaignExists(ctx, campaignId);
    //         if (campaignExists) {
    //             throw new Error(`The campaign ${campaignId} already exists`);
    //         }

    //         const milestones = JSON.parse(milestonesJSON);

    //         const campaign = {
    //             assetType: 'campaign', // For distinguishing campaign assets
    //             campaignId,
    //             fundraiser,
    //             description,
    //             goalAmount: parseFloat(goalAmount),
    //             raisedAmount: 0,
    //             startDate,
    //             endDate,
    //             status: 'Open',
    //             isApproved: false
    //         };

    //         await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));

    //         const campaignEvent = { Type: 'Campaign Creation', ID: campaignId, Fundraiser: fundraiser };
    //         await ctx.stub.setEvent('CampaignCreated', Buffer.from(JSON.stringify(campaignEvent)));

    //         return JSON.stringify(campaign);
    //     } else {
    //         return `User under the following MSP: ${mspID} cannot perform this action`;
    //     }
    // }



//--------------------------------------------------------------------------------------------------------------------------

/*
 * SPDX-License-Identifier: Apache-2.0
 */

// 'use strict';

// const { Contract }  = require('fabric-contract-api');

//  // Helper function to determine collection name based on organization------------------------------------------
//  async function getCollectionName(ctx, collection) {
//     const mspID = ctx.clientIdentity.getMSPID();
//     if (mspID === 'DonorsMSP') {
//         return collection;
//     }
//     throw new Error(`No valid collection for MSP ${mspID}`);
// }

// class CrowdfundingContract extends Contract {

//       // Check if the campaign exists---------------------------------------------------
//       async campaignExists(ctx, campaignId) {
//         const campaignData = await ctx.stub.getState(campaignId);
//         return campaignData && campaignData.length > 0;
//       }

//     // Create a new crowdfunding campaign-------------------------------------------------------------

//     async createCampaign(ctx, campaignId, fundraiser, description, goalAmount, startDate, endDate, milestonesJSON) {
//         // Get the MSP ID of the client identity
//         const mspID = ctx.clientIdentity.getMSPID();
    
//         // Only allow fundraisers to create a campaign
//         if (mspID === 'FundraisersMSP') {
//             // Check if the campaign already exists
//             const campaignExists = await this.campaignExists(ctx, campaignId);
//             if (campaignExists) {
//                 throw new Error(`The campaign ${campaignId} already exists`);
//             }
    
//             const milestones = JSON.parse(milestonesJSON);
    
//             // Define campaign details
//             const campaign = {
//                 campaignId,
//                 fundraiser,
//                 description,
//                 goalAmount: parseFloat(goalAmount),
//                 raisedAmount: 0,
//                 startDate,
//                 endDate,
//                 milestones,
//                 milestoneStatus: Array(milestones.length).fill(false),
//                 status: 'Open', // "Open", "Closed", "Failed"
//                 isApproved: false
//             };
    
//             // Store the campaign in the ledger
//             await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));
    
//             // Emit an event for the campaign creation
//             const campaignEvent = { Type: 'Campaign Creation', ID: campaignId, Fundraiser: fundraiser };
//             await ctx.stub.setEvent('CampaignCreated', Buffer.from(JSON.stringify(campaignEvent)));
    
//             return JSON.stringify(campaign);
//         } else {
//             return `User under the following MSP: ${mspID} cannot perform this action`;
//         }
//     }
    
//     // Approve a campaign
//     async approveCampaign(ctx, campaignId) {
//         const campaignAsBytes = await ctx.stub.getState(campaignId);
//         if (!campaignAsBytes || campaignAsBytes.length === 0) {
//             throw new Error(`Campaign ${campaignId} does not exist`);
//         }

//         const campaign = JSON.parse(campaignAsBytes.toString());
//         campaign.isApproved = true;

//         await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));
//         return JSON.stringify(campaign);
//     }

//     // Donate to a campaign--------------------------------------------------------------------------

//     // Donate to a campaign with Private Data Collection
//     async donateToCampaign(ctx, donationID, campaignId) {
//         // Get the MSP ID of the invoking client
//         const mspID = ctx.clientIdentity.getMSPID();
//         if (mspID !== 'DonorsMSP') {
//             throw new Error(`Organization with MSP ID ${mspID} is not authorized to donate.`);
//         }

//         // Fetch the campaign from the ledger
//         const campaignAsBytes = await ctx.stub.getState(campaignId);
//         if (!campaignAsBytes || campaignAsBytes.length === 0) {
//             throw new Error(`Campaign ${campaignId} does not exist`);
//         }

//         const campaign = JSON.parse(campaignAsBytes.toString());

//         // Check campaign status
//         if (!campaign.isApproved || campaign.status !== 'Open') {
//             throw new Error(`Campaign ${campaignId} is not approved or not open for donations`);
//         }

//         // Retrieve transient data for donation details
//         const transientData = ctx.stub.getTransient();
//         if (!transientData.has('donorID') || !transientData.has('donorName') || !transientData.has('amount') || !transientData.has('timestamp')) {
//             throw new Error('The expected keys "donorID", "donorName", "amount", or "timestamp" were not provided in transient data.');
//         }

//         // Build donation object from transient data
//         const donation = {
//             donationID,
//             donorID: transientData.get('donorID').toString(),
//             donorName: transientData.get('donorName').toString(),
//             campaignId,
//             amount: parseFloat(transientData.get('amount').toString()),
//             timestamp: transientData.get('timestamp').toString()
//         };

//         // Update the campaign's raised amount
//         campaign.raisedAmount += donation.amount;

//         // Close the campaign if the goal is met
//         if (campaign.raisedAmount >= campaign.goalAmount) {
//             campaign.status = 'Closed';
//         }

//         // Save the updated campaign to the ledger
//         await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));

//          // Determine the private collection name
//         const collectionName = await getCollectionName(ctx, 'CrowdfundCollection');

//         // Save the donation record to the specified private data collection
//         await ctx.stub.putPrivateData("CrowdfundCollection", donationID, Buffer.from(JSON.stringify(donation)));

//         return JSON.stringify(donation);
//     }




//     //---------------------------------------donateToCampaign-------------------------------------------------------

//     // Donate to a campaign with Private Data Collection
//     // async donateToCampaign(ctx, donationID, campaignId) {
//     //     // Get the MSP ID of the invoking client
//     //     const mspID = ctx.clientIdentity.getMSPID();
//     //     if (mspID !== 'DonorsMSP') {
//     //         throw new Error(`Organization with MSP ID ${mspID} is not authorized to donate.`);
//     //     }

//     //     // Fetch the campaign from the ledger
//     //     const campaignAsBytes = await ctx.stub.getState(campaignId);
//     //     if (!campaignAsBytes || campaignAsBytes.length === 0) {
//     //         throw new Error(`Campaign ${campaignId} does not exist`);
//     //     }

//     //     const campaign = JSON.parse(campaignAsBytes.toString());

//     //     // Check campaign status
//     //     if (!campaign.isApproved || campaign.status !== 'Open') {
//     //         throw new Error(`Campaign ${campaignId} is not approved or not open for donations`);
//     //     }

//     //     // Retrieve transient data for donation details
//     //     const transientData = ctx.stub.getTransient();
//     //     if (!transientData.has('donorID') || !transientData.has('amount') || !transientData.has('timestamp')) {
//     //         throw new Error('The expected keys "donorID", "amount", or "timestamp" were not provided in transient data.');
//     //     }

//     //     // Build donation object from transient data
//     //     const donation = {
//     //         donationID,
//     //         donorID: transientData.get('donorID').toString(),
//     //         campaignId,
//     //         amount: parseFloat(transientData.get('amount').toString()),
//     //         timestamp: transientData.get('timestamp').toString()
//     //     };

//     //     // Update the campaign's raised amount
//     //     campaign.raisedAmount += donation.amount;

//     //     // Close the campaign if the goal is met
//     //     if (campaign.raisedAmount >= campaign.goalAmount) {
//     //         campaign.status = 'Closed';
//     //     }

//     //     // Save the updated campaign to the ledger
//     //     await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));

//     //     // Determine the private collection name
//     //     const collectionName = await getCollectionName(ctx, 'DonorPrivateDetails');

//     //     // Save the donation record to the private data collection
//     //     await ctx.stub.putPrivateData(collectionName, donationID, Buffer.from(JSON.stringify(donation)));

//     //     return JSON.stringify(donation);
//     // }

   




//     //------------------------------------------------donateToCampaign--------------------------------------------------------------------------
//     // async donateToCampaign(ctx, donationID, donorID, campaignId, amount, timestamp) {
//     //     const campaignAsBytes = await ctx.stub.getState(campaignId);
//     //     if (!campaignAsBytes || campaignAsBytes.length === 0) {
//     //         throw new Error(`Campaign ${campaignId} does not exist`);
//     //     }

//     //     const campaign = JSON.parse(campaignAsBytes.toString());

//     //     if (!campaign.isApproved || campaign.status !== 'Open') {
//     //         throw new Error(`Campaign ${campaignId} is not approved or not open for donations`);
//     //     }

//     //     const donation = {
//     //         donationID,
//     //         donorID,
//     //         campaignId,
//     //         amount: parseFloat(amount),
//     //         timestamp
//     //     };

//     //     // Add the donation amount to the campaign's raised amount
//     //     campaign.raisedAmount += donation.amount;

//     //     // Close the campaign if the goal is met
//     //     if (campaign.raisedAmount >= campaign.goalAmount) {
//     //         campaign.status = 'Closed';
//     //     }

//     //     // Save updated campaign and donation records to the ledger
//     //     await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));
//     //     await ctx.stub.putState(donationID, Buffer.from(JSON.stringify(donation)));
        
//     //     return JSON.stringify(donation);
//     // }

//     //--------------------------------------------------------------------------------------------------------------

//     // Function to retrieve donor details from the private data collection
//     async getDonorDetails(ctx, donationID) {
//         // Define the private collection name
//         const collectionName = "CrowdfundCollection";

//         // Retrieve the donation data from the private collection
//         const donorDetailsAsBytes = await ctx.stub.getPrivateData(collectionName, donationID);
        
//         if (!donorDetailsAsBytes || donorDetailsAsBytes.length === 0) {
//             throw new Error(`Donor details for donation ID ${donationID} do not exist in private data collection`);
//         }

//         // Parse the donor details and return as a JSON string
//         const donorDetails = JSON.parse(donorDetailsAsBytes.toString());
//         return JSON.stringify(donorDetails);
//     }

//     // Release funds to the fundraiser if a milestone is met---------------------------------------------------------
//     async releaseFunds(ctx, campaignId, milestoneIndex) {
//         const campaignAsBytes = await ctx.stub.getState(campaignId);
//         if (!campaignAsBytes || campaignAsBytes.length === 0) {
//             throw new Error(`Campaign ${campaignId} does not exist`);
//         }

//         const campaign = JSON.parse(campaignAsBytes.toString());

//         // Check if the milestone index is valid and if the milestone is already released
//         if (milestoneIndex >= campaign.milestones.length || campaign.milestoneStatus[milestoneIndex]) {
//             throw new Error(`Invalid milestone index or milestone already released`);
//         }

//         // Mark the milestone as completed
//         campaign.milestoneStatus[milestoneIndex] = true;

//         await ctx.stub.putState(campaignId, Buffer.from(JSON.stringify(campaign)));
//         return JSON.stringify(campaign);
//     }

//     // Get campaign details
//     async getCampaign(ctx, campaignId) {
//         const campaignAsBytes = await ctx.stub.getState(campaignId);
//         if (!campaignAsBytes || campaignAsBytes.length === 0) {
//             throw new Error(`Campaign ${campaignId} does not exist`);
//         }

//         return campaignAsBytes.toString();
//     }

//     // Refund donation if campaign fails-----------------------------------------------------------------
//     async refundDonation(ctx, donationID) {
//         const donationAsBytes = await ctx.stub.getState(donationID);
//         if (!donationAsBytes || donationAsBytes.length === 0) {
//             throw new Error(`Donation ${donationID} does not exist`);
//         }

//         const donation = JSON.parse(donationAsBytes.toString());

//         const campaignAsBytes = await ctx.stub.getState(donation.campaignId);
//         if (!campaignAsBytes || campaignAsBytes.length === 0) {
//             throw new Error(`Campaign ${donation.campaignId} does not exist`);
//         }

//         const campaign = JSON.parse(campaignAsBytes.toString());

//         // Check if the campaign has failed
//         if (campaign.status !== 'Failed') {
//             throw new Error(`Campaign ${donation.campaignId} is not in failed state`);
//         }

//         // Refund the donation (In a real system, integrate with payment gateway for actual refund)
//         await ctx.stub.deleteState(donationID);
        
//         return JSON.stringify(donation);
//     }

//     // queryAllCampaigns---------------------------------------------------------

//     async queryAllCampaigns(ctx) {
//         const queryString = {
//             selector: {
//                 assetType: 'campaign'
//             }
//         };
//         const collectionName = 'CrowdfundCollection'; // Make sure this matches your setup
//         const resultIterator = await ctx.stub.getPrivateDataQueryResult(collectionName, JSON.stringify(queryString));
//         const result = await this._getAllResults(resultIterator);
//         return JSON.stringify(result);
//     }
    
//     //------------------------------------------------------------------------------------------
//     // async queryAllCampaigns(ctx) {
//     //     const queryString = {
//     //         selector: {
//     //             assetType: 'campaign'
//     //         }
//     //     };
    
//     //     // Execute the query against the public ledger
//     //     const resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    
//     //     // Fetch all results from the iterator
//     //     const result = await this._getAllResults(resultIterator);
    
//     //     return JSON.stringify(result);
//     // }
    
//     // getDonationDetails-----------------------------------------------------------------------------------
//     async getDonationDetails(ctx, campaignId, donorID) {
//         const collectionName = 'CrowdfundCollection'; // Adjust if needed to match your collection setup
    
//         // Define the query string to find the donation by campaignId and donorID
//         const queryString = {
//             selector: {
//                 campaignId: campaignId,
//                 donorID: donorID
//             }
//         };
    
//         // Execute the query against the private collection
//         const resultIterator = await ctx.stub.getPrivateDataQueryResult(collectionName, JSON.stringify(queryString));
    
//         // Fetch the results
//         const result = await this._getAllResults(resultIterator);
    
//         if (result.length === 0) {
//             throw new Error(`No donation records found for donor ${donorID} in campaign ${campaignId}`);
//         }
    
//         return JSON.stringify(result);
//     }
    
//     // Helper function to fetch all results from the iterator
//     async _getAllResults(iterator) {
//         const allResults = [];
//         let res = { done: false, value: null };
    
//         while (!res.done) {
//             res = await iterator.next();
    
//             if (res && res.value) {
//                 const record = res.value.value.toString('utf8');
//                 allResults.push(JSON.parse(record));
//             }
//         }
    
//         iterator.close();
//         return allResults;
//     }
    
// }

// module.exports = CrowdfundingContract;
