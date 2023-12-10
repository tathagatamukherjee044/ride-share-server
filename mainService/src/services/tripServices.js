import * as MongoUtils from "../mongo/mongoUtils.js";
import { ObjectId } from "mongodb";
import { error, log } from "console";
import * as kafkaService from "../services/kafkaService.js";
import { query } from "express";
import { mongoConfig } from "../mongo/mongoConfig.js";
import * as mongoQuery from "../mongo/mongoQuery.js";

export async function putTrip(req, res) {
  const body = req.body;
  const userInfo = req.userInfo;
  const email = userInfo.email;
  console.log(userInfo);
  body["name"] = userInfo.name;
  body["creatorId"] = userInfo._id;
  body["isAvailable"] = true;
  var result = await MongoUtils.insertDocument("trip", body);
  const message = {
    email: email,
    body: body,
  };
  const kafkaMesage = {
    key: "tripPublished",
    value: JSON.stringify(message),
  };
  kafkaService.sendMessage("publishTripEmail", kafkaMesage);
  res.send(result);
}

export async function searchTrip(req,userInfo) {
  req["isAvailable"] = true;
  const query = [];
  query.push(mongoQuery.getMatchQuery(req))
  query.push({
    $lookup: {
      let: {
        userObjId: {
          $toObjectId: "$creatorId",
        },
        userStringId: "$creatorId",
        
      },
      from: mongoConfig.userDataBase,
      pipeline: [
        {
          $match: {
            $expr: {
              //$ is referred to the root document fields where as $$ referred to the variable names.
              $in: [ "$_id", ["$$userStringId","$$userObjId"] ],
            },
          },
        },
      ],
      as: "creator",
    },
  });
  query.push(mongoQuery.getProjectionQueryAggregation(['consumerRequests'],false))
  try {
    var result = await MongoUtils.getAggregation(mongoConfig.tripDataBase, query);
  } catch (error) {
    throw error;
  }

  return result;
}

export async function getTrip(req, res) {
  console.log(req.body);
  const collectionName = "trip";
  const _id = req.body._id;
  const query = {};
  // query['_id'] = {
  //   $regex : new RegExp(`^${id}$`),
  //   $options : 'i'
  // }
  query["_id"] = { $in: [new ObjectId(_id), _id] };
  console.log(query);
  var result = await MongoUtils.getDocuments(collectionName, query);
  // const client = new MongoClient(dbUrl)
  // await client.connect();
  // const database = client.db('bropdevdb')
  // connection = database.collection(collectionName)
  // var result = await connection.find(query,{}).toArray();
  // console.log(result);
  res.send(result);
}

export async function requestTrip(body, userInfo) {
  // if(userInfo){
  //   log(userInfo)
  //   req["creatorId"] = {
  //     $nin : [new ObjectId(userInfo._id), userInfo._id]
  //   }
  // }
  const consumerName = userInfo.name;
  const collectionName = "trip";
  const consumerId = userInfo._id;
  const tripId = body._id;
  const query = {};
  query["_id"] = { $in: [new ObjectId(tripId), tripId] };
  query["isAvailable"] = true;
    var updateDoc = {
      $push: {
        consumerRequests: {
          consumerName: consumerName,
          consumerId: new ObjectId(consumerId),
        },
      },
      $set: {
        isAvailable: false,
      },
    };
    try {
      var successResult = await MongoUtils.updateOne(
        collectionName,
        query,
        updateDoc
      );
      return successResult
    } catch (error) {
      throw error
    }
}

export async function approveRequest(request,userInfo){
  const tripId = request.tripId;
  const collectionName = "trip";
  const query = { _id : { $in: [new ObjectId(tripId), tripId] } };
  console.log(query);

  // var trip = await MongoUtils.getDocuments(collectionName, query)[0];
  var updateDoc = {
    $set: {
      isAvailable: false,
      approvedRequest : request.userId
    },
  };
  try {
    var successResult = await MongoUtils.updateOne(
      collectionName,
      query,
      updateDoc
    );
    console.log(successResult);
    return successResult
  } catch (error) {
    throw error
  }
}

export async function getCreatorTrips(req, res) {
  const body = req.body;
  const userId = req.userInfo._id;
  console.log(body);
  console.log(req);
  console.log(userId);

  const collectionName = "trip";
  const query = { creatorId: { $in: [new ObjectId(userId), userId] } };
  console.log(query);

  var result = await MongoUtils.getDocuments(collectionName, query);
  res.send(result);
}

export async function getConsumerTrips(req, res) {
  const body = req.body;
  const userId = req.userInfo._id;
  const collectionName = "trip";
  const query = {
    "consumerRequests.consumerId": { $in: [new ObjectId(userId), userId] },
  };
  var result = await MongoUtils.getDocuments(collectionName, query);
  res.send(result);
}
