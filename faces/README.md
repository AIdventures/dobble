# Dobble: Face embeddings

## Index

1. [Project Overview](#project-overview)
2. [Docker](#docker)

## Project Overview

Files:

```
├── const.py <- Constants for the API service
|
├── utils.py <- Functions to encode and search for the most similar face
│
├── stats.py <- Obtain statistics from the faces in the dataset
|
├── generate_database.py <- Generates the database with the embeddings
|
└── inference.py <- Exposes the API to search for the most similar face
```

Directories:

```
├── chroma_collections <- Chroma collections for the Prado Museum
|
├── notebooks <- Jupyter notebooks to explore and play with the dataset
|
└── providers <- Utils for creating the dataset
```

## Docker

To build the image and run the container, we need to define the following environment variables:

- `PRADO_PATH`: Path to the Prado Museum dataset.
- `CHROMADB_PATH`: Path to the ChromaDB dataset.

With theses paths, we can build the image and run the container:

```bash
docker build -t faces-image .

docker run \
    -it --rm \
    -p 8000:8000 \
    -v $PRADO_PATH:$PRADO_PATH \
    -v $CHROMADB_PATH:$CHROMADB_PATH \
    -v /tmp/dobble:/tmp/dobble \
    -e PRADO_PATH=$PRADO_PATH \
    -e CHROMADB_PATH=$CHROMADB_PATH \
    --name faces-container \
    faces-image
```

Example of usage:

```bash
curl http://localhost:8000/similar_face/020b0867-f8de-479a-a793-d35552a5e65c.jpg
```


## To-Do

- [ ] Resize the faces to a fixed size when generating the embedding for the dataset.
- [ ] Resize the faces to a fixed size when generating the embedding for the inferenced face.
- [ ] Conda environment. Dockerize it.