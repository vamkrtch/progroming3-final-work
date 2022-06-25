
module.exports = class Hunter {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.energy = 10;
    this.index = index;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x + 1, this.y + 1],
      [this.x + 2, this.y + 2],
      [this.x + 3, this.y + 3],
      [this.x - 1, this.y - 1],
      [this.x - 2, this.y - 2],
      [this.x - 3, this.y - 3],
      [this.x + 1, this.y - 1],
      [this.x + 2, this.y - 2],
      [this.x + 3, this.y + 3],
      [this.x - 1, this.y + 1],
      [this.x - 2, this.y + 2],
      [this.x - 3, this.y + 3],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();

    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }

    return found;
  }




  // var newCell1 = this.chooseCell(0);
  // var newCell = newCell1[Math.floor(Math.random()*newCell1.length)];





  move() {
    var meker = this.chooseCell(1)
    var gtacmeker = meker[Math.floor(Math.random() * meker.length)]
var zroner = this.chooseCell(2)
var gtaczroner = zroner[Math.floor(Math.random() * zroner.length)]
    // var AllnewCell = [];
    // var newCell1 = this.chooseCell(1);
    // var newCell = newCell1[Math.floor(Math.random()*newCell1.length)];
    // var newCell2 = this.chooseCell(0);
    // var newCell = newCell2[Math.floor(Math.random()*newCell2.length)];
    // AllnewCell.push(newCell);
    // AllnewCell.push(newCell2);


    // var randcell1 = AllnewCell;


    // var randcell = randcell1[Math.floor(Math.random()*randcell1.length)];
    if (gtacmeker) {
      var x = gtacmeker[0];
      var y = gtacmeker[1];

      matrix[this.y][this.x] = 0;

      matrix[y][x] = this.index;

      this.x = x;
      this.y = y;

      this.energy--;
    }else if(gtaczroner){
      var x = gtaczroner[0];
      var y = gtaczroner[1];

      matrix[this.y][this.x] = 0;

      matrix[y][x] = this.index;

      this.x = x;
      this.y = y;

      this.energy--;
    }
  }
  eat() {
    var AnimalCells1 = this.chooseCell(3);
    var AnimalCells = AnimalCells1[Math.floor(Math.random()*AnimalCells1.length)];

    if (AnimalCells) {
      var x = AnimalCells[0];
      var y = AnimalCells[1];

      matrix[this.y][this.x] = 0;
      matrix[y][x] = this.index;

      for (var i in AnimalArr) {
        if (x == AnimalArr[i].x && y == AnimalArr[i].y) {
          AnimalArr.splice(i, 1);
          break;
        }
      }

      this.x = x;
      this.y = y;
      this.energy += 2;
    }
  }

  mul() {
    this.multiply++;
    var newCell1 = this.chooseCell(0);
    var newCell = newCell1[Math.floor(Math.random()*newCell1.length)];
    if (this.energy >= 12 && newCell) {
      var x = newCell[0];
      var y = newCell[1];

      var newHunter = new Hunter(x, y, this.index);
      hunterArr.push(newHunter);
      matrix[y][x] = this.index;
      this.energy = 8;
      this.multiply++;
    }
  }

  die() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;

      for (var i in hunterArr) {
        if (hunterArr[i].y == this.y && hunterArr[i].x == this.x) {
          hunterArr.splice(i, 1);
          break;
        }
      }
    } else if (this.multiply == 10) {
      for (var i in hunterArr) {
        if (hunterArr[i].y == this.y && hunterArr[i].x == this.x) {
          hunterArr.splice(i, 1);
          break;
        }
      }
    }
  }
};
