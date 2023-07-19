import os
import pandas as pd
import chromadb
from chromadb.config import Settings


UPLOADS_DIR = os.getenv("DOBBLE_UPLOADS_PATH")
assert UPLOADS_DIR is not None, "Please set the env variable DOBBLE_UPLOADS_PATH"
assert os.path.isdir(UPLOADS_DIR), "DOBBLE_UPLOADS_PATH must be a dir"

PRADO_PATH = os.getenv("PRADO_PATH")
assert PRADO_PATH is not None, "Please set the env variable PRADO_PATH"
assert os.path.isdir(PRADO_PATH), "PRADO_PATH must be a dir"

CHROMADB_PATH = os.getenv("CHROMADB_PATH")
assert CHROMADB_PATH is not None, "Please set the env variable CHROMADB_PATH"
assert os.path.isdir(CHROMADB_PATH), "CHROMADB_PATH must be a dir"

PRADO_DF = pd.read_csv(os.path.join(PRADO_PATH, "prado.csv"))
PRADO_DF["work_id"] = PRADO_DF['work_image_url'].apply(
    lambda x: x.split('/')[-1]
)
print(f"The dataframe has {len(PRADO_DF)} rows")
PRADO_DF.tail()

EMBEDDING_MODEL = "large"  # "large" or "small"
DETECTOR_MODEL = "hog"  # "cnn" or "hog"
DB_NAME = f"faces_{DETECTOR_MODEL}"
COLLECTION_NAME = "embeddings"
MINIMUM_FACE_WIDTH   = 100

# Optional, defaults to .chromadb/ in the current directory
CHROMADB_CLIENT = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory=os.path.join(
        CHROMADB_PATH, "art", "prado", DB_NAME
    )
))

print(f"Available collections: {CHROMADB_CLIENT.list_collections()}")

FACES_COLLECTION = CHROMADB_CLIENT.get_collection(name=COLLECTION_NAME)
print(f"Items in faces collection: {FACES_COLLECTION.count()}")
