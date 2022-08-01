const Blog = require('../models/blogs')

const initialBlogs = [
  {
    title: 'TEST',
    author: 'hello',
    url: 'test',
    content: 'test blogs',
    likes: 0
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'hello',
    url: 'browser',
    content: 'browser can...',
    likes: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'Save Something',
    author: 'hello',
    url: 'save',
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}