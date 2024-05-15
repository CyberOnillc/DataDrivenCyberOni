"use client";

import Lottie from "react-lottie";
import animationData from "@/public/lotties/hero-animation.json";
import { useMemo, useState } from "react";
import useWindowSize from "@/lib/hooks/use-window-size";

function HeroAnimation() {
    const { isDesktop, isMobile } = useWindowSize();

    const size = useMemo(
        () =>{
            // console.log(isDesktop , 'hero animation');
            return  isDesktop ? { width: 410, height: 410 }: isMobile ? { width: 300, height: 300 } : { width: 410, height: 410 } 
                               
        },
        [isDesktop, isMobile],
    );

    return (
        <>
            <div className={`relative   lg:w-[410px] lg:h-[410px]  w-full h-[300px]`} >
                <Lottie
                    
                    options={{
                        animationData: animationData,
                        rendererSettings: {
                            progressiveLoad: true,
                        }
                    }}
                    height={size.height}
                    width={size.width}
                />
             
            </div>
        </>
    );
}

export default HeroAnimation;
