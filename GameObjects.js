//tower defense game objects

class Tower {
  constructor(x, y, width, height, color, range, damage, speed, cost, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
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