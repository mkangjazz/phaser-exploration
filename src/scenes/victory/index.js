import Phaser from "phaser";

const scene = new Phaser.Scene('victory');

scene.preload = function(){
};

scene.create = function(){
  const canvas = this.game.canvas;

  const text = this.make.text({
    add: true,
    x: canvas.width / 2,
    y: canvas.height / 2,
    origin: {
      x: 0.5, 
      y: 0.5
    },
    text: 'You Win!',
    style: {
      align: 'center',
      color: '#ffffff',
      fontSize: '100px',
      fontFamily: '"Press Start 2P", Helvetica, sans-serif',
    },
  });

};

scene.update = function(){	
};

export default scene;