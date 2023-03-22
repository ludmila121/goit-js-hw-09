import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

let selectedTime = null;

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

 refs.startBtn.setAttribute('disabled', true);

// //*   Принимает время в миллисекундах
// //*   Высчитывает сколько в них вмещается часов/минут/секунд
// //*   Возвращает объект со свойствами hours, mins, secs
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//*   Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
function pad(value) {
  return String(value).padStart(2, '0');
}
//*   настройки  options  с  библиотеки  flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    
    if (selectedDates[0].getTime() <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      selectedTime = selectedDates[0];
      refs.startBtn.disabled = false;
      Notify.success('Valid date' )
    }
  },
};
flatpickr(refs.inputDate, options);

class Timer {
  //*  первоначальные данные перед запуском таймера
  constructor() {
    this.timerId = null;
    this.isActive = false;
    // refs.startBtn.disabled = true;
    
  }


  //*  запустили таймер
  startTimer() {
     /* if (this.isActive) {
       return;
     } */

    if (refs.startBtn.hasAttribute('isActive')) {
      return;
    }
 
    this.timerId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = selectedTime - currentTime;
      const componentsTimer = convertMs(deltaTime);

      //*  остановили таймер очистили интервал
      if (deltaTime <= 1000) {
        clearInterval(this.timerId);
        this.stopTimer();
        return;
      }

      this.onUpdateClockFace(componentsTimer);
    }, 1000);
  }

  //*  передаем  интерфейс  таймера
  onUpdateClockFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
  }

  stopTimer() {
    clearInterval(this.timerId);
  }
}

const timer = new Timer();
refs.startBtn.addEventListener('click', () =>  timer.startTimer());


