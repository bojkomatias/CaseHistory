import cookie from 'js-cookie'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase } from '../../../database'


const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  callbacks: {
    async session(session) {
      const db = await connectToDatabase()
      const collection = await db.collection("users")

      const email = session.user.email
      const user = await collection.findOne({ email })
      const res = await user

      if (await res !== null) {
        session['user'] = { ...session.user, _id: res._id }
        return { ...session }
      }
      else {
        // cookie.remove('next-auth.csrf-token')
        return null
      }
    },
  }

  // A database is optional, but required to persist accounts in a database

}

export default (req, res) => NextAuth(req, res, options);
