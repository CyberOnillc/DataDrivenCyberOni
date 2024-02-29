
import { notifyQuery } from "@/components/Notification/server";
import ReviewForm from "@/components/ReviewForm";
import { authOptions } from "@/lib/nextAuthAdapter";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ReviewPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        const searchParams = new URLSearchParams();
        searchParams.set('callbackUrl', '/review')

        redirect(`/auth/signin?${searchParams.toString()}&${notifyQuery({ type: 'fail', message: 'Please login To add review', option: { autoClose: true } }).toString()}`)
    }

    return (

        <div className="container mx-auto max-w-md ">
            <ReviewForm category={'Support'} contact={session.user.email as string} name={session.user.name as string} />
        </div>
    );
}

export default ReviewPage;