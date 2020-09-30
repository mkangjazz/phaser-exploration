import Phaser from "phaser";
import logoImg from "./assets/logo.png";

import sceneMain from './scenes/main/index.js';

window.game = window.game || (function() {
  const config = {
    backgroundColor: 0xcccccc,
    height: 400,
    type: Phaser.AUTO,
    parent: "app",
    width: 800,
    scene: [
      sceneMain,
    ],
    title: 'Phaser Exploration MK',
  };
  
//var defaultInputConfigurationObject = {
//  hitArea: {},
//  hitAreaCallback: function(){},
//  draggable: false,
//  dropZone: false,
//  useHandCursor: false,
//  cursor: '',
//  pixelPerfect: false,
//  alphaTolerance: 1,
//}

  return new Phaser.Game(config);
})();
