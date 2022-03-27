import { createServer } from "@graphql-yoga/node";

import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../graphql/context";
import { NextApiRequest, NextApiResponse } from "next";

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  cors: {
    credentials: true,
    origin: ["http://localhost:3000", "https://wallr.vercel.app/"],
  },
  endpoint: "/api/graphql",
  schema: { typeDefs, resolvers },
  context: createContext,
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default server.requestListener;
