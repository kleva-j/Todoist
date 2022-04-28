import { gql } from "@apollo/client";

/*****************  MUTATIONS  **************** */

export const CREATE_USER = gql`
  mutation createUser($user: users_insert_input!) {
    insert_users_one(object: $user) {
      id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUserByEmail($email: String!, $user: users_set_input!) {
    update_users(where: { email: { _eq: $email } }, _set: $user) {
      returning {
        id
        name
        email
        updated_at
      }
    }
  }
`;

export const UPDATE_USER_BY_PK = gql`
  mutation updateUserByPk($id: String!, $user: users_set_input = {}) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $user) {
      id
      name
      email
      updated_at
    }
  }
`;

export const DELETE_USER_BY_EMAIL = gql`
  mutation deleteUserByEmail($email: String!) {
    delete_users(where: { email: { _eq: $email } }) {
      returning {
        id
        name
        email
      }
    }
  }
`;

export const DELETE_USER_BY_PK = gql`
  mutation deleteUserByPk($id: String!) {
    delete_users_by_pk(id: $id) {
      id
      name
      email
    }
  }
`;

export const LINK_ACCOUNT = gql`
  mutation linkAccount($account: accounts_insert_input!) {
    insert_accounts_one(object: $account) {
      id
      user_id
      provider_id
      provider_type
      provider_account_id
      refresh_token
      access_token
      access_token_expires
    }
  }
`;

export const UNLINK_ACCOUNT = gql`
  mutation unlinkAccount(
    $user_id: uuid = "",
    $provider_id: String = "",
    $provider_account_id: String = ""
  ) {
    delete_accounts(
      where: {
        user_id: { _eq: $user_id }
        provider_account_id: { _eq: $provider_account_id }
        provider_id: { _eq: $provider_id }
      }
    ) {
      returning {
        id
        user_id
        provider_id
        provider_account_id
      }
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation createSession($session: sessions_insert_input!) {
    insert_sessions_one(object: $session) {
      id
      user_id
      expires
      session_token
      access_token
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation deleteSessionById($id: Int!) {
    delete_sessions(where: { id: { _eq: $id } }) {
      returning {
        id
        user_id
        expires
        session_token
        access_token
      }
    }
  }
`;

export const UPDATE_SESSION = gql`
  mutation updateSession($id: Int!, $session: sessions_set_input!) {
    update_sessions(where: { id: { _eq: $id } }, _set: $session) {
      returning {
        id
        user_id
        expires
        session_token
        access_token
      }
    }
  }
`;

export const CREATE_VERIFICATION_REQUEST = gql`
  mutation createVerificationRequest(
    $object: verification_requests_insert_input = {}
  ) {
    insert_verification_requests_one(object: $object) {
      id
      token
      expires
      identifier
      created_at
      updated_at
    }
  }
`;

export const DELETE_VERIFICATION_REQUEST = gql`
  mutation deleteVerificationRequest(
    $identifier: String = ""
    $token: String = ""
  ) {
    delete_verification_requests(
      where: { identifier: { _eq: $identifier }, token: { _eq: $token } }
    ) {
      returning {
        id
        token
        expires
      }
    }
  }
`;

export const DELETE_VERIFICATION_REQUEST_BY_PK = gql`
  mutation deleteVerificationRequestByPk($id: Int!) {
    delete_verification_requests_by_pk(id: $id) {
      id
      token
      identifier
    }
  }
`;
