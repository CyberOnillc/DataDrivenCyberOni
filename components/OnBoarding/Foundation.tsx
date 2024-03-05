'use client'
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import FilePicker from "./FilePicker";

function Foundation() {
    const router = useRouter();
    async function submit() {
        router.push('/onboarding/base')

    }
    return (
        <div className="flex flex-col container mx-auto  min-h-screen px-5">
            <div className="text-left">
                <h1>Lets Build The Foundation</h1>
                <h3 className="font-light">Add your assets directly by logging into your Facebook account.</h3>


                <form action={submit}>
                    <div className="flex flex-col gap-3">
                        <div className="w-full">
                            <h2 className="text-xl">What is the main service you require?</h2>
                            <h3 className="font-light text-xl">If a specific service is selected, then display related sub-service options.</h3>
                        </div>
                        <div className="w-full">
                            <select className="w-full dark:bg-gray-700">
                                <option value="">Service Select</option>
                            </select>

                        </div>
                        <div>
                            <select className="w-full dark:bg-gray-700">
                                <option value="">Sub-Service Select</option>
                            </select>

                        </div>
                        <div className="w-full">
                            <select className="w-full dark:bg-gray-700">
                                <option value="">What design styles do you prefer?</option>
                            </select>
                        </div>

                        <div className="w-full"><textarea className="rounded-md w-full dark:bg-gray-700" rows={5} placeholder="What functionalities are essential for your software?" /></div>


                    </div>

                    <div>
                        <p>Examples of software you like</p>
                        <div className="flex gap-3">
                            <FilePicker type={'video'} />
                            <FilePicker type={'image'} maxFiles={10} />
                            <FilePicker type={'file'} />
                            <FilePicker type={'file'} />
                        </div>

                        <div className="w-full"><textarea className="rounded-md w-full dark:bg-gray-700" rows={5} placeholder="What did you like about these examples?" /></div>
                    </div>
                    <div className="flex justify-center"><button type="submit" className="bg-blue-700 p-4 flex gap-1 text-white rounded-md">Save & go next</button></div>

                </form>
            </div>
        </div>);
}

export default Foundation;