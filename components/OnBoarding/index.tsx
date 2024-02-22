import { Fullscreen } from "lucide-react";
import BaseSetup from "./BaseSetup";
import Foundation from "./Foundation";
import Introduction from "./Introduction";
import FullscreenButton from "../shared/FullScreenButton";

function OnBoardingForm() {



    return (
        <div>
            <div className="fixed top-24 right-10">
                <FullscreenButton/>
            </div>
            <Introduction />
            <Foundation />
            <BaseSetup />
        </div>);
}

export default OnBoardingForm;