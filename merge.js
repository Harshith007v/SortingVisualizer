const n = 10;
let array = [];
const container = document.querySelector("#container");
let positions = [];

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
  MergeSort(copy, 0, copy.length - 1);
  animate();
}

function animate() {
  if (positions.length === 0) {
    showBars();
    return;
  }

  const { indices, type, value } = positions.shift();

  if (type === "partition") {
    showBars(indices, "violet");
  }

  if (type === "overwrite") {
    array[indices[0]] = value;
    showBars(indices, "green");
  }

  setTimeout(function () {
    animate();
  }, 1000);
}

function merge(array, l, mid, h) {
  let b = [];
  let i = l,
    j = mid + 1,
    k = 0;

  let rangeIndices = [];
  for (let idx = l; idx <= h; idx++) {
    rangeIndices.push(idx);
  }
  positions.push({ indices: rangeIndices, type: "partition" });

  while (i <= mid && j <= h) {
    if (array[i] <= array[j]) {
      b[k++] = array[i++];
    } else {
      b[k++] = array[j++];
    }
  }
  while (i <= mid) {
    b[k++] = array[i++];
  }
  while (j <= h) {
    b[k++] = array[j++];
  }

  for (let i = l, k = 0; i <= h; i++, k++) {
    array[i] = b[k];
    positions.push({ indices: [i], type: "overwrite", value: array[i] });
  }
}

function MergeSort(array, l, h) {
  if (l < h) {
    let mid = Math.floor((l + h) / 2);
    MergeSort(array, l, mid);
    MergeSort(array, mid + 1, h);
    merge(array, l, mid, h);
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
    }

    container.appendChild(bar);
  }
}
