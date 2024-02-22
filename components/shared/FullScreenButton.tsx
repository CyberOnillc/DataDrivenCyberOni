'use client'
import { Expand, Shrink } from "lucide-react";
import React, { useState, useEffect } from 'react';
const FullscreenButton = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const requestFullscreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    };
    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };
    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange);
        };
    }, []);
    return (
        <button onClick={isFullscreen ? exitFullscreen : requestFullscreen}>
            {isFullscreen ? <Shrink /> : <Expand />}
        </button>
    );
};
export default FullscreenButton;