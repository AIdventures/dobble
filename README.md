# Dobble

## Configuration

```bash
crontab -e
```

One with the editor of your choice, add the following line:

```bash
*/5 * * * * rm -rf /tmp/dobble/*
```

## To-Do

- [ ] Resize the faces to a fixed size when generating the embedding for the dataset.
- [ ] Resize the faces to a fixed size when generating the embedding for the inferenced face.
- [ ] Conda environment for faces recognition. Dockerize it.
- [x] Mobile styles.
- [x] Add Understanding the results section.