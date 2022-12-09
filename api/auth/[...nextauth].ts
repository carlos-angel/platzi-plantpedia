import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'

const options: NextAuthOptions = {
  theme: 'light',
  debug: true,
  session: {},
  jwt: {},
  providers: [],
}

export default NextAuth(options)
