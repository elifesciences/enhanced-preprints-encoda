import request from 'supertest';
import app from '../src/app';

describe('api', () => {
  describe('/', () => {
    describe('version selection version', () => {
      it('should select the latest version', async () => {
        await request(app)
          .post('/')
          .expect(200)
          .expect({ version: '1.0.3' });
      });

      it('should use the specified version', async () => {
        await request(app)
          .post('/')
          .set('Accept', 'application/vnd.elife.encoda.v1.0.1+json')
          .expect(200)
          .expect({ version: '1.0.1' });
      });
    });
  });
});
