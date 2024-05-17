var bow;
var arrow, arrow0, arrow01;
var bg;
var boundary;
var pinkBalloonImage, greenBalloonImage, blueBalloonImage, redBalloonImage;
var score = 0;
var redB, blueB, pinkB, greenB, arrowGroup;
var balloonPopSound, arrowSound, winSound;
var PLAY = 1;
var END = 2;
var LOST = 3;
var gamestate = 1;

function preload() {
  bow0 = loadAnimation("assets//bow0.png");
  arrow0 = loadAnimation("assets//arrow0.png");
  arrow01 = loadImage("assets//arrow0.png");
  bg0 = loadImage("assets//background0.png");
  pinkBalloonImage0 = loadImage("assets//pink_balloon0.png");
  greenBalloonImage0 = loadImage("assets//green_balloon0.png");
  blueBalloonImage0 = loadImage("assets//blue_balloon0.png");
  redBalloonImage0 = loadImage("assets//red_balloon0.png");

  balloonPopSound = loadSound("assets//balloonPop.mp3");
  arrowSound = loadSound("assets//arrow.mp3");
  winSound = loadSound("assets//win.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(width / 2, height / 2, windowWidth, windowHeight);
  bg.addImage(bg0);
  bg.scale = 5;

  bow = createSprite(width - 100, height / 2);
  bow.addAnimation("bow", bow0);

  boundary = createSprite(width - 200, height / 2, 10, height);
  boundary.shapeColor = color('brown');

  redB = new Group();
  pinkB = new Group();
  blueB = new Group();
  greenB = new Group();
  arrowGroup = new Group();
}

function draw() {
  if (gamestate === PLAY) {
    bow.y = World.mouseY;

    var select_balloon = Math.round(random(1, 4));
    if (World.frameCount % 50 == 0) {
      if (select_balloon == 1) {
        redBalloon();
      } else if (select_balloon == 2) {
        pinkBalloon();
      } else if (select_balloon == 3) {
        blueBalloon();
      } else if (select_balloon == 4) {
        greenBalloon();
      }
    }

    if (touches.length > 0 || keyWentDown("SPACE")) {
      createArrow();
      arrowSound.play();
      touches = [];
    }

    arrowGroup.overlap(redB, balloonHit);
    arrowGroup.overlap(pinkB, balloonHit);
    arrowGroup.overlap(blueB, balloonHit);
    arrowGroup.overlap(greenB, balloonHit);

    redB.overlap(boundary, boundaryHit);
    pinkB.overlap(boundary, boundaryHit);
    blueB.overlap(boundary, boundaryHit);
    greenB.overlap(boundary, boundaryHit);

    if (score === 10) {
      gamestate = END;
      winSound.play();
    } else if (score === -1) {
      gamestate = LOST;
    }

    drawSprites();

    fill("black");
    textSize(32);
    text("Score: " + score, width - 300, height - 50);
  } else if (gamestate === END) {
    fill("blue");
    textSize(100);
    textAlign(CENTER, CENTER);
    text("You Won!", width / 2, height / 2);
    bow.visible = false;
  } else if (gamestate === LOST) {
    fill("red");
    textSize(100);
    textAlign(CENTER, CENTER);
    text("You LOST!", width / 2 - 10, height / 2);
    bow.visible = false;
  }
}

function createArrow() {
  arrow = createSprite(width - 130, 300, 5, 10);
  arrow.velocityX = -6;
  arrow.scale = 0.3;
  arrow.y = World.mouseY;
  arrow.addImage(arrow01);
  arrow.setCollider("rectangle", 0, 0, arrow.width - 20, arrow.height - 20);
  arrowGroup.add(arrow);
  return arrow;
}

function balloonHit(arrow, balloon) {
  balloon.remove();
  arrow.remove();
  score += 1;
  balloonPopSound.play();
}

function boundaryHit(balloon) {
  balloon.remove();
  score -= 1;
}

function redBalloon() {
  var red = createSprite(0, Math.round(random(20, height - 20)), 10, 10);
  red.addImage(redBalloonImage0);
  red.velocityX = 3;
  red.lifetime = width / red.velocityX;
  red.scale = 0.15;
  redB.add(red);
}

function pinkBalloon() {
  var pink = createSprite(0, Math.round(random(20, height - 20)), 10, 10);
  pink.addImage(pinkBalloonImage0);
  pink.velocityX = 3;
  pink.lifetime = width / pink.velocityX;
  pink.scale = 2;
  pinkB.add(pink);
}

function blueBalloon() {
  var blue = createSprite(0, Math.round(random(20, height - 20)), 10, 10);
  blue.addImage(blueBalloonImage0);
  blue.velocityX = 3;
  blue.lifetime = width / blue.velocityX;
  blue.scale = 0.15;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0, Math.round(random(20, height - 20)), 10, 10);
  green.addImage(greenBalloonImage0);
  green.velocityX = 3;
  green.lifetime = width / green.velocityX;
  green.scale = 0.15;
  greenB.add(green);
}
