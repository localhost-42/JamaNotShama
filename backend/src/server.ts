import express from "express";
import otherRouter from "./routers/other.routes";
import listRouter from "./routers/list.routes";

const app = express();

const port = process.env.PORT || 5000;

app.use("/", listRouter);
app.use("/func", otherRouter);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = app;
