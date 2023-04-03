# spotify-live-status

Allows you to show your Spotify status to discord with lyrics support!

<img width="368" alt="image" src="https://user-images.githubusercontent.com/51315646/229553964-144c10dd-0dcb-4c28-92e3-c4d18a2b3b0d.png">

## Files

`browser.js`: this is a userscript which feeds the spotify data to the server, just install this inside tampermonkey and it will work.
`src/index.ts`: the server code which runs the rpc part, please build it first then run the compiled version.

For this to work, please open the Spotify lyrics page so the script can read the lyric, also please expand the album art, this would allow the script to get a better quality album art.

<img width="205" alt="image" src="https://user-images.githubusercontent.com/51315646/229554905-24b342ca-46b4-4b47-bb38-5c389395a262.png">
