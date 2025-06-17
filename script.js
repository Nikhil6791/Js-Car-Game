const score = document.querySelector(".score");
const startScreen = document.querySelector(".start-screen");
const gameArea = document.querySelector(".game-area");
const gameDetail = document.querySelector(".game-detail");

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  Enter: false,
};

startScreen.addEventListener("click", start);

let player = { speed: 5, score: 0 };
function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  if (e.key === "Enter") {
    keys.Enter = true;
    start();
  }

  // console.log(keys);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  // console.log(e.key);
  // console.log(keys);
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  console.log(aRect, bRect);
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y > 700) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function endGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  gameDetail.innerHTML =
    "Game Over <br>" +
    "Your final score was " +
    player.score +
    " <br> Click here or press enter to restart the game";
}

function moveEnemyCar(car) {
  let enemyCar = document.querySelectorAll(".enemy");
  enemyCar.forEach(function (item) {
    if (isCollide(car, item)) {
      //   let collidePosition = isCollide(car, item);
      //   console.log(collidePosition);
      endGame();
    }
    if (item.y > 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function playGame() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  // console.log(road);
  if (player.start) {
    moveLines();
    moveEnemyCar(car);
    if (keys.ArrowUp && player.y > road.top + 100) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 70) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    window.requestAnimationFrame(playGame);
    player.score++;
    let ps = player.score - 1;
    score.innerText = "Score: " + ps;
  }
}

function start() {
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(playGame);

  for (let i = 0; i < 5; i++) {
    let roadLines = document.createElement("div");
    roadLines.setAttribute("class", "lines");
    gameArea.appendChild(roadLines);
    roadLines.y = i * 150;
    roadLines.style.top = roadLines.y + "px";
  }
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (let i = 0; i < 3; i++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    gameArea.appendChild(enemyCar);
    enemyCar.y = (i + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    // enemyCar.style.backgroundColor = "blue";
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
  }
}
