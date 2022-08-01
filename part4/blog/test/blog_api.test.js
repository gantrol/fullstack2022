const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogs')

const blogsApi = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 10000)


describe('when there is initially some blogs saved', () => {
  test('add a blog', async () => {
    const newContent = 'new a blog'
    const newBlog = {
      title: 'new Blog',
      author: 'test',
      url: 'new',
      content: newContent
    }
    const res = await api
      .post(blogsApi)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(blog => blog.content)
    expect(contents).toContain(newContent)
    expect(res.body.likes).toEqual(0)
  })
  
  test('add a blog without title', async () => {
    const newBlog = {
      author: 'test',
      url: 'new',
      content: 'newContent'
    }
    await api
      .post(blogsApi)
      .send(newBlog)
      .expect(400)
  })

  test('add a blog without url', async () => {
    const newBlog = {
      author: 'test',
      title: 'new',
      content: 'newContent'
    }
    await api
      .post(blogsApi)
      .send(newBlog)
      .expect(400)
  })
})

describe('when viewing blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get(blogsApi)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('check id is defined', async () => {
    const res = await api.get(blogsApi)
    expect(res.body[0].id).toBeDefined()
  })
})

describe('delete blogs', () => {
  test('delelte by id', async() => {
    const res = await api.get(blogsApi)
    const blog = res.body[0]
    await api
      .delete(`${blogsApi}/${blog.id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  })

  test('delelte by id not validate', async() => {
    const res = await api.get(blogsApi)
    const blog = res.body[0]
    await api
      .delete(`${blogsApi}/${blog.id}a`)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})