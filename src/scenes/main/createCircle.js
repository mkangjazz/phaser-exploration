import Phaser from "phaser";

import getRandomInt from '../../utility/getRandomInt';

export default function circle(that){
  var shapeRadius = that._globalData.shapeRadius;

  var uniqueCoordinates = that._globalData.getUniqueShapeCoordinates();
  var shapeX = uniqueCoordinates.x;
  var shapeY = uniqueCoordinates.y;

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
    shape.fillColor = that._globalData.getAnyColorExceptThisOne(shape.fillColor);
  });
}