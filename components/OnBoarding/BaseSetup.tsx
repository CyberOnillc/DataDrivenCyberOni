'use client'

import { useRouter } from "next/navigation";
import FileUploader from "./FileUpdaloader";


function BaseSetup() {
    const router = useRouter();
    async function submit() {
        router.push('/onboarding/builder')

    }
    return (

        <div className="flex flex-col container mx-auto  min-h-screen px-5">
            <div className="text-left">
                <h1>Base Setup</h1>
                <h3 className="font-light">Add your assets directly by logging into your Facebook account.</h3>
            </div>

            <form action={submit} className="flex flex-col gap-3">

                <div className="w-full">
                    <select className="w-full">
                        <option value="">Choose Hosting tier</option>
                    </select>

                </div>


                <div>
                    <h2 className="font-semibold">Upload Assets Crutial For building your website</h2>
                    <p>Add your assets directly by logging into your Facebook account.</p>
                </div>

                <div className="flex justify-center"><button type="submit" className="bg-sky-600 p-4 flex gap-1 text-white">Save & go next</button></div>

                <div className="relative w-full bg-gray-50 dark:bg-gray-700">
                    <FileUploader />
                </div>
            </form>

        </div>
    );
}
export default BaseSetup;