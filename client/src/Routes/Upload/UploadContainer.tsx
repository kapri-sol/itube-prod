import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";
import UploadPresenter from "./UploadPresenter";
import { CREATE_FILE, CREATE_POST } from "./UploadQueries";
import axios from "axios";

export default () => {
  const [file, setFile] = useState();
  const [fileId, setFileId] = useState("");
  const [loading, setLoading] = useState(true);
  const title = useInput("");
  const content = useInput("");
  const [createPost] = useMutation(CREATE_POST);
  const [createFile] = useMutation(CREATE_FILE, {
    // tslint:disable-next-line:no-shadowed-variable
    async onCompleted({ createFile }) {
      setFileId(createFile.id);
      upload(createFile.id);
    }
  });

  const upload = async createdFileId => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const req = await axios.post(
        "http://localhost:4000/api/upload",
        // "https://peaceful-earth-90998.herokuapp.com/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            fileId: createdFileId
          }
        }
      );
      if (req) {
        setLoading(false);
      }
      console.log(req);
    } catch (err) {
      console.log(err);
    }
  };

  // tslint:disable-next-line:no-shadowed-variable
  const onDrop = async ([file]) => {
    await setFile(file);
    createFile({
      variables: {
        filename: file.name,
        mimetype: file.type
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const onSubmit = async e => {
    e.preventDefault();
    console.log(fileId);
    if (fileId !== "" && title.value !== "" && content.value !== "") {
      createPost({
        variables: {
          title: title.value,
          content: content.value,
          fileId
        }
      });
      window.location.replace("/");
    } else if (file === "") {
      toast.error("동영상을 넣어주세요");
    } else {
      toast.error("상세정보를 완전히 작성해 주세요");
    }
  };
  return (
    <UploadPresenter
      onSubmit={onSubmit}
      onDrop={onDrop}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      file={file}
      loading={loading}
      title={title}
      content={content}
    />
  );
};
