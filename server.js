//importing all the dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reminderRoute from "./routes/reminder.js";
import Reminder from "./models/reminder.js";
const app = express();
import twilio from "twilio";

//use of middlewared
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
// app.config(dotenv)
dotenv.config();

//mongodb connection
// const conn_url = 'mongodb://localhost:27017';
mongoose
  .connect("mongodb+srv://Aniket:pass123@cluster0.dbg6tan.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("databse connected successfully😍"))
  .catch(() => console.log("error in connectiong to databse"));

app.get("/", (req, res) => sendmsg());
app.use("/", reminderRoute);

setInterval(() => {
  Reminder.find({}, (err, reminderList) => {
    if (err) {
      console.log(err);
    } else {
      reminderList.forEach((reminder) => {
        if (!reminder.isReminded) {
          const now = new Date();
          if (new Date(reminder.remindAt) - now < 0) {
            Reminder.findByIdAndUpdate(
              reminder._id,
              { isReminded: true },
              (err, remindObj) => {
                if (err) {
                  console.log(err);
                } else {
                  //send Message
                  const client = twilio(
                    "ACe41d642ea4877cf0f955e216d89457df",
                    "03a88c0399f8a1768836f4b03e22eb75"
                  );
                  client.messages
                    .create({
                      body: reminder.reminderMsg,
                      messagingServiceSid: "MG950b4a776c2df543a906d002c70ea534",
                      to: "+917822960075",
                    })
                    .then((message) => console.log(message.sid))
                    .done();
                }
              }
            );
          }
        }
      });
    }
  });
}, 30000);

//geting port number
const PORT = process.env.PORT || 3001;

//listening the application
app.listen(PORT, () => console.log(`app is runing on port ${PORT}`));
