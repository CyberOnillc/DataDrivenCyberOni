import { MoveRight } from "lucide-react";

function Foundation() {
    return (
        <div className="flex flex-col container mx-auto bg-onboarding-intro-bg lg:bg-[length:300px_450px]  bg-left bg-no-repeat bg-contain min-h-screen px-5">
            <div className="text-left">
                <h1>Lets Build The Foundation</h1>
                <h3 className="font-light">Add your assets directly by logging into your Facebook account.</h3>


                <form action="">
                    <div className="flex flex-col gap-3">
                        <div className="w-full">
                            <h2 className="text-xl">What is the main service you require?</h2>
                            <h3 className="font-light text-xl">If a specific service is selected, then display related sub-service options.</h3>
                        </div>
                        <div className="w-full">
                            <select className="w-full">
                                <option value="">Service Select</option>
                            </select>

                        </div>
                        <div>
                            <select className="w-full">
                                <option value="">Sub-Service Select</option>
                            </select>

                        </div>
                        <div className="w-full">
                            <select className="w-full">
                                <option value="">What design styles do you prefer?</option>
                            </select>
                        </div>

                        <div className="w-full"><textarea className="rounded-md w-full" rows={5} placeholder="What functionalities are essential for your software?" /></div>


                    </div>
                    <div className="flex justify-center"><button type="submit" className="bg-sky-600 p-4 flex gap-1 text-white">Save & go next</button></div>

                </form>
            </div>
        </div>);
}

export default Foundation;