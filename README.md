# Enhanced Preprints encoda server

This project contains a light http wrapper around the stencila encoda library, to be used as a standalone microservice in the EPP import pipeline.

```bash
docker compose up
```

## Convert JATS to json with api

```bash
cat [LOCATION OF JATS XML] | curl -X POST --data @- http://localhost:3000/
```

## Convert JATS to json with api (disable reshape)

```bash
cat [LOCATION OF JATS XML] | curl -X POST --data @- "http://localhost:3000/?reshape=false"
```

## Convert JATS to json with api target a specific encoda version

```bash
cat [LOCATION OF JATS XML] | curl -X POST -H "Accept: application/vnd.elife.encoda.v1.0.1+json" --data @- http://localhost:3000/
```
