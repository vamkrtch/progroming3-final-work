const Grass = require("./Grass");

module.exports = class GrassEater extends Grass {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 8;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }

  move() {
    var newCell1 = this.chooseCell(0);
    var newCell = newCell1[Math.floor(Math.random() * newCell1.length)];
    if (newCell) {
      this.energy--;
      var x = newCell[0];
      var y = newCell[1];
      matrix[this.y][this.x] = 0;
      matrix[y][x] = this.index;

      this.x = x;
      this.y = y;
    }
  }

  eat() {
    var grassCells1 = this.chooseCell(0);
    var grassCells =
      grassCells1[Math.floor(Math.random() * grassCells1.length)];
    if (grassCells) {
      var x = grassCells[0];
      var y = grassCells[1];
      matrix[this.y][this.x] = 0;
      matrix[grassCells[1]][grassCells[0]] = this.index;

      this.x = grassCells[0];
      this.y = grassCells[1];

      for (var i in grassArr) {
        if (grassCells[0] == grassArr[i].x && grassCells[1] == grassArr[i].y) {
          grassArr.splice(i, 1);

          break;
        }
      }
      this.energy += 2;
    }
  }

  mul() {
    this.multiply++;
    var newCell1 = this.chooseCell(0);
    var newCell = newCell1[Math.floor(Math.random() * newCell1.length)];
    if (this.energy >= 12 && newCell) {
      var x = newCell[0];
      var y = newCell[1];

      var newGrasseat = new GrassEater(x, y, this.index);
      grassEatArr.push(newGrasseat);
      matrix[y][x] = this.index;
      this.energy = 8;
      if (this.multiply == 15) {
        for (var i in grassEatArr) {
          if (grassEatArr[i].y == this.y && grassEatArr[i].x == this.x) {
            grassEatArr.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  die() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;

      for (var i in grassEatArr) {
        if (grassEatArr[i].y == this.y && grassEatArr[i].x == this.x) {
          grassEatArr.splice(i, 1);
          break;
        }
      }
    }
  }
};
