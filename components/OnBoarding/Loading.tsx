'use client'
import { useState } from "react";
import ProgressBar from "../shared/ProgressBar";

function BuilderLoading() {

    const [progress, setProgress] = useState(65);
    return (

        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="text-center">
                <h1>Please wait we are building your dream app ...</h1>
                <p>Set tight and let Ai handle building your front end</p>
            </div>
            <div className="w-96">
                <ProgressBar progress={progress} />
            </div>
        </div>);
}

export default BuilderLoading;