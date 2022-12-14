import { random } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth/client'

type Data =
  | {
      data: string
      time: number
    }
  | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'invalid credentials' })
  }

  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'page not found' })
  }

  res.status(200).json({
    data: `https://randomfox.ca/images/${random(1, 122)}.jpg`,
    time: new Date().getTime(),
  })
}
