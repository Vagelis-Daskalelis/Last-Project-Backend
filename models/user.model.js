const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
require('dotenv').config()

//app.use(bodyParser.urlencoded({extended:false}));

//app.use(bodyParser.json());

const Schema = mongoose.Schema

let userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required field'],
    maxLength: 20,
    unique: true,
    trim: true,
    lowercase: true 
  },
  password: {
    type: String, 
    required: [true, 'Password is required field'],
    maxLength:20,
    minLength:6
  },
  name: { 
    type: String,
    minLength: 4, 
    lowercase: true
  },
  surname: {
    type: String,
    minLength: 4, 
    lowercase: true 
  },
  email: {
    type: String,
    required: [true, 'Email is required field'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is not valid']
  }
}, {
  collection: 'users',
  timestamps: true
})


userSchema.pre('save', async function(next) {
  try{
    if(!this.isModified('password')){
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
  }catch(err){
    next(err);
  }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)