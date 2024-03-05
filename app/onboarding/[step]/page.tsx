import OnBoardingForm from "@/components/OnBoarding";
import { steps } from "@/data/onboardingData";


function OnboardingPage({ params }: { params: { step: string } }) {

    return (

        <OnBoardingForm step={params.step == 'building' ? 6 : steps.findIndex((step) => step.path === params.step)} />

    );
}

export default OnboardingPage;