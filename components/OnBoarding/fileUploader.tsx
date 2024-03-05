'use client'
import { FileCheck, FileSearch } from "lucide-react";
import { useCallback, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useNotify } from "../Notification";

const VideoMimeTypes = {
    'video/*': ['.mkv', '.mp4', '.avi']
}
const ImageMimeTypes = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif']
}

const DocumentMimeType = {
    'application/octet-stream': ['.pdf', '.docx',],
    'text/*': ['.txt', '.md', '.html']
}
interface FileUploaderProps {
    type: "file" | "video" | "image";
    maxFiles?: number | 1 ;
}
function FileUploader({ type, maxFiles }: FileUploaderProps) {
    const notify = useNotify()
    const [loaded, setLoaded] = useState(false);
    const onDrop = useCallback((acceptedFiles: any) => {
        console.log("selected");
        let file = acceptedFiles[0]
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;
            console.log(binaryStr);
            setLoaded(true)
        };
        reader.readAsArrayBuffer(file);

    }, []);

    function onError(error: Error) {
        console.log(error);
        notify(error.message, 'fail')

    }
    function onDropRejected(files: FileRejection[], event: DropEvent) {
        console.log(files[0].errors);
        notify(files[0].errors[0].message, 'fail')
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onError,
        onDropRejected,
        accept: type === 'video' ? VideoMimeTypes : type === 'file' ? DocumentMimeType : {},
        noDrag: true,
        maxFiles: maxFiles || 1
    });
    return (
        <div
            {...getRootProps()}
            className={`w-fit border-2 my-1   bg-gray-50 text-center dark:bg-gray-700 rounded cursor-pointer`}
        >
            <input {...getInputProps()} />

            <div className="flex w-fit items-center justify-center gap-2 px-1">
                <div className="flex items-center justify-center ">
                    {loaded? <FileCheck  className="text-green-300"/> :<FileSearch className="text-gray-500 dark:text-gray-300" />}
                    <span className="">Browse</span>
                </div>
                <p className="m-0 border-l-2 px-1 py-1">{type}</p>
            </div>
        </div>
    );
}

export default FileUploader;
