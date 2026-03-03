import express from "express";
import listRouter from "./routers/list.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

const port = process.env.PORT || 3000;

app.use("/", listRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = app;
