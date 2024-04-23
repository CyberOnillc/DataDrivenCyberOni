'use server'

import { verifyCaptcha } from "@/lib/externalRequests/google";
import { addToSendGrid, sendMailHtml } from "@/lib/externalRequests/sendgrid";
import { createBackgroundTemplate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { addRecord, addToMarketing, upsertRecord } from "../../lib/externalRequests/notion";
const template = `<div>
<p>Contact filled by {{firstName}} {{lastName}} </p>

<p>Details below: </p>
<p>time Line date: {{timeline}}</p>
<p>Company size: {{companySize}}</p>
<p>comapany Name: {{companyName}}</p>
<p>challenges: {{challenges}}</p>
<p>budget: {{budget}}</p>

<div style="padding: 4px;">
    requirement :
    <div style="margin-left: 20px;">
    {{requirement}}
    </div>
</div>
<p>Lead Source: {{source}}</p>
<div style="padding: 4px;">
    Contact info:
    <div style="margin-left: 10px;">
        <p>name: {{firstName}} {{lastName}}</p>
        <p>email: {{email}}</p>
        <p>phone: {{phone}}</p>
    </div>
</div>
<p>How this helps their buisness: {{reason}}</p>

<p>Special request: {{message}}</p>
</div>`


export async function submitContact(formData: FormData, token: string) {

    const { success } = await verifyCaptcha(token);
    if (success !== true) {
        redirect(`?notify=true&message=${'Captcha Error'}&notifyType=${'fail'}`);
    } else {

        const { requirementString, requirement } = createBackgroundTemplate(formData);
        // console.log(formData.get('date'));
        const data: { [key: string]: string } = {
            'date': formData.get('date') as string,
            'companyName': formData.get('companyName') as string,
            'companySize': formData.get('companySize') as string,
            'bgNone': 'None',

            'challenges': formData.get('challenges') as string,
            'budget': formData.get('budget') as string,
            'firstName': formData.get('firstName') as string,
            'lastName': formData.get('lastName') as string,
            'email': formData.get('email') as string,
            'phone': formData.get('phone') as string,
            'source': formData.get('source') as string,
            'message': formData.get('message') as string,
            'terms': 'on',
            'requirement': requirementString,
            "timeline": formData.get('timeline') as string,
            "reason": formData.get('reason') as string
        }

        await addToSendGrid({ email: data.email, firstName: data.firstName, lastName: data.lastName })
        await addToMarketing({
            "Email Address": { type: 'email', content: data.email },
            "Name": { type: 'title', content: `${data.firstName} ${data.lastName}` },
            "Message": { type: 'text', content: data.message },
            "Budget": { type: 'text', content: data.budget },
            "Current Challenges": { type: 'text', content: data.challenges },
            "Company": { type: 'text', content: data.companyName },
            "Number of Employees": { type: 'number', content: Number(data.companySize) },
            "Phone": { type: 'phone', content: data.phone },
            "Referral": { type: 'text', content: data.source },
            "Requirements": { type: 'multiSelect', content: Object.keys(requirement).map((key) => requirement[key]).filter((value) => value) },
            "Time Line": { type: 'text', content: data.timeline },
            "How_we_help": { type: 'text', content: data.reason as string }

        })
        const response = await sendMailHtml(formData.get('email') as string,
            process.env.CONTACT_EMAIL as string,
            formData.get('firstName') as string,

            `${template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || '')}`)
        // console.log(response);
        if (response === 202) return 200
        else return 400

    }

    // mutate data
    // revalidate cache
}



