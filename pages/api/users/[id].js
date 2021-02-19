import { Schema, model, connect, exports } from 'mongoose';

const uri = process.env.DB_URI

// Schema and Model
const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  apellido: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
}, { timestamps: true });

const User = model('User', userSchema);


connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)



module.exports = async function (req, res , {params}) {
    console.log(params)
  if (req.method === 'GET') {
    User.findById(params.id)
      .then(people => {
        res.status(200).json(people);
      })
      .catch(error => res.status(500).json(error.message))
  }
};
