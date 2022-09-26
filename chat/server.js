import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import _ from "lodash";

const app = express();

app.set("view engine", "pug");

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/public'))
app.use(express.urlencoded({ extended: true }));

app.get("/", (__, res) => {

  res.render("index", {
  });
});

app.listen(process.env.PORT ?? "3000")

