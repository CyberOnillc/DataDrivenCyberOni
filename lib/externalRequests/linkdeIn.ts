import "server-only"

type LinkedInTextContent = {
    type: 'text';
    content: string;
};

type LinkedInMediaContent = {
    type: 'media';
    media: Array<{
        description: string;
        content: Buffer ;
        title: string;
    }>;
};

type LinkedInArticleContent = {
    type: 'article';
    title: string;
    description: string;
    url: string;
};

type LinkedInPostContent = LinkedInTextContent | LinkedInMediaContent | LinkedInArticleContent;

type LinkedInPostData = {
    accessToken: string;
    author: string;
    content: LinkedInPostContent;
};

export async function postToLinkedIn({ accessToken, author, content }: LinkedInPostData): Promise<boolean> {
    const url = 'https://api.linkedin.com/v2/ugcPosts';

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
    };

    let specificContent: any;

    if (content.type === 'text') {
        specificContent = {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": content.content
                },
                "shareMediaCategory": "NONE"
            }
        };
    } else if (content.type === 'media') {

        const uploads = await Promise.all(content.media.map(async (mediaItem) => {

           let asset = await  uploadMediaToLinkedIn(accessToken, author, mediaItem.content)

            return {
                asset,
                description: mediaItem.description,
                title: mediaItem.title
            }
        }))


        specificContent = {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": "Here is some media content"
                },
                "shareMediaCategory": "IMAGE",
                "media": uploads.map((mediaItem) => ({
                    "status": "READY",
                    "description": {
                        "text": mediaItem.description
                    },
                    "media": mediaItem.asset,
                    "title": {
                        "text": mediaItem.title
                    }
                }))
            }
        };
    } else if (content.type === 'article') {
        specificContent = {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": content.description
                },
                "shareMediaCategory": "ARTICLE",
                "media": [{
                    "status": "READY",
                    "originalUrl": content.url,
                    "title": {
                        "text": content.title
                    },
                    "description": {
                        "text": content.description
                    }
                }]
            }
        };
    } else {
        console.error("Invalid content type.");
        return false;
    }

    const body = JSON.stringify({
        "author": `urn:li:person:${author}`,
        "lifecycleState": "PUBLISHED",
        "specificContent": specificContent,
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    });

    try {
        const response = await fetch(url, { method: 'POST', headers, body });
        if (!response.ok) {
            console.log("failed response: ", await response.json());
            throw new Error(`LinkedIn API responded with status ${response.status}`);
        }
        return response.status === 201;
    } catch (error) {
        console.error('Failed to post to LinkedIn:', error);
        return false;
    }
}


export async function uploadMediaToLinkedIn(accessToken: string, urn:string, mediaData: Buffer | string,): Promise<string> {
    // Headers may need to include 'Content-Type', depending on the API requirements and media type.
    // For LinkedIn, the documentation does not specify setting 'Content-Type' for the upload step,
    // so we're omitting it here. Adjust as necessary based on API behavior and media type.
    const headers = {
        'Authorization': `Bearer ${accessToken}`
        // 'Content-Type': 'image/jpeg', // Uncomment and set correctly if needed.
    };
    const {uploadUrl,asset} = await registerUpload(accessToken, urn)

    const response = await fetch(uploadUrl, {
        method: 'POST',
        headers,
        body: mediaData, // Directly use the provided mediaData as the body.
    });

    if (!response.ok) {
        throw new Error(`Failed to upload media: ${response.statusText}`);
    }

    return asset
}


export async function registerUpload(accessToken: string, urn: string) {
    const headers = {
        'Authorization': `Bearer ${accessToken}`
        // 'Content-Type': 'image/jpeg', // Uncomment and set correctly if needed.
    };
    const response = await fetch(`https://api.linkedin.com/v2/assets?action=registerUpload`, {
        method: 'POST', headers, body: JSON.stringify(

            {
                "registerUploadRequest": {
                    "recipes": [
                        "urn:li:digitalmediaRecipe:feedshare-image"
                    ],
                    "owner": `urn:li:person:${urn}`,
                    "serviceRelationships": [
                        {
                            "relationshipType": "OWNER",
                            "identifier": "urn:li:userGeneratedContent"
                        }
                    ]
                }
            }
        )
    })


    if (!response.ok) {
        throw new Error(`Failed to upload media: ${response.statusText}`);
    }
    const resJson = await response.json();
    return {
        uploadUrl:
            resJson.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl as string

        ,

        asset: resJson.value.asset as string
    }
}