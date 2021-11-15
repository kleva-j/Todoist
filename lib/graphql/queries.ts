import gql from "graphql-tag";

export const GET_USER_QUERY = gql`
  query getUser($id: uuid!) {
    users_by_pk(id: $id) {
      created_at
      id
      last_seen
      name
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query getUsers {
    users {
      id
      last_seen
      created_at
      name
    }
  }
`;