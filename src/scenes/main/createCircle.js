import Phaser from "phaser";

import getRandomInt from '../../utility/getRandomInt';

export default function circle(that){
  const shapeRadius = that._globalData.shapeRadius() * .75;

  var uniqueCoordinates = that._globalData.getUniqueShapeCoordinates();
  var shapeX = uniqueCoordinates.x;
  var shapeY = uniqueCoordinates.y;

  var shapeColor = that._globalData.getRandomColor();

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

      that._globalData.setSolved(shape);
    }
  });

  shape.on('pointerout', function () {
    shape.fillColor = that._globalData.getAnyColorExceptThisOne(shape.fillColor);
  });
}