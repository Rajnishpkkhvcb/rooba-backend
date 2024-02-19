// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   age: { type: Number, required: true },
//   country: { type: String, required: true },
//   password: { type: String, required: true }
// });

// const User = mongoose.model('users', userSchema);

// module.exports = User;


const mongoose = require('mongoose');

// Define a Mongoose schema for the Product documents
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

// Create a Mongoose model using the defined schema
const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB Atlas using the provided connection URI
mongoose.connect('mongodb://rooba.jifbiyg.mongodb.net/rooba', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// .then(() => {
//   console.log('Connected to MongoDB Atlas');
// })
// .catch((err) => {
//   console.error('Error connecting to MongoDB Atlas:', err);
// });

// Function to create a new product document and hence the Product collection
async function createProduct() {
  try {
    // Create a new product document
    const newProduct = new Product({
      name: 'Laptop',
      price: 1000,
      description: 'A powerful laptop for all your computing needs',
    });

    // Save the new product document to the database
    await newProduct.save();

    console.log('New product created:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

// Execute the createProduct function to create a new document and hence the collection
createProduct();
