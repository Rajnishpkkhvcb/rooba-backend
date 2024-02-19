const express = require('express');
const router = express.Router();
const User = require('../models/User');


// Question 3: REST API with Node.js and Express
// Create a REST API endpoint using Node.js and Express that allows creating, 
// reading, updating, and deleting (CRUD) user profiles stored in a MongoDB database.


// GET /users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    console.log(users, "uuuuuuuuuuuuuuuuuuuuuuu")
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
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.assign(user, req.body);

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
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/api/aggregation - Aggregation endpoint



// Q5 MongoDB Data Aggregation
// Using MongoDB, write a query to aggregate user data from a collection named users.
//  The aggregation should calculate the total number of users,
// the average age  and the number of users in each country.


router.get('/api/aggregation', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: "$country",
          totalUsersByCountry: { $sum: 1 },
          averageAge: { $avg: "$age" }
        }
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          totalUsersByCountry: 1,
          averageAge: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    console.error('Error fetching user aggregation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
