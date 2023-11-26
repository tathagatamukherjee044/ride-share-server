import { log } from "console";
import { ObjectEncodingOptions } from "fs";
import { MongoClient } from "mongodb";

const dbUrl = 'mongodb://localhost:27017';
var connection;

// export async function updateDocument(collectionName, updateDoc, queryParam, options){
//     const client = new MongoClient(dbUrl)
//     await client.connect();
//     const database = client.db('bropdevdb')
//     connection = database.collection(collectionName)
//     var result = await connection.updateOne(queryParam, {$set:updateDoc}, options)
//     return result;
// }

export async function insertDocument(collectionName : string, updateDoc : any){
    const client = new MongoClient(dbUrl)
    try {
        console.log(updateDoc);
        await client.connect();
        const database = client.db('bropdevdb')
        connection = database.collection(collectionName)
        var result = await connection.insertOne(updateDoc)
        return result;
    } catch (error){
        throw error
    }
    finally {
        await client.close();
    }
   
}

export async function getDocuments(collectionName : string, query : Object){

    const client = new MongoClient(dbUrl)
    try{
        await client.connect();
        const database = client.db('bropdevdb')
        connection = database.collection(collectionName)
        var result = await connection.find(query).toArray();
        if(result.length == 0){
            throw new Error(`getDocuments failed, collection : ${collectionName}, query : ${JSON.stringify(query)}`)
        }
        console.log(result);
        return result;
    }
    catch (error){
        throw error
    }
    finally {
        await client.close();
    }
   
    
}

export async function updateDocument(collectionName : string,query : Object,updateDoc : Object, options : Object = {}){
    const client = new MongoClient(dbUrl)
    try {
        console.log(query);
        const doc = {
            $set: updateDoc
        }
        await client.connect();
        console.log('connected');
        
        const database = client.db('bropdevdb')
        connection = database.collection(collectionName)
        console.log(connection);
        
        var result = await connection.updateOne(
            query,
            doc,
            options
         )
        console.log(result);
        
        if(result.upsertedCount === 1 || result.matchedCount === 1){
            return result.upsertedId;
        } else {
            throw new Error(`updateDocument failed, collection : ${collectionName}, query : ${JSON.stringify(query)}, updateDoc : ${JSON.stringify(updateDoc)} `)
        }
    } catch (error) {
        throw error
    }
    
   
}