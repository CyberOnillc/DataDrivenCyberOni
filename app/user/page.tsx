'use client'
import { Facebook, LinkedinIcon } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import { useEffect } from "react";

function UserPage() {

    const session = getSession()

    const faceBookParams = new URLSearchParams()

    faceBookParams.set('scope', 'email,public_profile,pages_manage_posts,pages_show_list,pages_read_engagement')
    useEffect(() => {
        async function fetchSessions() {
            const sessions = await getSession();

            console.log(session);
        }

        fetchSessions()
    }, []);
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <button className="flex-1 hover:shadow-sm rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 flex gap-2" onClick={() => signIn('linkedin')}>Link Linkedin in account <LinkedinIcon /></button>
            <button className="flex-1 hover:shadow-sm rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 flex gap-2" onClick={() => signIn('facebook', {

            }, faceBookParams.toString())}>Link Facebook <Facebook /></button>
        </div>
    );
}

export default UserPage;


