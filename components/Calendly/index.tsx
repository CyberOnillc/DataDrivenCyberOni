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
    className || "rounded-full bg-white py-3 px-6 hover:shadow-md dark:bg-black text-lg";

  useEffect(() => {
    setRootElement(root.current);
  }, []);

  return (
    <div ref={root} id="__next">
      {root.current && <PopupButton
        LoadingSpinner={() => <LoadingDots />}
        url="https://calendly.com/cyberoni/quick-zoom-meeting"
        rootElement={rootElement as HTMLElement}
        text={CTAText}
        className={buttonClass}
      />}
    </div>
  );
};

export default CalendlyPopup;
