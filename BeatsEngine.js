import { Howl, Howler } from "./howler/dist/howler.js";


// ------------------------------------------------- Music ------------------------------------------------- //
let gameoverSound = new Howl({
  src: ["./sounds/gameover.mp3"],
  volume: 0.5,
});

let backgroundMusic = new Howl({
  src: ["./sounds/background.mp3"],
  volume: 0.5,
  loop: true,
});

function musicEngine(music) {
  music.play();
}