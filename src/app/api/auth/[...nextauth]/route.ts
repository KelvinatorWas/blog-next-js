import { DB_ADMINS, linkComb } from "@/utils/ServerLinks";
import { uploadData } from "@/utils/Crud";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
 
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        

        const user = await uploadData(DB_ADMINS, {...credentials});
        
        if (credentials?.username === user.username) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          
          return null 
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
      }
    }),
  ],
  callbacks: {
    redirect: async ({url, baseUrl}) => {
      return url.startsWith(baseUrl) ? url : linkComb(baseUrl, url);
    },
  },
  
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
