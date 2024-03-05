"use client";
import { useState } from "react";
import Modal from "../shared/modal";
import { X } from "lucide-react";
interface SummaryProps {
    confirm: () => void;
    summary: string;
}
function Summary(props: SummaryProps) {
    const [show, setShow] = useState(false);

    return (
        <Modal setShowModal={setShow} showModal={show}>
            <div className="relative h-96 p-5">
                <button
                    onClick={() => setShow(false)}
                    className="absolute right-3 top-3 hover:text-red-400"
                >
                    <X />
                </button>
                <div className="p-2 border rounded-md shadow-inner">
                    {props.summary}
                </div>

                <div className="flex w-full gap-5">
                    <button className="rounded-md p-2" onClick={() => setShow(false)}>
                        Cancel
                    </button>
                    <button
                        className="rounded-md bg-purple-800 p-2 text-white"
                        onClick={() => (props.confirm(), setShow(false))}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default Summary;
