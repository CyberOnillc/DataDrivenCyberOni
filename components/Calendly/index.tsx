'use client'
import React, { useEffect, useState, ReactNode, useRef } from "react";
import { PopupButton } from "react-calendly";
import { LoadingDots } from "../shared/icons";

interface CalendlyPopupProps {
  CTAText: string;
  className?: string;
}

const CalendlyPopup: React.FC<CalendlyPopupProps> = ({
  CTAText,
  className,
}) => {
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  const root = useRef<HTMLDivElement>(null)


  const buttonClass =
    className || "rounded-full bg-white p-3 hover:shadow-md dark:bg-black";

  return (
    <div ref={root} className="App">
      <PopupButton
        LoadingSpinner={() => <LoadingDots />}
        url="https://calendly.com/cyberoni/quick-zoom-meeting"
        rootElement={root.current as HTMLElement}
        text={CTAText}
        className={buttonClass}
      />
    </div>
  );
};

export default CalendlyPopup;
