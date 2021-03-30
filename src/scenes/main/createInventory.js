import Phaser from "phaser";

export default function createInventory(that){
  function addCircle(){
    var shape = that.add.circle(
      gridWidth / 2,
      templateY,
      templateWidth / 2,
      that._globalData.getRandomColor(),
    );

    shape.name = 'inventory_circle';
    
    shape.setActive(false);
  }
  
  function addRectangle(){
    var shape = that.add.rectangle(
      gridWidth * 2 - gridWidth / 2,
      templateY,
      templateWidth,
      templateWidth,
      that._globalData.getRandomColor(),
    );
    
    shape.name = 'inventory_rectangle';
  }
  
  function addTriangle(){
    var shape = that.add.triangle(
      gridWidth * 3 - gridWidth / 2, templateY,
      templateWidth / 2, 0,
      0, templateWidth,
      templateWidth, templateWidth,
      that._globalData.getRandomColor(),
    );
    
    shape.name = 'inventory_triangle';
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
      that._globalData.getRandomColor(),
    );

    shape.name = 'inventory_hexagon';
  }

	const width = that.game.config.width;
	const inventoryHeight = that._globalData.inventoryHeight();

	var x = width / 2;
	var y = inventoryHeight / 2;

	var gridWidth = width / 4;

	var rect = that.add.rectangle(
		x,
		y,
		width,
		inventoryHeight,
		0x333333,
	);

  rect.name = 'inventory';

	for (var i = 1; i < 4; i++) {
		var line = new Phaser.Geom.Line(
      i * gridWidth, inventoryHeight, 
      i * gridWidth, 0
		);
			
		var graphics = that.add.graphics({
			lineStyle: {
				color: 0x000000,
				width: 4,
			}
		});

		graphics.strokeLineShape(line);
	}

	var templateWidth = 50;
	var templateY = inventoryHeight / 2;

  addCircle();
  addRectangle();
  addTriangle();
  addHexagon();
}