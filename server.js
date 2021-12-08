const express = require("express"); //Line 1
const app = express(); //Line 2
const fs = require("fs");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000; //Line 3
const Show = require("./models/shows");
const User = require("./models/users");
const bcrypt = require("bcrypt");
const saltRounds = 12;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.json());

const connection = mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`,
  (err) => {
    if (err) throw err;
    console.log("DB Connected Successfully");
  }
);

// get subtitle track
app.get("/subtitles/:showHandle/:episodeID", (req, res) => {
  res.sendFile(
    `./subtitles/${req.params.showHandle}/${req.params.episodeID}.vtt`,
    { root: __dirname }
  );
});

// get audio track
app.get("/episodes/:showHandle/:episodeID/audio", (req, res) => {
  const range = req.headers.range;
  const videoPath = `./audio/${req.params.showHandle}/${req.params.episodeID}/jp.aac`;
  const videoSize = fs.statSync(videoPath).size;

  const chunkSize = 1 * 1e6;
  var start = 0;
  if (range) {
    start = Number(range.replace(/\D/g, ""));
  } else {
    start = Number(0);
  }

  const end = Math.min(start + chunkSize, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });

  return stream.pipe(res);
});

// meta data endpoint
app.get("/episodes/:showHandle/:episodeID/meta", async (req, res) => {
  const foundShow = await Show.find({
    handle: req.params.showHandle,
    episodes,
  });
  if (foundShow) {
    res.send(foundShow[0]);
  }
  res.send({});
  // const foundEpisode = all_shows[handle]["episodes"].find(
  //   (episode) => episode.id == req.params.episodeID
  // );
  // return res.send(foundEpisode);
});

// search endpoint
app.post("/search", (req, res) => {
  // const searchTerm = req.body.searchTerm.toLowerCase();
  // const capturingRegex = new RegExp(searchTerm, "g");
  // const tempArr = all_shows_collection.filter((show) =>
  //   show.title.toLowerCase().match(capturingRegex)
  // );
  // return res.send(tempArr);
});

// get user
app.post("/login", async (req, res) => {
  const username = req.body.username;
  // const password = req.body.password;
  const result = await User.findOne({ username: username });
  if (result === null) {
    res.send("not found");
  } else {
    const match = await bcrypt.compare(req.body.password, result.password);
    if (match) {
      res.send({ user: result.username });
    } else {
      res.send({ user: false });
    }
  }
});
// queue endpoint
app.post("/queue", (req, res) => {
  // const shows = req.body.data;
  // const tempArr = [];
  // for (const key in shows) {
  //   const episodeID = shows[key]["episode"];
  //   const foundShow = all_shows[key]["episodes"].find(
  //     (episode) => episode.id == episodeID
  //   );
  //   foundShow["handle"] = key;
  //   foundShow["duration"] = shows[key]["duration"];
  //   const calculatedProgress = Math.round(
  //     (shows[key]["progress"] / shows[key]["duration"]) * 100
  //   );
  //   foundShow["progress"] = calculatedProgress;
  //   tempArr.push(foundShow);
  // }
  // return res.send(tempArr);
});

// get episode stream
app.get("/episodes/:showHandle/:episodeID", (req, res) => {
  const range = req.headers.range;
  const videoPath = `./episodes/${req.params.showHandle}/${req.params.episodeID}.mp4`;
  const videoSize = fs.statSync(videoPath).size;

  const chunkSize = 1 * 1e6;
  var start = 0;
  if (range) {
    start = Number(range.replace(/\D/g, ""));
  } else {
    start = Number(0);
  }

  const end = Math.min(start + chunkSize, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });

  return stream.pipe(res);
});

app.get("/shows/:showHandle", async (req, res) => {
  const foundShow = await Show.find({ handle: req.params.showHandle });
  if (foundShow) {
    res.send(foundShow[0]);
  }
});

app.get("/all_shows", async (req, res) => {
  let items = await Show.find({});
  res.send(items);
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${process.env.PORT}`)); //Line 6
