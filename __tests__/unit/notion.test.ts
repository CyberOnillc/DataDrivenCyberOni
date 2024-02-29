/**
 * @jest-environment node
 */

import { AccountRecord, MarketingCrmRecord, SupportRecord, UniqueColumn, addRecord, deleteRecord, upsertAccount, upsertRecord, upsertSupport } from "@/lib/externalRequests/notion";
import { describe, expect, it, afterAll } from "@jest/globals";
import { PageObjectResponse, RichTextItemResponse, UpdatePageResponse } from "@notionhq/client/build/src/api-endpoints";


describe("test notion functions", () => {

    const record: MarketingCrmRecord = {
        "Email Address": { content: "email@example.com", type: "email" },
        "Budget": { type: 'text', content: "100100" },
        "Current Challenges": { type: 'text', content: 'challenges' },
        "Number of Employees": { type: 'number', content: 1000 },
        "Message": { type: 'text', content: 'message' },
        "Company": { type: 'text', content: "company" },
        "Name": { type: 'title', content: "name" },
        "Phone": { type: 'phone', content: "230-12309213" },
        "Referral": { type: 'text', content: "facebook" },
        "Requirements": { type: 'multiSelect', content: ["App Development"] },
        "Time Line": { type: 'text', content: '3 mohtnos' },
        "ReferralToken": { type: 'text', content: "jhsdalkshdlkajsdklasjd" },
        "How_we_help": { type: 'text', content: 'PRovide guidance to deploy online store' }

    }
    const marketing_crm_contacts_database_id = process.env.NOTION_DATABASE_ID!;
    const marketingUnique: UniqueColumn = { key: "Email Address", type: 'email' }
    it('should add contact to marketing', async () => {

        const resp = await addRecord(record, marketing_crm_contacts_database_id) as PageObjectResponse

        //console.log(resp.properties['How_we_help']);
        expect(resp.object).toBe('page')
        expect((resp.properties['How_we_help'] as { type: 'rich_text', rich_text: Array<RichTextItemResponse> }).rich_text[0].plain_text).toBe(record["How_we_help"]?.content)

    })

    it('should update a contact to marketing db', async () => {

        const resp = await upsertRecord(marketingUnique, {
            ...record,
            "Name": { type: 'title', content: 'New Name' }
        }, marketing_crm_contacts_database_id) as PageObjectResponse

        expect((resp.properties.Name as { type: 'title', title: Array<RichTextItemResponse> }).title[0].plain_text).toBe('New Name')
    })

    it('should add contact to marketing Using Small contact form data', async () => {

        const resp = await upsertRecord(marketingUnique, {
            "Email Address": { content: "email@example.com", type: "email" },
            "Name": { type: 'title', content: "name" },
            "Message": { content: "email@example.com", type: "text" },
            "Referral": { content: "FaceBook", type: "text" }
        }, marketing_crm_contacts_database_id) as PageObjectResponse

        expect((resp.properties.Name as { type: 'title', title: Array<RichTextItemResponse> }).title[0].plain_text).toBe(record["Name"].content)
    })

    it('should delete as  contact to marketing Using email', async () => {

        const resp = await deleteRecord(marketingUnique, record["Email Address"]?.content as string, marketing_crm_contacts_database_id)

        //console.log(resp);
        expect(resp.object).toBe('page')
    })

    it('should Create a Account  Record ', async () => {
        const record: AccountRecord = {
            "Email": {type:'email', content: 'test@example.com'},
            "Company Name": { type: "title", content: "Company Name" },
            "Website": { type: 'url', content: 'example.com' },
            "Payment_active": { type: 'checkbox', content: false }
        }
        const resp = await upsertAccount(record) as PageObjectResponse

        //console.log(resp);
        expect(resp.object).toBe('page')
        expect((resp.properties['Email'] as { type: 'email', email: string }).email).toBe(record.Email.content)

    }, 10000)
    it('should Create a Review Record ', async () => {

        const record: SupportRecord = {
            "Customer Name": {
                type: "text",
                content: "New Name"
            },
            "Contact Information": {
                type: "text",
                content: "023-1002"
            },
            Description: {
                type: "text",
                content: "test description"
            },
            Priority: {
                type: "select",
                content: "HIGH"
            },
            Status: {
                type: "select",
                content: "PENDING"
            },
        }
        const resp = await upsertSupport(record)

        //console.log(resp);
        expect(resp.object).toBe('page')
    })

})