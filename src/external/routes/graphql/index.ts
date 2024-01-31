import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type User {
    email: String
    name: String
  }

  type Query {
    user: [User]
  }
  type Mutation {
    create(email: String, name: String): String
  }
`;

export const listenGraphQL = async (resolvers, port: number) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port }
  });
  console.log(`🚀  Server ready at: ${url}`);
};
