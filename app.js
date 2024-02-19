const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Question 4: Express Middleware Creation
// Write an Express middleware function that logs the request method,
//  URL,access token and timestamp for every request to the server. 
//  Apply this middleware globally to all routes in an Express application.

function logRequest(req, res, next) {
  const timestamp = new Date().toISOString();
  const accessToken = req.headers.authorization || 'No access token provided';
  console.log(`[${timestamp}] ${req.method}: ${req.originalUrl}, AccessToken: "${accessToken}"`);
  next(); 
}

app.use(logRequest);

// const uri = process.env.MONGODB_URI; // Use the environment variable for the MongoDB URI

const username = "rajnishpal161";
const password = "roobaTask";;
const clusterAddress = "cluster0.a1mdsqy.mongodb.net";
const databaseName = "rooba";

const uri = `mongodb+srv://${username}:${encodeURIComponent(password)}@${clusterAddress}/${databaseName}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
}

run().catch(console.dir);


const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
