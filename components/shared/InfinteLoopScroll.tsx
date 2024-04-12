'use client'

import React, { ReactNode, useRef } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
function InfiniteScrollLoop({
    surroundingBackup = 4,
    baseVelocity = 100,
    children
}: {
    surroundingBackup: number;
    baseVelocity: number;
    children: ReactNode[];
}): JSX.Element {


    return (
        <AliceCarousel autoPlay autoPlayInterval={16} responsive={{ 0: { items: 4, itemsFit: 'contain' } }} infinite mouseTracking items={children} disableButtonsControls disableDotsControls />
    );
}

export default InfiniteScrollLoop