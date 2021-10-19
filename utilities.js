const TranscriptParser = require('transcript-parser');
const tp = new TranscriptParser();


const getComicPages = (comic, latestComicNum) => {
  const comicNum = parseInt(comic.num, 0);
  const next = comicNum + 1;
  const previous = comicNum - 1;

  if (next >= latestComicNum) {
    return { current: comicNum, next: 1, previous };
  }

  if (previous <= 1) {
    return { current: comicNum, next, previous: latestComicNum };
  }

  return { current: comicNum, next, previous };
}

const parseTranscript = (comic) => {
  return {
    ...comic,
    transcript: unescape(comic.transcript)
  };
};


module.exports = {
  getComicPages,
  parseTranscript
};