
const GrassEater = require("./GrassEater");


module.exports = class Forestman extends GrassEater {
  constructor(x, y, index) {
    super(x, y, index);
    this.x = x;
    this.y = y;
    this.energy = 10;
    this.index = index;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x, this.y + 1],
      [this.x, this.y + 2],
      [this.x, this.y + 3],
      [this.x, this.y - 1],
      [this.x, this.y - 2],
      [this.x, this.y - 3],
      [this.x + 1, this.y],
      [this.x + 2, this.y],
      [this.x + 3, this.y],
      [this.x - 1, this.y],
      [this.x - 2, this.y],
      [this.x - 3, this.y],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }




  // var newCell1 = this.chooseCell(0);
  // var newCell = newCell1[Math.floor(Math.random()*newCell1.length)];
  move() {
    var newCell1 =this.chooseCell(0);
    var newCell = newCell1[Math.floor(Math.random()*newCell1.length)]
    if (newCell) {
      
      var x = newCell[0];
      var y = newCell[1];

      matrix[y][x] = this.index;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
      this.energy--;
    }
  }

  eat() {
    var rand1HunterCells1 = this.chooseCell(4);
    var HunterCells = rand1HunterCells1[Math.floor(Math.random()*rand1HunterCells1.length)];

    var grassEatCells1 = this.chooseCell(3);


    var grassEatCells= grassEatCells1[Math.floor(Math.random()*grassEatCells1.length)];

    // var AllCells = HunterCells + grassEatCells;
    // var rand1 = AllCells;

    // var rand= rand1[Math.floor(Math.random()*rand1.length)];
    if (HunterCells) {
      var x = HunterCells[0];
      var y = HunterCells[1];

      matrix[this.y][this.x] = 0;
      matrix[y][x] = this.index;

      if (matrix[y][x] == 4) {
        for (var i in hunterArr) {
          if (x == hunterArr[i].x && y == hunterArr[i].y) {
            hunterArr.splice(i, 1);
            break;
          }
        }
      } else if (grassEatCells){
        for (var i in grassEatArr) {
          if (x == grassEatArr[i].x && y == grassEatArr[i].y) {
            grassEatArr.splice(i, 1);
            break;
          }
        }
      }
      this.x = x;
      this.y = y;
      this.energy += 2;
    }
  }

  mul() {
    // this.multiply++;
    var newCell1 = this.chooseCell(0);
    var newCell = newCell1[Math.floor(Math.random()*newCell1.length)]
    if (this.energy >= 14 && newCell) {
      var x = newCell[0];
      var y = newCell[1];

      var newforestman = new Forestman(x, y, this.index);
      ForestmanArr.push(newforestman);
      matrix[y][x] = this.index;
      this.energy = 8;
    }
  }

  die() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;

      for (var i in ForestmanArr) {
        if (ForestmanArr[i].y == this.y && ForestmanArr[i].x == this.x) {
          ForestmanArr.splice(i, 1);
          break;
        }
      }
    }
  }
}
