import axios from "axios";
import NextAuth from "next-auth";
import jwt_decode from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";

const COMMON_REQUEST_HEADER = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
};

const getCurrentUserBySessionOrToken = (jwtToken) => {
  if (jwtToken) {
    const decodedJwtToken = jwt_decode(jwtToken);
    return decodedJwtToken;
  }
  return {};
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        console.log("Login Credentials, ... ", credentials);

        let actionUrl = `${process.env.NEXT_PUBLIC_BACKEND_CUSTOMER_LOGIN_URL}`;
        if (credentials.userStatus === "agent") {
          actionUrl = `${process.env.NEXT_PUBLIC_BACKEND_AGENT_LOGIN_URL}`;
        }

        console.log("Action Url ", actionUrl, " Login ..., ");

        const loginData = {
          username: credentials.username,
          password: credentials.password,
        };

        let response = null;
        try {
          const user = await axios.post(actionUrl, loginData, {
            headers: COMMON_REQUEST_HEADER,
          });
          console.log("User Login Response, ", user);
          if (user) {
            if (user.data) {
              if (user.data.success) {
                return user.data;
              }
            }
          }
        } catch (error) {}
        console.log("Before Return Login User Response, ", response);
        return response;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      if (user) {
        if (user.success) {
          token = { accessToken: user.token };
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = getCurrentUserBySessionOrToken(token.accessToken);
      return session;
    },
  },
});
