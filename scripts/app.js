var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');


// Board
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

// Player Object constructor
function Player(x, y) {
  this.x = x;
  this.y = y;
  this.width = 25;
  this.height = 100;
  this.color = 'blue';
  this.speed = 10;

  // Prevents Player Object from leaving game board
  this.boardEdge  = function(direction) {
    if(this.y + direction >= 0 && this.y + this.height + direction <= canvas.height) {
      this.y += direction;
    }
  };

  this.render = function () {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

// Player paddle controls
Player.prototype.move = function(event) {
  let keyCode = event.keyCode;
  switch(keyCode) {
    case 38:
      this.human.boardEdge(-human.speed);
      break;
    case 40:
      this.human.boardEdge(human.speed);
      break;
    default:
      break;
    }
}

// Declare new players and ball
var human = new Player(0, 200);
var computer = new Player(625, 200);
var ball = new Ball(325, 250);

// Ball Object constructor
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.color = 'white';
  this.render = function() {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    context.fill();
  };
}

// Continuously renders the view during gameplay
var animate = window.requestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };

var step = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  render();
  animate(step);
};

// Event listener for paddle movement
function addEventKey() {
  window.addEventListener("keydown", human.move);
}

// Render method to load players and ball
var render = function() {
  ball.render();
  human.render();
  computer.render();
};

// Render objects on window load
window.onload = function() {
  addEventKey();
  step();
};
