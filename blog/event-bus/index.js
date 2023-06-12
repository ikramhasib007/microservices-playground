const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
// const cors = require("cors");

const app = express()
app.use(bodyParser.json())
// app.use(cors())

const events = []

app.post("/events", (req, res) => {
  const event = req.body

  events.push(event)

  // post service
  axios.post("http://posts-srv:4000/events", event).catch(err => console.log(err.message))
  // comment service
  axios.post("http://comments-srv:4001/events", event).catch(err => console.log(err.message))
  // query service
  axios.post("http://query-srv:4002/events", event).catch(err => console.log(err.message))
  // moderation service
  axios.post("http://moderation-srv:4003/events", event).catch(err => console.log(err.message))

  res.send({ status: "ok" }).status(202) // ACCEPTED
})

app.get("/events", (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log("Listening on 4005");
})