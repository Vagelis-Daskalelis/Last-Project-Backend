const express = require('express');
const app = express();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
require('dotenv').config()

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());


exports.findAll = async(req, res) => {
  console.log("Find all users");

  try {
    const result = await User.find();
    res.status(200).json({data: result});

    console.log("Success in reading all users");
  } catch (err) {
    console.log(`Problem in reading all users, ${err}`)
  }
};


exports.create = async(req, res) => {
  console.log("Insert user")

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email
    });

  try {
    const result = await newUser.save();
    res.status(200).json({data: result});
    console.log("User saved");
  } catch(err) {
    res.status(400).json({data: err})
    console.log("Problem in saving user", err);
  }
};



exports.login = async(req, res) => {
  try{
    const {email, password} = req.body;
    //find user by email
    const user = await User.findOne({ email: req.body.email});
    if(!user) {
      console.log('Email is incorrect')
        return res.status(400).json({message: 'Email is incorrect'}); 
    }
    //check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
      console.log('Password is incorrect')
        return res.status(400).json({ message: 'Email or password is incorrect'})
    }

    //Generate a JWT token
    const token = jwt.sign({ 
      userId: user._id,
      username: user.username,
      password: user.password,
      name: user.name,
      surname: user.surname,
      email: user.email,
    }, process.env.JWT_SECRET, {expiresIn: '1h'});


    res.cookie("access_token", token,{httpOnly: true})
    .status(200)
    .json({
      status:200,
      message:"Login User",
      data: user,
      token
    })
    console.log('Login successful')
    //res.status(200).json({message: 'Login successful', token});
}catch(error) {
    console.log(error);
    res.status(500).json({message: 'Interval Server Error'});
}
};



exports.update = async(req, res) => {
    const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const username = req.params.username;

  console.log("Update user with username:", username);

  const updateUser = {
    password: hashedPassword,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  }

  try {
    const result = await User.findOneAndUpdate(
      {username: username},
      updateUser,
      {new: true}
    )
    res.status(200).json({data: result});
    console.log("Success in updating user: ", username)
  } catch(err){
    res.status(400).json({data: err})
    console.log("Problem in updating user: ", username);
  }
};


exports.delete = async(req, res) => {
  const username = req.params.username;

  console.log("Delete user:", username);

  try {
    const result = await User.findOneAndDelete({username: username})
    res.status(200).json({data: result});
    console.log("Success in deleting user", username);
  } catch(err) {
    res.json({data: err});
    console.log("Problem in deleting user");
  }
};
