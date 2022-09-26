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

  if(tasks.length === 0) {
    res.render("index", {
      list: tasks,
      stats: [
      ],
    });
  }
  else {
      const totalDifficulty = _.sum(tasks.map(({ difficulty }) => difficulty));

      const totalMedian = tasks.length % 2 === 0
        ? (tasks[tasks.length / 2 - 1].difficulty + tasks[tasks.length / 2].difficulty) / 2
        : tasks[Math.floor(tasks.length / 2)].difficulty;

    if (activeTasks.length === 0) {
      res.render("index", {
        list: tasks,
        stats: [
          ["Difficulty Remaining", `0/${totalDifficulty}`],
          ["Completion", "100%"],
          ["Average (total)", totalDifficulty / tasks.length],
          ["Median (total)", totalMedian],
        ],
      });
    }
    else {
      const activeDifficulty = _.sum(activeTasks.map(({ difficulty }) => difficulty));

      const activeMedian = activeTasks.length % 2 === 0
        ? (activeTasks[activeTasks.length / 2 - 1].difficulty + activeTasks[activeTasks.length / 2].difficulty) / 2
        : activeTasks[Math.floor(activeTasks.length / 2)].difficulty;

      res.render("index", {
        list: tasks.sort(({ difficulty: a }, { difficulty: b }) => a - b),
        stats: [
          ["Difficulty Remaining", `${activeDifficulty}/${totalDifficulty}`],
          ["Completion", (1 - activeDifficulty / totalDifficulty).toString().substring(0, 4) + "%"],
          ["Average (to do)", activeDifficulty / activeTasks.length],
          ["Median (to do)", activeMedian],
          ["Average (total)", totalDifficulty / tasks.length],
          ["Median (total)", totalMedian],
        ],
      });
    }
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

app.listen(process.env.PORT ?? "3000")

