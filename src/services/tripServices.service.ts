import * as MongoUtils from "../mongo/mongoUtils.utils"
import {ObjectId } from "mongodb";
import { Request, Response } from "express";
import { log } from "console";

export async function putTrip(req : Request, res : Response){
    const body = req.body;
    const userInfo = body.userInfo;
    console.log(userInfo);
    body['name'] = userInfo.name
    body['creatorId'] = userInfo._id
    body['isAvailable'] = true
    var result = await MongoUtils.insertDocument('trip',body)
    res.send(result);
   
}

export async function searchTrip(req : any){
    req['isAvailable'] = true;
    try{
        var result = await MongoUtils.getDocuments('gg',req)
    } catch(error){
        console.log('error caught in service');
        throw error
    }
   
    return result
   
}

export async function getTrip(req : Request, res : Response){
    console.log(req.body);
    const collectionName = 'trip';
    const _id = req.body._id;
    const query : any = {}
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

export async function requestTrip(req : Request, res : Response){
    const body = req.body;
    const consumerName = body.userInfo.name;
    const collectionName = 'trip';
    const consumerId = body.userInfo._id;
    const tripId = req.body._id;
    const query : any = {}
    query['_id'] = {$in: [ new ObjectId(tripId), tripId ]}
    query['isAvailable'] = true
    const trip = await MongoUtils.getDocuments(collectionName,query)
    if (trip) {
        var updateDoc = { $push: { consumerRequests: {
                consumerName : consumerName,
                consumerId : consumerId
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

export async function getCreatorTrips(req : Request, res : Response){
    const body = req.body;
    const userId = body.userInfo._id;
    const collectionName = 'trip';
    const query = { 'creatorId' : userId};
    var result = await MongoUtils.getDocuments(collectionName, query);
    res.send(result);
}

export async function getConsumerTrips(req : Request, res : Response){
    const body = req.body;
    const userId = body.userInfo._id;
    const collectionName = 'trip';
    const query = { 'consumerRequests.consumerId' : userId};
    var result = await MongoUtils.getDocuments(collectionName, query);
    res.send(result);
}
