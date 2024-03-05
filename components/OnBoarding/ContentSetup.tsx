'use client'
import { useState } from "react";

function ContentSetup() {
    const options = ["Optimistic", "Ideal", "Passive", "Engagement", "Metrics", "Conversions", "Traffic"];

    const [selected, setSelected] = useState<number[]>([]);

    function updateSelected(index: number) {
        const isSelected = selected.includes(index);

        // If selected, remove it from the selected array
        if (isSelected) {
            setSelected(selected.filter((item) => item !== index));
        }
        // If not selected, add it to the selected array
        else {
            setSelected([...selected, index]);
        }
    }
    return (
        <div className="container mx-auto flex h-full  flex-col px-5    ">
            <div className="text-left">
                <h1>Let’s optimize your content plan</h1>
                <h3 className="font-light">
                    We are collecting your inputs to feed AI on future steps.
                </h3>
            </div>

            <form action="">
                <div className="flex flex-wrap">
                    {options.map((option, index) => (

                        <div key={index} className="p-3 w-1/4 cursor-pointer" onClick={() => updateSelected(index)}>
                            <div className={`p-5 ${selected.includes(index) ? 'bg-emerald-400 text-white' : 'bg-gray-200 dark:bg-gray-500'}  rounded-lg text-center py-10`}>{option}</div>
                        </div>))}
                </div>
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
                        placeholder="What is your target audience and key characteristics?"
                    />
                </div>

                <div className="w-full">
                    <textarea
                        className="w-full rounded-md dark:bg-gray-700"
                        rows={3}
                        placeholder="What key messages do you want to convey through your website's content?"
                    />
                </div>
                <div className="w-full">
                    <textarea
                        className="w-full rounded-md dark:bg-gray-700"
                        rows={3}
                        placeholder="What specific marketing goals do you want to achieve?"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="flex gap-1 rounded-md bg-blue-700 p-4 text-white"
                    >
                        Save & go next
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContentSetup;
