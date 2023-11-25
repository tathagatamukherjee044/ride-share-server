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
    console.log(updateDoc);
    const client = new MongoClient(dbUrl)
    await client.connect();
    const database = client.db('bropdevdb')
    connection = database.collection(collectionName)
    var result = await connection.insertOne(updateDoc)
    return result;
}

export async function getDocuments(collectionName : string, query : any){

    const client = new MongoClient(dbUrl)
    await client.connect();
    const database = client.db('bropdevdb')
    connection = database.collection(collectionName)
    var result = await connection.find(query).toArray();
    console.log(result);
    return result;
}

export async function updateDocument(collectionName : string,query : any,updateDoc : any){
    const client = new MongoClient(dbUrl)
    await client.connect();
    const database = client.db('bropdevdb')
    connection = database.collection(collectionName)
    var result = await connection.updateOne(
        query,
        updateDoc
     )
    console.log(result);
    return result;
}