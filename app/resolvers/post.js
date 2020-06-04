'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')
const slugify = require('slugify')

const Consultas = {
// Fetch all posts
  async allPosts () {
    const posts = await Post.all()
    return posts.toJSON()
  },
  // Get a post by its ID
  async fetchPost (_, { id }) {
    const post = await Post.find(id)
    return post.toJSON()
  }
}

const Funcoes = {
  // Add a new post
  async addPost (_, { title, content }, { auth }) {
    try {
      // Check if user is logged in
      await auth.check()

      // Get the authenticated user
      const user = await auth.getUser()

      // Add new post
      return await Post.create({
        user_id: user.id,
        title,
        slug: slugify(title, { lower: true }),
        content
      })
    } catch (error) {
      // Throw error if user is not authenticated
      throw new Error('Missing or invalid jwt token')
    }
  }
}

const PostSchema = {
  // Fetch the author of a particular post
  async user (postInJson) {
    // Convert JSON to model instance
    const post = new Post()
    post.newUp(postInJson)

    const user = await post.user().fetch()
    return user.toJSON()
  }
}


const userResolver = {
  Consultas,
  Funcoes,
  PostSchema
}

module.exports = userResolver
