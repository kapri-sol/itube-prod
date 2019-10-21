import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      const { term } = args;
      return prisma.posts({
        where: {
          OR: [
            { title_contains: term },
            { content_contains: term },
            {
              user: {
                username_contains: term
              }
            }
          ]
        }
      });
    }
  }
};
