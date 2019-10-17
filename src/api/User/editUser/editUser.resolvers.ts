import { prisma } from "../../../../generated/prisma-client";
import fileCreate from "../../Post/createFile/createFile.resolvers";

export default {
  Mutation: {
    editUser: async (_, args, { req }) => {
      const { username, email, firstName, lastName, filename, mimetype } = args;
      const { user } = req;

      if (filename && mimetype) {
        const {
          Mutation: { createFile }
        } = fileCreate;
        const File = await createFile(_, { filename, mimetype });

        if (File) {
          const { id } = File;
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              avatar: { connect: { id } }
            }
          });
        }
      }

      const editedUser = await prisma.updateUser({
        where: { id: user.id },
        data: {
          username,
          email,
          firstName,
          lastName
        }
      });

      return editedUser;
    }
  }
};
