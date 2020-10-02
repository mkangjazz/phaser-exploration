import Phaser from "phaser";

import createInventory from './createInventory';
import createCircle from './createCircle';
import createRectangle from './createRectangle';
import createTriangle from './createTriangle';
import createHexagon from './createHexagon';

var scene = new Phaser.Scene('Home');

scene.preload = function(){
};

scene.create = function(){
	createInventory(this);

	createCircle(this);

  createRectangle(this);
  
  createTriangle(this);
  
  createHexagon(this);
};

scene.update = function(){	
};

scene._globalData = {
  colors: [
    0xFFFFFF,
    0xFF0000,
    0xFFFF00,
    0x0000FF,
  ],
  item_positions: [
  ],
}

export default scene;