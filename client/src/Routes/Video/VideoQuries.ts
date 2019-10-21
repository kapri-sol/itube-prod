import { gql } from "apollo-boost";

export const GET_VIDEO = gql`
  query seePost($postId: String!) {
    seePost(postId: $postId) {
      id
      title
      content
      views
      likeCount
      isLiked
      createdAt
      user {
        id
        url
        username
        isSubscribe
        isSelf
      }
      file {
        url
        mimetype
      }
      comments {
        id
        user {
          url
          username
        }
        text
        updatedAt
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      username
      url
    }
  }
`;

export const ADD_VIEW = gql`
  mutation addView($postId: String!) {
    addView(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost($id: String!, $title: String!, $content: String!) {
    editPost(id: $id, title: $title, content: $content) {
      title
      content
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;
