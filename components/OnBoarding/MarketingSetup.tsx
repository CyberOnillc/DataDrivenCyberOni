function MarketingSetup() {
    return (<div className="container mx-auto flex h-full  flex-col px-5    ">
        <div className="text-left">
            <h1>Let’s optimize your content plan</h1>
            <h3 className="font-light">
                We are collecting your inputs to feed AI on future steps.
            </h3>
        </div>

        <form action="">
            <div className="text-left">
                <h3>What is your brand voice ?</h3>
                <h5 className="font-light">
                    How would you like your brand to sound?{" "}
                </h5>
            </div>
            <div className="w-full">
                <textarea
                    className="w-full rounded-md dark:bg-gray-700"
                    rows={3}
                    placeholder="What are your primary business objectives for the upcoming year?"
                />
            </div>

            <div className="w-full">
                <textarea
                    className="w-full rounded-md dark:bg-gray-700"
                    rows={3}
                    placeholder="How does your business differentiate itself from competitors in the market?"
                />
            </div>

            <div className="flex justify-center"><button type="submit" className="bg-blue-700 p-4 flex gap-1 text-white rounded-md">Save & go next</button></div>

        </form>
    </div>);
}

export default MarketingSetup;