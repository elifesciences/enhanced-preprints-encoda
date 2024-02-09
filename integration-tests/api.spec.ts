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
          .then((response) => expect(response.headers['content-type']).toBe('application/vnd.elife.encoda.v1.0.3+json; charset=utf-8'));
      });

      it('should use the specified version', async () => {
        await request(app)
          .post('/')
          .set('Accept', 'application/vnd.elife.encoda.v1.0.1+json')
          .send(xml.toString())
          .expect(200)
          .then((response) => expect(response.headers['content-type']).toBe('application/vnd.elife.encoda.v1.0.1+json; charset=utf-8'));
      });
    });
  });
});
