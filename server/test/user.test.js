"use strict"
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const app = require('../app')
const expect = chai.expect



describe('User Route', function () {
    before(function (done) {
        // Seed Here
        done()
    })

    after(function (done) {
        // Erase Data Here
        done()
    })

    describe('Create User', function () {
        it('Success Create User', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: "tigor",
                    email: "tigor@email.com",
                    password: "12345"
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('token')
                    done()
                })
        })
    })

    describe('Login User', function () {
        it('Success Login user', function (done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    identity: "tigor",
                    password: "12345"
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('token')
                    done()
                })
        })
    })
})