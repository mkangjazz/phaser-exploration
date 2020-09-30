import Phaser from "phaser";

export default function circle(that){
  var isSelected = false;      
  var shapeX = 400;
  var shapeY = 50;
  var shapeColor = 0x9f00d0;

  var shape = that.add.circle(
    shapeX,
    shapeY,
    40,
    shapeColor,
  );

  shape.name = 'item_circle';
  
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

  shape.on('pointerup', function(){
    shape.setActive(true);
    shape.setVisible(false);

    var inventory_circle = that.children.getByName('inventory_circle');

    inventory_circle.setActive(true);
    inventory_circle.fillColor = shapeColor;
  });

  shape.on('pointerover', function () {
    var newColor = new Phaser.Display.Color();
    
    shapeColor = newColor.random(50).color;

//  shape.input.cursor = 'pointer';
    shape.fillColor = shapeColor;
  });

//  shape.on('pointerout', function () {
//    shape.fillColor = shapeColor;
//  });

}