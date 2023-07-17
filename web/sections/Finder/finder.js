// https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/
'use client'
import Dropzone from '@/components/Dropzone/Dropzone';
import PredictionFrame from '@/components/PredictionFrame/PredictionFrame';
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
    <div className="bg-white py-24" id='finder'>
      <div data-aos="fade-down" className="flex flex-col gap-6 items-center w-8/12 m-auto">
        <h1 className="text-black text-5xl">Dobble<b>Finder</b></h1>
        <p className="text-black text-2xl">
          Upload a photo of yourself where your face is clearly visible and we will find out your doppelgänger among more than 10,000 works collected from the Prado museum and 8678 faces.
        </p>

        <Dropzone fileHandler={predict} />

        {prediction &&
          <PredictionFrame
            data={{
              face_path: prediction.face_image_id,
              picture_path: prediction.full_image_id,
              title: prediction.title,
              author: prediction.author,
              width: prediction.width,
              height: prediction.height,
            }}
          />

        }


      </div>
    </div>
  )
}