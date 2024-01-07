require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.js');
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')

// register
router.post('/register', async (req, res) => {
  try {

      const { email, password } = req.body;
      
      if(!(email && password)){
        res.status(400).send("All input is required.");
      }

      const oldUser = await User.findOne({email});

      if(oldUser) {
        return res.status(409).send("User already exist.")
      }

      encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email: email.toLowerCase(),
        password: encryptedPassword
      })

      const token = jwt.sign(
        {user_id: User._id, email},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h"
        }
      )

      newUser.token = token;

      res.status(201).json(newUser)

  } catch (error) {
      console.error('Error creating User:', error);
  }
});

// login
router.post('/login', async (req, res) => {
  try {

      const { email, password } = req.body;
      
      if(!(email && password)){
        res.status(400).send("All input is required");
      }

      const user = await User.findOne({ email });

      if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h"
          }
        )
        user.token = token;
          res.status(200).json(user);
      }

      res.status(400).send("Invalid Credentials");

  } catch (error) {
      console.error('Error creating User:', error);
  }
});

module.exports = router;