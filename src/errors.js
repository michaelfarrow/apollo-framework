const mapValues = require('lodash/mapValues')
const { createError } = require('apollo-errors')

const errors = {

  // Mask any internal errors
  UnknownError: {
    message: 'An unknown error has occured'
  },

  // User should be logged in but isn't
  UnauthorizedError: {
    message: 'You must be logged in to do that'
  },

  // User is already logged in
  AlreadyAuthenticatedError: {
    message: 'You are already logged in'
  },

  // User is trying to perform a function beyond their permission level
  ForbiddenError: {
    message: 'You are not allowed to do that'
  }

}

module.exports = mapValues(
  errors,
  (options, name) => createError(name, options)
)
