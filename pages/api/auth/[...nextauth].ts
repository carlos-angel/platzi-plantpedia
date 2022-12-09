import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import Providers from 'next-auth/providers'

const options: NextAuthOptions = {
  theme: 'light',
  debug: true,
  session: {},
  jwt: {},
  providers: [
    Providers.Credentials({
      name: 'platzi',
      credentials: {
        password: {
          type: 'password',
          label: 'Nunca pares de...',
        },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-type': 'application/json',
          },
        })

        const user = await res.json()

        if (res.ok && user) {
          return user
        }

        return null
      },
    }),
  ],
}

export default NextAuth(options)
