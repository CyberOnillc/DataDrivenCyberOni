'use client'
import { useEffect, useState } from "react";
import Modal from "./modal";
import { X, XCircle } from "lucide-react";

function ErrorModal({ message, show }: { message: string, show: boolean }) {

    const [showError, setShowError] = useState(show);


    useEffect(() => {
        if (showError === false) window.location.reload()
    }, [showError]);
    return (

        <Modal showModal={showError} setShowModal={setShowError}  >

            <div className="relative bg-gray-100 dark:bg-gray-700 text-center p-9 w-fit rounded-xl mx-auto ">
                <button onClick={() => setShowError(false)} className="absolute top-1 right-1 hover:text-red-400">
                    <X />
                </button>
                <div className="flex flex-col gap-5 justify-center items-center text-red-400">
                    <XCircle />
                    {message}
                </div>
            </div>

        </Modal>);
}

export default ErrorModal;
