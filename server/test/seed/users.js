"use strict"
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const app = require('../../app')

module.exports = {
    tigor: function () {
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: "tigor",
                    email: "tigor@email.com",
                    password: "12345"
                })
                .end(function (err, res) {
                    if (err) return reject(err)
                    resolve(res.body.token)
                })
        })
    },
    andreas: function () {
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: "andreas",
                    email: "andreas@email.com",
                    password: "12345"
                })
                .end(function (err, res) {
                    if (err) return reject(err)
                    resolve(res.body.token)
                })
        })
    },
    ayu: function () {
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: "ayu",
                    email: "ayu@email.com",
                    password: "12345"
                })
                .end(function (err, res) {
                    if (err) return reject(err)
                    resolve(res.body.token)
                })
        })
    }
}