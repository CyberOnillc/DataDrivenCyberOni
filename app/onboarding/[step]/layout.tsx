import SidePanel from "@/components/OnBoarding/SidePanel";
import { steps } from "@/data/onboardingData";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export function generateStaticParams() {
    return steps.map((step) => ({ step: step.path }));
}

export const metadata: Metadata = {
    title: "Cyberoni- Onboarding",
    description: "Onboarding process for Cyberoni Services",
};

function BlogPostLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { step: string };
}) {
    const currentStep = steps.filter((step) => params.step === step.path)[0];
    if (!currentStep) redirect("/not-found");
    return (
        <div className="flex w-full flex-col-reverse gap-2 lg:flex-row">
            <div
                className={`${currentStep.path !== "start" ? "lg:w-9/12" : "lg:w-full"
                    }`}
            >
                {children}
            </div>
            {currentStep.path !== "start" ? (
                <div className="lg:h-screen lg:w-3/12">
                    {" "}
                    <SidePanel currentStep={params.step} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default BlogPostLayout;
