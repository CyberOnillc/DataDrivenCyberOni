"use client";

import ColorPicker from "react-pick-color";
import Modal from "./modal";
import { Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    color: string;
    onChange: (colorInHex: string) => void;
}
function ColorPickerModal(props: Props) {
    return (
        <Modal setShowModal={props.setShow} showModal={props.show}>
            <div className="container w-fit p-6 relative mx-auto bg-gray-50 dark:bg-slate-800 rounded-md">
                <div className="absolute right-1 top-1 hover:text-red-400">
                    <button type="button" onClick={() => props.setShow(false)}>
                        <X />
                    </button>
                </div>
                <ColorPicker
                    className="bg-gray-50 dark:bg-slate-80"
                    color={props.color}
                    onChange={(color) => props.onChange(color.hex.toUpperCase())}
                ></ColorPicker>
            </div>
        </Modal>
    );
}

export default ColorPickerModal;
