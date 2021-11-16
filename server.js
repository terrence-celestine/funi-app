const express = require("express"); //Line 1
const app = express(); //Line 2
const fs = require("fs");
const port = process.env.PORT || 5000; //Line 3

const all_shows = {
  demon_slayer: {
    episodes: [
      {
        id: 1,
        title: "Cruelty",
        intro_time: 57,
        jump_time: 88,
        duration: "23:39",
        thumbnail: "ep1.jpg",
        rating: "TV-14",
        prev_episode: false,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 2,
        thumbnail: "ep2.jpg",
        title: "Trainer Sakonji Urodaki",
        duration: "23:39",
        intro_time: 57,
        jump_time: 88,
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 3,
        title: "Sabito and Makomo",
        duration: "23:39",
        thumbnail: "ep3.jpg",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 4,
        thumbnail: "ep4.jpg",
        title: "Final Selection",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 5,
        title: "My Own Steel",
        duration: "23:39",
        thumbnail: "ep5.jpg",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 6,
        thumbnail: "ep6.jpg",
        title: "Swordsman Accompanying a Demon",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 7,
        title: "Muzan Kibutsuji",
        duration: "23:39",
        thumbnail: "ep7.jpg",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 8,
        thumbnail: "ep8.jpg",
        title: "The Smell of Enchanting Blood",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 9,
        title: "Temari Demon and Arrow Demon",
        duration: "23:39",
        thumbnail: "ep9.jpg",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 10,
        thumbnail: "ep10.jpg",
        title: "Together Forever",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 11,
        title: "Tsuzumi Mansion",
        duration: "23:39",
        thumbnail: "ep11.jpg",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 12,
        thumbnail: "ep12.jpg",
        title: "The Boar Bares Its Fangs, Zenitsu Sleeps",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 13,
        title: "Something More Important Than Life",
        duration: "23:39",
        thumbnail: "ep13.jpg",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 14,
        thumbnail: "ep14.jpg",
        title: "The House with the Wisteria Family Crest",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 15,
        title: "Mount Natagumo",
        duration: "23:39",
        thumbnail: "ep15.jpg",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 16,
        thumbnail: "ep16.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 17,
        thumbnail: "ep17.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 18,
        thumbnail: "ep18.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 19,
        thumbnail: "ep19.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 20,
        thumbnail: "ep20.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 21,
        thumbnail: "ep21.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 22,
        thumbnail: "ep22.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 23,
        thumbnail: "ep23.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 24,
        thumbnail: "ep24.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 25,
        thumbnail: "ep25.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        next_episode: true,
        languages: ["english", "japanese"],
      },
      {
        id: 26,
        thumbnail: "ep26.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        rating: "TV-14",
        prev_episode: true,
        languages: ["english", "japanese"],
      },
    ],
  },
};

app.get("/subtitles/:showHandle/:episodeID", (req, res) => {
  res.sendFile(
    `./videos/episodes/${req.params.showHandle}/subtitles/${req.params.episodeID}.vtt`,
    { root: __dirname }
  );
});

// get audio track
app.get("/episodes/:showHandle/:episodeID/audio", (req, res) => {
  const range = req.headers.range;
  const videoPath = `./audio/episodes/${req.params.showHandle}/${req.params.episodeID}/jp.aac`;
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
app.get("/episodes/:showHandle/:episodeID/meta", (req, res) => {
  const handle = `${req.params.showHandle}`.replace("-", "_");
  const foundEpisode = all_shows[handle]["episodes"].find(
    (episode) => episode.id == req.params.episodeID
  );
  return res.send(foundEpisode);
});

app.get("/episodes/:showHandle/:episodeID", (req, res) => {
  const range = req.headers.range;
  const videoPath = `./videos/episodes/${req.params.showHandle}/${req.params.episodeID}.mp4`;
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

app.get("/shows/demon-slayer", (req, res) => {
  res.send({
    id: 0,
    handle: "demon-slayer",
    poster: "demon_slayer.png",
    banner_image: "demon-slayer.jpeg",
    tags: ["action/adventure", "fantasy", "shounen"],
    languages: ["dub", "sub"],
    seasons: 5,
    rating: "TV-14",
    release_date: "2021",
    excerpt:
      "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
    title: "Demon Slayer: Kimetsu no Yaiba",
    category: "Exclusive",
    episodes: [
      {
        id: 1,
        title: "Cruelty",
        duration: "23:39",
        thumbnail: "ep1.jpg",
        languages: ["english", "japanese"],
      },
      {
        id: 2,
        thumbnail: "ep2.jpg",
        title: "Trainer Sakonji Urodaki",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 3,
        title: "Sabito and Makomo",
        duration: "23:39",
        thumbnail: "ep3.jpg",
        languages: ["english", "japanese"],
      },
      {
        id: 4,
        thumbnail: "ep4.jpg",
        title: "Final Selection",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 5,
        title: "My Own Steel",
        duration: "23:39",
        thumbnail: "ep5.jpg",
        languages: ["english", "japanese"],
      },
      {
        id: 6,
        thumbnail: "ep6.jpg",
        title: "Swordsman Accompanying a Demon",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 7,
        title: "Muzan Kibutsuji",
        duration: "23:39",
        thumbnail: "ep7.jpg",
        languages: ["english", "japanese"],
      },
      {
        id: 8,
        thumbnail: "ep8.jpg",
        title: "The Smell of Enchanting Blood",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 9,
        title: "Temari Demon and Arrow Demon",
        duration: "23:39",
        thumbnail: "ep9.jpg",
        languages: ["english", "japanese"],
      },
      {
        id: 10,
        thumbnail: "ep10.jpg",
        title: "Together Forever",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 11,
        title: "Tsuzumi Mansion",
        duration: "23:39",
        thumbnail: "ep11.jpg",
        languages: ["english", "japanese"],
      },
      {
        id: 12,
        thumbnail: "ep12.jpg",
        title: "The Boar Bares Its Fangs, Zenitsu Sleeps",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 13,
        title: "Something More Important Than Life",
        duration: "23:39",
        thumbnail: "ep13.jpg",
        languages: ["english", "japanese"],
      },
      {
        id: 14,
        thumbnail: "ep14.jpg",
        title: "The House with the Wisteria Family Crest",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 15,
        title: "Mount Natagumo",
        duration: "23:39",
        thumbnail: "ep15.jpg",
        languages: ["english", "japanese"],
      },
      {
        id: 16,
        thumbnail: "ep16.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 17,
        thumbnail: "ep17.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 18,
        thumbnail: "ep18.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 19,
        thumbnail: "ep19.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 20,
        thumbnail: "ep20.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 21,
        thumbnail: "ep21.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 22,
        thumbnail: "ep22.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 23,
        thumbnail: "ep23.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 24,
        thumbnail: "ep24.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 25,
        thumbnail: "ep25.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
      {
        id: 26,
        thumbnail: "ep26.jpg",
        title: "Letting Someone Else Go First",
        duration: "23:39",
        languages: ["english", "japanese"],
      },
    ],
  });
});

app.get("/all_shows", (req, res) => {
  res.send({
    videos: [
      {
        id: 0,
        handle: "demon-slayer",
        poster: "demon_slayer.png",
        background_image: "",
        tags: ["action/adventure", "fantasy", "shounen"],
        languages: ["dub", "sub"],
        rating: "R",
        excerpt:
          "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
        title: "Demon Slayer: Kimetsu no Yaiba",
        category: "Exclusive",
      },
      {
        id: 1,
        handle: "combatants-will-be-dispatched",
        poster: "combatants_will_be_dispatched.jpg",
        background_image: "",
        tags: ["action/adventure", "fantasy", "shounen"],
        languages: ["dub", "sub"],
        rating: "R",
        excerpt:
          "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
        title: "Combatants Will Be Dispatched",
        category: "Exclusive",
      },
      {
        id: 2,
        handle: "full-dive",
        poster: "full_dive.jpg",
        background_image: "",
        tags: ["action/adventure", "fantasy", "shounen"],
        languages: ["dub", "sub"],
        rating: "R",
        excerpt:
          "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
        title: "Full Dive",
        category: "Exclusive",
      },
      {
        id: 3,
        handle: "sk-infinity",
        poster: "sk_infinity.jpg",
        background_image: "",
        tags: ["action/adventure", "fantasy", "shounen"],
        languages: ["dub", "sub"],
        rating: "R",
        excerpt:
          "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
        title: "SK To Infinity",
        category: "Exclusive",
      },
      {
        id: 4,
        handle: "suppose-a-kid",
        poster: "suppose_a_kid.jpg",
        background_image: "",
        tags: ["action/adventure", "fantasy", "shounen"],
        languages: ["dub", "sub"],
        rating: "R",
        excerpt:
          "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
        title: "Suppose a Kid",
        category: "Exclusive",
      },
      {
        id: 5,
        handle: "wonder-egg-priority",
        poster: "wonder_egg.jpg",
        background_image: "",
        tags: ["action/adventure", "fantasy", "shounen"],
        languages: ["dub", "sub"],
        rating: "R",
        excerpt:
          "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
        title: "Wonder Egg Priority",
        category: "Exclusive",
      },
      {
        id: 6,
        handle: "msa",
        poster: "msa.jpg",
        background_image: "",
        tags: ["action/adventure", "fantasy", "shounen"],
        languages: ["dub", "sub"],
        rating: "R",
        excerpt:
          "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
        title: "Wonder Egg Priority",
        category: "Exclusive",
      },
      {
        id: 7,
        handle: "the-saints-magic-power-is-omnipotent",
        poster: "the-saints-magic-power-is-omnipotent.jpg",
        background_image: "",
        tags: ["action/adventure", "fantasy", "shounen"],
        languages: ["dub", "sub"],
        rating: "R",
        excerpt:
          "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
        title: "Wonder Egg Priority",
        category: "Exclusive",
      },
      {
        id: 8,
        handle: "banished_heroes_party",
        poster: "banished_heroes_party.jpg",
        background_image: "",
        tags: ["action/adventure", "fantasy", "shounen"],
        languages: ["dub", "sub"],
        rating: "R",
        excerpt:
          "Demons lurk the woods where Tanjirou’s family is slaughtered. Now, all he has left is his sister, and she’s not even human anymore.",
        title: "Wonder Egg Priority",
        category: "Exclusive",
      },
    ],
  });
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
