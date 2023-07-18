import os
import uuid
import chromadb
from chromadb.config import Settings
from tqdm import tqdm
import face_recognition
import pandas as pd
pd.set_option('display.max_columns', None)


PRADO_PATH = os.getenv("PRADO_PATH")
assert PRADO_PATH is not None, "Please set the env variable PRADO_PATH"
assert os.path.isdir(PRADO_PATH), "PRADO_PATH must be a dir"


df = pd.read_csv(os.path.join(PRADO_PATH, "prado.csv"))
df["work_id"] = df['work_image_url'].apply(lambda x: x.split('/')[-1])
print(f"The dataframe has {len(df)} rows")


DETECTION_MODEL = "hog"  # hog - cnn
DB_NAME = os.path.join(
    "chroma_collections",
    f"faces_{DETECTION_MODEL}"
)
COLLECTION_NAME = "embeddings"

# Optional, defaults to .chromadb/ in the current directory
client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory=DB_NAME
))
client.persist()


# Delete a collection and all associated embeddings, documents, and metadata.
# ⚠️ This is destructive and not reversible
#client.delete_collection(name=COLLECTION_NAME)

collection = client.get_or_create_collection(name=COLLECTION_NAME)
print(f"Items in collection: {collection.count()}")


errors = {"not_found": [], "location_embeddings_mismatch": []}
for _, row in tqdm(df.iterrows(), total=len(df)):
    
    image_id = row["work_id"]

    image_path = os.path.join(PRADO_PATH, "images", image_id)
    if not os.path.exists(image_path):
        # f"Image path not found: '{image_path}'"
        errors["not_found"].append(image_path)
        continue
    
    image = face_recognition.load_image_file(image_path)
    
    # https://face-recognition.readthedocs.io/en/latest/face_recognition.html#face_recognition.api.face_locations
    faces_locations = face_recognition.face_locations(
        image,
        model=DETECTION_MODEL,
        number_of_times_to_upsample=1
    )

    faces_embeddings = face_recognition.face_encodings(
        image,
        known_face_locations=faces_locations,
        num_jitters=1,
        model="large"
    )

    if not len(faces_locations) == len(faces_embeddings):
        errors["location_embeddings_mismatch"].append(image_path)
        continue
    
    for indx, (face_location, face_embedding) in enumerate(zip(
        faces_locations, faces_embeddings
    )):
    
        # Get the location of each face in this image
        top, right, bottom, left = face_location
        width = abs(right - left)
        height = abs(bottom - top)

        collection.add(
            embeddings=face_embedding.tolist(),
            metadatas={
                "image_id": image_id,
                "fl_top": top,
                "fl_right": right,
                "fl_bottom": bottom,
                "fl_left": left,
                "fl_width": width,
                "fl_height": height,
                "image_width": image.shape[1],
                "image_height": image.shape[0],
            },
            ids=[uuid.uuid4().hex]
        )

print(f"Items in collection: {collection.count()}")
print(f"Finito! {len(errors)} Errors: {errors}")