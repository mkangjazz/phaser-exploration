import getRandomInt from '../../utility/getRandomInt';

import Phaser from "phaser";

import createInventory from './createInventory';
import createCircle from './createCircle';
import createRectangle from './createRectangle';
import createTriangle from './createTriangle';
import createHexagon from './createHexagon';

const scene = new Phaser.Scene('home');

scene.preload = function(){
};

scene.create = function(){
  const inventory = createInventory(this);

	createCircle(this);

  createRectangle(this);
  
  createTriangle(this);
  
  createHexagon(this);
};

scene.update = function(){
};

scene._globalData = {
  colors: [
    0x8F00F2,
    0x00CFFB,
    0x5CFF00,
    0xFDFB00,
    0xFDAE32,
    0xFF0C12,
  ],
  getRandomColor: function() {
    return this.colors[getRandomInt(0, this.colors.length)];
  },
  getAnyColorExceptThisOne: function(color) {
    const filtered = this.colors.filter(hex => hex !== color);
    const returnValue = filtered[getRandomInt(0, filtered.length)];
    
    return returnValue;
  },
  scene: scene,
  solvedCount: 0,
  setSolved: function(shape) {
    this.solvedCount += 1;

    if (this.solvedCount === 4) {
      this.scene.scene.start('victory');
    }
  },
  shapeCoordinates: [],
  shapeRadius: () => {
    return window.game.canvas.height * .10;
  },
  inventoryHeight: () => {
    return 100;
  },
  getUniqueShapeCoordinates: function() {
    const shapeRadius = this.shapeRadius();
    const inventoryHeight = this.inventoryHeight();
    const shapeCoordinates = this.shapeCoordinates;

    function doesCollide(o) {
      if (shapeCoordinates.length < 1) {
        return false;
      }

      for (let i = 0; i < shapeCoordinates.length; i += 1) {
        if (
          o.x - shapeRadius < shapeCoordinates[i].x + shapeRadius &&
          o.x + shapeRadius > shapeCoordinates[i].x - shapeRadius &&
          o.y - shapeRadius < shapeCoordinates[i].y + shapeRadius &&
          o.y + shapeRadius > shapeCoordinates[i].y - shapeRadius
        ) {
          return true;
        }
      }

      return false;
    }

    function getRandomXinsideBounds() {
      return getRandomInt(
        0 + shapeRadius,
        game.config.width - shapeRadius
      );
    }

    function getRandomYinsideBounds() {
      return getRandomInt(
        0 + inventoryHeight + shapeRadius, 
        game.config.height - shapeRadius
      );
    }

    const returnValue= {};

    do {
      returnValue.x = getRandomXinsideBounds();
      returnValue.y = getRandomYinsideBounds();
    } while (doesCollide(returnValue));

    shapeCoordinates.push(returnValue);

    return returnValue;
  },
}

export default scene;