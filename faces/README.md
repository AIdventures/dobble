# Dobble: Face embeddings


```bash
docker build -t faces-image .

docker run \
    -it --rm \
    -p 8000:8000 \
    -v $PRADO_PATH:$PRADO_PATH \
    -v $CHROMADB_PATH:$CHROMADB_PATH \
    -v /tmp:/tmp \
    -e PRADO_PATH=$PRADO_PATH \
    -e CHROMADB_PATH=$CHROMADB_PATH \
    --name faces-container \
    faces-image
```