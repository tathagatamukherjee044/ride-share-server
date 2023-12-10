import express, { query } from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import tripRouter from "./src/routes/tripRoutes.js";
import authRouter from "./src/routes/authRouter.js"
import testRouter from "./src/routes/testRoutes.js"
import { errorHandler, errorLogger, invalidPathHandler } from "./src/middlewares/errorHandler.js";
import { Kafka } from "kafkajs";
import { config } from "./src/store/config.js";
import { logger } from "./src/middlewares/logger.js";
import { decodeToken } from "./src/middlewares/decodeToken.js";

const port = 8080;
const app = express(); // Application of express
const dbUrl = 'mongodb://localhost:27017';
var connection ;

//var MongoClient = require('mongodb').MongoClient;

app.use(express.json())
app.use(cors());
// app.use(decodeToken)
app.use(logger)
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

  // app.post('/putmessage', req,res=>{
  //   sendMessage(producer,topic)
  //   res.sendStatus(200)
  // })

  // run();


  
