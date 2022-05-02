import { get } from "lodash";

import {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";
import { Profile, Session, User, Account } from "next-auth";
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
      const { name, email, emailVerified: email_verified, image } = profile;
      const newUser = await hasuraQuery(CREATE_USER.loc?.source.body || "", {
        user: { name, email, email_verified, image },
      });

      if (newUser) return newUser["insert_users_one"];

      throw new Error("[createUser] Failed to create user");
    },
    async getUser(id: string): Promise<AdapterUser | null> {
      return (
        (await hasuraQuery(GET_USER_QUERY.loc?.source.body || "", { id })).data
          .users[0] || null
      );
    },
    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const result = await hasuraQuery(
        GET_USER_BY_EMAIL_QUERY.loc?.source.body || "",
        {
          email,
        }
      );

      const users = result?.users;

      if (users && users.length) return users[0];

      return null;
    },
    async getUserByAccount({
      provider,
      providerAccountId,
    }): Promise<AdapterUser | null> {
      const result = await hasuraQuery(
        GET_USER_BY_ACCOUNT.loc?.source.body || "",
        {
          provider_id: provider,
          provider_account_id: providerAccountId,
        }
      );

      const accounts = result?.accounts as any[] | undefined;

      if (accounts && accounts.length) {
        return accounts[0]["user"];
      }

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
    async linkAccount(account: Account) {
      const {
        provider,
        type,
        providerAccountId,
        access_token,
        expires_at,
        scope,
        token_type,
        id_token,
        userId,
      } = account;
      const id = Number(userId);
      const expirationTime = Number(expires_at) * 1000;
      const userQuery = GET_USER_QUERY.loc?.source.body || "";
      const accountQuery = LINK_ACCOUNT.loc?.source.body || "";
      const { users_by_pk } = await hasuraQuery(userQuery, { id });
      const { insert_accounts_one } = await hasuraQuery(accountQuery, {
        account: {
          scope,
          token_type,
          id_token,
          user_id: users_by_pk.user_id,
          provider_id: provider,
          provider_type: type,
          provider_account_id: providerAccountId,
          access_token,
          access_token_expires: new Date(expirationTime).toISOString(),
        },
      });
      if (insert_accounts_one) return insert_accounts_one;

      return null;
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
    async createSession(param) {
      const { sessionToken, userId, expires } = param;
      const id = Number(userId);

      const userQuery = GET_USER_QUERY.loc?.source.body || "";
      const sessionQuery = CREATE_SESSION.loc?.source.body || "";

      const { users_by_pk } = await hasuraQuery(userQuery, { id });
      const { insert_sessions_one } = await hasuraQuery(sessionQuery, {
        session: {
          expires,
          user_id: users_by_pk.user_id,
          session_token: sessionToken,
        },
      });

      if (insert_sessions_one) {
        const { id, sessionToken } = insert_sessions_one;
        return { id, userId, expires, sessionToken  };
      };

      throw new Error("[createSession] Failed to create session");
    },
    async getSessionAndUser(sessionToken) {
      if (sessionToken) {
        const { sessions } = await hasuraQuery(
          GET_SESSION_QUERY.loc?.source.body || "",
          { sessionToken }
        );

        console.log({ sessions }, "getUSerSession <><><><><><><><>");

        if (sessions.length) return sessions[0];

        return null;
      }

      return null;
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
