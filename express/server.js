import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import _ from "lodash";

const app = express();

app.set("view engine", "pug");

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/public'))
app.use(express.urlencoded({ extended: true }));

const tasks = [];
let idIncrement = 0;

app.get("/", (__, res) => {
  tasks.sort(({ difficulty: a }, { difficulty: b }) => a - b);
  const activeTasks = tasks.filter(({ complete }) => !complete);

  if (activeTasks.length === 0) {
    res.render("index", {
      list: tasks,
      average: "-",
      median: "-",
    });
  }
  else {
    const totalDifficulty = _.sum(activeTasks.map(({ difficulty }) => difficulty));

    const median = activeTasks.length % 2 === 0
      ? (activeTasks[activeTasks.length / 2 - 1].difficulty + activeTasks[activeTasks.length / 2].difficulty) / 2
      : activeTasks[Math.floor(activeTasks.length / 2)].difficulty;

    res.render("index", {
      list: tasks.sort(({ difficulty: a }, { difficulty: b }) => a - b),
      average: totalDifficulty / activeTasks.length,
      median,
    });
  }

})

app.post("/", (req, res) => {
  const { description, difficulty } = req.body;
  let difficultyClass = "easy";
  if(difficulty > 3) {
    difficultyClass = "medium";
  }
  if(difficulty > 7) {
    difficultyClass = "hard";
  }
  tasks.push({ description, difficulty, complete: false, id: ++idIncrement, difficultyClass });
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

