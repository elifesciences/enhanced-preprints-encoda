import express from 'express';
import bodyParser from 'body-parser';
import { convert as convert_1_0_1 } from '@stencila/encoda-1-0-1';
import { convert as convert_1_0_2 } from '@stencila/encoda-1-0-2';
import { convert as convert_1_0_3 } from '@stencila/encoda-1-0-3';
import { convert as convert_2_0_0 } from '@stencila/encoda-2-0-0';
import { mkdtempSync, writeFileSync, rmdirSync } from 'fs';
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
    const xmlFile = `${tempOutput}/article.xml`;
    writeFileSync(xmlFile, xmlData);

    const parameters = {
      from: 'jats',
      to: 'json',
      encodeOptions: {
        isBundle: false,
      },
    };
    const decodeParameters = {
      format: 'jats',
    };
    const encodeParameters = {
      format: 'json',
    };

    const versionResponders = {
      'application/vnd.elife.encoda.v1.0.3+json': async () => {
        res.json({
          version: '1.0.3',
          json: await convert_1_0_3(xmlFile, undefined, parameters),
        });
        rmdirSync(tempOutput, { recursive: true });
      },
      'application/vnd.elife.encoda.v1.0.2+json': async () => {
        res.json({
          version: '1.0.2',
          json: await convert_1_0_2(xmlFile, undefined, parameters),
        });
        rmdirSync(tempOutput, { recursive: true });
      },
      'application/vnd.elife.encoda.v1.0.1+json': async () => {
        res.json({
          version: '1.0.1',
          json: await convert_1_0_1(xmlFile, undefined, parameters),
        });
        rmdirSync(tempOutput, { recursive: true });
      },
      'application/vnd.elife.encoda.v2.0.0+json': async () => {
        res.json({
          version: '2.0.0',
          json: await convert_2_0_0.toString(await convert_2_0_0.fromPath(xmlFile, decodeParameters), encodeParameters),
        });
        rmdirSync(tempOutput, { recursive: true });
      },
      default: async () => versionResponders['application/vnd.elife.encoda.v1.0.3+json'](),
    };

    res.format(versionResponders);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default app;
