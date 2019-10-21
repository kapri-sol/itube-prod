import { gql } from "apollo-boost";

export const CREATE_FILE = gql`
  mutation createFile($filename: String!, $mimetype: String!) {
    createFile(filename: $filename, mimetype: $mimetype) {
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($fileId: String!, $title: String!, $content: String!) {
    createPost(fileId: $fileId, title: $title, content: $content) {
      id
    }
  }
`;
