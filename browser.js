// ==UserScript==
// @name         Spotify Live Status
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://open.spotify.com/lyrics
// @icon         https://www.google.com/s2/favicons?sz=64&domain=spotify.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  let data = {};
  let ws;
  function connect() {
    ws = new WebSocket("ws://localhost:8080");

    ws.onopen = function () {
      console.log("started");
      setInterval(function () {
        let currentLine = document.getElementsByClassName(
          "arY01KDGhWNgzlAHlhpd"
        )[0].innerText;
        let currentSong = document.querySelector(
          `[data-testid="context-item-link"]`
        );
        let currentSongArtist = document.querySelector(
          `[data-testid="context-item-info-artist"]`
        );
        let currentSongArt = document.querySelector(
          `[data-testid="cover-art-image"]`
        ).src;
        let currentSongLength = document.querySelector(
          `[data-testid="playback-duration"]`
        ).innerText;

        let newData = {
          line: currentLine,
          song: currentSong.innerText,
          artistName: currentSongArtist.innerHTML,
          artistId: currentSongArtist.href.split("artist/")[1],
          art: currentSongArt,
          length: currentSongLength,
        };

        if (JSON.stringify(data) !== JSON.stringify(newData)) {
          data = newData;
          console.log(data);
          ws.send(JSON.stringify(data));
        }
      }, 500);
    };

    ws.onclose = function (e) {
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        e.reason
      );
      setTimeout(function () {
        connect();
      }, 1000);
    };
  }

  connect();
})();
