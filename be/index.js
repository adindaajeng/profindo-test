const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

app.use(bearerToken());

const PORT = 2000;

// Import Router
const userRouter = require("./Routers/userRouter");
const obatRouter = require("./Routers/obatRouter");

app.use("/users", userRouter);
app.use("/obat", obatRouter);

app.get("/", (req, res) => {
  res.status(200).send("API Apoteker XYZ");
});

app.listen(PORT, () => {
  console.log("API RUNNING ON PORT " + PORT);
});
