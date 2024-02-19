// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /users - Get all users (without passwords)
router.get('/', async (req, res) => {
  try {
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    const users = await User.find();
    console.log(users,"uuuuuuuuuuuuuuuuuuuuuuu")
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users - Create a new user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    country: req.body.country,
    password: req.body.password
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/:id - Update a user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    user.country = req.body.country || user.country;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /users/:id - Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
