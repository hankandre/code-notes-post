'use strict'
const supertest = require('supertest')('http://localhost:3000')
const should = require('chai').should()
const expect = require('chai').expect

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
