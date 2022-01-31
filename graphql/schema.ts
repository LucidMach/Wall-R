import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    bots: [Bot!]
  }

  type Bot {
    id: ID!
    fillPercent: Int!
    batteryPercent: Int!
    # status: Status!
    users: [User!]
  }

  type Query {
    "takes an email-id, signs the user up if email doesn't exist in records else logs user in"
    signUserIn(email: String): User
  }
`;
