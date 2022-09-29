import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import _ from "lodash";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();
const sockets = new Set();

app.set("view engine", "pug");

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/public'))
app.use(express.json({ extended: true }));

app.get("/", (__, res) => {

  res.render("index", {
  });
});

app.post("/", req => {
  for (const socket of sockets) {
    socket.send(
      JSON.stringify({
        name: req.body.name,
        message: req.body.message,
        background: "#604512",
        foreground: "#fff",
      }),
    );
  }
})

const server = createServer(app);
const wss = new WebSocketServer({ server });


wss.on("connection", ws => sockets.add(ws))

server.listen(process.env.PORT ?? "3000")

