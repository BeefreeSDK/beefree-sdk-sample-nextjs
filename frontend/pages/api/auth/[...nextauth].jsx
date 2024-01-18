import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { login } from "../../../utils/api_functions"
import { stringify } from "querystring"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            //   const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
            // If no error and we have user data, return it
            if (res.ok && user) {
                return user
            }
            // Return null if user data could not be retrieved
            return null
        }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    }
  },
}
export default NextAuth(authOptions)