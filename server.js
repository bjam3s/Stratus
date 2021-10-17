const express = require('express');
const axios = require('axios');
const hbs = require("express-handlebars");

const PORT = 8080;
const app = express();

app.use('/static', express.static('public'))
app.engine('handlebars', hbs());
app.set("view engine", "handlebars");

app.get('/', async (req,res) => {
    const comicLatestEndpoint = "https://xkcd.com/info.0.json";
    const response = await axios.get(comicLatestEndpoint);
    res.render("home", { comic: response.data});
});

app.get('/:id', async (req, res) => {
    const comicIndividualEndPoint = `https://xkcd.com/${req.params.id}/info.0.json`;
    const response = await axios.get(comicIndividualEndPoint);
    res.render("home", { comic: response.data});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});