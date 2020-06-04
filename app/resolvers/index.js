'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')

const slugify = require('slugify')

const userResolver = use('App/resolvers/user')
const postResolver = use('App/resolvers/post')

// Define resolvers
const resolvers = {
  Query: {
    ...userResolver.Consultas,
    ...postResolver.Consultas
  },

  Mutation: {
    ...userResolver.Funcoes,
    ...postResolver.Funcoes
  },
  User: {...userResolver.UserSchema}, // Para pegar o relacionamento
  Post: {...postResolver.PostSchema} // para pegar o relacionamento
}

module.exports = resolvers
