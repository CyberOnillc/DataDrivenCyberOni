'use client'
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

function LabelInput(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { label: string, }) {
    return (

        <div className="relative my-4">
            <input
                className="peer shadow-lg appearance-none border
                 dark:border-gray-200 rounded-xl w-full py-4 px-4 
                 bg-transparent text-gray-700 dark:text-gray-100
                 leading-tight focus:outline-none focus:shadow-outline  
                 invalid:text-red-400 invalid:border-red-400 invalid:outline-red-400"
                {...props}
                placeholder=""
            />
            <label className="block absolute top-0 left-3 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-y-3 peer-focus:text-blue-500 peer-placeholder-shown:bg-white/50  backdrop-blur-sm peer-placeholder-shown:dark:bg-slate-900  dark:bg-slate-900 dark:backdrop-blur-sm px-1 text-gray-500 dark:text-gray-50  transition-all   text-sm font-bold mb-2 rounded-full">
                {props.label}
            </label>
        </div>);
}

export default LabelInput;