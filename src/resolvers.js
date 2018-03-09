const _ = require('lodash')
const { createResolver } = require('apollo-resolvers')
const { createError, isInstance } = require('apollo-errors')

const {UnknownError, UnauthorizedError, AlreadyAuthenticatedError, ForbiddenError} = require('./errors')

const extend = (parent, resolver) => {
  return { parent, resolver}
}

const resolvers = {

  // User is not logged in
  notAuthenticated: (root, args, context) => {
    const { user } = context
    if (user) throw new AlreadyAuthenticatedError()
  },

  // User is logged in
  authenticated: (root, args, context) => {
    const { user } = context
    if (!user) throw new UnauthorizedError()
  },

  // User has admin permissions
  admin: extend('authenticated', (root, args, context) => {
    const { user } = context
    if (!iser.isAdmin) throw new ForbiddenError()
  })

}

const baseResolver = createResolver(
  null,
  (root, args, context, err) => {
    if (isInstance(err)) {
      return err
    }
    return new UnknownError({
      data: {
        name: err.name
      }
    })
  }
)

module.exports = _(resolvers)

  // Create base resolvers
  .mapValues(root => _.isFunction(root) ? baseResolver.createResolver(root) : root)

  // Create dependent resolvers
  .thru(resolvers => _.mapValues(resolvers, root => {
    if (_.isPlainObject(root)) {
      const { parent, resolver } = root
      return resolvers[parent].createResolver(resolver)
    }
    return root
  }))

  .value()
