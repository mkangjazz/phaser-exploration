import Phaser from "phaser";

import getRandomInt from '../../utility/getRandomInt';

export default function rectangle(that){
  var inventory = that.children.getByName('inventory');
  
  var shapeLength = 70;
  var shapeX = getRandomInt(0 + shapeLength, game.config.width - shapeLength);
  var shapeY = getRandomInt(0 + shapeLength, game.config.height  - inventory.height - shapeLength);
  var shapeColor = 0x9f00d0;

  var shape = that.add.rectangle(
    shapeX,
    shapeY,
    shapeLength,
    shapeLength,
    shapeColor,
  );

  shape.name = 'item_rectangle';
  
  shape.setActive(false);
  
  var geom = new Phaser.Geom.Circle(
    0 + shape.radius,
    0 + shape.radius,
    shape.radius,
  );

  shape.setInteractive({
    hitArea: geom,
    hitAreaCallback: geom.Contains,
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
      var colors = that._globalData.colors;

      shape.fillColor = colors[getRandomInt(0, colors.length - 1)];
    } else {
      // single-click

      if (shape.fillColor === inventory_rectangle.fillColor) {
        shape.setActive(true);
        shape.setVisible(false);

        inventory_rectangle.setActive(true);

        return;
      }
    }
  });
//
//  shape.on('pointerover', function () {
//    var newColor = new Phaser.Display.Color();
//    
//    shapeColor = newColor.random(50).color;
//
////  shape.input.cursor = 'pointer';
//    shape.fillColor = shapeColor;
//  });

//  shape.on('pointerout', function () {
//    shape.fillColor = shapeColor;
//  });
}