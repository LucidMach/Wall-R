import { ApolloServer } from "apollo-server-micro";

import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../graphql/context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});
const startServer = server.start(); //creating an instance of server.start() outside the request handler LOOP

export default async function handler(req, res) {
  // manually setting cors
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // rejecting HTTP OPTIONS requests
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
