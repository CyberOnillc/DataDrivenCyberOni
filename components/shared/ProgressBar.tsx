import React from 'react';

const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div className="relative h-3 w-full bg-gray-200 rounded overflow-hidden">
            {/* Gray background */}
            <div className="absolute top-0 left-0 h-full w-full bg-gray-300"></div>
            {/* Green progress */}
            <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: `${progress}%` }}></div>
            {/* Progress text */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-700">
            </div>
        </div>
    );
};

export default ProgressBar;
