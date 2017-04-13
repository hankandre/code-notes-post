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

  it('response should container posts and total properties', (done) => {
    supertest
      .get('/')
      .end((err, res) => {
        const body = res.body
        body.should.have.property('posts')
        body.should.have.property('total')
        done()
      })
  })
  it('response.posts should be an array', (done) => {
    supertest
      .get('/')
      .end((err, res) => {
        const body = res.body
        body.posts.should.be.a('array')
        done()
      })
  })
})
