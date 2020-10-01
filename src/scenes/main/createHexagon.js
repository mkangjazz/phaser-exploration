import Phaser from "phaser";

import getRandomInt from '../../utility/getRandomInt';

export default function rectangle(that){
  var inventory = that.children.getByName('inventory');
  
  var shapeLength = 80;
  var shapeX = getRandomInt(0 + shapeLength, game.config.width - shapeLength);
  var shapeY = getRandomInt(0 + shapeLength, game.config.height  - inventory.height - shapeLength);
  var shapeColor = 0x9f00d0;

  var hypotenuse = 40;
  var polyY = Math.abs(hypotenuse * Math.sin(60 * Math.PI/180));
  var polyX = Math.abs(hypotenuse * Math.sin(30 * Math.PI/180));

  var shape = that.add.polygon(
    shapeX, shapeY,
    [
      [0, polyY],
      [polyX, polyY + polyY],
      [polyX + hypotenuse, polyY + polyY],
      [polyX + hypotenuse + polyX, polyY],
      [polyX + hypotenuse, 0],
      [polyX, 0],
    ],
    shapeColor,
  );
  
  shape.name = 'item_hexagon';
  
  shape.setActive(false);
  
//  var geom = new Phaser.Geom.Circle(
//    0 + shape.radius,
//    0 + shape.radius,
//    shape.radius,
//  );
//
//  shape.setInteractive({
//    hitArea: geom,
//    hitAreaCallback: geom.Contains,
//    draggable: false,
//    dropZone: false,
//    useHandCursor: false,
//    cursor: '',
//    pixelPerfect: false,
//    alphaTolerance: 1,
//  });
//
//  shape.on('pointerup', function(){
//    shape.setActive(true);
//    shape.setVisible(false);
//
//    var inventory_circle = that.children.getByName('inventory_circle');
//
//    inventory_circle.setActive(true);
//    inventory_circle.fillColor = shapeColor;
//  });
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