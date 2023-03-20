const refs = {
  bcgColor: document.querySelector('body'),
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

let timeId = null;

function onClickChangeBcgColor() {
  onClickStopBcgColor();
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.startButton.addEventListener('click', () => {
  timeId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startButton.disabled = true;
  refs.stopButton.disabled = false;
});


refs.stopButton.addEventListener('click', () => {
  clearInterval(timeId);
  refs.startButton.disabled = false;
  refs.stopButton.disabled = true;
});
