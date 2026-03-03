import express from "express";
import otherRouter from "./routers/other.routes.js";
import listRouter from "./routers/list.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

const port = process.env.PORT || 3000;

app.use("/", listRouter);
app.use("/", otherRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

export default app;
