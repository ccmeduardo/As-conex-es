let personagem;
let itens = [];
let obstaculos = [];
let pontos = 0;
let tempo = 0;
let jogoIniciado = false;

function setup() {
  createCanvas(600, 600);
  personagem = new Personagem();
  frameRate(60);

  // Aguarda 6 segundos (360 frames) para iniciar o jogo
  setTimeout(() => {
    jogoIniciado = true;
  }, 6000);
}

function draw() {
  background(200, 255, 200);

  if (!jogoIniciado) {
    // Mensagem antes do jogo começar
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Para começar use as setas para se movimentar\npara pegar todos os itens", width / 2, height / 2);
    return;
  }

  personagem.display();
  personagem.move();

  tempo++;
  if (tempo % 60 == 0) {
    gerarItem();
  }

  for (let i = itens.length - 1; i >= 0; i--) {
    itens[i].update();
    itens[i].display();

    if (personagem.colidiu(itens[i])) {
      itens.splice(i, 1);
      pontos += 10;
    }
  }

  for (let i = obstaculos.length - 1; i >= 0; i--) {
    obstaculos[i].update();
    obstaculos[i].display();

    if (personagem.colidiu(obstaculos[i])) {
      obstaculos.splice(i, 1);
      pontos -= 5;
    }
  }

  fill(0);
  textSize(24);
  textAlign(CENTER);
  text("Pontos: " + pontos, width / 2, 30);
}

function gerarItem() {
  let tipo = random() > 0.5 ? 'campo' : 'cidade';
  let item = new Item(tipo);
  itens.push(item);

  if (random() > 0.8) {
    let obstaculo = new Obstaculo();
    obstaculos.push(obstaculo);
  }
}

class Personagem {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 30;
    this.speed = 5;
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.size) {
      this.x += this.speed;
    }
  }

  display() {
    textSize(32);
    fill(0);
    text("🚶", this.x, this.y);
  }

  colidiu(obj) {
    return dist(this.x, this.y, obj.x, obj.y) < this.size + obj.size;
  }
}

class Item {
  constructor(tipo) {
    this.tipo = tipo;
    this.x = random(width);
    this.y = -20;
    this.size = 30;
    this.speed = 3;
    this.emoji = this.tipo === 'campo' ? '🌾' : '🏙️';
  }

  update() {
    this.y += this.speed;
  }

  display() {
    textSize(32);
    fill(0);
    text(this.emoji, this.x, this.y);
  }
}

class Obstaculo {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.size = 40;
    this.speed = 4;
    this.emoji = '🚗';
  }

  update() {
    this.y += this.speed;
  }

  display() {
    textSize(40);
    fill(255, 0, 0);
    text(this.emoji, this.x, this.y);
  }
}
