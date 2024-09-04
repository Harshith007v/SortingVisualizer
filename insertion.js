const n = 10;
let array = [];
const container = document.querySelector("#container");

init();

function go() {
  const input = document.getElementById("numbers").value;
  array = input.split(",").map(Number);
  showBar();
}

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random() * 100;
  }
  showBar();
}

function play() {
  const copy = [...array];
  const indices = insertionSort(copy);
  animate(indices);
}

function animate(indices) {
  if (indices.length === 0) {
    showBar();
    return;
  }

  const { index, type } = indices.shift();
  const [i, j] = index;

  if (type === "comp") {
    showBar([i, j], "blue");
  }

  if (type === "swap") {
    for (let k = i; k > j; k--) {
      [array[k], array[k - 1]] = [array[k - 1], array[k]];
    }
    showBar([j, j], "violet");
  }

  setTimeout(function () {
    animate(indices);
  }, 1000);
}

function insertionSort(array) {
  const indices = [];
  for (let i = 1; i < array.length; i++) {
    let temp = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > temp) {
      indices.push({ index: [i, j], type: "comp" });
      array[j + 1] = array[j];
      j--;
    }
    indices.push({ index: [i, j], type: "comp" });
    array[j + 1] = temp;
    indices.push({ index: [i, j + 1], type: "swap" });
  }
  return indices;
}

function showBar(index, color) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] + "%";
    bar.classList.add("bar");

    const num = document.createElement("div");
    num.innerHTML = Math.floor(array[i]);
    num.classList.add("number");
    bar.appendChild(num);

    if (index && index.includes(i)) {
      bar.style.backgroundColor = color;
    }
    container.appendChild(bar);
  }
}
