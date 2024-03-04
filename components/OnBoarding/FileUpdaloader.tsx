import { Upload } from "lucide-react";
import React, { useCallback, useState } from "react";
import Dropzone, { useDropzone } from 'react-dropzone'
const fileTypes = ["JPG", "PNG", "GIF"];

function FileUploader() {
    const onDrop = useCallback((acceptedFiles: any) => {
        console.log("dropppecting file");

        acceptedFiles.forEach((file) => {

            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
        })

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (

        <div {...getRootProps()} className="border-2 min-h-96 active:bg-gray- border-dotted border-blue-500  p-10 text-center">
            <input {...getInputProps()} />
            {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }

            {/* <label className="cursor-pointer" >

                        <div className="flex flex-col justify-center items-center">
                            <Upload />
                            <span>Select or drag and drop files</span>

                        </div>
                    </label> */}
        </div>

    );
}

export default FileUploader;