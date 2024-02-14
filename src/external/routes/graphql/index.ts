import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


export const listenGraphQL = async (resolvers: any[], typeDefs: string[], port: number) => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port }
  });
  console.log(`🚀  Server ready at: ${url}/graphql`);
};
