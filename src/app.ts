import express from 'express';
import bodyParser from 'body-parser';
import { convert as convert_1_0_1 } from '@stencila/encoda-1-0-1';
import { convert as convert_1_0_2 } from '@stencila/encoda-1-0-2';
import { convert as convert_1_0_3 } from '@stencila/encoda-1-0-3';
import { convert as convert_1_0_6 } from '@stencila/encoda-1-0-6';
import { convert as convert_1_0_7 } from '@stencila/encoda-1-0-7';
import { convert as convert_1_0_8 } from '@stencila/encoda-1-0-8';
import { convert as convert_1_0_9 } from '@stencila/encoda-1-0-9';
import { convert as convert_1_0_10 } from '@stencila/encoda-1-0-10';
import { convert as convert_1_0_11 } from '@stencila/encoda-1-0-11';
import { convert as convert_1_0_12 } from '@stencila/encoda-1-0-12';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';

const app = express();
app.use(bodyParser.text({ type: '*/*', limit: '50mb' }));

app.post('/', async (req, res) => {
  try {
    const xmlData = req.body;
    if (typeof xmlData !== 'string') {
      throw new Error('request body should be a string');
    }

    // write to disk
    const tempOutput = mkdtempSync(`${tmpdir()}/encoda`);
    const tempOutputWithSlash = `${tempOutput}/`;
    const xmlFile = `${tempOutputWithSlash}article.xml`;
    writeFileSync(xmlFile, xmlData);

    const parameters = {
      from: 'jats',
      to: 'json',
      encodeOptions: {
        isBundle: false,
      },
      decodeOptions: {
        shouldReshape: false,
      },
    };

    const replacementPath = typeof req.query.replacementPath === 'string' ? req.query.replacementPath : '';
    const replacementPathWithSlash = replacementPath.length > 0 && replacementPath.slice(-1) !== '/' ? `${replacementPath}/` : replacementPath;

    const versionResponders = {
      'application/vnd.elife.encoda.v1.0.12+json': async () => {
        res.json(JSON.parse(((await convert_1_0_12(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      'application/vnd.elife.encoda.v1.0.11+json': async () => {
        res.json(JSON.parse(((await convert_1_0_11(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      'application/vnd.elife.encoda.v1.0.10+json': async () => {
        res.json(JSON.parse(((await convert_1_0_10(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      'application/vnd.elife.encoda.v1.0.9+json': async () => {
        res.json(JSON.parse(((await convert_1_0_9(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      'application/vnd.elife.encoda.v1.0.8+json': async () => {
        res.json(JSON.parse(((await convert_1_0_8(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      'application/vnd.elife.encoda.v1.0.7+json': async () => {
        res.json(JSON.parse(((await convert_1_0_7(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      'application/vnd.elife.encoda.v1.0.6+json': async () => {
        res.json(JSON.parse(((await convert_1_0_6(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      'application/vnd.elife.encoda.v1.0.3+json': async () => {
        res.json(JSON.parse(((await convert_1_0_3(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      'application/vnd.elife.encoda.v1.0.2+json': async () => {
        res.json(JSON.parse(((await convert_1_0_2(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      'application/vnd.elife.encoda.v1.0.1+json': async () => {
        res.json(JSON.parse(((await convert_1_0_1(xmlFile, undefined, parameters)) ?? '{}').replaceAll(tempOutputWithSlash, replacementPathWithSlash)));
        rmSync(tempOutput, { recursive: true, force: true });
      },
      default: async () => {
        res.status(406).send({ error: 'the requested content type is not supported' });
      },
    };

    res.format(versionResponders);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default app;
