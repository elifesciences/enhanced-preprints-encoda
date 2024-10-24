import request from 'supertest';
import { readFileSync } from 'fs';
import app from '../src/app';

describe('api', () => {
  describe('/', () => {
    describe('version selection version', () => {
      const xml = readFileSync('integration-tests/data/10.1101/123456/123456.xml');
      it('should select the latest version', async () => {
        await request(app)
          .post('/')
          .send(xml.toString())
          .expect(200)
          .then((response) => expect(response.headers['content-type']).toBe('application/vnd.elife.encoda.v1.0.9+json; charset=utf-8'));
      });

      it.each([
        '1.0.1',
        '1.0.2',
        '1.0.3',
        '1.0.6',
        '1.0.7',
        '1.0.8',
        '1.0.9',
      ])('should use the specified version - %s', async (version) => {
        const mimeType = `application/vnd.elife.encoda.v${version}+json`;
        await request(app)
          .post('/')
          .set('Accept', mimeType)
          .send(xml.toString())
          .expect(200)
          .then((response) => expect(response.headers['content-type']).toBe(`${mimeType}; charset=utf-8`));
      });

      it.each([
        'unknown',
        '1.0.4',
        '1.0.5',
        '1.0.10',
      ])('should error if you specify wrong version - %s', async (version) => {
        const mimeType = `application/vnd.elife.encoda.v${version}+json`;
        await request(app)
          .post('/')
          .set('Accept', mimeType)
          .send(xml.toString())
          .expect(406)
          .then((response) => expect(response.body).toEqual({ error: 'the requested content type is not supported' }));
      });
    });
  });
});
