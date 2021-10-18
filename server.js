const express = require("express");
const hbs = require("express-handlebars");
const { getLatestComic, getIndividualComic } = require("./xkcd.js");
const { getComicPages } = require("./utilities.js");
//const PORT = 5000;
const app = express();

app.use("/static", express.static("public"));
app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

let viewCounts = {};

const incrementComicViewCount = (comic) => {
  if (viewCounts[comic.num]) {
    viewCounts[comic.num] += 1;
  } else {
    viewCounts[comic.num] = 1;
  }
  return viewCounts[comic.num];
};

app.get("/", async (req, res) => {
  try {
    const comic = await getLatestComic();
    const { next, previous } = getComicPages(comic, comic.num);
    const views = incrementComicViewCount(comic);
    return res.render("home", { comic, next, previous, views });
  } catch (error) {
    return res.render("error", { error: error.message });
  }
});

app.get("/random", async (req, res) => {
  try {
    const latestComic = await getLatestComic();
    const id = Math.floor(Math.random() * latestComic.num + 1);
    res.redirect(`/${id}`);
  } catch (error) {
    return res.render("error", { error: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const latestComic = await getLatestComic();
    const comic = await getIndividualComic(req.params.id);
    const { next, previous } = getComicPages(comic, latestComic.num);
    const views = incrementComicViewCount(comic);
    return res.render("home", { comic, next, previous, views });
  } catch (error) {
    return res.render("error", { error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:8080`);
});
