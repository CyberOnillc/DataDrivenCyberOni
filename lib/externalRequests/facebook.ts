import {
    FacebookAdsApi,
    AdAccount,
    Campaign,
    AdSet,
    AdCreative,
    Ad
  } from 'facebook-nodejs-business-sdk';
const endPoint = `https://graph.facebook.com`;
const version = "v19.0";
export async function postToFacebook({
    pageId,
    accessToken,
    post
}: {
    pageId: string;
    accessToken: string;
    post: {
        message: string;
        link?: string;
        published: boolean;
        publishTime?:   Date;
    }
}) {
    const url = `${endPoint}/${version}/${pageId}/feed?access_token=${accessToken}`;
    const postData = {
        message: post.message, // want to share
        link: post.link,
        published: post.published, // Set to false if you want the post to be unpublished
        scheduled_publish_time: post.publishTime? Math.floor(post.publishTime?.getTime() / 1000).toString() : null  // UNIX timestamp of future date
    };
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    }).then((response) => response.json());

    return res;

}

export async function getPagesList(accessToken: string) {
    const url = `${endPoint}/${version}/me/accounts?access_token=${accessToken}`;
    const res = await fetch(url).then((response) => response.json());
    const pages = res.data;
    return pages;
}

  

  interface AdSetDetails {
    name: string;
    daily_budget: string;
    billing_event: string;
    optimization_goal: string;
    bid_amount: string;
    targeting: { geo_locations: { countries: string[] } };
    status: string;
  }
  
  interface AdCreativeDetails {
    name: string;
    title: string;
    body: string;
    image_url: string;
    link_url: string;
    object_story_spec: {
      page_id: string;
      link_data?: {
        image_hash?: string;
        link?: string;
        message?: string;
      };
    };
  }
  

 export  async function createFacebookAd(
    accessToken: string,
    adAccountId: string,
    campaignName: string,
    adSetDetails: AdSetDetails,
    adCreativeDetails: AdCreativeDetails,
    pageId: string
  ): Promise<void> {
    FacebookAdsApi.init(accessToken);

    // Step 1: Create a Campaign
    const campaign = await new AdAccount(adAccountId).createCampaign(
      [],
      {
        name: campaignName,
        objective: 'LINK_CLICKS',
        status: 'PAUSED',
      }
    );
    console.log('Campaign Created:', campaign);
    const campaignId: string = campaign.id;
  
    // Include campaign ID in ad set details
  
    // Step 2: Create an Ad Set
    const adSet = await new AdAccount(adAccountId).createAdSet([], { ...adSetDetails, campaign_id: campaignId });
    console.log('Ad Set Created:', adSet);
  
    // Include page ID in the ad creative details
    adCreativeDetails.object_story_spec.page_id = pageId;
  
    // Step 3: Create an Ad Creative
    const adCreative = await new AdAccount(adAccountId).createAdCreative([], adCreativeDetails);
    console.log('Ad Creative Created:', adCreative);
  
    // Step 4: Create an Ad
    const adData = {
      name: 'My Ad',
      adset_id: adSet.id,
      creative: { 'creative_id': adCreative.id },
      status: 'PAUSED',
    };
  
    const ad = await new AdAccount(adAccountId).createAd([], adData);
    console.log('Ad Created:', ad);
  }

  