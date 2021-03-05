import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../database'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {

    if (req.method === 'POST') {
      const db = await connectToDatabase();
      const collection = await db.collection("pacients")

      const id = req.body.idMedico
      const pacients = await collection.find({ idMedico: ObjectId(id) }).toArray();

      res.status(200).json({ pacients });
    } else {
      // Not Signed in
      res.status(401)
    }
  }
}
