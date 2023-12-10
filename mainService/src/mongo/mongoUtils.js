import { MongoClient } from "mongodb";

const dbUrl = 'mongodb://localhost:27017';
var connection;

// export async function findOneAndUpdate(collectionName, updateDoc, queryParam, options){
//     const client = new MongoClient(dbUrl)
//     await client.connect();
//     const database = client.db('bropdevdb')
//     connection = database.collection(collectionName)
//     var result = await connection.updateOne(queryParam, {$set:updateDoc}, options)
//     return result;
// }

export async function insertDocument(collectionName , updateDoc ){
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

export async function getDocuments(collectionName , query ){

    const client = new MongoClient(dbUrl)
    try{
        await client.connect();
        const database = client.db('bropdevdb')
        connection = database.collection(collectionName)
        var result = await connection.find(query).toArray();
        if(result.length == 0){
            throw new Error(`getDocuments failed, collection : ${collectionName}, query : ${JSON.stringify(query)}`)
        }
        return result;
    }
    catch (error){
        throw error
    }
    finally {
        await client.close();
    }
   
    
}

export async function updateOne(collectionName ,query ,updateDoc , options  = {}){
    const client = new MongoClient(dbUrl)
    try {
        await client.connect(); 
        const database = client.db('bropdevdb')
        connection = database.collection(collectionName)        
        var result = await connection.updateOne(query,updateDoc,options)
        if(result.matchedCount == 0){
            throw new Error('No document found')
        }
        return result
    } catch (error) {
        throw error
    }
    finally {
        await client.close();
    }
}

export async function findOneAndUpdate(collectionName ,query ,updateDoc , options  = {}){
    const client = new MongoClient(dbUrl)
    try {
        console.log(query);
        const doc = {
            $set: updateDoc
        }
        await client.connect();       
        const database = client.db('bropdevdb')
        connection = database.collection(collectionName)
        var result = await connection.findOneAndUpdate(query,doc,options)
        return result
    } catch (error) {
        throw error
    }finally {
        await client.close();
    }
}

export async function getAggregation(collectionName,query){
    const client = new MongoClient(dbUrl)
    try {
        await client.connect();
        const database = client.db('bropdevdb')
        connection = database.collection(collectionName)
        console.log(connection);
        var result = await connection.aggregate(query).toArray()
        return result
    } catch (error) {
        throw error
    }finally {
        await client.close();
    }
}