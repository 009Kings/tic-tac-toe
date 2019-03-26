// here be me global variables
var t3boxes = document.querySelectorAll(".t3box");
var whoseMove = document.querySelector(".whose-move");

/*
0  1  2
3  4  5
6  7  8
*/

var t3Grid = {
  row1: [t3boxes[0], t3boxes[1], t3boxes[2]],
  row2: [t3boxes[3], t3boxes[4], t3boxes[5]],
  row3: [t3boxes[6], t3boxes[7], t3boxes[8]],
  column1: [t3boxes[0], t3boxes[3], t3boxes[6]],
  column2: [t3boxes[1], t3boxes[4], t3boxes[7]],
  column3: [t3boxes[2], t3boxes[5], t3boxes[8]],
  diagonal1: [t3boxes[0], t3boxes[4], t3boxes[8]],
  diagonal2: [t3boxes[2], t3boxes[4], t3boxes[6]]
}

var state = {
  numOfClicks: 0,
  x: 0,
  o: 0,
  ties: 0,
  counters: [    
    xPanel = {
      img : document.querySelector("#x-panel[img]"),
      Wins : document.querySelector("#x-wins span"),
      Losses : document.querySelector("#x-losses span"),
      Draws : document.querySelector("#x-draw span")
    },
    oPanel = {
      img : document.querySelector("#o-panel[img]"),
      Wins : document.querySelector("#o-wins span"),
      Losses : document.querySelector("#o-losses span"),
      Draws : document.querySelector("#o-draw span")
    }
  ],
}

document.addEventListener("DOMContentLoaded", function(){
  // DOM stuff here
  start();
  document.getElementById("try-again").addEventListener("click", clearBoard); 
  document.getElementById("clear-game").addEventListener("click", clearGame);
});

// Set up the game
function start () {
  addBoxListeners();
}

// Add click listeners
function addBoxListeners () {
  for (let i = 0; i < t3boxes.length; i++) {
    t3boxes[i].addEventListener("click", click);
  }
}

function removeBoxListeners () {
  for (let i = 0; i < t3boxes.length; i++) {
    t3boxes[i].removeEventListener("click", click);
  }
}

// Click function
function click () {
  // If already clicked, bounce out
  if (this.getAttribute("clicked") != "false") {
    return;
  }

  //click x or o
  if (state.numOfClicks % 2 === 0) {
    this.setAttribute("clicked", "x");
    whoseMove.textContent = "It's O's move";
  } else {
    this.setAttribute("clicked", "o");
    whoseMove.textContent = "It's X's move";
  }

  state.numOfClicks += 1;

  // Time to check for win
  if (state.numOfClicks >= 5) {
    let winner = checkForWin()

    // Stop the game
    if (winner) {
      removeBoxListeners();
    } else if (state.numOfClicks === 9) {
      removeBoxListeners();
      state.ties += 1;
      state.counters[0].Draws.textContent = state.ties;
      state.counters[1].Draws.textContent = state.ties;
      whoseMove.textContent = "It's a tie!";
    }

  }
}

//Check for win situations

function checkForWin() {
  if (checkForWinner("x")) {
    return "x"
  } else if (checkForWinner("o")) {
    return "o"
  } else {
    return false
  }
}

function checkForWinner(player) {
  for (var key in t3Grid) {
    let win = true;
    console.log("Checking", key)
    
    for (let i = 0; i < t3Grid[key].length; i++) {
      if (t3Grid[key][i].getAttribute("clicked") !== player) {
        win = false
      }
    }
    
    if (win) {
      registerWin(player)
      return true;
    }
  }
  return false
}

function registerWin(winner) {
  // Announce the win
  console.log("It's a win for", winner);
  //plus up the counters
  state[winner] += 1;
  whoseMove.textContent = `${winner} Wins the Game!`

  if (winner === "x") {
    state.counters[0].Wins.textContent = state[winner];
    state.counters[1].Losses.textContent = state[winner];
  } else {
    state.counters[0].Losses.textContent = state[winner];
    state.counters[1].Wins.textContent = state[winner];
  }
}

function clearBoard () {
    for (let i = 0; i < t3boxes.length; i++) {
        t3boxes[i].setAttribute("clicked", "false");
    }
    state.numOfClicks = 0;
    // Checking if the clear clears num of clicks
    document.querySelector(".whose-move").textContent = "It's X's move";
    start();
}

function clearGame() {
    clearBoard();
    state.x = state.o = state.ties = 0;
    for (var i = 0; i < state.counters.length; i++) {
        state.counters[i].Wins.textContent = "0";
        state.counters[i].Losses.textContent = "0";
        state.counters[i].Draws.textContent = "0";
    }
}