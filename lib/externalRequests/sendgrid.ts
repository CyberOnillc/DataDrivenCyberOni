'use server'
import sgMail, { ResponseError } from '@sendgrid/mail'
import client, { Client } from '@sendgrid/client'
import { ClientRequest } from "@sendgrid/client/src/request";
import { SendVerificationRequestParams } from "next-auth/providers/email";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

client.setApiKey(process.env.SENDGRID_API_KEY as string);


export type Lead = {
    firstName?: string;
    lastName?: string;
    email: string;
    city?: string;
}


export async function sendMagicLink({ identifier }: SendVerificationRequestParams) {

}

export async function sendMail(email: string, message: string) {
    const msg: sgMail.MailDataRequired = {
        to: email, // Change to your recipient
        from: process.env.SENDGRID_EMAIL as string, // Change to your verified sender
        subject: 'Sendgrid email',
        text: message,
    }

    let response = await sgMail.send(msg);
    return response[0].statusCode

}

export async function sendMailHtml(sender: string, email: string, subject: string, message: string) {
    const msg: sgMail.MailDataRequired = {
        to: email, // Change to your recipient
        from: process.env.SENDGRID_EMAIL as string, // Change to your verified sender
        replyTo: sender,
        subject: subject,
        html: message,
    }

    let response = await sgMail.send(msg);
    return response[0].statusCode

}

export async function contactForm(sender: string, message: string, subject: string, firstName: string, lastName: string, referral: string) {
    const msg: sgMail.MailDataRequired = {
        to: process.env.CONTACT_EMAIL as string, // Change to your recipient
        from: process.env.SENDGRID_EMAIL as string, // Change to your verified sender
        replyTo: sender,
        subject: `Question/Message from ${sender} in ${subject}`,
        html: `
          <section>
            <h1>Contact requested by ${firstName} ${lastName} </h1>
            
            <p>City: ${subject}</p>
            <div>
                <p>message: ${message}</p>
                <p>email: ${sender}</p>
                <p>Reffral: ${referral}</p>
            </div>          
          <section>
        `
    }

    let response = await sgMail.send(msg);
    return response[0].statusCode
}



export async function addToSendGrid(lead: Lead) {

    const list = await getList(process.env.SENDGRID_LIST as string);
    // console.log(list,);
    const data = {
        list_ids: [
            list.id,
        ],

        "contacts": [
            {
                "email": lead.email,
                "first_name": lead.firstName,
                "last_name": lead.lastName,
                "city": lead.city,
            }
        ]
    };

    const request: ClientRequest = {
        url: `/v3/marketing/contacts`,
        method: 'PUT',
        body: data
    }
    try {
        let response = await client.request(request);
        // console.log(response[0].body);
        return response[0].statusCode
    } catch (error) {
        const err = error as ResponseError
        console.log(err.response.body, err.cause);
        return err.code
    }


}


export async function sendPasswordEmail({ email, password, subject }: { email: string, password: string , subject:string}) {

    const msg: sgMail.MailDataRequired = {
        to: email, // Change to your recipient
        from: process.env.SENDGRID_EMAIL as string, // Change to your verified sender
        subject: subject,
        html: `
          <section>
            <h1>Welcome to Cyberoni</h1>
            
            <p>Login using the following credentials:</p>
            <div>
                <p>username: ${email}</p>
                <p>password: ${password}</p>
            </div>          
          <section>
        `
    }

    let response = await sgMail.send(msg);

    // console.log(response[0].body)
    return response[0].statusCode

}

async function getList(listName: string) {
    const queryParams = {
        "page_size": 100
    };
    const request: ClientRequest = {
        url: `/v3/marketing/lists`,
        method: 'GET',
        qs: queryParams
    }

    let response = await client.request(request);

    //console.log(response[0].body)
    for (const list of (response[0].body as { result: Array<any> }).result) {
        if (list.name === listName) return list;
    }

}


export async function sendPasswordReset(email: string, token: string, subject: string = "Cyberoni crud credentials") {
    const msg: sgMail.MailDataRequired = {
      to: email, // Change to your recipient
      from: process.env.SENDGRID_EMAIL as string, // Change to your verified sender
      subject: 'Cyberoni Password reset request',
      html: `
            <section>
              <h1>Welcome to CyberOni</h1>
              
              <p>Click on the link to reset Password:</p>
              <div>
                  <p>username: ${email}</p>
                  <a href="${process.env.NEXTAUTH_URL}/auth/reset?token=${token}">Reset Password</a>
              </div>          
            <section>
          `
    }
  
    let response = await sgMail.send(msg);
  
    // console.log(response[0].body)
    return response[0].statusCode
  
  }


  export async function updatePaymentStatus(email: string, status: boolean, listName: string,) {
    const list = await getList(listName as string);
    if (!list) return;
    const data = {
        list_ids: [
            list.id,
        ],

        "contacts": [
            {
                "email": email,
                "custom_fields": {
                    "PaymentIsActive": status ? "True" : "False",
                }
            }
        ]
    };

    const request: ClientRequest = {
        url: `/v3/marketing/contacts`,
        method: 'PUT',
        body: data
    }
    let response = await client.request(request);
    return response[0].statusCode

}