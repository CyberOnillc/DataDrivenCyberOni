'use client'
import React, { useState } from 'react'
import Modal from "../shared/modal";
import { X } from "lucide-react";

function VideoModal({ text, videoUrl }: { text: string, videoUrl: string }) {

    const [show, setShow] = useState(false);
    return (

        <div>
            <button onClick={() => setShow(prev => !prev)}>
                {text}
            </button>
            <Modal setShowModal={setShow} showModal={show}>
                <div className="relative container mx-auto bg-gray-100 dark:bg-gray-800 p-6 flex w-fit justify-center items-center">
                    <button onClick={() => setShow(prev => !prev)} className="absolute top-1 right-1 text-red-500"><X /></button>
                    <iframe width="560" height="315" 
                    className="rounded-xl "
                    src={videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>

                    </iframe>
                </div>
            </Modal>
        </div>
    )
}

export default VideoModal