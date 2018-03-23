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
  this.height = 110;
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
var computer = new Player(625, 190);
var ball = new Ball(325, 250);

// Ball Object constructor
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.color = 'white';
  this.x_speed = -3;
  this.y_speed = 0;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
  context.fill();
}

Ball.prototype.move = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y -= this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.y - 5 < 0) { //hitting the top wall
    this.y = 5;
    this.y_speed = -this.y_speed;
  } else if (this.y + 5 > 500) { //hitting the bottom wall
    this.y = 495;
    this.y_speed = -this.y_speed;
  }
// move collusion into its own protoype function?
  if((paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
    // hit the player's paddle
    this.y_speed = 0;
    this.x_speed += (paddle1.speed / 2);
    // this.y += this.y_speed;
    console.log("human");
  }

  if((paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
    // hit the computer's paddle
    this.y_speed = 5;
    this.x_speed -= (paddle2.speed / 2);
    // this.y -= this.y_speed;
    console.log("computer");
  }
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
  human.render();
  computer.render();
  ball.render();
  ball.move(human, computer);
};

// Render objects on window load
window.onload = function() {
  addEventKey();
  step();
};
