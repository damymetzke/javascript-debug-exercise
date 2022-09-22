import express from "express";
const app = express();

app.set("view engine", "pug");

app.get("/", (_, res) => {
  res.render("index", {
    list: [
      { description: "aaa", difficulty: 10 },
      { description: "bbb", difficulty: 20 },
      { description: "ccc", difficulty: 30 },
      { description: "ddd", difficulty: 5 },
    ].sort(({ difficulty: a }, { difficulty: b }) => a - b)
  });
})

app.listen(3000);

