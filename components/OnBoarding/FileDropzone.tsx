import { Upload } from "lucide-react";
import React, { useCallback, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
const fileTypes = ["JPG", "PNG", "GIF"];

function FileDropzone() {
    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: Blob) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                console.log(binaryStr);
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <div {...getRootProps()}
            className={`active:bg-gray- min-h-96 border-2 border-dotted border-blue-500  p-5 text-center ${isDragActive ? 'bg-gray-500 ' : 'bg-gray-50 dark:bg-gray-700'}`}
        >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center w-fit mx-auto">
                <Upload className={`${isDragActive ? 'animate-bounce' : ''}`} />
                <p>Select files or Drag and drop</p>
            </div>
        </div>
    );
}

export default FileDropzone;
