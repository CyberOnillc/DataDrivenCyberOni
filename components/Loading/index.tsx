import React from 'react'
import LoadingAnimation from "../shared/icons/loading-animation"

function Loading() {
    return (
        <div className="grid h-screen place-content-center text-gray-900 dark:text-gray-100  bg-white dark:bg-slate-950 px-4 font-nunito">
            <div className="mx-auto sm:w-96 sm:h-64">
                <LoadingAnimation />
            </div>
        </div>

    )
}

export default Loading