import * as MongoUtils from "../mongo/mongoUtils.js"
import {ObjectId } from "mongodb";
import { log } from "console";

export async function putTrip(req , res ){
    const body = req.body;
    const userInfo = req.userInfo;
    console.log(userInfo);
    body['name'] = userInfo.name
    body['creatorId'] = userInfo._id
    body['isAvailable'] = true
    var result = await MongoUtils.insertDocument('trip',body)
    res.send(result);
   
}

export async function searchTrip(req ){
    req['isAvailable'] = true;
    try{
        var result = await MongoUtils.getDocuments('trip',req)
    } catch(error){
        console.log('error caught in service');
        throw error
    }
   
    return result
   
}

export async function getTrip(req , res ){
    console.log(req.body);
    const collectionName = 'trip';
    const _id = req.body._id;
    const query  = {}
  // query['_id'] = {
  //   $regex : new RegExp(`^${id}$`),
  //   $options : 'i'
  // }
    query['_id'] = {$in: [ new ObjectId(_id), _id ]}
    console.log(query);
    var result = await MongoUtils.getDocuments(collectionName,query)
    // const client = new MongoClient(dbUrl)
    // await client.connect();
    // const database = client.db('bropdevdb')
    // connection = database.collection(collectionName)
    // var result = await connection.find(query,{}).toArray();
    // console.log(result);
    res.send(result);
}

export async function requestTrip(req , res ){
    const body = req.body;
    const consumerName = req.userInfo.name;
    const collectionName = 'trip';
    const consumerId = req.userInfo._id;
    const tripId = req.body._id;
    const query  = {}
    query['_id'] = {$in: [ new ObjectId(tripId), tripId ]}
    query['isAvailable'] = true
    const trip = await MongoUtils.getDocuments(collectionName,query)
    if (trip) {
        var updateDoc = { $push: { consumerRequests: {
                consumerName : consumerName,
                consumerId : new ObjectId(consumerId)
            } },
            $set: {
                isAvailable: false
            }
        }
    var successResult = await MongoUtils.updateDocument(collectionName,query,updateDoc)
    res.send(successResult);
    } else {
        var failedResult = {
            message : "trip is not available",
            success : false
        }
    }
    
}

export async function getCreatorTrips(req , res ){
    const body = req.body;
    const userId = req.userInfo._id;
    console.log(body);
    console.log(req);
    console.log(userId);
    
    const collectionName = 'trip';
    const query = { 'creatorId' :  {$in: [ new ObjectId(userId), userId ]}};
    console.log(query);
    
    var result = await MongoUtils.getDocuments(collectionName, query);
    res.send(result);
}

export async function getConsumerTrips(req , res ){
    const body = req.body;
    const userId = req.userInfo._id;
    const collectionName = 'trip';
    const query = { 'consumerRequests.consumerId' : {$in: [ new ObjectId(userId), userId ]}};
    var result = await MongoUtils.getDocuments(collectionName, query);
    res.send(result);
}
