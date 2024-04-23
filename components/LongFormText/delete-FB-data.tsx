// DataDeletionInstructions.tsx
import React from "react";

const DataDeletionInstructions: React.FC = () => {
    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="mb-4 text-2xl font-bold text-center">
                Data Deletion Instructions
            </h1>

            <p>
                CyberShopTech does not store your personal data; it is used only for
                login. According to the Facebook Platform rules, we have to provide User
                Data Deletion Callback URL or Data Deletion Instructions URL. If you
                want to delete your activities for CyberShopTech, follow these
                instructions:
            </p>

            <ol className="list-decimal mt-4 ml-6">
                <li>
                    Go to Your Facebook Account’s Setting & Privacy. Click ” Setting “.
                </li>
                <li>
                    Then, go to ” Apps and Websites” and you will see all of your Apps
                    activities.
                </li>
                <li>Select the option box for CyberShopTech/CyberOniLLC</li>
                <li>Click ” Remove” button.</li>
            </ol>
        </div>
    );
};

export default DataDeletionInstructions;
