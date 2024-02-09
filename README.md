# Enhanced Preprints encoda server

This project contains a light http wrapper around the stencila encoda library, to be used as a standalone microservice in the EPP import pipeline.

## Building the docker image

Run `docker build -t epp-encoda --target prod .`

## Running the docker image

Run `docker run -p 3000:3000 epp-encoda`

## Convert JATS to json with api

```bash
cat [LOCATION OF JATS XML] | curl -X POST --data @- http://localhost:3000/
```

## Convert JATS to json with api target a specific encoda version

```bash
cat [LOCATION OF JATS XML] | curl -X POST -H "Accept: application/vnd.elife.encoda.v1.0.1+json" --data @- http://localhost:3000/
```
