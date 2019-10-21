import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Operation
} from "apollo-boost";
import { defaults, resolvers } from "./LocalState";
import { createUploadLink } from "apollo-upload-client";
import { withClientState } from "apollo-link-state";
import { onError } from "apollo-link-error";
import { toast } from "react-toastify";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      "X-JWT": getToken()
    }
  });
  return forward(operation);
});

// export const host = "https://peaceful-earth-90998.herokuapp.com";
export const host = "http://localhost:4000";
const uri = host + "/graphql";

const uploadLink = createUploadLink({ uri });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults,
  resolvers
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, localStateLink, authMiddleware, uploadLink])
});

export default client;
