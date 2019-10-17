import { prisma } from "../../../generated/prisma-client";
import { getExtOfFile } from "../../utils/fileManage";
import "../../env";

export default {
  File: {
    url: async ({ id }) => {
      const file = await prisma.file({ id });
      try {
        if (file) {
          const { id, filename } = file;
          const url =
            // "http://localhost:4000/" +
            // mimetype +
            // "/" +
            // createdAt.substring(0, 4) +
            // "/" +
            // createdAt.substring(5, 7) +
            // "/" +
            // createdAt.substring(8, 10) +
            // "/" +
            process.env.STORAGE_URL + "/" + id + getExtOfFile(filename);
          console.log(url);
          return url;
        } else {
          return "null";
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }
};
