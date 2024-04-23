"server only"
import { Client } from '@notionhq/client';
import { CreatePageParameters, CreatePageResponse, UpdatePageParameters, UpdatePageResponse } from "@notionhq/client/build/src/api-endpoints";

const notionApiKey = process.env.NOTION_KEY;
const notion = new Client({ auth: notionApiKey });

const marketing_crm_contacts_database_id = process.env.NOTION_MARKETING_DATABASE_ID!;
const accountDBId = process.env.NOTION_ACCOUNT_DATABASE_ID!;
const supportDBId =  process.env.NOTION_SUPPORT_DATABASE_ID!;

export type NewRecordType = Record<string,
    { type: 'rich_text', rich_text: { text: { content: string }, type: 'text' }[] } |
    { type: 'email', email: string }
>

export type UniqueColumn = {
    key: string,
    type: 'email' | 'text' | 'url'
}
export type CreatePageParams = Record<string,
    { type: 'email', content: string } |
    { type: 'title', content: string } |
    { type: 'phone', content: string } |
    { type: 'multiSelect', content: string[] } |
    { type: 'select', content: string } |
    { type: 'url', content: string } |
    { type: 'text', content: string } |
    { type: 'number', content: number } |
    { type: 'checkbox', content: boolean }
    | undefined
>
interface NotionProperty {
    [key: string]: any; // Additional properties can vary, so we use an index signature
}


export interface MarketingCrmRecord extends CreatePageParams {
    "Name": { type: 'title', content: string },
    "Company"?: { type: 'text', content: string },
    "Number of Employees"?: { type: 'number', content: number },
    "Requirements"?: { type: 'multiSelect', content: string[] },
    "Time Line"?: { type: 'text', content: string },
    "Budget"?: { type: 'text', content: string },
    "Phone"?: { type: 'phone', content: string },
    "Referral"?: { type: 'text', content: string },
    "Current Challenges"?: { type: 'text', content: string },
    "Message"?: { type: 'text', content: string },
    "ReferralToken"?: { type: 'text', content: string }
    "How_we_help"?: { type: 'text', content: string }


}

export interface AccountRecord extends CreatePageParams {
    "Email": { type: 'email', content: string },
    "Company Name"?: { type: 'title', content: string },
    "Website"?: { type: 'url', content: string },
    'Phone'?: { type: 'phone', content: string },
    "Payment_active": { type: 'checkbox', content: boolean }
}

export interface SupportRecord extends CreatePageParams {
    "Customer Name": { type: 'text', content: string },
    "Contact Information": { type: 'text', content: string },
    "Feedback Category"?: { type: 'select', content: 'Product' | 'Service' | 'Support' },
    "Feedback Channel"?: { type: 'text', content: string },
    "Description": { type: 'text', content: string },
    "Priority": { type: 'select', content: 'HIGH' | 'MEDIUM' | 'LOW' },
    "Status": { type: 'select', content: 'PENDING' | 'RESOLVED' | 'IN PROGRESS' }
    "Customer Follow-Up"?: { type: 'text', content: string }
}



export async function getRecord(unique: UniqueColumn, identifier: string, databaseId: string) {
    const response = await notion.databases.query({
        database_id: databaseId as string,
        filter: unique.type === 'email' ? {
            property: unique.key,
            email: {
                equals: identifier
            }
        } : unique.type === 'url' ? {
            property: unique.key,
            url: {
                equals: identifier
            }

        } : {
            property: unique.key,
            rich_text: { equals: identifier }
        },
    });
    return response.results.length > 0 ? response.results[0] : null;
}

export async function updateRecord(id: string, record: CreatePageParams) {
    if (!id) {
        throw new Error(`Record with email ${record.email} not found.`);
    }
    const properties = convertToNotionProperties(record)
    const response = await notion.pages.update({
        page_id: id,
        properties
    } as UpdatePageParameters);

    return response;
}

export async function addRecord(record: CreatePageParams, databaseId: string): Promise<CreatePageResponse> {
    const properties = convertToNotionProperties(record)
    const response = await notion.pages.create({
        parent: {
            database_id: databaseId as string,
        },
        properties,
    } as CreatePageParameters)
    // console.log("repsonse", respJson);
    return response;
}

export async function upsertRecord(unique: UniqueColumn, record: CreatePageParams, databaseId: string): Promise<CreatePageResponse | UpdatePageResponse> {
    const existingRecord = await getRecord(unique, record[unique.key as string]?.content as string, databaseId);

    if (existingRecord) {
        // If the record exists, update it
        return updateRecord(existingRecord.id, record);
    } else {
        // If the record doesn't exist, create a new one
        return addRecord(record, databaseId);
    }

}
export async function deleteRecord(unique: UniqueColumn, email: string, databaseId: string) {
    const existingRecord = await getRecord(unique, email, databaseId);

    if (!existingRecord) {
        throw new Error(`Record with email ${email} not found.`);
    }

    // Archive the existing record (simulate delete)
    const response = await notion.pages.update({
        page_id: existingRecord.id,
        archived: true,
    });

    return response;
}

export async function getDatabase({
    databaseId,
}: {
    databaseId: string;
}): Promise<any> {
    const response = await notion.databases.retrieve({ database_id: databaseId })
    return response
}



// Function to convert a normal record to Notion properties
function convertToNotionProperties(record: CreatePageParams): NotionProperty {
    const property: NotionProperty = {}
    for (const key in record) {
        if (record[key] && record.hasOwnProperty(key)) {
            // Determine the type of property based on the value
            let notionRecord: any = record[key]?.content;

            // Create the Notion property object
            if (record[key]?.type === 'email') {
                notionRecord = { email: record[key]?.content }
            } else if (record[key]?.type === 'phone') {
                notionRecord = { phone_number: record[key]?.content }

            } else if (record[key]?.type === 'title') {
                notionRecord = { title: [{ text: { content: record[key]?.content } }] }
            }
            else if (record[key]?.type === 'number') {
                notionRecord = { number: Number(record[key]?.content) }

            }
            else if (record[key]?.type === 'text') {
                notionRecord = {
                    rich_text: [{ text: { content: record[key]?.content } }]

                }
            }
            else if (record[key]?.type === 'url') {
                notionRecord = { url: record[key]?.content }
            }
            else if (record[key]?.type === 'checkbox') {
                notionRecord = { checkbox: record[key]?.content as boolean }
            }
            else if (record[key]?.type === 'multiSelect') {
                notionRecord = { multi_select: (record[key]?.content as string[]).map(select => ({ name: select })) }
            }
            else if (record[key]?.type === 'select') {
                notionRecord = { select: { name: record[key]?.content } }
            }


            property[key] = notionRecord

            // Add the property to the properties array
        }
    }


    return property;
}


export async function addToMarketing(record: MarketingCrmRecord) {
    const newRecord = await upsertRecord({ key: 'Email Address', type: 'email' }, record, marketing_crm_contacts_database_id);
    return newRecord
}


export async function upsertAccount(record: AccountRecord) {
    const newRecord = await upsertRecord({ key: 'Email', type: 'email' }, record, accountDBId);
    return newRecord
}


export async function upsertSupport(record: SupportRecord) {
    const newRecord = await upsertRecord({ key: 'Contact Information', type: 'text' }, record, supportDBId);
    return newRecord
}
