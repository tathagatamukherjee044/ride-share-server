
import { Kafka } from "kafkajs";
import { config } from "./src/store/config.js";
import nodemailer from "nodemailer";
import { log } from "console";

const varq = 'annusab123@gmail.com'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tathagatam44@gmail.com',
    pass: 'jrak cuzp xdsc wolf'
  }
});

// const mailOptionsPublishTrip = {
//   from: 'tathagatam44@gmail.com',
//   to: 'bileyangrybirds2013@gmail.com',
//   subject: 'Subject',
//   text: 'SUP BRO'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//  console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//     // do something useful
//   }
// });







  const kafka = new Kafka({
    clientId: config.kafka.CLIENTID,
    brokers: config.kafka.BROKERS
  })
  
  const topic = 'publishTripEmail'
  const consumer = kafka.consumer({
    groupId: config.kafka.GROUPID
  })

  const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const jsonObj = JSON.parse(message.value.toString())
        //   let passengerInfo = JSON.parse(message)
          if (jsonObj) {
            console.log(
              '******* Alert!!!!! passengerInfo *********',
              jsonObj
            )
            const mailOptionsPublishTrip = {
              from: 'tathagatam44@gmail.com',
              to: 'bileyangrybirds2013@gmail.com',
              subject: 'Subject',
              text: 'SUP BRO'
            };
            log(jsonObj.email)
            log(jsonObj.body)
            mailOptionsPublishTrip['to'] = JSON.stringify(jsonObj.email)
            mailOptionsPublishTrip['subject'] = "New Trip Published"
            mailOptionsPublishTrip['text'] = `${JSON.stringify(jsonObj.body)} \n Regards \n Brop :)`
            transporter.sendMail(mailOptionsPublishTrip, function(error, info){
              if (error) {
             console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                // do something useful
              }
            });
            return jsonObj
          }
        } catch (error) {
          console.log('err=', error)
        }
      }
    })
  }

  run();


  
