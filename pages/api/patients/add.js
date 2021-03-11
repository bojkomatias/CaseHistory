import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../database'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    if (req.method === 'POST') {
      const db = await connectToDatabase();

      const patient = { ...req.body, idMedico: ObjectId(session.user._id), createdAt: new Date() }



      const filter = { _id: ObjectId(patient._id) }
      delete patient._id
      const doc = {
        $set: patient
      }
      const options = { upsert: true }

      const result = await db.collection("patients").updateOne(filter, doc, options)

      res.json({ result })
    } else {
      // Not Signed in
      res.status(401)
      res.end()
    }
  }
}
