'use client';
import Button from "@/components/button";

// https://codesandbox.io/s/nextjs-simple-upload-file-to-server-thyb0?file=/pages/index.js
export default function Finder() {

    return (
        <div className="flex flex-col bg-white items-center py-16">
            <div className="text-black text-5xl">
                <h1>Find <b>yourself</b></h1>
            </div>
            <div className="flex flex-row gap-4 bg-black text-white px-32 py-16"
                onClick={async () => {
                    console.log("Clicked");
                    const result = await fetch('/api/test');
                    result.json().then((data) => {
                        console.log(data);
                    });
                }}
            >
                Find Me
            </div>
            <div className="text-black text-5xl">
                <h1>Find <b>yourself</b></h1>
            </div>
        </div>
    )
}