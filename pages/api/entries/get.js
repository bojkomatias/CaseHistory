import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../database'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    if (req.method === 'POST') {
      const db = await connectToDatabase();

      const id = req.body._id
      const entries = await db
        .collection("entries")
        .find({ patientId: ObjectId(id) })
        .toArray();

      res.status(200).json({ entries });
    } else {
      // Not Signed in
      res.status(401)
    }
  }
}
