let player;
let items = [];
let score = 0;
let itemTypes = ['campo', 'cidade'];
let gameWidth = 600;
let gameHeight = 400;

function setup() {
  createCanvas(gameWidth, gameHeight);
  player = new Player();
  frameRate(60);
}

function draw() {
  background(180, 230, 180); 
  stroke(150);
  strokeWeight(4);
  line(width / 2, 0, width / 2, height);

  fill(200, 200, 255);
  noStroke();
  rect(width / 2, 0, width / 2, height); 
  player.move();
  player.show();

  if (frameCount % 60 === 0) {
    items.push(new Item(random(itemTypes)));
  }

  for (let i = items.length - 1; i >= 0; i--) {
    items[i].fall();
    items[i].show();

    if (items[i].hits(player)) {
      score++;
      items.splice(i, 1);
    } else if (items[i].offscreen()) {
      items.splice(i, 1);
    }
  }

  fill(0);
  textSize(20);
  text("Pontuação: " + score, 10, 30);

  noStroke(); 
  fill(80);
  textSize(14);
  textAlign(CENTER);
  text("Campo", width / 4, 20);
  text("Cidade", width * 3/4, 20);
}
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.size = 40;
    this.speed = 5;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
  }

  show() {
    fill(255, 220, 180);
    ellipse(this.x, this.y, this.size, this.size);
    
    fill(60, 120, 40);
    triangle(
      this.x - this.size / 2, this.y - 20,
      this.x, this.y - 40,
      this.x, this.y - 20
    );
    fill(100, 100, 180);
    rect(this.x, this.y - 40, this.size / 4, 20);
    fill(200);
    rect(this.x + 5, this.y - 35, 6, 6);
   rect(this.x + 15, this.y - 35, 6, 6);
  }
}

class Item {
  constructor(type) {
    this.type = type;
    this.x = this.type === 'campo' ? random(20, width / 2 - 20) : random(width / 2 + 20, width - 20);
    this.y = 0;
    this.size = 30;
    this.speed = 2 + random(1);
  }

  fall() {
    this.y += this.speed;
  }

  offscreen() {
    return this.y > height + this.size;
  }

  hits(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    return d < (this.size + player.size) / 2;
  }

  show() {
    if (this.type === 'campo') {
      this.drawCampo();
    } else {
      this.drawCidade();
    }
  }

  drawCampo() {
    push();
    translate(this.x, this.y);
    fill(255, 220, 0);
    ellipse(0, 0, this.size / 2, this.size);
    fill(100, 180, 40);
    for (let i = -this.size / 4; i < this.size / 4; i += 10) {
      triangle(i, 0, i + 5, -10, i + 10, 0);
    }
    pop();
  }

  drawCidade() {
    push();
    translate(this.x, this.y);
    fill(100, 100, 180);
    rectMode(CENTER);
    rect(0, 0, this.size / 2, this.size);
    fill(255);
    for (let y = -this.size / 4; y < this.size / 4; y += 10) {
      for (let x = -this.size / 4; x < this.size / 4; x += 10) {
        rect(x, y, 5, 5);
      }
    }
    pop();
  }
}
