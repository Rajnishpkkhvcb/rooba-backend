const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// const uri = process.env.MONGODB_URI; // Use the environment variable for the MongoDB URI

const username = "rajnishpal161";
const password = "Priraj@1336";;
const clusterAddress = "rooba.jifbiyg.mongodb.net";
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
