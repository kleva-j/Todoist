import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import jwt from "jsonwebtoken";
// import { JWTEncodeParams, JWT, JWTDecodeParams } from "next-auth/jwt";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    }),
    Providers.Instagram({
      clientId: process.env.INSTAGRAM_APP_ID,
      clientSecret: process.env.INSTAGRAM_APP_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // jwt: {
  //   encode: async (params: JWTEncodeParams | undefined) => {
  //     const { secret = "", token } = { ...params };
  //     const { id = "", name, email } = { ...token };
  //     const jwtClaims = {
  //       sub: id.toString(),
  //       name: name,
  //       email: email,
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
  //   decode: async (params: JWTDecodeParams | undefined) => {
  //     const { secret = "", token = "", maxAge } = { ...params };
  //     return jwt.verify(token, secret, { algorithms: ["HS256"] }) as JWT;
  //   },
  // },
});
