var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');

// Board
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

// Player Object constructor
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = 'blue';
  this.speed = 10;
}

Paddle.prototype.move = function(direction) {
  if(this.y + direction >= 0 && this.y + this.height + direction <= canvas.height) {
    this.y += direction;
  }
};

Paddle.prototype.render = function() {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
};

// press key event listener
function addKeyEvent() {
  window.addEventListener('keydown', keyPress, true);
}

// players key press movement
function keyPress(direction) {
  switch (direction.keyCode) {
    case 38:
      human.move(-human.speed); // up
      break;
    case 40:
      human.move(human.speed); // down
      break;
  }
}

// Declare new players and ball
var human = new Paddle(0, 200, 25, 110);
var computer = new Paddle(625, 190, 25, 110);
var ball = new Ball(canvas.width / 2, canvas.height / 2);

// Computer AI
computer.update = function(ball) {
  var ball_y_position = ball.y;
  var diff = -((computer.y + (computer.width / 2)) - ball_y_position)

  if(diff < 0) {
    diff = -2;
  } else if(diff > 0) {
    diff = 2;
  }
  // Sets the diffictulty
  computer.move(diff * .50);
};

// Ball Object constructor
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.color = 'white';
  this.radius = 10;
  this.x_speed = -3;
  this.y_speed = -2;

  this.resetPosition = function() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  };

  this.resetSpeed = function() {
    this.x_speed = -3;
    this.y_speed = -1;
  };

  this.reset = function() {
    this.resetSpeed();
    this.resetPosition();
  };
}

Ball.prototype.render = function() {
  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  context.fill();
};

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
    console.log(paddle[axis]);
    var rectPos = paddle[axis] + paddle[widthheight] / 2;
    return Math.abs(ball[axis] - rectPos);

    // if (axis ===  "x") {
    //   widthheight = "width";
    // } else {
    //   widthheight = "height";
    // }
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
};

Ball.prototype.update = function() {
  if(this.x < 0) {
    this.reset();
  } else if(this.x > 650) {
    this.reset();
  }

  // if(rightScored || leftScored) {
  //   if(rightScored) {
  //     rightScored++;
  //   }
  //   if(leftScored) {
  //     leftScored++;
  //   }
  //   this.reset();
  // }

};

// Continuously renders the view during gameplay
var animate = window.requestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };

var step = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  update();
  render();
  animate(step);
};

// Render method to load players and ball
var render = function() {
  human.render();
  computer.render();
  ball.render();
  ball.move();
};

var update = function() {
  computer.update(ball);
  ball.update();
};

// Render objects on window load
window.onload = function() {
  addKeyEvent();
  step();
};
