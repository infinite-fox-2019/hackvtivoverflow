"use strict"
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const app = require('../app')
const expect = chai.expect
const User = require('../models/user')
const userSeed = require('./seed/users')

let tigor
let andreas
let ayu
describe('Thread Route', function () {
    before(async function () {
        tigor = await userSeed.tigor
        andreas = await userSeed.andreas
        ayu = await userSeed.ayu
    })

    after(async function () {
        await User.deleteMany()
    })

    let threadId
    let slug

    describe('Create Thread', function () {
        it('Success Create Thread', function (done) {
            const data = {
                title: "test1",
                content: "testing",
                tags: ['Bury', 'Fury', 'Curry']
            }
            chai.request(app)
                .post('/threads')
                .set({ authorization: tigor })
                .send(data)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('title')
                    expect(res.body).to.have.property('owner')
                    expect(res.body).to.have.property('content')
                    expect(res.body).to.have.property('tags')
                    expect(res.body).to.have.property('replies')
                    expect(res.body).to.have.property('upvotes')
                    expect(res.body).to.have.property('downvotes')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body).to.have.property('updatedAt')
                    expect(res.body).to.have.property('slug')
                    const { title, content, tags, replies, upvotes, downvotes } = res.body
                    expect(title).to.be.a('string')
                    expect(title).to.equal(data.title)
                    expect(content).to.be.a('string')
                    expect(content).equal(data.content)
                    expect(tags).to.be.an('array')
                    expect(tags).to.deep.equal(data.tags)
                    expect(replies).to.be.an('array')
                    expect(replies).to.have.lengthOf(0)
                    expect(upvotes).to.be.an('array')
                    expect(upvotes).to.have.lengthOf(1)
                    expect(upvotes[0]).to.have.property('_id')
                    expect(upvotes[0]).to.have.property('username')
                    expect(upvotes[0]).to.have.property('email')
                    expect(upvotes[0]).to.not.have.property('password')
                    expect(upvotes[0].username).to.equal('tigor')
                    expect(upvotes[0].email).to.equal('tigor@email.com')
                    expect(downvotes).to.be.an('array')
                    expect(downvotes).to.have.length(0)
                    threadId = res.body._id
                    slug = res.body.slug
                    done()
                })
        })

        it('Success get threads', function (done) {
            chai.request(app)
                .get('/threads')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    res.body.forEach(el => {
                        expect(el).to.be.an('object')
                        expect(el).to.have.property('_id')
                        expect(el).to.have.property('title')
                        expect(el).to.have.property('owner')
                        expect(el).to.have.property('content')
                        expect(el).to.have.property('tags')
                        expect(el).to.have.property('replies')
                        expect(el).to.have.property('upvotes')
                        expect(el).to.have.property('downvotes')
                        expect(el).to.have.property('createdAt')
                        expect(el).to.have.property('updatedAt')
                        expect(el).to.have.property('slug')
                    })
                    done()
                })
        })

        it('Success get single thread', function (done) {
            chai.request(app)
                .get('/threads/' + threadId)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body._id).to.equal(threadId)
                    expect(res.body).to.have.property('title')
                    expect(res.body).to.have.property('owner')
                    expect(res.body).to.have.property('content')
                    expect(res.body).to.have.property('tags')
                    expect(res.body).to.have.property('replies')
                    expect(res.body).to.have.property('upvotes')
                    expect(res.body).to.have.property('downvotes')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body).to.have.property('updatedAt')
                    expect(res.body).to.have.property('slug')
                    done()
                })
        })
        it('Success get single thread - slug', function (done) {
            chai.request(app)
                .get('/threads/' + slug)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('title')
                    expect(res.body).to.have.property('owner')
                    expect(res.body).to.have.property('content')
                    expect(res.body).to.have.property('tags')
                    expect(res.body).to.have.property('replies')
                    expect(res.body).to.have.property('upvotes')
                    expect(res.body).to.have.property('downvotes')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body).to.have.property('updatedAt')
                    expect(res.body).to.have.property('slug')
                    expect(res.body.slug).to.equal(slug)
                    done()
                })
        })

        it('Success Edit Thread', function (done) {
            const data = {
                title: "test2",
                content: "testing3",
                tags: ['Bury1', 'Fury2', 'Curry3']
            }
            chai.request(app)
                .put('/threads/' + threadId)
                .set({ authorization: tigor })
                .send(data)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('title')
                    expect(res.body).to.have.property('owner')
                    expect(res.body).to.have.property('content')
                    expect(res.body).to.have.property('tags')
                    expect(res.body).to.have.property('replies')
                    expect(res.body).to.have.property('upvotes')
                    expect(res.body).to.have.property('downvotes')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body).to.have.property('updatedAt')
                    expect(res.body).to.have.property('slug')
                    const { title, content, tags, replies, upvotes, downvotes } = res.body
                    expect(title).to.be.a('string')
                    expect(title).to.equal(data.title)
                    expect(content).to.be.a('string')
                    expect(content).equal(data.content)
                    expect(tags).to.be.an('array')
                    expect(tags).to.deep.equal(data.tags)
                    expect(replies).to.be.an('array')
                    expect(upvotes).to.be.an('array')
                    expect(downvotes).to.be.an('array')
                    done()
                })
        })
        it('Success Edit Thread - Slug', function (done) {
            const data = {
                title: "test3",
                content: "testing4",
                tags: ['Bury5', 'Fury6', 'Curry7']
            }
            chai.request(app)
                .put('/threads/' + slug)
                .set({ authorization: tigor })
                .send(data)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('title')
                    expect(res.body).to.have.property('owner')
                    expect(res.body).to.have.property('content')
                    expect(res.body).to.have.property('tags')
                    expect(res.body).to.have.property('replies')
                    expect(res.body).to.have.property('upvotes')
                    expect(res.body).to.have.property('downvotes')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body).to.have.property('updatedAt')
                    expect(res.body).to.have.property('slug')
                    expect(res.body.slug).to.equal(slug)
                    const { title, content, tags, replies, upvotes, downvotes } = res.body
                    expect(title).to.be.a('string')
                    expect(title).to.equal(data.title)
                    expect(content).to.be.a('string')
                    expect(content).equal(data.content)
                    expect(tags).to.be.an('array')
                    expect(tags).to.deep.equal(data.tags)
                    expect(replies).to.be.an('array')
                    expect(upvotes).to.be.an('array')
                    expect(downvotes).to.be.an('array')
                    done()
                })
        })
        it('Success Delete Thread', function (done) {
            chai.request(app)
                .delete('/threads/' + slug)
                .set({ authorization: tigor })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
        })
    })
})