import { config } from "../store/config.js"
import { Kafka } from "kafkajs"

const client = new Kafka({
    brokers: config.kafka.BROKERS,
    clientId: config.kafka.CLIENTID
  })
  
  const topic = config.kafka.TOPIC
  
  const producer = client.producer()

  export const sendMessage = async (topic,message) => {
    await producer.connect()
      const payloads = {
        topic: topic,
        messages: [message]
      }
      console.log('payloads=', payloads)
      await producer.send(payloads)
      return true;
  }