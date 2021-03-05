import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../database'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    if (req.method === 'GET') {
      const db = await connectToDatabase();

      const patient = await db
        .collection("pacients")
        .findOne({ _id: ObjectId(req.query.id) })



      res.json({ patient })
    } else {
      // Not Signed in
      res.status(401)
    }
  }
}
