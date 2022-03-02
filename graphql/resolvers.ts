import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    getUser: async (parent, { email }, ctx) => {
      // finding user with emailid
      const user = await ctx.prisma.users.findUnique({
        where: {
          email,
        },
      });
      const user_bots = await prisma.user_Bots.findMany({
        where: {
          user_id: user.id,
        },
      });

      var bots = [];
      for (let index = 0; index < user_bots.length; index++) {
        const bot = await prisma.bots.findUnique({
          where: {
            id: user_bots[index].bot_id,
          },
        });
        bots.push(bot);
      }

      const user_with_bots = { id: user.id, email: user.email, bots: bots };
      // if email found
      if (user) return user_with_bots;
      else {
        // creating a user from gql context
        const newUser = await ctx.prisma.users.create({
          data: {
            email,
          },
        });
        return newUser;
      }
    },
  },

  Mutation: {
    updateBotFill: async (parent, { id, fill }, ctx) => {
      // finding and updating the bot's fill percentage
      const botFound = await ctx.prisma.bots.findUnique({
        where: { id },
      });
      if (botFound) {
        const bot = await ctx.prisma.bots.update({
          where: {
            id,
          },
          data: {
            fillPercent: fill,
          },
        });
        return bot;
      }
      // if bot not found
      const newBot = await ctx.prisma.bots.create({
        data: {
          id,
          fillPercent: fill,
          batteryPercent: 100,
        },
      });
      return newBot;
    },

    linkBotWithUser: async (parent, { bot_id, user_id }, ctx) => {
      /*
      CLIENT GQL:
        mutation LinkBotWithUser($botId: Int, $userId: Int) {
          linkBotWithUser(bot_id: $botId, user_id: $userId) {
            msg
          }
        }
      */
      //  const alreadyLinked = await prisma.user_Bots.findUnique({
      //    where: {
      //      user_id_bot_id:
      //    }
      //  })
      const foundBot = await ctx.prisma.bots.findUnique({
        where: { id: bot_id },
      });
      const foundUser = await ctx.prisma.users.findUnique({
        where: { id: user_id },
      });
      if (!foundUser && !foundBot) return { msg: "USER_ID && BOT_ID INVALID" };
      if (!foundUser) return { msg: "USER_ID INVALID" };
      if (!foundBot) return { msg: "BOT_ID INVALID" };
      await ctx.prisma.bots.update({
        where: { id: bot_id },
        data: {
          users: {
            create: { user_id },
          },
        },
      });
      return { msg: "SUCCESS" };
    },
  },
};
