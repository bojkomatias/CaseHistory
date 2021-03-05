import { MongoClient } from 'mongodb'
var cachedb = null;

export const connectToDatabase = async () => {
    if (cachedb) {
        return Promise.resolve(cachedb)
    } else {
        return MongoClient.connect(process.env.DB_URI, { native_parser: true, useUnifiedTopology: true })
            .then((client) => {
                let db = client.db("test")
                cachedb = db
                return cachedb
            })
            .catch((error) => console.log(error))
    }
}