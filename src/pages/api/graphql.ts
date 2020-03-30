import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    firstName: String
    lastName: String
  }
`

const resolvers = {
  Query: {
    users(_parent, _args, _context) {
      return [{ firstName: 'Next', lastName: 'js' }, {firstName: 'hoge', lastName: 'hoge'}]
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
