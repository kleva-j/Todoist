import { JWT, JWTEncodeParams, JWTDecodeParams } from "next-auth/jwt";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import NextAuth, { Account } from "next-auth";

import InstagramProvider from "next-auth/providers/instagram";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import HasuraAdapter from "lib/hasura/adapter";

import jwt from "jsonwebtoken";

import "firebase/firestore";
import { FirebaseAdapter } from "lib/firebase";
import { refreshAccessToken } from "../../../utils";

const publicJwtSecret = JSON.parse(process.env.AUTH_PUBLIC_KEY || "");
const jwtSecret = JSON.parse(process.env.AUTH_PRIVATE_KEY || "");
const secret = process.env.SECRET || "";

const firebaseConfig = {
  apiKey: "AIzaSyAlHVAqn3-CO-b4LyrH6nC0PKz-6Pc3T9Q",
  authDomain: "taskaider.firebaseapp.com",
  projectId: "taskaider",
  storageBucket: "taskaider.appspot.com",
  messagingSenderId: "946794337153",
  appId: "1:946794337153:web:967448012fa4e191e78e80",
  measurementId: "G-R4G9V8S6L6",
};

const firebaseApps = getApps();

const firestore = getFirestore(
  firebaseApps[0] ?? initializeApp(firebaseConfig)
);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: { signIn: "/auth/signin" },
  session: { strategy: "jwt" },
  debug: true,
  secret,
  // jwt: {
  //   encode: async ({ secret, token }: JWTEncodeParams) => {
  //     const id = token?.sub?.toString() || "";
  //     const jwtClaims = {
  //       sub: id,
  //       name: token?.name,
  //       email: token?.email,
  //       picture: token?.picture,
  //       iat: Date.now() / 1000,
  //       exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  //       "https://hasura.io/jwt/claims": {
  //         "x-hasura-allowed-roles": ["user"],
  //         "x-hasura-default-role": "user",
  //         "x-hasura-role": "user",
  //         "x-hasura-user-id": id,
  //       },
  //     };
  //     return jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
  //   },
  //   decode: async ({ secret, token = "" }: JWTDecodeParams) =>
  //     jwt.verify(token, secret, {
  //       algorithms: ["HS256"],
  //     }) as JWT,
  // },
  // callbacks: {
  //   jwt: async ({ token, user, account }) => {
  //     if (account && user) {
  //       const expires_in = account?.expires_at as number;
  //       return {
  //         ...user,
  //         ...token,
  //         accessToken: account.access_token,
  //         refreshToken: account.refresh_token,
  //         username: account.providerAccountId,
  //         accessTokenExpires: Date.now() + expires_in * 1000,
  //       };
  //     }

  //     return refreshAccessToken({ refresh_token: account?.refreshToken });
  //   },
  //   session: async ({ session, user, token }) =>
  //     Promise.resolve({
  //       ...session,
  //       id: user.id,
  //       token: jwt.sign(token, secret, { algorithm: "HS256" }),
  //     }),

  //   redirect: async ({ url, baseUrl }) => {
  //     if (url === "/api/auth/signin") {
  //       return Promise.resolve("/profile");
  //     }
  //     return Promise.resolve("/api/auth/signin");
  //   },
  // },

  adapter: HasuraAdapter(),
  // adapter: FirebaseAdapter(firebaseApps[0] ?? initializeApp(firebaseConfig)),
});
