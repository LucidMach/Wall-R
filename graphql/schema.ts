/* TO-DO
  // register a bot in the database
  link bot in database with a user
*/
import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    "unique identifier for each user"
    id: Int!
    "email-id for user"
    email: String!
    "all bots connected/registered to the user"
    bots: [Bot!]
  }

  type Bot {
    "unique identifier for each bot"
    id: Int!
    "ultrasonic level in terms of percentage"
    fillPercent: Int!
    "battery full percentage"
    batteryPercent: Int!
    # status: Status!
    "list of users, the bot is registered to"
    users: [User!]
  }

  type User_Bot_Response {
    msg: String
    # user: User
  }

  type Query {
    "returns user details based on email-id... if user doesn't exist this query makes a new user in the database"
    getUser(email: String): User
  }

  type Mutation {
    "finds bot with id and updates fill status"
    updateBotFill(id: Int, fill: Int): Bot
    "registers a bot to a user with specified ID"
    linkBotWithUser(bot_id: Int, user_id: Int): User_Bot_Response
  }
`;
