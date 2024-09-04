const n = 10;
let array = [];
const container = document.querySelector("#container");
let positions = [];
let crtIndex = [];

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

function play() {
  const copy = [...array];
  QuickSort(copy, 0, copy.length - 1);
  animate(positions);
}

function animate(positions) {
  if (positions.length == 0) {
    showBars();
    return;
  }

  const { indices, type } = positions.shift();
  const [i, j] = indices;

  if (type === "comp") {
    showBars([i, j], "blue");
  }

  if (type === "found") {
    showBars([j], "violet");
  }

  if (type === "swap") {
    [array[i], array[j]] = [array[j], array[i]];
    showBars([i, j], "red");
  }

  if (type === "pivot") {
    showBars([j], "green");
    crtIndex.push(j);
  }

  setTimeout(function () {
    animate(positions);
  }, 1000);
}

function Partition(array, l, h) {
  let pivot = array[l];
  let i = l;
  let j = h;
  while (i < j) {
    while (array[i] <= pivot) {
      positions.push({ indices: [l, i], type: "comp" });
      i++;
    }
    positions.push({ indices: [l, i], type: "comp" });
    positions.push({ indices: [l, i], type: "found" });

    while (array[j] > pivot) {
      positions.push({ indices: [l, j], type: "comp" });
      j--;
    }
    positions.push({ indices: [l, j], type: "comp" });
    positions.push({ indices: [l, j], type: "found" });

    if (i < j) {
      positions.push({ indices: [i, j], type: "swap" });
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  positions.push({ indices: [l, j], type: "swap" });
  positions.push({ indices: [l, j], type: "pivot" });
  [array[l], array[j]] = [array[j], array[l]];
  return j;
}

function QuickSort(array, l, h) {
  if (l < h) {
    let loc = Partition(array, l, h);
    QuickSort(array, l, loc - 1);
    QuickSort(array, loc + 1, h);
  }
}

function showBars(indices, color) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] + "%";
    bar.classList.add("bar");

    const num = document.createElement("div");
    num.innerHTML = Math.floor(array[i]);
    num.classList.add("number");
    bar.appendChild(num);

    if (indices && indices.includes(i)) {
      bar.style.backgroundColor = color;
    } else if (crtIndex.includes(i)) {
      bar.style.backgroundColor = "green";
    }

    container.appendChild(bar);
  }
}
