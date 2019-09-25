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

    dots.push(e.pageX, e.pageY);

    clicksLeft -= 1;
    clicksLeftEl.innerText = clicksLeft;

    const dotEl = document.createElement('div');
    dotEl.classList.add('dot');
    dotEl.style.top = e.pageY + 'px';
    dotEl.style.left = e.pageX + 'px';
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

function init() {
  initPlane();
  clean();
  print();
}

init();
