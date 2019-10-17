import { prisma } from "../../../../generated/prisma-client";
// import fs, { createWriteStream } from "fs";
// import { uploadPath } from "../../../../upload";
// import { filePreview, getExtOfFile } from "../../../utils/fileManage";
import { s3 } from "../../../utils/upload";
import { getExtOfFile } from "../../../utils/fileManage";
// import path from "path";

export default {
  Mutation: {
    createFile: async (_, { file }) => {
      const {
        filename,
        mimetype,
        encoding,
        createReadStream
      } = await file.then(value => {
        return value;
      });

      const File = await prisma.createFile({ filename, mimetype, encoding });

      try {
        s3.putObject(
          {
            Bucket: "itube-storage",
            Key: File.id + getExtOfFile(filename),
            ACL: "public-read",
            Body: createReadStream(),
            ContentType: mimetype
          },
          (err, data) => {
            console.log(err);
            console.log(data);
          }
        );
        //   const day = File.createdAt;
        //   const dayPath =
        //     day.substring(0, 4) +
        //     "/" +
        //     day.substring(5, 7) +
        //     "/" +
        //     day.substring(8, 10);
        //   const dirPath = await path.join(uploadPath, mimetype, dayPath);
        //   console.log(dirPath);
        //   const result = await fs.mkdirSync(dirPath, { recursive: true });
        //   console.log(result);
        //   let readStream = await createReadStream();
        //   const fileName = File.id + getExtOfFile(filename);
        //   const filePath = dirPath + "/" + fileName;
        //   let writeStream = await createWriteStream(filePath);

        //   if (mimetype.substring(0, 5) === "video") {
        //     await readStream
        //       .pipe(writeStream)
        //       .on("finish", async () => filePreview(filePath, File.id, dirPath));
        //   } else {
        //     await readStream.pipe(writeStream);
        //   }
        return File;
      } catch (err) {
        console.log(err);
        if (File) await prisma.deleteFile({ id: File.id });
        return null;
      }
    }
  }
};
