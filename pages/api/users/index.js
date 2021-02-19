import { Schema, model, connect, exports } from 'mongoose';
const User = require('../../../schemas/user.model').default;
const uri = process.env.DB_URI

connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)

module.exports = async function (req, res) {
  if (req.method === 'GET') {
    User.find()
      .then(people => {
        res.status(200).json(people);
    
      })
      .catch(error =>  {
        res.status(500).json(error.message)
      }
      )
  }
};
