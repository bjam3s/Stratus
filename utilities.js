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
  const parsed = tp.parseOneSync(comic.transcript);
  const itemsToFilter = ["[", "]"];
  if (parsed && parsed.speaker) {
    const speakers = Object
      .values(parsed.speaker) // Grab the object property values and put in an array
      .filter(speaker => speaker) // Filtering out speakers that are undefined
      .flat() // flatten it to a single array
      .filter(item => !itemsToFilter.includes(item)); // filter out all text we don't want
    if (speakers && speakers.length > 0) {
      return {
        ...comic,
        transcript: speakers
      };
    }
  }

  return comic;
};

module.exports = {
  getComicPages,
  parseTranscript
};