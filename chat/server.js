import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import _ from "lodash";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { createHash } from "crypto";

function getColorFromName(name) {
  const hash = createHash("sha1");
  hash.update(name);
  const fullHash = hash.digest("hex");

  return "#" + fullHash.substring(0, 6);
}

function getForegroundColorFromBackground(color) {
	var r = parseInt(color.substring(1,3),16);
	var g = parseInt(color.substring(3,5),16);
	var b = parseInt(color.substring(5,7),16);

	var yiq = ((r*299)+(g*587)+(b*114))/1000;

	return (yiq >= 128) ? 'black' : 'white';
}

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
  const background = getColorFromName(req.body.name);
  const foreground = getForegroundColorFromBackground(background);

  for (const socket of sockets) {
    socket.send(
      JSON.stringify({
        name: req.body.name,
        message: req.body.message,
        background,
        foreground,
      }),
    );
  }
})

const server = createServer(app);
const wss = new WebSocketServer({ server });


wss.on("connection", ws => sockets.add(ws))

server.listen(process.env.PORT ?? "3000")

