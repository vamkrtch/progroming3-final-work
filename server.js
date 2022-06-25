var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");
const { start } = require("repl");
const Forestman = require("./Forestman");

Grass = require("./Grass");
GrassEater = require("./GrassEater");
Animal = require("./Animal");
Hunter = require("./Hunter");

app.use(express.static("."));
statData = [];
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/st", function (req, res) {
  res.redirect("st.html");
});
server.listen(4001);
grassArr = [];
grassEatArr = [];
AnimalArr = [];
hunterArr = [];
ForestmanArr = [];
//////////////////////////////// Statistics Variable ////////////////////////////////

count_grass = 0;
count_grassEat = 0;
count_Animal = 0;
count_hunter = 0;
count_Forestman = 0;

//////////////////////////////// Statistics Variable ////////////////////////////////

Grass = require("./Grass");
GrassEater = require("./GrassEater");

var n = 50;
var m = 50;
function gen() {
  var matrix = [];
  for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
      matrix[y][x] = Math.floor(Math.random() * 6);
    }
  }
  return matrix;
}
matrix = gen();
io.sockets.emit("send matrix", matrix);
// var weath = "winter";

// function weather() {

//   if (weath == "winter") {
//       weath = "spring"
//   }
//   else if (weath == "spring") {
//       weath = "summer"
//   }
//   else if (weath == "summer") {
//       weath = "autumn"
//   }
//   else if (weath == "autumn") {
//       weath = "winter"
//   }

//   io.sockets.emit('weather', weath)
// }
// console.log(weath);
// setInterval(weather, 5000);
matrix = gen();

data = {
  matrix: matrix,
};

function rmrf() {
  grassArr = [];
  grassEatArr = [];
  AnimalArr = [];
  hunterArr = [];
  ForestmanArr = [];
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
}

function AddGrassEater() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      grassEatArr.push(new GrassEater(x, y, 2));
    }
  }
}

function addgishatich() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3;
      AnimalArr.push(new Animal(x, y, 3));
    }
  }
}

function reload() {
  setTimeout("location.reload(true);", 1000);
}

function createObject(matrix) {
  //  t { matrix } = data;

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y, 1);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        var grEat = new GrassEater(x, y, 2);
        grassEatArr.push(grEat);
      } else if (matrix[y][x] == 3) {
        var An = new Animal(x, y, 3);
        AnimalArr.push(An);
      } else if (matrix[y][x] == 4) {
        var huntArr = new Hunter(x, y, 4);
        hunterArr.push(huntArr);
      } else if (matrix[y][x] == 5) {
        var ForestArr = new Forestman(x, y, 5);
        ForestmanArr.push(ForestArr);
      }
    }
  }
  //   io.sockets.emit("send matrix", matrix);

  //   let objectCount = {
  //     grass: grassArr.length,
  //     grassEater: grassEatArr.length,
  //     predator: AnimalArr.length,
  //     bust: hunterArr.length,
  //     bomb: ForestmanArr.length,
  //   };

  //   let data = JSON.stringify(objectCount, null, 2);
  //   fs.writeFileSync("statistics.json", data);
}
function game() {
  for (var i in grassArr) {
    grassArr[i].mul();
  }
  for (var i in grassEatArr) {
    grassEatArr[i].move();
    grassEatArr[i].eat();
    grassEatArr[i].mul();
    grassEatArr[i].die();
  }
  for (var i in AnimalArr) {
    AnimalArr[i].move();
    AnimalArr[i].eat();
    AnimalArr[i].mul();
    AnimalArr[i].die();
  }
  for (var i in hunterArr) {
    hunterArr[i].move();
    hunterArr[i].eat();
    hunterArr[i].mul();
    hunterArr[i].die();
  }
  for (var i in ForestmanArr) {
    ForestmanArr[i].move();
    ForestmanArr[i].eat();
    ForestmanArr[i].mul();
    ForestmanArr[i].die();
  }
  io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000);

setInterval(() => {
  io.sockets.emit("send matrix", data);
}, 1000);

io.on("connection", function (socket) {
  createObject(matrix);
  // socket.on("weather", weather)
});

io.on("connection", function (socket) {
  socket.on("rmrf", rmrf);
});

io.on("connection", function (socket) {
  socket.on("AddGrassEater", AddGrassEater);
});

io.on("connection", function (socket) {
  socket.on("add Animal", addgishatich);
});

var stats = {
  Grass: count_grass,
  grassEater: count_grassEat,
  Animal: count_Animal,
  Hunter: count_hunter,
  forestman: count_Forestman,

  Grass: grassArr.length,
  grassEater: grassEatArr.length,
  Animal: AnimalArr.length,
  Hunter: hunterArr.length,
  _Forestman: ForestmanArr.length,
};

setInterval(function () {
  stats["count_grass"] = count_grass;
  stats["count_grassEat"] = count_grassEat;
  stats["count_Animal"] = count_Animal;
  stats["count_hunter"] = count_hunter;
  stats["count_Forestman"] = count_Forestman;

  stats["count_grass"] = grassArr.length;
  stats["count_grassEat"] = grassEatArr.length;
  stats["count_Animal"] = AnimalArr.length;
  stats["count_hunter"] = hunterArr.length;
  stats["ForestmanArr"] = ForestmanArr.length;
  fs.writeFile("stats.json", JSON.stringify(stats), function (err) {
    if (err) throw err;
    console.log(stats);
  });
}, 10000);
