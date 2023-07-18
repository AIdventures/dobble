import face_recognition

from const import (
    DETECTOR_MODEL,
    EMBEDDING_MODEL,
    FACES_COLLECTION,
    MINIMUM_FACE_WIDTH
)

def find_face_embedding(image):
    """
    Detects faces in an image and returns the bounding boxes and
    the landmarks.

    Parameters
    ----------
    image: np.array
        The image to detect faces in.

    Returns
    -------
    face_embedding: np.array
        The face embedding of the face in the image.
    """
    faces_locations = face_recognition.face_locations(
        image, model=DETECTOR_MODEL, number_of_times_to_upsample=1
    )

    # If there are no faces, return an error
    if len(faces_locations) == 0:
        print("No faces found")
        raise ValueError("No faces found")
    
    # If there are more than one face, return an error
    if len(faces_locations) > 1:
        print("More than one face found")
        raise ValueError("More than one face found")
    
    # Get the face encoding
    faces_embeddings = face_recognition.face_encodings(
        image, known_face_locations=faces_locations,
        num_jitters=1, model=EMBEDDING_MODEL
    )

    # Check if face embeddings were found
    if len(faces_embeddings) == 0:
        print("No face embeddings found")
        raise ValueError("No face embeddings found")
    
    # Check if more than one face embedding was found
    if len(faces_embeddings) > 1:
        print("More than one face embedding found")
        raise ValueError("More than one face embedding found")
    
    return faces_embeddings[0].tolist()


def find_nearest_face(face_embedding):
    """
    Finds the nearest face to the given embedding.

    Parameters
    ----------
    face_embedding: np.array
        The face embedding to find the nearest face to.

    Returns
    -------
    dict
        A dictionary with the nearest face.
    """
    # Find the nearest face
    nearest_face = FACES_COLLECTION.query(
        face_embedding,
        n_results=1,
        where={"fl_width": {"$gte": MINIMUM_FACE_WIDTH }},
    )

    # Check if a face was found
    if len(nearest_face) == 0:
        print("No face found")
        raise ValueError("No face found")
    
    res = nearest_face["metadatas"][0][0]
    res["distance"] = nearest_face["distances"][0][0]
    res["face_id"] = nearest_face["ids"][0][0]

    return res
