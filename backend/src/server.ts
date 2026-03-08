import express from "express";
import path from "node:path";
import http from "node:http";
import { Server } from "socket.io";
import listRouter from "./routers/list.routes.js";
import loginRouter from "./routers/login.route.js";
import queueRouter from "./routers/queue.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
const port = process.env.APP_PORT || 3000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/api/lists", listRouter);
app.use("/api/login", loginRouter);
app.use("/api/queues", queueRouter);

const publicDir = path.join(process.cwd(), "public");
app.use(express.static(publicDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

export default app;
