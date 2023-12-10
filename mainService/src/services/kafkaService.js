import { config } from "../store/config.js"
import { Kafka } from "kafkajs"

const client = new Kafka({
    brokers: config.kafka.BROKERS,
    clientId: config.kafka.CLIENTID
  })
  
  //const topic = config.kafka.TOPIC
  
  const producer = client.producer()

  export async  function startKafkaProducer() {
    await producer.connect()
  }

  export const sendMessage = async (topic,message) => {
    console.log(topic);
    console.log(message);
    try {
      const payloads = {
        topic,
        messages: [message]
      }
      console.log('payloads=', payloads)
      await producer.send(payloads)
      return true;
    } catch (error) {
      console.log("some error with kafka");
      return true
    }
   
  }