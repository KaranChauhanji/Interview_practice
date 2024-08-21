require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/userRegister.routes");
const PORT = process.env.PORT;


const server = express();
server.use(express.json())
server.use('/user', userRouter)

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
