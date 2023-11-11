// https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/
'use client'
import Dropzone from '@/components/Dropzone/Dropzone';
import PredictionFrame from '@/components/PredictionFrame/PredictionFrame';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export default function Finder() {

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const predict = useCallback(async (filename) => {
    setLoading(true);
    try {
      setPrediction(null);
      const res = await fetch(`/api/predict?filename=${filename}`);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ? data.error : "Oops! Something went wrong.");
      } else {
        setPrediction(data);
      }
    } catch (error) {
      toast.error("Oops! Something went wrong.");
    }
    setLoading(false);
  }, []);

  const retrieveImage = useCallback(async (imageObject) => {
    setUploadedImage(imageObject);
  }, []);


  return (
    <div className="bg-white py-24" id='finder'>
      <div data-aos="fade-down" className="flex flex-col gap-6 items-center w-10/12 md:w-8/12 m-auto">
        <h1 className="text-black text-5xl">Dobble<b>Finder</b></h1>
        <p className="text-black text-xl sm:text-2xl">
          Upload a photo of yourself where your face is clearly visible and we will find out your doppelgänger among more than 10,000 works collected from the Prado museum and 8678 faces.
        </p>
        {/* Add a text for mobile devices => Images work only from gallery */}
        <p className="block md:hidden text-black text-xl">
          <b>Images work only from gallery</b>
        </p>

        {!loading &&
          <Dropzone fileHandler={predict} imageSetter={retrieveImage} />
        }

        {loading &&
          <div className="flex flex-row items-center gap-4 my-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            <p className="text-black text-xl">Finding your doppelgänger...</p>
          </div>
        }

        {prediction && uploadedImage &&
          <PredictionFrame
            data={{
              face_path: prediction.face_image_id,
              picture_path: prediction.full_image_id,
              title: prediction.title,
              author: prediction.author,
              face_width: prediction.face_width,
              face_height: prediction.face_height,
              picture_width: prediction.picture_width,
              picture_height: prediction.picture_height,
              image_width: prediction.image_width,
              image_height: prediction.image_height,
              filename: prediction.filename,
              uploadedImage: uploadedImage
            }}
          />

        }

      </div>
    </div>
  )
}