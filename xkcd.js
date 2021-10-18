const axios = require("axios");
const { parseTranscript } = require("./utilities.js");

const getLatestComic = async () => {
  const comicLatestEndpoint = "https://xkcd.com/info.0.json";
  const { data: comic } = await axios.get(comicLatestEndpoint);
  return parseTranscript(comic);
}

const getIndividualComic = async (comicNum) => {
  const comicIndividualEndPoint = `https://xkcd.com/${comicNum}/info.0.json`;
  const { data: comic } = await axios.get(comicIndividualEndPoint);
  return parseTranscript(comic);
};

module.exports = {
  getLatestComic,
  getIndividualComic
};