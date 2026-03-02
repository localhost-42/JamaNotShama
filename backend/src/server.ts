import express from "express";
import otherRouter from "./routers/other.routes";
import listRouter from "./routers/list.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

const port = process.env.PORT || 5000;

app.use("/", listRouter);
app.use("/func", otherRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = app;
