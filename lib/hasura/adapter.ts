import { get } from "lodash";

import {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";
import { Profile, Session, User } from "next-auth";
import { CreateUserMutation } from "lib/generated";
import {
  GET_VERIFICATION_REQUEST,
  GET_USER_BY_EMAIL_QUERY,
  GET_USER_BY_ACCOUNT,
  GET_SESSION_QUERY,
  GET_USER_QUERY,
} from "lib/graphql/queries";

import {
  CREATE_VERIFICATION_REQUEST,
  DELETE_USER_BY_PK,
  CREATE_SESSION,
  UPDATE_SESSION,
  DELETE_SESSION,
  UNLINK_ACCOUNT,
  LINK_ACCOUNT,
  CREATE_USER,
  UPDATE_USER,
} from "lib/graphql/mutations";

import { hasuraQuery } from ".";

const HasuraAdapter = (): Adapter => {
  return {
    async createUser(profile: Profile): Promise<AdapterUser> {
      return (
        (
          await hasuraQuery(CREATE_USER.loc?.source.body || "", {
            user: { ...profile },
          })
        )?.insert_users_one || null
      );
    },
    async getUser(id: string): Promise<AdapterUser | null> {
      return (
        (await hasuraQuery(GET_USER_QUERY.loc?.source.body || "", { id })).data
          .users[0] || null
      );
    },
    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      return (
        (
          await hasuraQuery(GET_USER_BY_EMAIL_QUERY.loc?.source.body || "", {
            email,
          })
        ).users[0] || null
      );
    },
    async getUserByAccount({
      provider,
      providerAccountId,
    }): Promise<AdapterUser | null> {
      const user = await hasuraQuery(
        GET_USER_BY_ACCOUNT.loc?.source.body || "",
        {
          provider,
          providerAccountId,
        }
      );

      if (user) return user;

      return null;
    },
    async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
      return (
        (
          await hasuraQuery(UPDATE_USER.loc?.source.body || "", {
            email: user.email,
            user: { ...user },
          })
        ).data.users[0] || null
      );
    },
    async deleteUser(userId: string) {
      return (
        (
          await hasuraQuery(DELETE_USER_BY_PK.loc?.source.body || "", {
            id: Number(userId),
          })
        ).data.users[0] || null
      );
    },
    async linkAccount(...account: any) {
      const [
        userId,
        providerId,
        providerType,
        providerAccountId,
        refreshToken,
        accessToken,
        accessTokenExpires,
      ] = account;
      const { users_by_pk } = await hasuraQuery(
        GET_USER_QUERY.loc?.source.body || "",
        { id: userId }
      );

      return (
        (
          await hasuraQuery(LINK_ACCOUNT.loc?.source.body || "", {
            account: {
              user_id: users_by_pk.user_id,
              provider_id: providerId,
              provider_type: providerType,
              provider_account_id: providerAccountId,
              refresh_token: refreshToken,
              access_token: accessToken,
              access_token_expires: accessTokenExpires,
            },
          })
        ).data?.insert_accounts_one || null
      );
    },
    async unlinkAccount({ provider, providerAccountId }) {
      return (
        (
          await hasuraQuery(UNLINK_ACCOUNT.loc?.source.body || "", {
            provider_id: provider,
            provider_account_id: providerAccountId,
          })
        ).data.users[0] || null
      );
    },
    async createSession(session: any) {
      return (
        (await hasuraQuery(CREATE_SESSION.loc?.source.body || "", { session }))
          .data.users[0] || null
      );
    },
    async getSessionAndUser(sessionToken: string) {
      const session = await hasuraQuery(
        GET_SESSION_QUERY.loc?.source.body || "",
        { sessionToken }
      );

      console.log(session, "session");

      if (session) return session;

      return null;
      // return (
      //   (
      //     await hasuraQuery({
      //       query: GET_SESSION_QUERY.loc?.source.body || "",
      //       variables: { sessionToken },
      //     })
      //   ).data.users[0] || null
      // );
    },
    async updateSession({ sessionToken }) {
      return (
        (
          await hasuraQuery(UPDATE_SESSION.loc?.source.body || "", {
            id: 1,
            session: { session_token: sessionToken },
          })
        ).data.users[0] || null
      );
    },
    async deleteSession(sessionToken: any) {
      return (
        (
          await hasuraQuery(DELETE_SESSION.loc?.source.body || "", {
            id: sessionToken.id,
          })
        ).data.users[0] || null
      );
    },
    async createVerificationToken(verificationToken: VerificationToken) {
      const { identifier, token } = verificationToken;
      return (
        (
          await hasuraQuery(
            CREATE_VERIFICATION_REQUEST.loc?.source.body || "",
            { object: { token, identifier } }
          )
        ).data.users[0] || null
      );
    },
    async useVerificationToken({ identifier, token }) {
      return (
        (
          await hasuraQuery(GET_VERIFICATION_REQUEST.loc?.source.body || "", {
            token,
            identifier,
          })
        ).data.users[0] || null
      );
    },
  };
};

export default HasuraAdapter;
