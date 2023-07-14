// https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/
'use client'
import Dropzone from '@/components/Dropzone/Dropzone';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export default function Finder() {

  const [prediction, setPrediction] = useState(null);

  const predict = useCallback(async (filename) => {
    try {
      setPrediction(null);
      const res = await fetch(`/api/predict?filename=${filename}`);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ? data.error : "Oops! Something went wrong.");
        return
      }
      console.log(data);
      setPrediction(data);
    } catch (error) {
      toast.error("Oops! Something went wrong.");
    }
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="flex flex-col gap-6 items-center w-8/12 m-auto">
        <h1 className="text-black text-5xl">Dobble<b>Finder</b></h1>
        <p className="text-black text-2xl">
          Upload a photo of yourself where your face is clearly visible and we will find out your doppelgänger among more than 10,000 works collected from the Prado museum and 8678 faces.
        </p>

        <Dropzone fileHandler={predict} />

        {prediction &&
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-black text-3xl">Your doppelgänger is...</h2>
            <div className="flex flex-col gap-4 items-center">
              <Image
                src={`/prado/images/${prediction.id}`}
                alt={`${prediction.title} doppelgänger`}
                width={300}
                height={300}
              />
              <h3 className="text-black text-2xl">{prediction.title}</h3>
              {/*<p className="text-black text-xl">{prediction.description}</p>*/}
            </div>
          </div>
        }
      </div>
    </div>
  )
}