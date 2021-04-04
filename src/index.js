import main from "./css/main.css";
import reset from "./css/reset.css";

import Phaser from "phaser";

import sceneMain from './scenes/main/index.js';
import sceneVictory from './scenes/victory/index.js';

window.game = window.game || (function() {
  const config = {
    backgroundColor: 0x000000,
    render: {
      pixelArt: true
    },
    parent: "app",
    scale: {
      height: window.innerHeight * window.devicePixelRatio,
      mode: Phaser.Scale.NONE,
      width: window.innerWidth * window.devicePixelRatio,
      zoom: 1 / window.devicePixelRatio
    },
    scene: [
      sceneMain,
      sceneVictory,
    ],
    title: 'Shapes',
    type: Phaser.AUTO,
  };

  return new Phaser.Game(config);
})();
