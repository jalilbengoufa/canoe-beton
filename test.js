var server = require('./server');
var request = require('supertest').agent(server.listen());

var assert = require('assert');
var mockery = require('mockery');
var sinon = require('sinon');
var nodemailer = require('nodemailer');

var workingPayload = {
  message: 'test',
  name: 'test',
  email: 'test@test.com'
};

var config = {
  host: '127.0.0.1',
  port: 1025,
  secure: false,
  auth: {
    user: '',
    pass: ""
  }
};

var mailOptions = {
  from: 'test@test.com',
  to: "canoebetonets@gmail.com",
  subject: "New comments from test",
  text: "test",
};

describe('REST API', function() {
  describe('/api/comments', function() {
    describe('POST', function() {
      beforeEach(function(done) {
        mockery.enable({
          warnOnReplace: false,
          warnOnUnregistered: false,
          useCleanCache: true
        });
        this.nodemailerMock = sinon.mock(nodemailer);
        mockery.registerMock('nodemailer', nodemailer);
        done();
      });
      afterEach(function(done) {
        mockery.deregisterMock('nodemailer');
        mockery.disable();
        done();
      });
      it('should work when ', function(done) {
        request
          .post('/api/comments')
          .type('form')
          .send(workingPayload)
          .end(function(err, res) {
            assert.equal(res.header['location'], '/');
            done();
          });
      });
      it('should not work when sending an empty body', function(done) {
        request
          .post('/api/comments')
          .type('form')
          .send({})
          .expect(400, done);
      });
      it('should not work when sending an empty object, function(done)', function(done) {
        request
          .post('/api/comments')
          .type('form')
          .send({
            message: 'test'
          })
          .expect(400, done);
      });
      it('should not work when sending an empty from', function(done) {
        request
        .post('/api/comments')
        .type('form')
        .send({message: 'test', object: 'test'})
        .expect(400, done);
      });
      it('should create a transporter and call the sendMail method with options', function(done) {
        var mock = this.nodemailerMock;
        var transporter = {
          sendMail: function() {
            return null;
          }
        };
        var mockTransporter = sinon.mock(transporter);

        var res = {};
        var err = null;
        mock.expects('createTransport').once().withArgs(config).returns(transporter);
        mockTransporter.expects('sendMail').once().withArgs(mailOptions).callsArgWith(1, err, res);

        request
          .post('/api/comments')
          .type('form')
          .send(workingPayload)
          .expect(200)
          .end(function(err, res) {
            mock.verify();
            mockTransporter.verify();
            done();
          });
      });
      it('should create a transport and return an error in the callback', function(done) {
        var mock = this.nodemailerMock;
        var transporter = {
          sendMail: function() {
            return null;
          }
        };
        var mockTransporter = sinon.mock(transporter);

        var res = null;
        var err = {message: 'test'};
        mock.expects('createTransport').once().withArgs(config).returns(transporter);
        mockTransporter.expects('sendMail').once().withArgs(mailOptions).callsArgWith(1, err, res);

        request
          .post('/api/comments')
          .type('form')
          .send(workingPayload)
          .expect(500)
          .end(function(err, res) {
            mock.verify();
            mockTransporter.verify();
            done();
          });
      });
    });
  });
});
describe('Configuration', function() {
  describe('test env', function() {
    it('should exist', function() {
      config = require('./config/config');
      assert.ok(config);
    });
  });
});
