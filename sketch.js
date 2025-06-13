let personagem;
let itens = [];
let obstaculos = [];
let pontos = 0;
let tempo = 0;

function setup() {
  createCanvas(600, 600);
  personagem = new Personagem();
  
  // Inicia o tempo de geração de itens e obstáculos
  frameRate(60);
}

function draw() {
  background(200, 255, 200);  // Fundo que lembra o campo

  // Desenha o personagem
  personagem.display();
  personagem.move();

  // Gera novos itens e obstáculos periodicamente
  tempo++;
  if (tempo % 60 == 0) {
    gerarItem();
  }

  // Desenha e atualiza os itens coletáveis
  for (let i = itens.length - 1; i >= 0; i--) {
    itens[i].update();
    itens[i].display();

    if (personagem.colidiu(itens[i])) {
      itens.splice(i, 1);
      pontos += 10; // Ganha pontos por coletar um item
    }
  }

  // Desenha e atualiza os obstáculos
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    obstaculos[i].update();
    obstaculos[i].display();

    if (personagem.colidiu(obstaculos[i])) {
      obstaculos.splice(i, 1);
      pontos -= 5; // Perde pontos ao bater em um obstáculo
    }
  }

  // Exibe a pontuação
  fill(0);
  textSize(24);
  text("Pontos: " + pontos, width / 2, 30);
}

// Gera um item aleatório (campo ou cidade)
function gerarItem() {
  let tipo = random() > 0.5 ? 'campo' : 'cidade';
  let item = new Item(tipo);
  itens.push(item);
  
  // Gera um obstáculo aleatório
  if (random() > 0.8) {
    let obstaculo = new Obstaculo();
    obstaculos.push(obstaculo);
  }
}

// Classe do personagem
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
    text("🚶", this.x, this.y);  // Personagem é um emoji (pode mudar para outro emoji)
  }

  colidiu(obj) {
    return dist(this.x, this.y, obj.x, obj.y) < this.size + obj.size;
  }
}

// Classe de itens coletáveis
class Item {
  constructor(tipo) {
    this.tipo = tipo;
    this.x = random(width);
    this.y = -20;
    this.size = 30;
    this.speed = 3;
    this.emoji = this.tipo === 'campo' ? '🌾' : '🏙️'; // Emoji de campo ou cidade
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

// Classe de obstáculos
class Obstaculo {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.size = 40;
    this.speed = 4;
    this.emoji = '🚗';  // Obstáculo é um carro
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
