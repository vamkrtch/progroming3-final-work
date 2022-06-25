const GrassEater = require("./GrassEater");

module.exports = class Animal extends GrassEater {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 6;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 2, this.y - 2],
      [this.x - 1, this.y - 2],
      [this.x, this.y - 2],
      [this.x + 1, this.y - 2],
      [this.x + 2, this.y - 2],
      [this.x - 2, this.y - 1],
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 2, this.y - 1],
      [this.x - 2, this.y],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x + 2, this.y],
      [this.x - 2, this.x + 1],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
      [this.x + 2, this.y + 1],
      [this.x - 2, this.y + 2],
      [this.x - 1, this.y + 2],
      [this.x, this.y + 2],
      [this.x + 1, this.y + 2],
      [this.x + 2, this.y + 2],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }
  // 
  // var newCell1 = this.chooseCell(0);
  // var newCell = newCell1[Math.floor(Math.random()*newCell1.length)];
  move() {

    var newCell1 = this.chooseCell(0);
    var newCell = newCell1[Math.floor(Math.random() * newCell1.length)];
   
    if (newCell) {
      console.log(this.energy);

      var x = newCell[0];
      var y = newCell[1];
      matrix[this.y][this.x] = 0;
      matrix[y][x] = this.index;

      this.x = x;
      this.y = y;
      this.energy-=6;
    }
    
  }

  eat() {
    var grassEatCells1 = this.chooseCell(2);
    var grassEatCells = grassEatCells1[Math.floor(Math.random() * grassEatCells1.length)];
    if (grassEatCells) {
      var x = grassEatCells[0];
      var y = grassEatCells[1];

      matrix[this.y][this.x] = 0;
      matrix[y][x] = this.index;

      for (var i in grassEatArr) {
        if (x == grassEatArr[i].x && y == grassEatArr[i].y) {
          grassEatArr.splice(i, 1);
          break;
        }
      }

      this.x = x;
      this.y = y;
      this.energy ++;
    }
  }

  mul() {
    // this.multiply++;
    var newCell1 = this.chooseCell(0);
    var newCell = newCell1[Math.floor(Math.random() * newCell1.length)];
    if (this.energy >= 10 && newCell ) {
      var x = newCell[0];
      var y = newCell[1];

      var newAnimal = new Animal(x, y, this.index);
      AnimalArr.push(newAnimal);
      matrix[y][x] = this.index;
      this.energy = 8;
    }
  }

  die() {
   
    if (this.energy <= 0) {
      
      console.log('mera');
      matrix[this.y][this.x] = 0;

      for (var i in AnimalArr) {
        if (AnimalArr[i].y == this.y && AnimalArr[i].x == this.x) {
          AnimalArr.splice(i, 1);
          break;
        }
      }
    }
  }
};
