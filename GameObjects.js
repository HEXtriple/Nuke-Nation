//tower defense game objects

class Enemy {
  constructor(x, y, width, height, speed, health, damage, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.health = health;
    this.damage = damage;
    this.type = type;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}

class Tower {
  constructor(x, y, width, height, range, damage, speed, cost, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.range = range;
    this.damage = damage;
    this.speed = speed;
    this.cost = cost;
    this.type = type;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}

class Projectile {
  constructor(x, y, width, height, color, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.type = type;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}

class selectionMarker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.color = "white";
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}

const map = new Image();
//Draw Map
function drawMap() {
  map.onload = () => {
    c.drawImage(map, 0, 0, canvas.width, canvas.height);
  } 
}