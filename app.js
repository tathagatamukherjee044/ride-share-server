import express, { query } from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import tripRouter from "./src/routes/tripRoutes.js";
import authRouter from "./src/routes/authRouter.js"
import testRouter from "./src/routes/testRoutes.js"
import { errorHandler, errorLogger, invalidPathHandler } from "./src/middlewares/errorHandler.js";

const port = 8080;
const app = express(); // Application of express
const dbUrl = 'mongodb://localhost:27017';
var connection ;

//var MongoClient = require('mongodb').MongoClient;

app.use(express.json())
app.use(cors());
app.use(tripRouter);
app.use(authRouter);
app.use(testRouter);

app.use(errorLogger)
app.use(errorHandler)
app.use(invalidPathHandler)

app.get('/greeter', (req, res) => {
  // req - Request of express -- we want something from the client
  // res - Response of express -- we want to send something to the client
  res.send('<h1>Good afternoon</h1>');
});

initServer();

async function initServer() {
    try {
        const client = new MongoClient(dbUrl)
        await client.connect();
        const database = client.db('bropdevdb')
        connection = database.collection('trip')
        //console.log(client);
        app.listen(port, () => {
        console.log('Database available!');
        console.log(`Web server running on port ${port}`);
      });
    } catch (err) {
      console.log(err);
      console.log('Unable to connect with the database');
      console.log('Unable to start express server');
    }
  }

app.post('/putTrip',async (req,res) => {
    const body = req.body;
    console.log(body);
    var ans = await connection.insertOne({
        "name" : "HelloWorld"
    });
    res.send(ans);
})

app.post('/getTrip',async (req,res) => {
  const body = req.body;
  console.log(body);
  var ans = await connection.insertOne({
      "name" : "HelloWorld"
  });
  res.send(ans);
})

app.post('/test', async(req,res) =>{
  console.log(req.body);
  const collectionName = req.body.collection;
  const id = req.body._id;
  const query  = {}
  // query['_id'] = {
  //   $regex : new RegExp(`^${id}$`),
  //   $options : 'i'
  // }
  query['_id'] = {$in: [ new ObjectId(id), id ]}
  console.log(query);
  const client = new MongoClient(dbUrl)
    await client.connect();
    const database = client.db('bropdevdb')
    connection = database.collection(collectionName)
    var result = await connection.find(query,{}).toArray();
    console.log(result);
    res.send(result);
})
