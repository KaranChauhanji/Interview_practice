require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const todoRouter = require("./routes/todo.routes");
const PORT = process.env.PORT;

const server = express();
server.use(express.json());
server.use("/user", userRouter);
server.use("/todo", todoRouter);

server.get("/", (_, res) => {
  res.send("Server Health check.");
});

server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Server is Running Fine.");
  } catch (error) {
    console.log(error.message);
  }
});
