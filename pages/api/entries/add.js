import { ObjectId, Timestamp } from 'mongodb';
import { connectToDatabase } from '../../../database'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    if (req.method === 'POST') {
      const db = await connectToDatabase();

      req.body.patientId = ObjectId(req.body.patientId)
      const entry = { ...req.body, createdAt: new Date() }

      const insertEntry = await db
        .collection("entries")
        .insertOne(entry)

      res.json({ insertEntry })
    } else {
      // Not Signed in
      res.status(401)
    }
  }
}
