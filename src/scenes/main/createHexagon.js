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
  
  var startAngle = 0;

  shape.on('dragstart', function(pointer){
    startAngle = Math.abs(shape.rotation * 180 / Math.PI);
  });

  shape.on('drag', function(pointer, x, y){
    var angle = Phaser.Math.Angle.Between(
      shape.x,
      shape.y,
      x,
      y
    );

    var angleDegrees = angle * 180 / Math.PI;
    var rotationDelta = Math.floor(Math.abs(startAngle - angleDegrees));

    if (
      rotationDelta === 90 ||
      rotationDelta === 180 ||
      rotationDelta === -90 ||
      rotationDelta === 180
    ) {
      var colors = that._globalData.colors;
      shape.fillColor = colors[getRandomInt(0, colors.length)];
    }

    shape.setRotation(angle + Math.PI / 2);
  });
  
  var lastTime = 0;
  
  shape.on('pointerdown', function(){
    var inventory_hexagon = that.children.getByName('inventory_hexagon');
    var clickDelay = that.time.now - lastTime;
    
    lastTime = that.time.now;

    if (clickDelay < 750) {
      if (shape.fillColor === inventory_hexagon.fillColor) {
        shape.setActive(true);
        shape.setVisible(false);

        inventory_hexagon.setActive(true);
      }
    }
  });
}