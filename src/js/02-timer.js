import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

 let selectedTime = null;

 const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
   days: document.querySelector('span[data-days]'),
 hours: document.querySelector('span[data-hours]'),
 minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
 };

 //Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.

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

    return {days, hours, minutes, seconds};
}

/* Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. 
Зверни увагу, що вона не форматує результат.Тобто, якщо залишилося 4 хвилини або будь - якої іншої складової часу,
    то функція поверне 4, а не 04.В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів.
Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.
 */

function pad(value) {
    return String(value).padStart(2, '0');
}

/* Метод onClose() з об'єкта параметрів викликається щоразу під час закриття 
елемента інтерфейсу, який створює flatpickr. 
Саме у ньому варто обробляти дату, обрану користувачем. 
Параметр selectedDates - це масив обраних дат, тому ми 
беремо перший елемент.
Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
 */

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      // selectedDates[0] = new Date();
    } else {
      selectedTime = selectedDates[0];
      refs.startBtn.disabled = false;
    }  
},
};
flatpickr(refs.inputDate, options);
 
class Timer {
    constructor() {
        this.timeId = null;
        this.isActive = false;
        refs.startBtn.disabled = true;
    }

    startTimer() {
        if (refs.startBtn.hasAttribute('isActive')) {
            return;
        }
        this.timeId = setInterval(() => {
            const currentTime = new Date();
            const deltaTime = selectedTime - currentTime;
            const componentsTimer = convertMs(deltaTime);
            if (deltaTime <= 1000) {
                this.stopTimer();
            }
            this.onUpdateClockFace(componentsTimer);
        }, 1000);
    }
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
refs.startBtn.addEventListener('click', () => timer.startTimer());