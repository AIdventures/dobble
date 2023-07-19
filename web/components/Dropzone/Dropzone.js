// https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/
'use client'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify';


export default function Dropzone({ fileHandler, imageSetter }) {

    const [file, setFile] = useState();

    const process_file = useCallback(async () => {
        if (!file) return

        try {
            const data = new FormData()
            data.set('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })

            // handle the error
            if (!res.ok) {
                // get the error message
                const error = await res.json()
                toast.error(error.msg);
                return
            }

            const file_data = await res.json()
            fileHandler(file_data.filename)

        } catch (error) {
            // Handle errors here
            console.error(error)
        }
    }, [file, fileHandler])

    useEffect(() => {
        if (!file) return
        imageSetter(URL.createObjectURL(file))
        process_file()
    }, [file, imageSetter, process_file])

    return (
        <form className="flex flex-row gap-4 text-white w-full h-64">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-lg text-gray-500"><span className="font-semibold">Click to upload</span> {/*or drag and drop*/}</p>
                    <p className="text-sm text-gray-500">PNG, JPG or JPEG (MAX. 10Mb)</p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
            </label>
        </form>
    )
}