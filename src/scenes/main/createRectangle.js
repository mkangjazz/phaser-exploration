import Phaser from "phaser";

import getRandomInt from '../../utility/getRandomInt';

export default function rectangle(that){
  var shapeLength = that._globalData.shapeRadius() + 30;

  var uniqueCoordinates = that._globalData.getUniqueShapeCoordinates();
  var shapeX = uniqueCoordinates.x;
  var shapeY = uniqueCoordinates.y;

  var shapeColor = that._globalData.getRandomColor();

  var shape = that.add.rectangle(
    shapeX,
    shapeY,
    shapeLength,
    shapeLength,
    shapeColor,
  );

  shape.name = 'item_rectangle';
  
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

  var lastTime = 0;
  
  shape.on('pointerup', function(){
    var inventory_rectangle = that.children.getByName('inventory_rectangle');
    var clickDelay = that.time.now - lastTime;
    
    lastTime = that.time.now;

    if (clickDelay < 750) {
      shape.fillColor = that._globalData.getAnyColorExceptThisOne(shape.fillColor);
    } else {
      // single-click

      if (shape.fillColor === inventory_rectangle.fillColor) {
        shape.setActive(true);
        shape.setVisible(false);

        inventory_rectangle.setActive(true);

        that._globalData.setSolved(shape);

        return;
      }
    }
  });
}