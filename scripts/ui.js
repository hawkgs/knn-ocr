import { Letters } from './letters.js';
import { OcrKNN } from './knn.js';

const K = 3;
const AVAILABLE_CLICKS = 20;
let dots = [];
let clicksLeft = AVAILABLE_CLICKS;

const plane = document.getElementById('plane');
const clicksLeftEl = document.getElementById('clicks-left');

function initPlane() {
  clicksLeftEl.innerText = clicksLeft;

  plane.addEventListener('click', (e) => {
    if (clicksLeft <= 0) {
      return;
    }

    const dot = { x: e.pageX, y: e.pageY };
    dots.push(dot);

    clicksLeft -= 1;
    clicksLeftEl.innerText = clicksLeft;

    const dotEl = document.createElement('div');
    dotEl.classList.add('dot');
    dotEl.style.top = dot.y + 'px';
    dotEl.style.left = dot.x + 'px';
    plane.appendChild(dotEl);
  });
}

function clean() {
  const clean = document.getElementById('clean');
  clean.addEventListener('click', () => {
    dots = [];
    clicksLeft = AVAILABLE_CLICKS;
    clicksLeftEl.innerText = clicksLeft;

    let child;
    while ((child = plane.firstChild)) {
      plane.removeChild(child);
    }
  });
}

function print() {
  const print = document.getElementById('print');
  print.addEventListener('click', () => console.log(dots));
}

function test() {
  const knn = new OcrKNN(K, Letters);
  const test = document.getElementById('test');

  test.addEventListener('click', () => {
    const result = knn.test(dots);
    console.log(result);
  });
}

function init() {
  initPlane();
  clean();
  print();
  test();
}

init();
