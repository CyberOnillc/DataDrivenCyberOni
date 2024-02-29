import OnBoardingForm from "@/components/OnBoarding";
import { steps } from "@/data/onboardingData";


function OnboardingPage({ params }: { params: { step: string } }) {

    return (

        <OnBoardingForm step={steps.findIndex((step) => step.path === params.step)} />

    );
}

export default OnboardingPage;