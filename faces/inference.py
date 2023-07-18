# uvicorn inference:app --reload
import os
import json
import face_recognition
from fastapi import FastAPI, Response

from const import (
    UPLOADS_DIR,
    PRADO_DF
)

from utils import find_face_embedding, find_nearest_face

app = FastAPI()


@app.get("/similar_face/{filename}")
def similar_face(filename: str):
    """
    Given an image, find the most similar face in the Prado dataset.

    Parameters
    ----------
    filename: str
        The filename of the image to find the most similar face.

    Returns
    -------
    dict
        A dictionary with the most similar face.

    Examples
    --------
    $ curl http://localhost:8000/similar_face/000000.jpg
    """

    file_path = os.path.join(UPLOADS_DIR, filename)

    # Check if the path exists
    if not os.path.exists(file_path):
        return Response(
            content=json.dumps({"error": "File not found"}, default=str),
            media_type='application/json',
            status_code=404
        )
    
    # Load the image
    image = face_recognition.load_image_file(file_path)

    try:  # Find the face embedding & nearest face
        face_embedding = find_face_embedding(image)
        nearest_face = find_nearest_face(face_embedding)
    except ValueError as e:  # Get the text of the error
        return Response(
            content=json.dumps({"error": e}, default=str),
            media_type='application/json',
            status_code=404
        )
    
    
    # Return the nearest face
    piece = PRADO_DF[PRADO_DF['work_id'] == nearest_face['image_id']].iloc[0]
    info = json.dumps({
        "face_image_id": f"{nearest_face['face_id']}.jpg",
        "full_image_id": piece['work_id'],
        "author": piece['author'],
        "title": piece['work_title'],
        "subtitle": piece['work_subtitle'],
        "description": piece['work_description'],
        "face_top": nearest_face['fl_top'],
        "face_right": nearest_face['fl_right'],
        "face_bottom": nearest_face['fl_bottom'],
        "face_left": nearest_face['fl_left'],
        "face_width": nearest_face['fl_width'],
        "face_height": nearest_face['fl_height'],
        "picture_width": nearest_face['image_width'],
        "picture_height": nearest_face['image_height'],
        "image_width": image.shape[1],
        "image_height": image.shape[0],
        "filename": filename
    }, indent=4, default=str)

    return Response(
        content=info,
        media_type='application/json',
        status_code=200
    )
