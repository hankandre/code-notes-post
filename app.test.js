'use strict'
require('dotenv').config()
const supertest = require('supertest')('http://localhost:3000')
const should = require('chai').should()
const expect = require('chai').expect
const auth = process.env.TEST_TOKEN

describe('GET /', () => {
  it('should respond with JSON', (done) => {
    supertest
      .get('/')
      .set('Accept', 'application/json')
      .expect(200, done)
  })

  it('response should contain "posts" and "total" properties', (done) => {
    supertest
      .get('/')
      .end((err, res) => {
        const body = res.body
        body.should.have.property('posts')
        body.should.have.property('total')
        done()
      })
  })
  it('response should contain everything without skip and take', (done) => {
    supertest
      .get('/')
      .end((err, res) => {
        const body = res.body
        body.posts.should.be.a('array')
        done()
      })
  })

  it('response should return 3 documents if skip=0 and take=3', (done) => {
    supertest
      .get('/?skip=0&take=3')
      .end((err, res) => {
        const body = res.body
        body.posts.length.should.equal(3)
        done()
      })
  })
})

describe('POST /', () => {
  it('should not return anything if a JWT isn\'t present', (done) => {
    supertest
      .post('/')
      .end((err, res) => {
        res.error.text.should.equal('{"error":"Authorization header not present or malformed."}')
        done()
      })
  })

  it('should only accept title, content, type, and tags', (done) => {
    supertest
      .post('/')
      .set('Authorization', auth)
      .field('name', 'whatever')
      .end((err, res) => {
        res.status.should.equal(400)
        done()
      })
  })

  it('should return the document saved if a JWT is present', (done) => {
    supertest
      .post('/')
      .set('Authorization', auth)
      .send({content: 'supertest content', title: 'supertest', type: 'test'})
      .end((err, res) => {
        const body = res.body
        body.should.be.an('object')
        body.should.have.property('content')
        body.should.have.property('title')
        body.should.have.property('type')
        supertest
          .delete(`/${body._id}`)
          .set('Authorization', auth)
          .end((err, res) => {
            done()
          })
      })
  })
})
