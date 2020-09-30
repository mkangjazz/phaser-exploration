import Phaser from "phaser";

import createInventory from './createInventory';
import createCircle from './createCircle';

var scene = new Phaser.Scene('Home');

scene.preload = function(){
};

scene.create = function(){
	createInventory(this);
	createCircle(this);
};

scene.update = function(){
	
};

scene._state = {
  circle: false,
  square: false,
  triangle: false,
  hexagon: false,
};

console.log(scene);

export default scene;