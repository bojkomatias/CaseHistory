const mongoose = require('mongoose')

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

const User = mongoose.model('User', userSchema);


mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  function (error) { if (error) console.log("Error!" + error); }
);

export default (req, res) => {
  if (req.method === 'GET') {
    User.find().then(users => { res.status(200).json(users); 
    }).catch(error => res.status(500).json(error.message))
  }
}
