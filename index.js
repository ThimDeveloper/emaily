import express from "express";
import test from "./utils/test";

const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "world" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
