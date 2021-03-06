const app = require('../src/server/server')
const port = 3000;
app.listen(port)
const supertest = require('supertest')
const request = supertest(app)

it('gets the test endpoint', async done => {
    const response = await request.get('/test')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
    done()
})