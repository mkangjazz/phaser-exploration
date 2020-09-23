'use strict';

import Phaser from "phaser";
import logoImg from "./assets/logo.png";

window.game = window.game || (function(){
  function preload() {
    this.load.image("logo", logoImg);
  }

  function create() {
    this.add.text(100, 50, "ROLL TIDE");
    this.add.circle(200, 200, 100, 0x9f00d0);
    this.add.image(350, 100, "logo");
  }

  const config = {
    backgroundColor: 'rgb(50, 50, 50)',
    height: 400,
    type: Phaser.AUTO,
    parent: "app",
    width: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 50 }
        }
    },
    scene: {
      preload: preload,
      create: create
    }
  };

  return new Phaser.Game(config);
})();
