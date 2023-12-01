require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/index");

app.use(express.json());

const runServer = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "devhub",
    })
    .then(() => console.log("Connected!"));

  app.use("/api", router);

  app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
  });
};

runServer();
