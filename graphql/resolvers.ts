export const resolvers = {
  Query: {
    signUserIn: async (parent, { email }, ctx) => {
      // finding user with emailid
      const user = await ctx.prisma.users.findUnique({
        where: {
          email,
        },
      });

      // if email found
      if (user) return user;
      // if no email found
      else {
        const newUser = await ctx.prisma.users.create({
          data: {
            email,
          },
        });
        return newUser;
      }
    },
  },
};
