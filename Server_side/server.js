import express from "express"
import mongoose from "mongoose";
import Messages from "./dbMessages.js"
import Pusher from "pusher";
import cors from "cors"


const app = express();
const port = process.env.PORT || 8080

const pusher = new Pusher({
   appId: "1498739",
   key: "10ae10ee0f1371253926",
   secret: "395ddbcfcc2c4ccd9797",
   cluster: "ap2",
   useTLS: true
});

const db = mongoose.connection;

db.once("open", () => {
   console.log("Db connected")

   const msgCollection = db.collection("messagecontents");

   const changeStream = msgCollection.watch()

   changeStream.on("change", (change)=>{
      console.log("change taken place")

      if(change.operationType==='insert'){
         const messageDetails = change.fullDocument;
         pusher.trigger('messages', 'inserted',{
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp:messageDetails.timestamp,
            received: messageDetails.received
         })
      }else{
         console.log("Error in triggering Pusher")
      }
   })
})

// middlewares
app.use(express.json());

app.use(cors())

// we can use cors or below function for setting header

// app.use((req, res, next)=>{
//    res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader("Access-Control-Allow-Headers", "*")
// });

//--------------------------------**----------------------//

//DB configs -- connection
mongoose.connect("mongodb+srv://vaibhav:vaibhav123@cluster0.ouo8qkf.mongodb.net/?retryWrites=true&w=majority", {

})
   .then((res) => {
      console.log("Connection Succcessfull")
   })
   .catch((err)=>{
      console.log("error in connecting database")
   })

app.get("/", (req, res) => {
   res.status(200).send("heyy")
})

app.get("/messages/sync", (req, res) => {
   Messages.find((err, data) => {
      if (err) {
         res.status(500).send(err)
      }
      else {
         res.status(200).send(data)
      }
   })
})

app.post("/messages/new", (req, res) => {
   const dbMessage = req.body;

   Messages.create(dbMessage, (err, data) => {
      if (err) {
         res.status(500).send(err)
      }
      else {
         res.status(201).send(data)
      }
   })
})



app.listen(port, () => {
   console.log(`http://localhost:${port}`)
})
