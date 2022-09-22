import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

app.set("view engine", "pug");

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/public'))
app.use(express.urlencoded({ extended: true }));

const tasks = [];

app.get("/", (_, res) => {
  res.render("index", {
    list: tasks.sort(({ difficulty: a }, { difficulty: b }) => a - b)
  });
})

app.post("/", (req, res) => {
  const { description, difficulty } = req.body;
  tasks.push({ description, difficulty });
  res.redirect("/");
})

app.listen(3000);

