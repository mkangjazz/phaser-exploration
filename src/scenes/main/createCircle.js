import Phaser from "phaser";

import getRandomInt from '../../utility/getRandomInt';

export default function circle(that){
  var inventory = that.children.getByName('inventory');

  var shapeRadius = 40;
  var shapeX = getRandomInt(0 + shapeRadius, game.config.width - shapeRadius);
  var shapeY = getRandomInt(0 + shapeRadius, game.config.height  - inventory.height - shapeRadius);
  var shapeColor = 0x9f00d0;

  var shape = that.add.circle(
    shapeX,
    shapeY,
    shapeRadius,
    shapeColor,
  );

  shape.name = 'item_circle';
  
  shape.setActive(false);  

  shape.setInteractive({
    hitArea: shape,
    hitAreaCallback: shape.Contains,
    draggable: false,
    dropZone: false,
    useHandCursor: false,
    cursor: '',
    pixelPerfect: false,
    alphaTolerance: 1,
  });

  shape.on('pointerup', function(){
    var inventory_circle = that.children.getByName('inventory_circle');

    if (shape.fillColor === inventory_circle.fillColor) {
      shape.setActive(true);
      shape.setVisible(false);

      inventory_circle.setActive(true);
    }
  });

  shape.on('pointerout', function () {
    var colors = that._globalData.colors;

    shape.fillColor = colors[getRandomInt(0, colors.length)];
  });
}