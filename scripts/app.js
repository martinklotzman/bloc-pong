var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');


// Board
context.fillStyle = 'black';
context.fillRect(25, 25, canvas.width, canvas.height);

// Player Object constructor
function Player(x, y) {
  this.x = x;
  this.y = y;
  this.width = 25;
  this.height = 100;
  this.color = 'blue';
  this.render = function () {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

// Declare new players and ball
var human = new Player(25,200);
var computer = new Player(625, 200);
var ball = new Ball(325, 250);

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.color = 'white';
  this.render = function () {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    context.fill();
  };
}

// Render method to load paddles and ball
var render = function() {
  ball.render();
  human.render();
  computer.render();
};

// Render objects on window load
window.onload = function() {
  render();
};
