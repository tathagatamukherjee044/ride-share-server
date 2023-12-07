import  express  from "express";
import { Kafka } from "kafkajs";
import { config } from "../store/config.js";
import { log } from "console";


const testRouter = express.Router();

testRouter.get("/helloWorld", async (req,res)=>{
   const success = await sendMessage(producer,topic);
   res.send("Hello World");
    
})


const client = new Kafka({
    brokers: config.kafka.BROKERS,
    clientId: config.kafka.CLIENTID
  })
  
  const topic = config.kafka.TOPIC
  
  const producer = client.producer()

  const sendMessage = async (producer, topic) => {
    await producer.connect()
      const payloads = {
        topic: topic,
        messages: [
          { key: 'coronavirus-alert', value: JSON.stringify({
            "eventId": "001",
            "firstName": "Zac",
            "lastName": "Ryan",
            "age": 34,
            "Gender": "M",
            "bodyTemperature": 36.9,
            "overseasTravelHistory": true,
            "eventTimestamp": "2020-03-02 02:09:00"
          }) }
        ]
      }
      console.log('payloads=', payloads)
      await producer.send(payloads)
      return true;
  }

export default testRouter;