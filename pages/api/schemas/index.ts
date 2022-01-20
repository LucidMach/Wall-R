import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    emailid: ID!
    bots: [Bot!]!
  }

  type Bot {
    id: ID!
    full: Int
  }

  type Query {
    getUser(userId: ID!): User
  }

  enum Status {
    BOT_NOT_FOUND
    SUCCESS
  }

  type UpdateBotMutationResponse {
    status: Status!
  }

  type Mutation {
    updateBot(botId: ID!, fillpercent: Int = 0): UpdateBotMutationResponse
  }
`;
