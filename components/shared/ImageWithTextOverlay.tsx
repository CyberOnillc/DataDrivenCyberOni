'use client'
import Image from "next/image";
import Modal from "./modal";
import { ReactNode, useState } from "react";
import { X } from "lucide-react";

type props = {
    title: string;
    modal?: ReactNode
    image: string;
    width: number;
    height: number;
}

function ImageWithTextOverlay({ title, modal, image, width, height }: props) {
    const [openModal, setOpenModal] = useState(false);
    return (

        <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image className="z-0 w-full h-full object-cover" src={image} alt="text-overlay" width={width} height={height}></Image>
            <div className="absolute top-0 left-0 z-10  bg-gradient-to-b from-black/0 via-black/20 to-black/80 h-full w-full flex flex-col justify-end items-center text-center align-baseline text-ellipsis line-clamp-3 text-gray-50">
                <p className="line-clamp-3">{title}</p>
                {modal ? <button className="hover:text-blue-500 z-10 py-5"
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpenModal(true)
                    }}>read more</button> : <></>}
            </div>
            {modal && <Modal setShowModal={setOpenModal} showModal={openModal} >
                <div className="relative container mx-auto bg-gray-50 rounded-xl dark:bg-gray-800 p-2">
                    <button onClick={() => setOpenModal(false)} className="absolute top-3 right-3 hover:text-red-300"><X></X></button>
                    {modal}
                </div>
            </Modal>}
        </div>


    );
}


export default ImageWithTextOverlay;