import { gql } from "apollo-boost";

export const ME = gql`
  query me {
    me {
      id
      url
      username
      firstName
      email
    }
  }
`;

export const EDIT = gql`
  mutation editUser(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $filename: String
    $mimetype: String
  ) {
    editUser(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      filename: $filename
      mimetype: $mimetype
    ) {
      id
    }
  }
`;

export const CH_PASS = gql`
  mutation changePassword($password: String!, $newPassword: String!) {
    changePassword(password: $password, newPassword: $newPassword)
  }
`;
