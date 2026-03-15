import express from "express";
import path from "node:path";
import http from "node:http";
import { Server } from "socket.io";
import listRouter from "./routers/list.routes.js";
import loginRouter from "./routers/login.route.js";
import queueRouter from "./routers/queue.routes.js";
import scoreRouter from "./routers/score.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";
const app = express();
const port = process.env.APP_PORT || 3000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors())

app.use(express.json());
app.use('/api/scores', scoreRouter);
app.use("/api/lists", listRouter);
app.use("/api/login", loginRouter);
app.use("/api/queues", queueRouter);

const publicDir = path.join(process.cwd(), "public");
app.use(express.static(publicDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.use(errorMiddleware);

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

export default app;
