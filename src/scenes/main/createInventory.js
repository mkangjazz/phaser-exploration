import Phaser from "phaser";

export default function createInventory(that){
	var width = that.game.config.width;
	var height = 150;
	var x = width / 2;
	var y = that.game.config.height - height / 2;

	var gridWidth = width / 4;

	that.add.rectangle(
		x,
		y,
		width,
		height,
		0x333333,
	);

	for (var i = 0; i < 4; i++) {
		var line = new Phaser.Geom.Line(
				i * gridWidth, that.game.config.height - height, 
				i * gridWidth, that.game.config.height
		);
			
		var graphics = that.add.graphics({
			lineStyle: {
				color: 0xffffff,
				width: 2,
			}
		});

		graphics.strokeLineShape(line);
	}

	var templateColor = 0x555555;
	var templateWidth = 50;
	var templateY = that.game.config.height - height / 2;

  function addCircle(){
    var shape = that.add.circle(
      gridWidth / 2,
      templateY,
      templateWidth / 2,
      templateColor,
    );

    var geom = new Phaser.Geom.Circle(
      shape.radius,
      shape.radius,
      shape.radius,
    );

    shape.name = 'inventory_circle';

    shape.setInteractive({
      hitArea: shape,
      hitAreaCallback: geom.Contains,
      draggable: false,
      dropZone: false,
      useHandCursor: false,
      cursor: '',
      pixelPerfect: false,
      alphaTolerance: 1,
    });
    
    shape.on('pointerup', function () {
      if (shape.active) {
        shape.fillColor = templateColor;
        
        var item_circle = that.children.getByName('item_circle');

        item_circle.setActive(false);
        item_circle.setVisible(true);
      }
    });
    
    shape.on('pointerover', function () {
      var item_circle = that.children.getByName('item_circle');

      // why doesn't this work...

      if(item_circle.active){
         shape.input.cursor = 'pointer';
      }
    });
    
    shape.setActive(false);
  }
  
  function addRectangle(){
    var shape = that.add.rectangle(
      gridWidth * 2 - gridWidth / 2,
      templateY,
      templateWidth,
      templateWidth,
      templateColor,
    );
    
    shape.name = 'inventory_rectangle';
    
    shape.setInteractive({
      hitArea: shape,
      hitAreaCallback: Phaser.Geom.Circle.Contains,
      draggable: false,
      dropZone: false,
      useHandCursor: true,
      cursor: '',
      pixelPerfect: false,
      alphaTolerance: 1,
    });
  }
  
  function addTriangle(){
    var shape = that.add.triangle(
      gridWidth * 3 - gridWidth / 2, templateY,
      templateWidth / 2, 0,
      0, templateWidth,
      templateWidth, templateWidth,
      templateColor,
    );
    
    shape.name = 'inventory_triangle';
    
    shape.setInteractive({
      hitArea: shape,
      hitAreaCallback: Phaser.Geom.Circle.Contains,
      draggable: false,
      dropZone: false,
      useHandCursor: true,
      cursor: '',
      pixelPerfect: false,
      alphaTolerance: 1,
    });
  }  
	
  function addHexagon(){
    var hypotenuse = .55 * templateWidth;

    var polyY = Math.abs(hypotenuse * Math.sin(60 * Math.PI/180));
    var polyX = Math.abs(hypotenuse * Math.sin(30 * Math.PI/180));

    var shape = that.add.polygon(
      gridWidth * 4 - gridWidth / 2, templateY,
      [
        [0, polyY],
        [polyX, polyY + polyY],
        [polyX + hypotenuse, polyY + polyY],
        [polyX + hypotenuse + polyX, polyY],
        [polyX + hypotenuse, 0],
        [polyX, 0],
      ],
      templateColor,
    );
    
    shape.name = 'inventory_hexagon';
    
    shape.setInteractive({
      hitArea: shape,
      hitAreaCallback: Phaser.Geom.Circle.Contains,
      draggable: false,
      dropZone: false,
      useHandCursor: true,
      cursor: '',
      pixelPerfect: false,
      alphaTolerance: 1,
    });
  }

  addCircle();
  addRectangle();
  addTriangle();
  addHexagon();
}