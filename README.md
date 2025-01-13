# Enhanced Preprints encoda server

This project contains a light http wrapper around the stencila encoda library, to be used as a standalone microservice in the EPP import pipeline.

```bash
docker compose up
```

## Convert JATS to json with api

```bash
cat [LOCATION OF JATS XML] | curl -X POST --data @- http://localhost:3000/
```

## Convert JATS to json with api target a specific encoda version

```bash
cat [LOCATION OF JATS XML] | curl -X POST -H "Accept: application/vnd.elife.encoda.v1.0.1+json" --data @- http://localhost:3000/
```

## Optionally set a replacement path

This replaces the path of other resources pointed to in original Meca with their new location in S3.

i.e. if the XML file was in the Zip as `content/123/123.xml` for id 456 version 1, we pass in `456/v1/content/123` as a replacement paths to other resources.

```bash
cat [LOCATION OF JATS XML] | curl -X POST --data @- http://localhost:3000?replacementPath=456/v1/content/123
```
