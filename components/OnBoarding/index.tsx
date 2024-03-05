import { Fullscreen } from "lucide-react";
import BaseSetup from "./BaseSetup";
import Foundation from "./Foundation";
import Introduction from "./Introduction";
import FullscreenButton from "../shared/FullScreenButton";
import AppBuilder from "./AppBuilder";
import ContentSetup from "./ContentSetup";
import MarketingSetup from "./MarketingSetup";
import BuilderLoading from "./Loading";

function OnBoardingForm({ step }: { step: number }) {
  const forms = [
    <Introduction key={1} />,
    <Foundation key={2} />,
    <BaseSetup key={3} />,
    <AppBuilder key={4} />,
    <ContentSetup key={5}/>,
    <MarketingSetup key={6} />,
    <BuilderLoading key={7}/>
  ];

  return (
    <div className="relative h-full bg-onboarding-intro-bg lg:bg-[length:300px_450px]  bg-left bg-no-repeat bg-contain">
      <div className="absolute right-10 top-10">
        <FullscreenButton />
      </div>
      <div className="h-full pt-5 s">
        {forms[step]}
      </div>
    </div>
  );
}

export default OnBoardingForm;
