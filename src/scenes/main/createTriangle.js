import Phaser from "phaser";

import getRandomInt from '../../utility/getRandomInt';

export default function rectangle(that){
  var shapeLength = that._globalData.shapeRadius() * 1.25;

  const inventoryHeight = that._globalData.inventoryHeight();

  var uniqueCoordinates = that._globalData.getUniqueShapeCoordinates();
  var shapeX = uniqueCoordinates.x;
  var shapeY = uniqueCoordinates.y;

  var shapeColor = that._globalData.getRandomColor();

  var shape = that.add.triangle(
    shapeX, shapeY,
    shapeLength / 2, 0,
    0, shapeLength,
    shapeLength, shapeLength,
    shapeColor,
  );
  
  shape.name = 'item_rectangle';
  
  shape.setActive(false);

  shape.setInteractive({
    hitArea: shape,
    hitAreaCallback: shape.Contains,
    draggable: true,
    dropZone: false,
    useHandCursor: false,
    cursor: '',
    pixelPerfect: false,
    alphaTolerance: 1,
  });

  var startDragX = 0;
  var startDragY = 0;
  var endDragX = 0;
  var endDragY = 0;
  
  var lastTime = 0;
  
  shape.on('pointerdown', function(){
    var inventory_triangle = that.children.getByName('inventory_triangle');
    var clickDelay = that.time.now - lastTime;
    
    lastTime = that.time.now;

    if (clickDelay < 750) {
      if (shape.fillColor === inventory_triangle.fillColor) {
        shape.setActive(true);
        shape.setVisible(false);

        inventory_triangle.setActive(true);

        that._globalData.setSolved(shape);
      }
    }
  });

  shape.on(
    'dragstart',
    function (pointer) {
      startDragX = pointer.downX;
      startDragY = pointer.downY;
    }
  );

  shape.on(
    'drag',
    function(pointer, x, y) {
      this.x = x;
      this.y = y;
    }
  );

  shape.on(
    'dragend',
    function (pointer) {
      endDragX = pointer.upX;
      endDragY = pointer.upY;
      
      if (this.x - shapeLength / 2 < 0) {
        this.x = shapeLength / 2;
      }
      
      if (this.x + shapeLength / 2 > that.game.config.width) {
        this.x = that.game.config.width - shapeLength / 2;
      }

      if (this.y - shapeLength / 2 < inventoryHeight) {
        this.y = shapeLength / 2 + inventoryHeight;
      }
      
      if (this.y + shapeLength / 2 > that.game.config.height) {
        this.y = that.game.config.height - shapeLength / 2;
      }

      if (
        Math.abs(endDragX - startDragX) > 50 || 
        Math.abs(endDragY - startDragY) > 50
      ) {
        shape.fillColor = that._globalData.getAnyColorExceptThisOne(shape.fillColor);
      }
    }
  );
}
