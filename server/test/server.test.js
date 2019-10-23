const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const app = require('../app')
const expect = chai.expect

describe('Server Test', function () {
    it('Success Server Test', function (done) {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
    })
})