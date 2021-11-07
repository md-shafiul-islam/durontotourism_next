import axios from "axios";
import NextAuth from "next-auth";
import jwt_decode from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";

const COMMON_REQUEST_HEADER = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
};



const getCurrentUserBySessionOrToken = (jwtToken) =>{
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


        let actionUrl = `${process.env.NEXT_PUBLIC_BACKEND_CUSTOMER_LOGIN_URL}`;
        if(credentials.userStatus === "agent"){
          actionUrl = `${process.env.NEXT_PUBLIC_BACKEND_AGENT_LOGIN_URL}`;
        }

        const loginData = {
          username: credentials.username,
          password: credentials.password,
        };
        console.log("Curent URL ", actionUrl);
        const user = await axios.post(
          actionUrl,
          loginData,
          { headers: { COMMON_REQUEST_HEADER } }
        );

        let response = { token: undefined, success: false };
        if (user) {
          if (user.data) {
            response = user.data;
          } else {
            return response; 
          }
        }
        return response;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({token, user, account, isNewUser}) {
      
      if (user) {
        if (user.success) {
          token = { accessToken: user.token }
        }
      }
      
      return token;
    },

    async session({session, token}) {     
     
      session.accessToken = token.accessToken
      session.user = getCurrentUserBySessionOrToken(token.accessToken);
      return session;
    },

    async redirect({ url, baseUrl }) {
      return url;
    }
  },
});
