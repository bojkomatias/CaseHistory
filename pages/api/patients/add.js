import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../database'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    if (req.method === 'POST') {
      const db = await connectToDatabase();

      const patient = { ...req.body, idMedico: ObjectId(session.user._id) }

      const insertPatient = await db
        .collection("patients")
        .insertOne(patient)

      res.json({ insertPatient })
    } else {
      // Not Signed in
      res.status(401)
      res.end()
    }
  }
}
