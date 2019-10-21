import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addView: async (_, { postId }) => {
      try {
        const view = await prisma.post({ id: postId }).views();
        await prisma.updatePost({
          where: { id: postId },
          data: { views: view + 1 }
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
};
