var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');


// Board
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

// Player Object constructor
function Player(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
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
    context.fillRect(this.x, this.y, width, height);
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
var human = new Player(0, 200, 25, 110);
var computer = new Player(625, 190, 25, 110);
var ball = new Ball(canvas.width / 2, canvas.height / 2);

// Ball Object constructor
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.color = 'white';
  this.radius = 10;
  this.x_speed = -2;
  this.y_speed = -1;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  context.fill();
}

Ball.prototype.move = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;

  if (this.y - 5 < 0) {
    this.y_speed = -this.y_speed;
  } else if (this.y + 5 > canvas.height) {
    this.y_speed = -this.y_speed;
  }

  function checkCollision(paddle, axis) {
    var widthheight = axis ==  "x" ? "width" : "height";
    var rectPos = paddle[axis] + paddle[widthheight] / 2;
    return Math.abs(ball[axis] - rectPos);
  };

  var playerX = checkCollision(human, "x");
  var playerY = checkCollision(human, "y");

  var computerX = checkCollision(computer, "x");
  var computerY = checkCollision(computer, "y");

  if(playerX < (human.width/2 + ball.radius) && playerY < (human.height/2 + ball.radius)) {
    this.x_speed = -this.x_speed;
  } else if (computerX < (computer.width / 2 + ball.radius) && computerY < (computer.height / 2 + ball.radius)) {
    this.x_speed = -this.x_speed;
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
  ball.move();
};

// Render objects on window load
window.onload = function() {
  addEventKey();
  step();
};
