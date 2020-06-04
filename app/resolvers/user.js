'use strict'

const User = use('App/Models/User')
const slugify = require('slugify')

// Define resolvers

const Consultas = {
  // Fetch all users
  async allUsers () {
    console.log('entrou')
    const users = await User.all()
    return users.toJSON()
  },
  // Get a user by its ID
  async fetchUser (_, { id }) {
    const user = await User.find(id)
    return user.toJSON()
  },

}

const Funcoes = {
  // Handles user login
  async login (_, { email, password }, { auth }) {
    const { token } = await auth.attempt(email, password)
    return token
  },

  // Create new user
  async createUser (_, { username, email, password }) {
    return await User.create({ username, email, password })
  }
}

const UserSchema = {
  // Fetch all posts created by a user
  async posts (userInJson) {
    // Convert JSON to model instance
    const user = new User()
    user.newUp(userInJson)

    const posts = await user.posts().fetch()
    return posts.toJSON()
  }
}

const userResolver = {
  Consultas,
  Funcoes,
  UserSchema
}

module.exports = userResolver
