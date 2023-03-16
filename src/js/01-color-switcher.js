const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timeId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
startButton.addEventListener('click', () => {
  timeId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
});
stopButton.addEventListener('click', () => {
  clearInterval(timeId);
  startButton.disabled = false;
  stopButton.disabled = true;
});
