import { ReactNode } from "react";

export type StepCardProps = {
    icon: string | ReactNode,
    content: string
}

import Link from 'next/link';

function HowItWorks({ steps }: { steps: StepCardProps[] }) {
    return (
        <div className="container mx-auto px-5 lg:px-10 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold">How it works</h2>
            <div>Explain how it works brief</div>
            <div className="flex flex-col lg:flex-row space-x-4 my-5">
                {steps.map((step, index) => (
                    <StepCard key={index} icon={step.icon} content={step.content} />
                ))}
            </div>
            <Link href="/contact">
                <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full my-10">
                    Get Started
                </a>
            </Link>
        </div>
    );
}


function StepCard({ icon, content }: StepCardProps) {
    return (<div className="flex flex-col items-center ">
        {icon}
        <p>{content}</p>
    </div>)

}
export default HowItWorks;