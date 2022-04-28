import { gql } from "@apollo/client";

/*****************  QUERIES  **************** */

export const GET_USER_QUERY = gql`
  query getSingleUser($id: String!) {
    users_by_pk(id: $id) {
      id
      name
      email
      image
      user_id
      email_verified
      created_at
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query getUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_USER_BY_EMAIL_QUERY = gql`
  query getUserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      name
      email
    }
  }
`;

export const GET_USER_BY_PROVIDER_ACCOUNT_ID = gql`
  query getUserByProviderAccountId(
    $provider_account_id: String! = ""
    $provider_id: String! = ""
  ) {
    users(
      where: {
        _and: {
          accounts: {
            provider_account_id: { _eq: $provider_account_id }
            provider_id: { _eq: $provider_id }
          }
        }
      }
    ) {
      id
      name
      email
      accounts {
        provider_id
        provider_account_id
      }
    }
  }
`;

export const GET_USER_BY_ACCOUNT = gql`
  query getUserByAccount(
    $provider_account_id: String! = ""
    $provider_id: String! = ""
  ) {
    users(
      where: {
        _and: {
          accounts: {
            provider_account_id: { _eq: $provider_account_id }
            provider_id: { _eq: $provider_id }
          }
        }
      }
    ) {
      id
      name
      email
      accounts {
        provider_id
        provider_account_id
      }
    }
  }
`;

export const GET_SESSION_QUERY = gql`
  query getSession($sessionToken: String = "") {
    sessions(where: { session_token: { _eq: $sessionToken } }) {
      user_id
      expires
      created_at
      access_token
      session_token
    }
  }
`;

export const GET_VERIFICATION_REQUEST = gql`
  query getVerificationRequest($token: String = "", $identifier: String = "") {
    verification_requests(
      where: { token: { _eq: $token }, identifier: { _eq: $identifier } }
    ) {
      token
      expires
      identifier
    }
  }
`;
