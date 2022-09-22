import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

app.set("view engine", "pug");

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/public'))
app.use(express.urlencoded({ extended: true }));

const tasks = [];
let idIncrement = 0;

app.get("/", (_, res) => {
  res.render("index", {
    list: tasks.sort(({ difficulty: a }, { difficulty: b }) => a - b)
  });
})

app.post("/", (req, res) => {
  const { description, difficulty } = req.body;
  tasks.push({ description, difficulty, complete: false, id: ++idIncrement });
  res.redirect("/");
})

app.post("/:id", (req, res) => {
  for (const task of tasks) {
    if (task.id !== parseInt(req.params.id)) {
      continue;
    }
    task.complete = !task.complete;
  }
  res.redirect("/");
})

app.listen(3000);

