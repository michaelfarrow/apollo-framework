const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { formatError } = require('apollo-errors')
const schema = require('./schema')

const myGraphQLSchema = {}
const PORT = 80

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ formatError, schema}))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT)
