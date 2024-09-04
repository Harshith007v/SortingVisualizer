const n = 10;
let array = [];
const container = document.querySelector("#container");
let correctIndex = 0;

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
  const mark = selectionSort(copy);
  animate(mark);
}

function animate(mark) {
  if (mark.length === 0) {
    showBar();
    return;
  }

  const { indices, type } = mark.shift();
  const [start, end] = indices;

  // Show comparison (blue color)
  if (type === "compare") {
    showBar([start, end], correctIndex, "blue");
  }

  // Wait before swapping
  setTimeout(function () {
    // Show swap (violet color)
    if (type === "swapped") {
      [array[start], array[end]] = [array[end], array[start]];
      correctIndex = start;
      showBar([start, end], correctIndex, "violet");
    }

    // Move to the next step in the animation
    setTimeout(function () {
      animate(mark);
    }, 750);
  }, 750);
}

function selectionSort(array) {
  const mark = [];
  for (let i = 0; i < array.length - 1; i++) {
    let min = i;

    for (let j = i + 1; j < array.length; j++) {
      // Mark comparison
      mark.push({ indices: [min, j], type: "compare" });
      if (array[j] < array[min]) {
        min = j;
      }
    }

    if (min !== i) {
      // Mark swap
      mark.push({ indices: [i, min], type: "swapped" });
      [array[i], array[min]] = [array[min], array[i]];
    }
  }

  return mark;
}

function showBar(indices, correctIndex, color) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] + "%";
    bar.classList.add("bar");

    const num = document.createElement("number");
    num.innerHTML = Math.floor(array[i]);
    num.classList.add("number");
    bar.appendChild(num);

    if (indices && indices.includes(i)) {
      bar.style.backgroundColor = color;
    } else if (i <= correctIndex) {
      bar.style.backgroundColor = "red";
    } else {
      bar.style.backgroundColor = "black";
    }

    container.appendChild(bar);
  }
}
