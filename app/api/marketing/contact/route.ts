import { addRecord, addToMarketing } from "@/lib/externalRequests/notion";
import { addToSendGrid, contactForm, sendMail } from "@/lib/externalRequests/sendgrid"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    let { message, email, subject, name, referral } = await req.json() as { message: string, email: string, name: string, subject: string, referral: string }
    // city = json.city;
    let firstName, lastName = '';
    if (name.split(' ').length > 1) {
        firstName = name.split(' ')[0]
        lastName = name.split(' ')[1];
    } else {
        firstName = name.split(' ')[0]
    }
    await addToSendGrid({ email, firstName, lastName, city: subject })
    // console.log(email);
    await addToMarketing({
        "Email Address": { type: 'email', content: email },
        "Name": { type: 'title', content: name },
        "Message": { type: 'text', content: message },
        'Referral': { type: 'text', content: referral },
    })
    const res = await contactForm(email, message, subject, firstName, lastName, referral)
    if (res === 202) return NextResponse.json({ message: "success" }, { status: 200 })
    else return NextResponse.json({ message: "error occuer while adding:" }, { status: 500 })
}

