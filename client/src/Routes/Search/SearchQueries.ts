import { gql } from "apollo-boost";

export const SEARCH = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      title
      user {
        id
        avatar {
          url
        }
        username
      }
      file {
        id
        url
        mimetype
      }
      likeCount
      isLiked
      createdAt
    }
  }
`;
