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
          // .expect(200)
          .expect((response) => expect(response.body).toMatchObject({ version: '1.0.3' }));
      });

      it('should use the specified version', async () => {
        await request(app)
          .post('/')
          .set('Accept', 'application/vnd.elife.encoda.v1.0.1+json')
          .send(xml.toString())
          // .expect(200)
          .expect((response) => expect(response.body).toMatchObject({ version: '1.0.1' }));
      });
      it('should use version 2', async () => {
        await request(app)
          .post('/')
          .set('Accept', 'application/vnd.elife.encoda.v2.0.0+json')
          .send(xml.toString())
          // .expect(200)
          .expect((response) => expect(response.body).toMatchObject({ version: '2.0.0' }));
      });
    });
  });
});
