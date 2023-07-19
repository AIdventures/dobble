# Dobble: Face embeddings


```bash
docker build -t faces-image .

docker run \
    -it --rm \
    -p 8000:8000 \
    -v $PRADO_PATH:$PRADO_PATH \
    -v $CHROMADB_PATH:$CHROMADB_PATH \
    -v $DOBBLE_UPLOADS_PATH:$DOBBLE_UPLOADS_PATH \
    -e DOBBLE_UPLOADS_PATH=$DOBBLE_UPLOADS_PATH \
    -e PRADO_PATH=$PRADO_PATH \
    -e CHROMADB_PATH=$CHROMADB_PATH \
    --name faces-container \
    faces-image
```

Example of usage:

```bash
curl http://localhost:8000/similar_face/020b0867-f8de-479a-a793-d35552a5e65c.jpg
```