import getRandomInt from '../../utility/getRandomInt';

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
  shapeCoordinates: [],
  getAnyColorExceptThisOne: function(color) {
    const filtered = this.colors.filter(hex => hex !== color);
    const returnValue = filtered[getRandomInt(0, filtered.length)];

    return returnValue;
  },
  shapeRadius: 40,
  inventoryHeight: 75,
  getUniqueShapeCoordinates: function() {
    const shapeRadius = this.shapeRadius;
    const inventoryHeight = this.inventoryHeight;
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
        0 + shapeRadius, 
        game.config.height  - inventoryHeight - shapeRadius
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