import os
from PIL import Image
from tqdm import tqdm
import pandas as pd
from transformers import pipeline
from const import (
    PRADO_PATH,
    FACES_COLLECTION,
    EMBEDDING_MODEL,
    DETECTOR_MODEL
)


ethnicity_pipe = pipeline(
    "image-classification", model="cledoux42/Ethnicity_Test_v003"
)
gender_pipe = pipeline(
    "image-classification", model="rizvandwiki/gender-classification-2"
)
age_pipe = pipeline(
    "image-classification", model="nateraw/vit-age-classifier"
)

faces_info = FACES_COLLECTION.get()

stats = []
for metadata in tqdm(faces_info["metadatas"]):
    filename = os.path.join(PRADO_PATH, "images", metadata["image_id"])
    im = Image.open(filename)
    
    top = metadata['fl_top']
    right = metadata['fl_right']
    bottom = metadata['fl_bottom']
    left = metadata['fl_left']
    
    face = im.crop((left, top, right, bottom))
    
    ethnicity = ethnicity_pipe(face)[0]['label']
    gender = gender_pipe(face)[0]['label']
    age = age_pipe(face)[0]['label']
    
    stats.append({
        "ethnicity": ethnicity,
        "gender": gender,
        "age": age,
    })

stats_df = pd.DataFrame(stats)
stats_df.to_csv(
    f"faces_stats_{EMBEDDING_MODEL}_{DETECTOR_MODEL}.csv",
    index=False
)
