const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
let api;

beforeAll(() => {
  api = supertest(app)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})