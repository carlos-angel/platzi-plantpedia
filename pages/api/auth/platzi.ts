import { NextApiHandler } from 'next'

const credentialsAuth: NextApiHandler<User> = (request, response) => {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  if (request.body.password === process.env.AUTH_PLATZI_SECRET) {
    const platziUser: User = {
      name: 'platzi student',
      email: 'student@platzi.com',
      image: 'platzi.png',
    }

    return response.status(200).json(platziUser)
  }

  return response.status(401).end()
}

export default credentialsAuth
