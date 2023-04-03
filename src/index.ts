import { WebSocketServer } from "ws";
import { Client } from "@xhayper/discord-rpc";
import axios from "axios";
const artistAvatars = new Map();
let startedDate = new Date();
let lastSong = "";
console.log(`Started`);
const client = new Client({
  clientId: "1063466467758182472",
});

const wss = new WebSocketServer({ port: 8080 });

client.on("ready", async () => {
  wss.on("connection", async function (ws) {
    ws.on("error", console.error);

    ws.on("message", async function (message: string) {
      const data = JSON.parse(message);
      console.log(data);
      if (lastSong !== data.song) {
        lastSong = data.song;
        startedDate = new Date();
      }

      let endDate = new Date(startedDate);
      endDate.setMinutes(
        endDate.getMinutes() + Number(data.length.split(":")[0])
      );
      endDate.setSeconds(
        endDate.getSeconds() + Number(data.length.split(":")[1])
      );

      await client.user?.setActivity({
        details: data.song,
        state: data.line.length <= 2 ? "..." : data.line,
        largeImageKey: data.art,
        largeImageText: data.song,
        smallImageKey: await getArtistArt(data.artistId),
        smallImageText: data.artistName,
        startTimestamp: startedDate,
        endTimestamp: endDate,
        //type: 5,
      });
    });
  });
});

client.login();

async function getArtistArt(id: string) {
  if (artistAvatars.has(id)) return artistAvatars.get(id);
  const res = await axios.get(
    `https://open.spotify.com/embed/artist/${id}?utm_source=generator`
  );
  const image = res.data.match(
    /<meta\s+property="og:image"\s+content="([^"]+)"/i
  )[1];

  artistAvatars.set(id, image);
  return image;
}
