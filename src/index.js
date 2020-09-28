'use strict';

import Phaser from "phaser";
import logoImg from "./assets/logo.png";

window.game = window.game || (function() {
  function preload() {
//    this.load.image("logo", logoImg);
  }

  function create() {
    var that = this;
    
    function makeDropzone(){
      var width = that.game.config.width;
      var height = 100;
      
      var rectangle = that.add.rectangle(
        0 + width / 2,
        that.game.config.height - height / 2,
        width,
        height,
        0x333333,
      );

      var zone = that.add.zone(
        rectangle.x, 
        rectangle.y,
        rectangle.width,
        that.game.config.height,
      ).setRectangleDropZone(300, 300);
    }
    
    function makeItem(){
      var isSelected = false;
      
      var shapeX = 200;
      var shapeY = 200;
      var shapeColor = 0x9f00d0;
      var shapeColorSelected = 0x666666;

      var shape = that.add.circle(
        shapeX,
        shapeY,
        40,
        shapeColor,
      );

      // why is the positioning off/weird...
      var geom = new Phaser.Geom.Circle(
        0 + shape.radius,
        0 + shape.radius,
        shape.radius,
      );

      console.log('makeItem', shape, geom);
      
      shape.setInteractive(geom, Phaser.Geom.Circle.Contains);
      
      shape.on('pointerup', function(){
        console.log('pointerup');

        if (isSelected === false) {
          shape.x = 0 + shape.width;
          shape.y = that.game.config.height - 50;
          shape.fillColor = shapeColorSelected;
        } else {
          shape.x = shapeX;
          shape.y = shapeY;
          shape.isStroked = false;
          shape.fillColor = shapeColor;
        }
        
        isSelected = !isSelected;
      });

      shape.on('pointerover', function () {
        console.log('pointerover');

        if (isSelected === false) {
          var newColor = new Phaser.Display.Color();

          shape.fillColor = newColor.random(50).color;            
        } else {
          shape.isStroked = true;
          shape.strokeColor = 0xFF0000;
        }
      });

      shape.on('pointerout', function () {
        console.log('pointerout');
        
        if (isSelected === false) {
          shape.fillColor = shapeColor;            
        } else {
          shape.isStroked = false;
        } 
      });
    }

    makeDropzone();

    makeItem();
  }

  function update(){
    //
  }

  const config = {
    backgroundColor: 0xcccccc,
    height: 400,
    type: Phaser.AUTO,
    parent: "app",
    width: 800,
//    physics: {
//        default: 'arcade',
//        arcade: {
//            gravity: { y: 50 }
//        }
//    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    }
  };

  return new Phaser.Game(config);
})();
