var socket = io("ws://localhost:4001");

// socket.on("weather", function (data) {
//   weath = data;
//   console.log(weath);

// })

var side = 10;
function fn(data) {
  matrix = data.matrix;
  return matrix;
}

function setup() {
  // frameRate(5);
  createCanvas(50 * side, 50 * side);
  background("#acacac");
}

var statistics;
function startgame() {
  function nkarel(matrix) {
  	
    // alert(matrix.length);
    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 0) {
          fill("green");
          rect(x * side, y * side, side, side);
        } else if (matrix[y][x] == 1) {
          fill("#acacac");
          rect(x * side, y * side, side, side);
        } else if (matrix[y][x] == 2) {
          fill("yellow");
          rect(x * side, y * side, side, side);
        } else if (matrix[y][x] == 3) {
          fill("red");
          rect(x * side, y * side, side, side);
        } else if (matrix[y][x] == 4) {
          fill("blue");
          rect(x * side, y * side, side, side);
        } else if (matrix[y][x] == 5) {
          fill("black");
          rect(x * side, y * side, side, side);
        }
      }
    }
  }
  socket.on("send matrix", nkarel);
  if (frameCount % 60 == 0) {
    statistics = {
      grassArr: grassArr.length,
      grassEatArr: grassEatArr.length,
      AnimalArr: AnimalArr.length,
      hunterArr: hunterArr.length,
      ForestmanArr: ForestmanArr.length,
    };
    socket.emit("send statistics", statistics);
  }
}
weath = "winter";

function weather() {
  let body = document.getElementById("body");
  let td = document.getElementById("weather_td");

  if (weath == "winter") {
    weath = "spring";
    body.style.backgroundColor = "green";
    td.style.backgroundColor = "green";

    document.getElementById("weather_td").innerText = "Winter";
  } else if (weath == "spring") {
    weath = "summer";
    body.style.backgroundColor = "yellow";
    td.style.backgroundColor = "yellow";

    document.getElementById("weather_td").innerText = "spring";
  } else if (weath == "summer") {
    weath = "autumn";
    document.getElementById("weather_td").innerText = "summer";

    body.style.backgroundColor = "orange";
    td.style.backgroundColor = "orange";
  } else if (weath == "autumn") {
    weath = "winter";
    body.style.backgroundColor = "blue";
    document.getElementById("weather_td").innerText = "autumn";
  }
}

setInterval(weather, 5000);

function rmrf() {
  socket.emit("rmrf");
}
function AddGrassEater() {
  socket.emit("AddGrassEater");
}
function reload() {
  socket.emit("reload");
}

function addgishatich() {
  socket.emit("add Animal");
}
// socket.on("send matrix", (data) => {
//   console.log("Send Matrix: ", data);
//   nkarel(data.matrix);
// });
