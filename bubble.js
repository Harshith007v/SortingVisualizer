const n = 10;
let array = [];
const container = document.querySelector("#container");

//automatically call init() every time the page is refreshed
init();

//to take input numbers from user
function go() {
  const input = document.getElementById("numbers").value;
  array = input.split(",").map(Number);
  showBars();
}

//to take some random 10 numbers in array
function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random() * 100;
  }
  showBars();
}

//to play the sort
function play() {
  const copy = [...array];
  const moves = bubbleSort(copy);
  animate(moves);
}

//animate funciton to swap
function animate(moves) {
  if (moves.length === 0) {
    showBars();
    //if nothing to swap, then done animating
    return;
  }

  const move = moves.shift();
  const [i, j] = move.indices;

  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }

  showBars(move);
  setTimeout(function () {
    animate(moves);
  }, 1000);
}

//bubble sort function
function bubbleSort(array) {
  const moves = []; //to record the indices which is swapped use swaps=[]
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return moves;
}

//to create bars and show them
function showBars(move) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] + "%";
    bar.classList.add("bar");

    const num = document.createElement("div");
    num.innerHTML = Math.floor(array[i]);
    num.classList.add("number");
    bar.appendChild(num);

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
    }

    container.appendChild(bar);
  }
}
