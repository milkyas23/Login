const expect = require('chai').expect;
const app = require('../app');
// const request = require('supertest');
const session = require('supertest-session')(app);
const { query } = require('../models/db.model');
const bcrypt = require('bcrypt');

// testet börjar här
describe('meeps route', () => {
  before('make sure there is an authenticated session', (done) => {
    session.post('/login')
      .type('form')
      .send({
        username: process.env.TEST_USER,
        password: process.env.TEST_PASSWORD
      })
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  describe('GET /', () => {
    // vad förväntar vi oss ska ske, it should return...
    it('should return OK status', () => {
      // utför requesten, kontrollera att den svarar 200 och avsluta sedan testet
      request.get('/meeps')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
      });
    });
  });

  describe('GET /:id', () => {
    // vad förväntar vi oss ska ske, it should return...
    it('should return OK status', () => {
      // utför requesten, kontrollera att den svarar 200 och avsluta sedan testet
      request.get('/meeps/:id')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
      });
    });
  });

  describe('POST /', () => {
    // vad förväntar vi oss ska ske, it should return...
    it('should create a meep provided request body is valid', () => {
      // utför requesten, kontrollera att den svarar 200 och avsluta sedan testet
      session.post('/meeps')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
      });
    });
  });

  describe('POST /update', () => {
    // vad förväntar vi oss ska ske, it should return...
    let meep = {id: 1};
    it('should update meep with id provided the request body is valid', () => {
      // utför requesten, kontrollera att den svarar 200 och avsluta sedan testet
      session.post('/meeps/update')
      .expect(302)
      .expect('Location', '/meeps/' + meep.id)
      .end((err, res) => {
        if (err) return done(err);
      });
    });
  });

  describe('/delete', () => {
    // it('it should promp user for delete confirmation', () => {
    //   session.get('/meeps/delete')
    //   .expect(200)
    //   .end((err, res) => {
    //     if (err) return done(err);
    //   });
    // });
    it('it should delete resource', () => {
      session.post('/meeps/delete')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
      });
    });
  });
});