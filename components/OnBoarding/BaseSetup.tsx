function BaseSetup() {
    return (

        <div className="flex flex-col container mx-auto bg-onboarding-intro-bg lg:bg-[length:300px_450px]  bg-left bg-no-repeat bg-contain min-h-screen px-5">
            <div className="text-left">
                <h1>Base Setup</h1>
                <h3 className="font-light">Add your assets directly by logging into your Facebook account.</h3>
            </div>

            <form action="" className="flex flex-col gap-3">

                <div className="w-full">
                    <select className="w-full">
                        <option value="">Choose Hosting tier</option>
                    </select>

                </div>

                <div className="flex justify-center"><button type="submit" className="bg-sky-600 p-4 flex gap-1 text-white">Save & go next</button></div>

            </form>
        </div>
    );
}
export default BaseSetup;