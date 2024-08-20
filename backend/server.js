const express = require("express");
const connection = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT;


const server = express();

server.get("/", (_, res) => {
  res.send("Server Health check.");
});

server.listen(PORT, async() => {
  try {
    await connection
    console.log("Server is Running Fine.");
  } catch (error) {
    console.log(error.message);
  }
});
